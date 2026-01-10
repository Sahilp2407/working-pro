import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../config/firebase';
import { doc, setDoc, updateDoc, arrayUnion, increment, getDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import WorkplaceUsageCard from '../components/WorkplaceUsageCard';
import { day1Content, day2Content } from '../data/content.jsx';
import { quizzes } from '../data/quizzes';
import { ArrowLeft, CheckCircle2, Lock, ArrowRight, Star, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import OutcomeSurveyModal from '../components/OutcomeSurveyModal';
import Day1FeedbackModal from '../components/Day1FeedbackModal';
import ScoreCardModal from '../components/ScoreCardModal';
import Day2ApplicationModal from '../components/Day2ApplicationModal';
import Day2FeedbackModal from '../components/Day2FeedbackModal';
import FinalFeedbackModal from '../components/FinalFeedbackModal';

const QuizComponent = ({ sectionId, onComplete }) => {
    const questions = quizzes[sectionId] || [];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    useEffect(() => {
        if (questions[currentQuestion]) {
            const optionsWithOriginalIndex = questions[currentQuestion].options.map((opt, idx) => ({
                text: opt,
                isCorrect: idx === questions[currentQuestion].answer
            }));

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

        if (correct) {
            setIsCorrect(true);
            setCorrectCount(c => c + 1);
            setShowResult(true);

            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(q => q + 1);
                    setSelectedOption(null);
                    setShowResult(false);
                    setIsCorrect(null);
                } else {
                    const finalCorrect = correctCount + 1;
                    const finalIncorrect = incorrectCount;
                    onComplete(finalCorrect, finalIncorrect);
                }
            }, 1000);
        } else {
            // Incorrect Answer Handling
            setIsCorrect(false);
            setIncorrectCount(c => c + 1);

            // Show feedback but DON'T move forward
            setShowResult(true);

            // Allow Retry after short delay
            setTimeout(() => {
                setShowResult(false);
                setIsCorrect(null);
                setSelectedOption(null); // Clear selection to let them try again
            }, 1000);
        }
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
                    padding: '6px 14px',
                    background: 'rgba(var(--accent-rgb), 0.15)',
                    color: 'var(--accent-color)',
                    borderRadius: '99px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    border: '1px solid rgba(var(--accent-rgb), 0.3)',
                    boxShadow: '0 0 15px rgba(var(--accent-rgb), 0.1)'
                }}>
                    QUIZ: {currentQuestion + 1} / {questions.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Correct: <span style={{ color: '#10b981' }}>{correctCount}</span> |
                    Incorrect: <span style={{ color: '#ef4444' }}>{incorrectCount}</span>
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
                            borderColor: selectedOption === idx
                                ? (showResult ? (option.isCorrect ? '#10b981' : '#ef4444') : 'var(--accent-color)')
                                : 'var(--border-color)',
                            background: selectedOption === idx
                                ? (showResult ? (option.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)') : 'rgba(var(--accent-rgb), 0.1)')
                                : 'transparent',
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
                        {showResult && selectedOption === idx && (
                            option.isCorrect ?
                                <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} /> :
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
    const { user, userData, setUserData, loading } = useAuth();
    const { theme } = useTheme();

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary)',
                color: 'var(--accent-color)'
            }}>
                <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid', borderRadius: '50%', borderTopColor: 'transparent' }} />
            </div>
        );
    }
    const content = day === 'day1' ? day1Content : day2Content;

    // Initial State
    const [activeId, setActiveId] = useState(null);
    const [initialized, setInitialized] = useState(false);

    // Sync activeId with progress on load
    useEffect(() => {
        if (userData && content.length > 0) {
            const sections = userData?.progress?.completedSections || [];

            // Find first section that is NOT completed
            const incomplete = content.find(s => !sections.includes(s.id));

            if (!initialized) {
                // Initial load: Set active section to the first incomplete one
                if (incomplete) {
                    setActiveId(incomplete.id);
                } else {
                    setActiveId(content[content.length - 1]?.id);
                }
                setInitialized(true);
            }
        }
    }, [userData, content, initialized]);

    // Fallback if null (prevents crash before effect runs)
    const currentActiveId = activeId || content[0]?.id;

    const [showWow, setShowWow] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [failScore, setFailScore] = useState({ correct: 0, total: 0 });
    const [quizKey, setQuizKey] = useState(0);
    const [showOutcomeModal, setShowOutcomeModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [showDay2AppModal, setShowDay2AppModal] = useState(false);
    const [showDay2FeedbackModal, setShowDay2FeedbackModal] = useState(false);
    const [showFinalFeedbackModal, setShowFinalFeedbackModal] = useState(false);

    // Safe Usage of userData
    const completedSections = useMemo(() => {
        return userData?.progress?.completedSections || [];
    }, [userData]);

    const day1Finished = day1Content.every(s => completedSections.includes(s.id));
    const day2Finished = day2Content.every(s => completedSections.includes(s.id));

    const isLocked = (index) => {
        if (index === 0) return false;
        const prevSectionId = content[index - 1].id;
        return !completedSections.includes(prevSectionId);
    };

    // Scroll to active section on load
    useEffect(() => {
        if (initialized && activeId) {
            const timer = setTimeout(() => {
                const el = document.getElementById(activeId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 600); // Slightly longer delay to ensure DOM update
            return () => clearTimeout(timer);
        }
    }, [initialized, activeId]);

    const handleSectionComplete = async (sectionId, correct, incorrect) => {
        const total = correct + incorrect;
        if (correct < 3) {
            setFailScore({ correct, total });
            setShowFail(true);
            return;
        }

        if (!user) return;

        try {
            const userRef = doc(db, 'users', user.uid);
            const pointsDelta = (correct * 10) - (incorrect * 5);

            // Use setDoc with merge for maximum reliability (ensures object paths exist)
            await setDoc(userRef, {
                progress: {
                    completedSections: arrayUnion(sectionId)
                },
                stats: {
                    totalPoints: increment(pointsDelta),
                    totalCorrect: increment(correct),
                    totalIncorrect: increment(incorrect)
                }
            }, { merge: true });

            console.log("Progress saved successfully for:", sectionId);

            // Visual Feedback
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981']
            });

            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    angle: 60,
                    spread: 80,
                    origin: { x: 0, y: 0.6 }
                });
                confetti({
                    particleCount: 150,
                    angle: 120,
                    spread: 80,
                    origin: { x: 1, y: 0.6 }
                });
            }, 500);

            setShowWow(true);
            setTimeout(() => {
                setShowWow(false);

                // Module 1: Outcome Survey
                if (day === 'day1' && sectionId === 'intro-basics') {
                    const surveyDone = userData?.surveys?.outcome_survey;
                    if (!surveyDone) {
                        setShowOutcomeModal(true);
                    }
                }

                // Module 8 (Conclusion): Day 1 Feedback -> Score Card
                if (day === 'day1' && sectionId === 'conclusion') {
                    const feedbackDone = userData?.surveys?.day1_feedback;
                    if (!feedbackDone) {
                        setShowFeedbackModal(true);
                    } else {
                        setShowScoreModal(true);
                    }
                }

                // Day 2 Module 7: Application Survey
                if (day === 'day2' && sectionId === 'video-tools') {
                    const appSurveyDone = userData?.surveys?.day2_application;
                    if (!appSurveyDone) {
                        setShowDay2AppModal(true);
                    }
                }

                // Day 2 Last Module: Feedback
                if (day === 'day2' && sectionId === 'day2-qa-soft-pitch') {
                    const feedbackDone = userData?.surveys?.day2_feedback;
                    if (!feedbackDone) {
                        setShowDay2FeedbackModal(true);
                    } else {
                        setShowScoreModal(true);
                    }
                }
            }, 3000);

        } catch (err) {
            console.error("Error updating progress:", err);
        }
    };

    // Day Completion Logic
    useEffect(() => {
        if (day === 'day1' && day1Finished) {
            // ...
        } else if (day === 'day2' && day2Finished) {
            if (true) { // Always show for now if logic met
                setTimeout(() => setShowScoreModal(true), 2000);
            }
        }
    }, [day, day1Finished, day2Finished]);

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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 2000,
                            background: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(15px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        >
                            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            rotate: [0, 20, -20, 0],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                                    >
                                        <Star fill="#fbbf24" color="#fbbf24" size={48} />
                                    </motion.div>
                                ))}
                            </div>
                            <h2 style={{
                                fontSize: 'clamp(2.2rem, 11vw, 6rem)',
                                fontWeight: 900,
                                marginBottom: '1.5rem',
                                background: 'linear-gradient(to right, #6366f1, #ec4899, #f59e0b)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.05em',
                                lineHeight: '1.1',
                                textAlign: 'center',
                                width: '100%',
                                padding: '0 0.5rem'
                            }}>
                                BRILLIANT!
                            </h2>
                            <p style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>Section Mastered Successfully</p>
                            <p style={{ fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', color: 'rgba(255,255,255,0.6)' }}>Keep that momentum going!</p>
                        </motion.div>
                    </motion.div>
                )}
                {showFail && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 2000,
                            background: 'rgba(20, 0, 0, 0.9)',
                            backdropFilter: 'blur(15px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <h2 style={{
                                fontSize: window.innerWidth < 768 ? '3rem' : '5rem',
                                fontWeight: 900,
                                marginBottom: '1rem',
                                color: '#ef4444',
                                letterSpacing: '-0.05em'
                            }}>
                                DISAPPOINTING!
                            </h2>
                            <p style={{ fontSize: window.innerWidth < 768 ? '1.5rem' : '2rem', color: '#fff', fontWeight: 600, marginBottom: '2rem' }}>
                                Score: {failScore.correct} / {failScore.total}
                            </p>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '3rem', lineHeight: '1.6' }}>
                                You need at least 3 correct answers to proceed. Focus on the core concepts and try again!
                            </p>
                            <button
                                onClick={() => {
                                    setShowFail(false);
                                    setQuizKey(prev => prev + 1);
                                }}
                                style={{
                                    background: '#ef4444',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '1.2rem 3rem',
                                    borderRadius: '16px',
                                    fontWeight: 800,
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Try Again
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <header style={{
                height: '70px',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '0.9', fontWeight: 900, fontSize: '0.95rem', letterSpacing: '-0.03em' }}>
                            <span>Lets</span>
                            <span>Upgrade</span>
                        </div>
                    </div>
                    <span style={{ fontWeight: 500, color: 'var(--text-secondary)', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                        / {day === 'day1' ? 'Day 1' : 'Day 2'}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    <button
                        onClick={() => navigate('/profile')}
                        style={{
                            background: 'none', border: '1px solid var(--border-color)',
                            borderRadius: '50%', width: '40px', height: '40px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--text-primary)'
                        }}
                    >
                        <User size={20} />
                    </button>
                </div>
            </header>

            <div style={{ display: 'flex', flexDirection: window.innerWidth < 1024 ? 'column' : 'row', maxWidth: '1400px', margin: '0 auto' }}>
                <Sidebar topics={content} activeId={activeId} completedSections={completedSections} />

                <main style={{ flex: 1, padding: window.innerWidth < 768 ? '2rem 1rem' : '4rem 6rem', maxWidth: window.innerWidth < 1024 ? '100%' : '800px' }}>
                    {content.map((section, index) => {
                        const locked = isLocked(index);
                        const isDone = completedSections.includes(section.id);

                        return (
                            <section
                                key={section.id}
                                id={section.id}
                                style={{
                                    marginBottom: '8rem',
                                    position: 'relative'
                                }}
                            >
                                {locked && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '200px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        zIndex: 10,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        background: 'rgba(0,0,0,0.7)',
                                        padding: '2rem 3rem',
                                        borderRadius: '24px',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                    }}>
                                        <div style={{
                                            background: 'rgba(255,255,255,0.1)',
                                            padding: '1rem',
                                            borderRadius: '50%',
                                            marginBottom: '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Lock size={32} color="white" />
                                        </div>
                                        <span style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Module Locked</span>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Complete the previous module to unlock</span>
                                    </div>
                                )}
                                {/* Content Wrapper - Blur is applied ONLY here */}
                                <div style={{
                                    opacity: locked ? 0.4 : 1,
                                    filter: locked ? 'grayscale(1) blur(12px)' : 'none',
                                    pointerEvents: locked ? 'none' : 'auto',
                                    transition: 'all 0.5s ease'
                                }}>
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
                                                key={quizKey}
                                                sectionId={section.id}
                                                onComplete={(correct, incorrect) => handleSectionComplete(section.id, correct, incorrect)}
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
                                                {index < content.length - 1 && (
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
                                                        Go to Next Module <ArrowRight size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {index === content.length - 1 && day1Finished && day === 'day1' && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                style={{
                                                    marginTop: '6rem',
                                                    padding: '4rem',
                                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                                                    borderRadius: '32px',
                                                    border: '1px solid var(--accent-color)',
                                                    textAlign: 'center',
                                                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.1)'
                                                }}
                                            >
                                                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Day 1 Completed! 🎉</h3>
                                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                                                    You've mastered the fundamentals. Day 2 with advanced AI agents and RAG awaits you.
                                                </p>
                                                <button
                                                    onClick={() => navigate('/curriculum')}
                                                    style={{
                                                        background: 'var(--accent-color)',
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '1.2rem 2.5rem',
                                                        borderRadius: '16px',
                                                        fontWeight: 700,
                                                        fontSize: '1.2rem',
                                                        cursor: 'pointer',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        boxShadow: '0 10px 20px rgba(99, 102, 241, 0.4)',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    Proceed to Day 2 <ArrowRight size={24} />
                                                </button>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </div>


                            </section>
                        );
                    })}

                    <footer style={{
                        marginTop: '8rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        paddingBottom: '2rem'
                    }}>
                        <style>
                            {`
                                @keyframes pulse-glow {
                                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(244, 139, 54, 0.4); }
                                    70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(244, 139, 54, 0); }
                                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(244, 139, 54, 0); }
                                }
                            `}
                        </style>

                        <button
                            onClick={() => {
                                setShowScoreModal(true);
                            }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                margin: '0 auto',
                                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                boxShadow: '0 8px 20px rgba(255, 107, 0, 0.3)',
                                transition: 'all 0.3s ease',
                                animation: 'pulse-glow 2s infinite'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.animation = 'none'; // Pause pulse on hover
                                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 12px 25px rgba(255, 107, 0, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.animation = 'pulse-glow 2s infinite';
                                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 107, 0, 0.3)';
                            }}
                        >
                            <Star size={20} fill="currentColor" /> Check Your Score
                        </button>

                        <div style={{ opacity: 0.7 }}>&copy; 2025 Gen AI Workshop. Built with Precision.</div>
                    </footer>
                </main>

                <WorkplaceUsageCard
                    day={day}
                    style={{
                        order: window.innerWidth < 1024 ? -1 : 0,
                        marginBottom: window.innerWidth < 1024 ? '2rem' : '0'
                    }}
                />

                {/* Outcome Survey Modal */}
                <OutcomeSurveyModal
                    isOpen={showOutcomeModal}
                    onClose={() => setShowOutcomeModal(false)}
                    onComplete={() => {
                        localStorage.setItem('outcome_survey_v2_done', 'true');
                        setShowOutcomeModal(false);
                    }}
                />

                {/* Score Card Modal */}
                <ScoreCardModal
                    isOpen={showScoreModal}
                    onClose={() => {
                        localStorage.setItem(day === 'day1' ? 'day1_score_shown' : 'day2_score_shown', 'true');
                        setShowScoreModal(false);

                        // If Day 2, navigate to landing page (Curriculum)
                        if (day === 'day2') {
                            navigate('/curriculum');
                        }

                        // If Day 1, check if feedback is done, if so, redirect
                        if (day === 'day1') {
                            if (localStorage.getItem('day1_feedback_v2_done')) { // Check v2 key
                                navigate('/curriculum');
                            }
                            // If not done... handled by flow
                        }
                    }}
                    onCertificate={() => {
                        localStorage.setItem('day2_score_shown', 'true');
                        setShowScoreModal(false);
                        // Trigger Final Feedback before Certificate
                        setShowFinalFeedbackModal(true);
                    }}
                    day={day}
                    stats={{
                        correct: userData?.stats?.totalCorrect || 0,
                        incorrect: userData?.stats?.totalIncorrect || 0
                    }}
                />

                {/* Day 1 Feedback Modal */}
                <Day1FeedbackModal
                    isOpen={showFeedbackModal}
                    onClose={() => setShowFeedbackModal(false)}
                    onComplete={() => {
                        localStorage.setItem('day1_feedback_v2_done', 'true');
                        setShowFeedbackModal(false);
                        // Open Score Card after Feedback
                        setShowScoreModal(true);
                    }}
                />
                <Day2ApplicationModal
                    isOpen={showDay2AppModal}
                    onClose={() => setShowDay2AppModal(false)}
                    onComplete={() => {
                        localStorage.setItem('day2_video_survey_done', 'true');
                        setShowDay2AppModal(false);
                    }}
                />

                {/* Day 2 Final Feedback Modal */}
                <Day2FeedbackModal
                    isOpen={showDay2FeedbackModal}
                    onClose={() => setShowDay2FeedbackModal(false)}
                    onComplete={() => {
                        localStorage.setItem('day2_feedback_v2_done', 'true');
                        setShowDay2FeedbackModal(false);
                        setShowScoreModal(true); // Open Score Card after feedback
                    }}
                />

                {/* Final Feedback Modal (Before Certificate) */}
                <FinalFeedbackModal
                    isOpen={showFinalFeedbackModal}
                    onClose={() => setShowFinalFeedbackModal(false)}
                    onComplete={() => {
                        setShowFinalFeedbackModal(false);
                        navigate('/certificate');
                    }}
                />
            </div>
        </div>
    );
}
