
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, LogOut, Terminal, Zap, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import LogoTicker from '../components/LogoTicker';
import { useTheme } from '../context/ThemeContext';
import { day1Content } from '../data/content.jsx';

export default function Dashboard() {
    const navigate = useNavigate();
    const { logout, userData } = useAuth();
    const { theme } = useTheme();

    const handleLogout = () => {
        logout();
    };

    const completedSections = userData?.progress?.completedSections || [];
    const day1Finished = day1Content.every(s => completedSections.includes(s.id));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflow: 'hidden' }}>
            {/* Background Decorative Elements */}
            <div style={{
                position: 'fixed',
                top: '-10%',
                right: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'fixed',
                bottom: '-10%',
                left: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
                filter: 'blur(100px)',
                pointerEvents: 'none'
            }} />

            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem 4rem',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '0.9', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.04em' }}>
                        <span>Lets</span>
                        <span>Upgrade</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    {userData?.role === 'admin' && (
                        <button
                            onClick={() => navigate('/admin')}
                            style={{
                                background: 'rgba(99, 102, 241, 0.1)',
                                color: 'var(--accent-color)',
                                border: '1px solid rgba(99, 102, 241, 0.2)',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s'
                            }}
                        >
                            <Terminal size={18} /> Admin
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/profile')}
                        style={{
                            background: 'none',
                            border: '1px solid var(--border-color)',
                            borderRadius: '50%',
                            width: '44px',
                            height: '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--text-primary)',
                            transition: 'all 0.3s'
                        }}
                    >
                        <User size={22} />
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-color)',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s'
                        }}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '4rem 2rem',
                    position: 'relative',
                    zIndex: 10
                }}
            >
                <motion.div variants={itemVariants} style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '4.5rem',
                        fontWeight: 900,
                        marginBottom: '1rem',
                        background: 'linear-gradient(to bottom, var(--text-primary) 40%, var(--text-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block',
                        letterSpacing: '-0.04em'
                    }}>
                        Your Journey Begins
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        Transform your understanding of Generative AI through our immersive, hands-on workshop modules.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                    gap: '2.5rem'
                }}>
                    <motion.div variants={itemVariants}>
                        <WorkshopCard
                            number="01"
                            title="Generative AI Fundamentals"
                            description="Master the core concepts of LLMs, transformers, and prompt engineering."
                            icon={<BookOpen size={28} />}
                            color="#6366f1"
                            onClick={() => navigate('/day1')}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <WorkshopCard
                            number="02"
                            title="Advanced Applications"
                            description="Deep dive into RAG, agents, and multi-modal AI systems."
                            icon={<Zap size={28} />}
                            color="#ec4899"
                            onClick={() => navigate('/day2')}
                            locked={!day1Finished}
                        />
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    style={{
                        marginTop: '6rem',
                        padding: '4rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '40px',
                        border: '1px solid var(--border-color)',
                        textAlign: 'center',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
                    }}
                >
                    <div style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderRadius: '20px',
                        marginBottom: '1.5rem',
                        color: 'var(--accent-color)'
                    }}>
                        <Cpu size={32} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>AI Ecosystem Map</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                        Explore the industry-leading tools and platforms powering the current AI revolution.
                    </p>
                    <LogoTicker />
                </motion.div>
            </motion.main>
        </div>
    );
}

function WorkshopCard({ number, title, description, icon, color, onClick, locked }) {
    return (
        <motion.div
            initial="rest"
            whileHover={!locked ? "hover" : "rest"}
            animate="rest"
            variants={{
                rest: { y: 0, scale: 1, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
                hover: { y: -12, scale: 1.02, boxShadow: `0 30px 60px -15px ${color}30` }
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={!locked ? onClick : undefined}
            style={{
                background: 'var(--bg-secondary)',
                borderRadius: '32px',
                padding: '3rem',
                border: '1px solid var(--border-color)',
                cursor: locked ? 'not-allowed' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                opacity: locked ? 0.7 : 1,
                transition: 'opacity 0.3s ease'
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '1.5rem',
                fontSize: '5rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                opacity: 0.05,
                lineHeight: 1
            }}>
                {number}
            </div>

            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: `${color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                marginBottom: '2.5rem',
                border: `1px solid ${color}20`
            }}>
                {icon}
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1, marginBottom: '2.5rem', fontSize: '1.05rem' }}>{description}</p>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontWeight: 700,
                color: locked ? 'var(--text-secondary)' : 'var(--text-primary)',
                fontSize: '1.1rem'
            }}>
                {locked ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>Locked</span> <LockIcon size={20} />
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>Start Module</span> <ArrowRight size={20} />
                    </div>
                )}
            </div>

            {!locked && (
                <motion.div
                    variants={{
                        rest: { scaleX: 0 },
                        hover: { scaleX: 1 }
                    }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '6px',
                        width: '100%',
                        background: color,
                        transformOrigin: 'left'
                    }}
                />
            )}
        </motion.div>
    );
}

function LockIcon({ size }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    );
}
