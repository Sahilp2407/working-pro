import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SelectionPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem'
        }}>
            {/* Background Ambience */}
            <div style={{
                position: 'absolute', top: '-20%', right: '-10%',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(255, 170, 2, 0.1) 0%, transparent 70%)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute', bottom: '-10%', left: '-10%',
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    zIndex: 20
                }}
            >
                <ArrowLeft size={20} /> Back to Home
            </button>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ zIndex: 10, textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 900,
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Choose Your Path
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                    Select how you want to start your AI journey
                </p>
            </motion.div>

            <div style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                zIndex: 10,
                perspective: '1000px'
            }}>
                {/* Free Program Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{
                        scale: 1.03,
                        rotateY: 5,
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
                    }}
                    onClick={() => navigate(user ? '/curriculum' : '/login?redirect=/curriculum')}
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '24px',
                        padding: '3rem 2rem',
                        width: '320px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '400px'
                    }}
                >
                    <div>
                        <div style={{
                            background: 'var(--bg-tertiary)',
                            width: '60px', height: '60px',
                            borderRadius: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '2rem'
                        }}>
                            <Sparkles size={32} color="var(--text-primary)" />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Free AI<br />Program</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Get started with the fundamentals. Perfect for exploring AI capabilities with zero cost.
                        </p>
                    </div>
                    <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Start for Free <ArrowRight size={20} />
                    </div>
                </motion.div>

                {/* Pro Program Card */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{
                        scale: 1.03,
                        rotateY: -5,
                        boxShadow: '0 30px 60px -15px rgba(255, 170, 2, 0.3)'
                    }}
                    onClick={() => window.location.href = 'https://luc.to/wpworkshoplink'}
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid #FFAA02',
                        borderRadius: '24px',
                        padding: '3rem 2rem',
                        width: '320px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '400px'
                    }}
                >
                    {/* Badge Removed */}

                    <div>
                        <div style={{
                            background: 'rgba(255, 170, 2, 0.2)',
                            width: '60px', height: '60px',
                            borderRadius: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '2rem'
                        }}>
                            <Zap size={32} color="#FFAA02" />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFAA02' }}>Serious<br />Professionals</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Deep dive into outcome-driven tracks. Designed for rapid career growth and mastery.
                        </p>
                    </div>
                    <div style={{
                        marginTop: '2rem',
                        background: '#FFAA02',
                        color: 'black',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontWeight: 700,
                        textAlign: 'center',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                    }}>
                        Join Pro <ArrowRight size={20} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
