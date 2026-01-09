import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScoreCardModal({ isOpen, onClose, day, stats, onCertificate }) {

    // Trigger confetti on open if score is good
    React.useEffect(() => {
        if (isOpen) {
            const total = stats.correct + stats.incorrect || 1;
            const percentage = Math.round((stats.correct / total) * 100);
            if (percentage >= 70) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    }, [isOpen, stats]);

    if (!isOpen) return null;

    const totalQuestions = stats.correct + stats.incorrect;
    const percentage = totalQuestions > 0 ? Math.round((stats.correct / totalQuestions) * 100) : 0;

    let grade = 'B';
    let color = '#f59e0b';
    let message = 'Good Job!';

    if (percentage >= 90) { grade = 'S'; color = '#8b5cf6'; message = 'Outstanding!'; }
    else if (percentage >= 80) { grade = 'A'; color = '#10b981'; message = 'Excellent!'; }
    else if (percentage >= 60) { grade = 'B'; color = '#f59e0b'; message = 'Well Done!'; }
    else { grade = 'C'; color = '#ef4444'; message = 'Keep Practicing'; }

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
                    background: 'rgba(5, 5, 5, 0.9)',
                    backdropFilter: 'blur(16px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}
            >
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '420px',
                    background: '#121212',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)'
                }}>
                    {/* Background Glow */}
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '300px',
                        height: '300px',
                        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                        opacity: 0.2,
                        filter: 'blur(60px)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ padding: '3rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>

                        {/* Trophy Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 12 }}
                            style={{
                                width: '80px',
                                height: '80px',
                                background: `rgba(255,255,255,0.05)`,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                border: `1px solid ${color}40`,
                                boxShadow: `0 0 30px ${color}30`
                            }}
                        >
                            <Trophy size={40} color={color} />
                        </motion.div>

                        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'white' }}>
                            {day === 'day1' ? 'Day 1 Complete!' : 'Day 2 Complete!'}
                        </h2>
                        <p style={{ color: color, fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
                            {message}
                        </p>

                        {/* Single Score Stat (Correct Only) */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '2.5rem'
                        }}>
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '1.5rem 3rem',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                minWidth: '200px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: '#a1a1aa',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem',
                                    fontWeight: 500
                                }}>
                                    <CheckCircle size={18} color="#10b981" /> Correct Answers
                                </div>
                                <div style={{
                                    fontSize: '3.5rem',
                                    fontWeight: 800,
                                    color: 'white',
                                    lineHeight: 1,
                                    textShadow: '0 0 20px rgba(255,255,255,0.2)'
                                }}>
                                    {stats.correct}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                if (day === 'day2' && onCertificate) {
                                    onCertificate();
                                } else {
                                    onClose();
                                }
                            }}
                            style={{
                                background: day === 'day2' ? 'linear-gradient(135deg, #FFD700 0%, #FDB931 100%)' : 'white',
                                color: 'black',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '16px',
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'transform 0.2s',
                                boxShadow: day === 'day2' ? '0 10px 20px rgba(253, 185, 49, 0.3)' : '0 10px 20px rgba(255,255,255,0.1)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {day === 'day2' ? 'Get Your Certificate' : 'Proceed to Day 2'} <ArrowRight size={20} />
                        </button>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
