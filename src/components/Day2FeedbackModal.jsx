import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Check, X, ArrowRight, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Day2FeedbackModal({ isOpen, onClose, onComplete }) {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleNext = () => {
        if (step === 1 && rating > 0) {
            setStep(2);
        }
    };

    const handleSubmit = () => {
        if (!feedback.trim()) return;
        setSubmitting(true);

        const feedbackData = { rating, feedback };
        if (user) {
            setDoc(doc(db, 'users', user.uid), {
                surveys: {
                    day2_feedback: feedbackData
                }
            }, { merge: true }).catch(e => console.error("Error saving day 2 feedback:", e));
        }

        setTimeout(() => {
            setSubmitting(false);
            onComplete();
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: 'rgba(5, 5, 5, 0.85)',
                    backdropFilter: 'blur(16px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}
            >
                <div style={{
                    position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1
                }}>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '600px', height: '600px',
                        background: 'radial-gradient(circle, rgba(244, 139, 54, 0.1) 0%, transparent 70%)',
                        filter: 'blur(80px)'
                    }} />
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                    style={{
                        background: 'linear-gradient(180deg, rgba(30, 30, 30, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '28px',
                        width: '100%',
                        maxWidth: '500px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
                        position: 'relative'
                    }}
                >
                    {/* Top Neon Line */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                        background: 'linear-gradient(90deg, transparent, #F48B36, transparent)',
                        opacity: 0.8
                    }} />

                    {/* Header */}
                    <div style={{
                        padding: '2rem 2.5rem 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #fff, #bbb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Day 2 Feedback
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginTop: '4px' }}>Step {step} of 2</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', margin: '1.5rem 2.5rem 0', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div
                            animate={{ width: `${(step / 2) * 100}%` }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #F48B36, #FFB74D)', borderRadius: '4px', boxShadow: '0 0 10px rgba(244, 139, 54, 0.5)' }}
                        />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '2rem 2.5rem 2.5rem' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {step === 1 && (
                                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>
                                            Rate Day 2 Content
                                        </h3>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '1rem' }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                    style={{
                                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                                        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                    }}
                                                >
                                                    <Star
                                                        size={42}
                                                        fill={rating >= star ? "#F59E0B" : "transparent"}
                                                        color={rating >= star ? "#F59E0B" : "rgba(255,255,255,0.2)"}
                                                        strokeWidth={1.5}
                                                        style={{ filter: rating >= star ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))' : 'none' }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px', margin: '0 auto', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', fontWeight: 500 }}>
                                            <span>Needs Work</span>
                                            <span>Excellent</span>
                                        </div>

                                        <button
                                            onClick={handleNext}
                                            disabled={rating === 0}
                                            style={{
                                                marginTop: '2.5rem',
                                                width: '100%',
                                                padding: '1.2rem',
                                                background: rating > 0 ? 'linear-gradient(135deg, #F48B36 0%, #FFB74D 100%)' : 'rgba(255,255,255,0.05)',
                                                color: rating > 0 ? 'white' : 'rgba(255,255,255,0.2)',
                                                border: 'none',
                                                borderRadius: '16px',
                                                fontSize: '1.1rem',
                                                fontWeight: 700,
                                                cursor: rating > 0 ? 'pointer' : 'not-allowed',
                                                transition: 'all 0.3s',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                boxShadow: rating > 0 ? '0 10px 30px rgba(244, 139, 54, 0.25)' : 'none'
                                            }}
                                        >
                                            Next Step <ArrowRight size={20} />
                                        </button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                                            What should we <span style={{ color: '#F48B36' }}>improve</span> for the next cohort?
                                        </h3>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Your honest feedback (optional)..."
                                            autoFocus
                                            rows={6}
                                            style={{
                                                width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
                                                color: 'white', fontSize: '1rem', outline: 'none', resize: 'none',
                                                fontFamily: 'inherit', transition: 'all 0.2s',
                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                                            }}
                                            onFocus={(e) => { e.target.style.borderColor = '#F48B36'; e.target.style.background = 'rgba(244, 139, 54, 0.05)'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                                        />

                                        <button
                                            onClick={handleSubmit}
                                            disabled={!feedback.trim() || submitting}
                                            style={{
                                                marginTop: '2rem',
                                                width: '100%',
                                                padding: '1.2rem',
                                                borderRadius: '16px',
                                                background: feedback.trim() ? 'linear-gradient(135deg, #F48B36 0%, #FFB74D 100%)' : 'rgba(255,255,255,0.05)',
                                                color: feedback.trim() ? 'white' : 'rgba(255,255,255,0.2)',
                                                border: 'none',
                                                cursor: feedback.trim() ? 'pointer' : 'not-allowed',
                                                fontWeight: 700,
                                                fontSize: '1.1rem',
                                                transition: 'all 0.3s',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                boxShadow: feedback.trim() ? '0 10px 30px rgba(244, 139, 54, 0.25)' : 'none'
                                            }}
                                        >
                                            {submitting ? 'Saving...' : <>Submit Feedback <Check size={20} /></>}
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
