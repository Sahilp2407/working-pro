import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate network delay for premium feel
        setTimeout(() => {
            if (password === 'Iamsmart') {
                login();
            } else {
                setError('Incorrect password. Hint: You are smart.');
                setLoading(false);
            }
        }, 1200);
    };

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            minHeight: '100vh',
            width: '100vw',
            background: '#030303', // Extremely dark background
            color: '#fff',
            overflow: 'hidden',
            fontFamily: '"Inter", sans-serif',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* --- Premium Background Effects --- */}

            {/* 1. Subtle noise texture overlay */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0.03,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                zIndex: 1,
                pointerEvents: 'none'
            }} />

            {/* 2. Animated Aurora Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                    opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '20%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(120, 119, 198, 0.15) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0
                }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -50, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    right: '10%',
                    width: '700px',
                    height: '700px',
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(100px)',
                    zIndex: 0
                }}
            />

            {/* --- Login Card --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Elegant ease
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    zIndex: 10,
                    padding: '2rem'
                }}
            >
                <div style={{
                    background: 'rgba(20, 20, 20, 0.6)', // Dark glass
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '3rem 2.5rem',
                    boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255,255,255,0.02)'
                }}>
                    {/* Header Section */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            style={{
                                display: 'inline-flex',
                                padding: '16px',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                                marginBottom: '2rem',
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.3)'
                            }}
                        >
                            <Sparkles size={28} color="#fff" strokeWidth={1.5} />
                        </motion.div>
                        <h2 style={{
                            fontSize: '2.25rem',
                            fontWeight: 600,
                            marginBottom: '0.75rem',
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(to bottom, #fff 40%, #a1a1aa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Welcome Back
                        </h2>
                        <p style={{ color: '#a1a1aa', fontSize: '1rem', lineHeight: '1.5' }}>
                            Access the intelligent workspace.
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {/* Email Input */}
                        <div style={{ position: 'relative', group: 'input-group' }}>
                            <Mail
                                size={18}
                                style={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#71717a',
                                    transition: 'color 0.2s'
                                }}
                            />
                            <input
                                type="email"
                                required
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 50px',
                                    borderRadius: '14px',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: '#fff',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                    e.target.style.background = 'rgba(0,0,0,0.4)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                    e.target.style.background = 'rgba(0,0,0,0.2)';
                                }}
                            />
                        </div>

                        {/* Password Input */}
                        <div style={{ position: 'relative' }}>
                            <Lock
                                size={18}
                                style={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#71717a'
                                }}
                            />
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 50px',
                                    borderRadius: '14px',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: '#fff',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                    e.target.style.background = 'rgba(0,0,0,0.4)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                    e.target.style.background = 'rgba(0,0,0,0.2)';
                                }}
                            />
                        </div>

                        {/* Error Message Animation */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    style={{
                                        color: '#f87171',
                                        fontSize: '0.85rem',
                                        textAlign: 'center',
                                        background: 'rgba(248,113,113,0.1)',
                                        borderRadius: '8px',
                                        padding: '8px',
                                        border: '1px solid rgba(248,113,113,0.2)'
                                    }}
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Primary Button */}
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '14px',
                                border: 'none',
                                background: '#fff',
                                color: '#000',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                cursor: loading ? 'wait' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '1.5rem',
                                transition: 'all 0.2s',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Accessing...
                                </span>
                            ) : (
                                <>
                                    Enter Workshop <ArrowRight size={18} strokeWidth={2.5} />
                                </>
                            )}
                        </motion.button>

                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
                                Protected Experience &copy; 2025
                            </span>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
