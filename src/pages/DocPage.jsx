import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import WorkplaceUsageCard from '../components/WorkplaceUsageCard';
import { day1Content, day2Content } from '../data/content.jsx';
import { quizzes } from '../data/quizzes';
import { ArrowLeft, CheckCircle2, Lock, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';

const QuizComponent = ({ sectionId, onComplete }) => {
    const questions = quizzes[sectionId] || [];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    useEffect(() => {
        if (questions[currentQuestion]) {
            const optionsWithOriginalIndex = questions[currentQuestion].options.map((opt, idx) => ({
                text: opt,
                isCorrect: idx === questions[currentQuestion].answer
            }));

            // Fisher-Yates shuffle
            for (let i = optionsWithOriginalIndex.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionsWithOriginalIndex[i], optionsWithOriginalIndex[j]] = [optionsWithOriginalIndex[j], optionsWithOriginalIndex[i]];
            }

            setShuffledOptions(optionsWithOriginalIndex);
        }
    }, [currentQuestion, sectionId]);

    if (questions.length === 0) return null;

    const handleAnswer = () => {
        const correct = shuffledOptions[selectedOption].isCorrect;
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);
        setShowResult(true);

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(q => q + 1);
                setSelectedOption(null);
                setShowResult(false);
                setIsCorrect(null);
            } else {
                const finalScore = score + (correct ? 1 : 0);
                if (finalScore === questions.length) {
                    onComplete();
                } else {
                    alert(`Score: ${finalScore}/${questions.length}. You need 100% to pass. Let's try again!`);
                    setCurrentQuestion(0);
                    setSelectedOption(null);
                    setShowResult(false);
                    setIsCorrect(null);
                    setScore(0);
                }
            }
        }, 1500);
    };

    return (
        <div style={{
            marginTop: '3rem',
            padding: '2.5rem',
            background: 'var(--bg-secondary)',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                    padding: '8px 16px',
                    background: 'var(--accent-color)',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                }}>
                    QUIZ: {currentQuestion + 1} / {questions.length}
                </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '2rem', lineHeight: '1.5', fontWeight: 600 }}>
                {questions[currentQuestion].question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {shuffledOptions.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => !showResult && setSelectedOption(idx)}
                        style={{
                            padding: '1.1rem 1.25rem',
                            textAlign: 'left',
                            borderRadius: '14px',
                            border: '1px solid',
                            borderColor: selectedOption === idx ? 'var(--accent-color)' : 'var(--border-color)',
                            background: selectedOption === idx ? 'rgba(var(--accent-rgb), 0.1)' : 'transparent',
                            color: 'var(--text-primary)',
                            cursor: showResult ? 'default' : 'pointer',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <span>{option.text}</span>
                        {showResult && option.isCorrect && (
                            <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                        )}
                        {showResult && selectedOption === idx && !option.isCorrect && (
                            <span style={{ color: '#ef4444', fontWeight: 800, flexShrink: 0 }}>✕</span>
                        )}
                    </button>
                ))}
            </div>

            <button
                onClick={handleAnswer}
                disabled={selectedOption === null || showResult}
                style={{
                    marginTop: '2rem',
                    width: '100%',
                    padding: '1.1rem',
                    borderRadius: '14px',
                    background: selectedOption === null ? 'var(--border-color)' : 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    border: 'none',
                    fontWeight: 700,
                    cursor: (selectedOption === null || showResult) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedOption !== null && !showResult ? 'scale(1)' : 'scale(0.99)',
                    opacity: selectedOption === null ? 0.6 : 1
                }}
            >
                {showResult ? (isCorrect ? 'Correct!' : 'Incorrect') : 'Submit Answer'}
            </button>
        </div>
    );
};

export default function DocPage({ day }) {
    const navigate = useNavigate();
    const { user, userData, setUserData } = useAuth();
    const { theme } = useTheme();
    const content = day === 'day1' ? day1Content : day2Content;
    const [activeId, setActiveId] = useState(content[0]?.id);
    const [showWow, setShowWow] = useState(false);

    // Get completed sections from userData
    const completedSections = userData?.progress?.completedSections || [];

    const isLocked = (index) => {
        if (index === 0) return false;
        return !completedSections.includes(content[index - 1].id);
    };

    const handleSectionComplete = async (sectionId) => {
        if (completedSections.includes(sectionId)) return;

        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                'progress.completedSections': arrayUnion(sectionId)
            });

            setUserData(prev => ({
                ...prev,
                progress: {
                    ...prev.progress,
                    completedSections: [...prev.progress.completedSections, sectionId]
                }
            }));

            // Success effects
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#a855f7', '#ec4899']
            });

            setShowWow(true);
            setTimeout(() => setShowWow(false), 4000);

        } catch (err) {
            console.error("Error updating progress:", err);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -50% 0px' }
        );

        content.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [content]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <AnimatePresence>
                {showWow && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -50 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1000,
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            padding: '3rem 5rem',
                            borderRadius: '32px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            textAlign: 'center',
                            boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
                        }}
                    >
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            {[1, 2, 3].map(i => <Star key={i} fill="#fbbf24" color="#fbbf24" size={32} />)}
                        </div>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            WOW!
                        </h2>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>You've done great! Section completed.</p>
                        <p style={{ marginTop: '0.5rem', fontSize: '1rem', opacity: 0.6 }}>The next chapter awaits...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <header style={{
                height: '60px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                position: 'sticky',
                top: 0,
                background: 'var(--bg-primary)',
                zIndex: 100,
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                    <span style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                        LETSUPGRADE GEN AI / {day === 'day1' ? 'Day 1' : 'Day 2'}
                    </span>
                </div>
                <ThemeToggle />
            </header>

            <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
                <Sidebar topics={content} activeId={activeId} completedSections={completedSections} />

                <main style={{ flex: 1, padding: '4rem 6rem', maxWidth: '800px' }}>
                    {content.map((section, index) => {
                        const locked = isLocked(index);
                        const isDone = completedSections.includes(section.id);

                        return (
                            <section
                                key={section.id}
                                id={section.id}
                                style={{
                                    marginBottom: '8rem',
                                    opacity: locked ? 0.7 : 1,
                                    filter: locked ? 'grayscale(0.5) blur(1px)' : 'none',
                                    pointerEvents: locked ? 'none' : 'auto',
                                    transition: 'all 0.5s ease',
                                    position: 'relative'
                                }}
                            >
                                {locked && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: '-2rem', right: '-2rem', bottom: 0,
                                        zIndex: 10,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1.5rem',
                                        background: 'rgba(var(--bg-rgb), 0.2)',
                                        backdropFilter: 'blur(2px)',
                                        borderRadius: '24px'
                                    }}>
                                        <div style={{
                                            padding: '1.5rem',
                                            background: 'var(--bg-secondary)',
                                            borderRadius: '50%',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                            border: '1px solid var(--border-color)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Lock size={32} color="var(--accent-color)" />
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Module Locked</p>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Complete the previous module quiz to unlock</p>
                                        </div>
                                    </div>
                                )}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <h2 style={{
                                            fontSize: '2.5rem',
                                            fontWeight: 700,
                                            letterSpacing: '-0.03em'
                                        }}>
                                            {section.title}
                                        </h2>
                                        {isDone && <CheckCircle2 color="#10b981" size={32} />}
                                    </div>

                                    <div className="doc-content" style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                                        {section.content}
                                    </div>

                                    {!isDone && !locked && (
                                        <QuizComponent
                                            sectionId={section.id}
                                            onComplete={() => handleSectionComplete(section.id)}
                                        />
                                    )}

                                    {isDone && (
                                        <div style={{
                                            marginTop: '3rem',
                                            padding: '1.5rem',
                                            borderRadius: '16px',
                                            background: 'rgba(16, 185, 129, 0.1)',
                                            border: '1px solid rgba(16, 185, 129, 0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#10b981' }}>
                                                <CheckCircle2 size={24} />
                                                <span style={{ fontWeight: 600 }}>Section Completed!</span>
                                            </div>
                                            {index < content.length - 1 && !completedSections.includes(content[index + 1].id) && (
                                                <button
                                                    onClick={() => document.getElementById(content[index + 1].id)?.scrollIntoView({ behavior: 'smooth' })}
                                                    style={{
                                                        background: 'var(--text-primary)',
                                                        color: 'var(--bg-primary)',
                                                        border: 'none',
                                                        padding: '0.75rem 1.5rem',
                                                        borderRadius: '10px',
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    Continue to Next <ArrowRight size={18} />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </section>
                        );
                    })}

                    <footer style={{ marginTop: '8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
                        &copy; 2025 Gen AI Workshop. Built with Precision.
                    </footer>
                </main>

                <WorkplaceUsageCard day={day} />
            </div>
        </div>
    );
}
