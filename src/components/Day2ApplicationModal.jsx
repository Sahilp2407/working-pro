import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Day2ApplicationModal({ isOpen, onClose, onComplete }) {
    const { user } = useAuth();
    const [answer, setAnswer] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = () => {
        if (!answer.trim()) return;
        setSubmitting(true);

        if (user) {
            setDoc(doc(db, 'users', user.uid), {
                surveys: {
                    day2_application: answer
                }
            }, { merge: true }).catch(e => console.error("Error saving day 2 application:", e));
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
                    background: 'rgba(5, 5, 5, 0.8)',
                    backdropFilter: 'blur(16px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}
            >
                {/* Background Glow */}
                <div style={{
                    position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1
                }}>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '600px', height: '600px',
                        background: 'radial-gradient(circle, rgba(255, 87, 34, 0.1) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        opacity: 0.6
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
                        maxWidth: '520px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
                        position: 'relative'
                    }}
                >
                    {/* Top Neon Border */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                        background: 'linear-gradient(90deg, transparent, #FF5722, transparent)',
                        opacity: 0.8
                    }} />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute', top: '16px', right: '16px',
                            background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%',
                            width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.4)',
                            transition: 'all 0.2s', zIndex: 10
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                    >
                        <X size={16} />
                    </button>

                    {/* Header */}
                    <div style={{
                        padding: '2rem 2.5rem 0',
                        display: 'flex', alignItems: 'center', gap: '12px'
                    }}>
                        <div style={{
                            padding: '10px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '12px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Sparkles size={20} color="#FF5722" />
                        </div>
                        <h2 style={{
                            fontSize: '1.25rem', fontWeight: 700,
                            background: 'linear-gradient(to right, #fff, #bbb)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            margin: 0
                        }}>
                            Quick Reflection
                        </h2>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem 2.5rem 2.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                            What is <span style={{ color: '#FF5722', fontWeight: 700 }}>one thing</span> you’ll apply at work immediately from Day 2?
                        </h3>

                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="I will use RAG to..."
                            rows={5}
                            autoFocus
                            style={{
                                width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
                                color: 'white', fontSize: '1rem', outline: 'none', resize: 'none',
                                fontFamily: 'inherit', transition: 'all 0.2s',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#FF5722'; e.target.style.background = 'rgba(255, 87, 34, 0.05)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={!answer.trim() || submitting}
                            style={{
                                marginTop: '2rem',
                                width: '100%',
                                padding: '1.2rem',
                                background: answer.trim() ? 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)' : 'rgba(255,255,255,0.05)',
                                color: answer.trim() ? 'white' : 'rgba(255,255,255,0.2)',
                                border: 'none',
                                borderRadius: '16px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                cursor: answer.trim() ? 'pointer' : 'not-allowed',
                                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                boxShadow: answer.trim() ? '0 10px 30px rgba(255, 107, 0, 0.25)' : 'none',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}
                            onMouseOver={(e) => {
                                if (e.currentTarget.disabled) return;
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 107, 0, 0.35)';
                            }}
                            onMouseOut={(e) => {
                                if (e.currentTarget.disabled) return;
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 0, 0.25)';
                            }}
                        >
                            {submitting ? (
                                <>
                                    <div className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} />
                                    Saving...
                                </>
                            ) : (
                                <>Save Reflection <Zap size={18} fill="currentColor" /></>
                            )}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
