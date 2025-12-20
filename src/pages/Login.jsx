import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login, signup, loginWithGoogle } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            minHeight: '100vh',
            width: '100vw',
            background: '#030303',
            color: '#fff',
            overflow: 'hidden',
            fontFamily: '"Inter", sans-serif',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* --- Premium Background Effects --- */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0.03,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                zIndex: 1,
                pointerEvents: 'none'
            }} />

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

            {/* --- Login Card --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    zIndex: 10,
                    padding: '2rem'
                }}
            >
                <div style={{
                    background: 'rgba(20, 20, 20, 0.6)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '3rem 2.5rem',
                    boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255,255,255,0.02)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            style={{
                                display: 'inline-flex',
                                padding: '16px',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(255,255,255,0.08)'
                            }}
                        >
                            <img src="/logo-dark.png" alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                        </motion.div>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(to bottom, #fff 40%, #a1a1aa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
                            {isLogin ? 'Access the intelligent workspace.' : 'Join the next generation of AI learning.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
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
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
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
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'center', background: 'rgba(248,113,113,0.1)', padding: '8px', borderRadius: '8px' }}
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
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
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '1rem'
                            }}
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                            {!loading && <ArrowRight size={18} />}
                        </motion.button>
                    </form>

                    <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.1)' }} />
                        <span style={{ fontSize: '0.8rem', color: '#71717a' }}>OR</span>
                        <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.1)' }} />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGoogleLogin}
                        type="button"
                        style={{
                            width: '100%',
                            padding: '14px',
                            borderRadius: '14px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'transparent',
                            color: '#fff',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                        Continue with Google
                    </motion.button>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            style={{ background: 'none', border: 'none', color: '#a1a1aa', fontSize: '0.9rem', cursor: 'pointer' }}
                        >
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
