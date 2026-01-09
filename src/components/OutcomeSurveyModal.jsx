import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const OUTCOMES = [
    "Promotion",
    "Role switch",
    "Productivity boost",
    "Team automation",
    "Other"
];

export default function OutcomeSurveyModal({ isOpen, onClose, onComplete }) {
    const { user } = useAuth();
    const [selectedOutcome, setSelectedOutcome] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSelect = (outcome) => {
        setSelectedOutcome(outcome);
    };

    const handleSubmit = () => {
        if (!selectedOutcome) return;
        setSubmitting(true);

        if (user) {
            setDoc(doc(db, 'users', user.uid), {
                surveys: {
                    day1_outcome: selectedOutcome
                }
            }, { merge: true }).catch(e => console.error("Error saving outcome:", e));
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
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    zIndex: -1
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(255, 87, 34, 0.08) 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }} />
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 40, rotateX: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 40 }}
                    transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                    style={{
                        background: 'linear-gradient(180deg, rgba(30, 30, 30, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '28px',
                        width: '100%',
                        maxWidth: '500px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
                        fontFamily: "'Inter', sans-serif",
                        position: 'relative'
                    }}
                >
                    {/* Top Gradient Border Line */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                        background: 'linear-gradient(90deg, transparent, #FF5722, transparent)',
                        opacity: 0.6
                    }} />

                    {/* Header */}
                    <div style={{
                        padding: '2rem 2.5rem 1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                marginBottom: '0.2rem',
                                background: 'linear-gradient(to right, #fff, #aaa)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.03em'
                            }}>
                                KYC
                            </h2>
                            <p style={{ color: '#FF5722', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Know Your Customer</p>
                        </div>

                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                color: '#a1a1aa',
                                cursor: 'pointer',
                                width: '36px', height: '36px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#a1a1aa'; }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '0 2.5rem 2.5rem' }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: 500,
                            color: 'rgba(255,255,255,0.9)',
                            marginBottom: '1.5rem',
                            lineHeight: 1.4
                        }}>
                            What defines success for you in this course?
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {OUTCOMES.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    style={{
                                        position: 'relative',
                                        padding: '1.2rem 1.5rem',
                                        borderRadius: '18px',
                                        background: selectedOutcome === option
                                            ? 'linear-gradient(90deg, rgba(255, 87, 34, 0.15), rgba(255, 87, 34, 0.05))'
                                            : 'rgba(255, 255, 255, 0.02)',
                                        border: selectedOutcome === option
                                            ? '1px solid #FF5722'
                                            : '1px solid rgba(255, 255, 255, 0.06)',
                                        color: selectedOutcome === option ? 'white' : 'rgba(255, 255, 255, 0.6)',
                                        textAlign: 'left',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        fontWeight: selectedOutcome === option ? 600 : 400,
                                        overflow: 'hidden'
                                    }}
                                    onMouseOver={(e) => {
                                        if (selectedOutcome !== option) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (selectedOutcome !== option) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                                        }
                                    }}
                                >
                                    <span style={{ zIndex: 2 }}>{option}</span>
                                    {selectedOutcome === option && (
                                        <div style={{
                                            position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
                                            background: '#FF5722',
                                            boxShadow: '0 0 10px #FF5722'
                                        }} />
                                    )}
                                    {selectedOutcome === option && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            style={{ zIndex: 2 }}
                                        >
                                            <div style={{
                                                background: '#FF5722',
                                                borderRadius: '50%',
                                                padding: '4px',
                                                display: 'flex'
                                            }}>
                                                <Check size={14} color="white" strokeWidth={4} />
                                            </div>
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!selectedOutcome || submitting}
                            style={{
                                marginTop: '2.5rem',
                                width: '100%',
                                padding: '1.2rem',
                                borderRadius: '18px',
                                background: selectedOutcome
                                    ? 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)'
                                    : 'rgba(255,255,255,0.05)',
                                color: selectedOutcome ? 'white' : 'rgba(255,255,255,0.2)',
                                border: 'none',
                                cursor: selectedOutcome ? 'pointer' : 'not-allowed',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                boxShadow: selectedOutcome ? '0 10px 30px rgba(255, 107, 0, 0.25)' : 'none',
                                opacity: submitting ? 0.8 : 1,
                                letterSpacing: '0.01em',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseOver={(e) => {
                                if (selectedOutcome) {
                                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 107, 0, 0.35)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (selectedOutcome) {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 0, 0.25)';
                                }
                            }}
                        >
                            {submitting ? 'Saving Preference...' : 'Confirm & Continue'}
                        </button>
                    </div>
                </motion.div>
            </motion.div >
        </AnimatePresence >
    );
}
