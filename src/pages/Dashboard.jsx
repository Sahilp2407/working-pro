import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, LogOut, Terminal, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import LogoTicker from '../components/LogoTicker';
import { useTheme } from '../context/ThemeContext';

export default function Dashboard() {
    const navigate = useNavigate();
    const { logout, userData } = useAuth();
    const { theme } = useTheme();

    const handleLogout = () => {
        logout();
    };

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
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Gradients */}
            <div style={{
                position: 'fixed',
                top: '-20%',
                right: '-10%',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(120, 119, 198, 0.15) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(100px)',
                zIndex: 0
            }} />
            <div style={{
                position: 'fixed',
                bottom: '-20%',
                left: '-10%',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(100px)',
                zIndex: 0
            }} />

            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem 4rem',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                    <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                    LETSUPGRADE GEN AI
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    {userData?.role === 'admin' && (
                        <button
                            onClick={() => navigate('/admin')}
                            style={{
                                background: 'var(--accent-color)',
                                color: '#fff',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Terminal size={16} /> Admin
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border-color)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--text-primary)';
                            e.currentTarget.style.borderColor = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                        }}
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </nav>

            <motion.div
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
                        fontSize: '4rem',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        background: 'linear-gradient(to bottom, var(--text-primary) 0%, var(--text-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                    }}>
                        Your Journey Begins
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Transform your understanding of Generative AI through our immersive, hands-on workshop modules.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    <motion.div variants={itemVariants}>
                        <WorkshopCard
                            number="01"
                            title="Generative AI Fundamentals"
                            description="Master the core concepts of LLMs, transformers, and prompt engineering."
                            icon={<BookOpen size={24} />}
                            color="#3b82f6"
                            onClick={() => navigate('/day1')}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <WorkshopCard
                            number="02"
                            title="Advanced Applications"
                            description="Build real-world agents, RAG systems, and fine-tune models."
                            icon={<Cpu size={24} />}
                            color="#a855f7"
                            onClick={() => navigate('/day2')}
                        />
                    </motion.div>


                </div>
            </motion.div>

            <div style={{ marginTop: 'auto', paddingBottom: '0' }}>
                <LogoTicker />
            </div>
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
                rest: { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
                hover: { y: -10, boxShadow: `0 20px 40px -10px ${color}30` }
            }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={!locked ? onClick : undefined}
            style={{
                background: 'var(--bg-secondary)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid var(--border-color)',
                cursor: locked ? 'not-allowed' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                opacity: locked ? 0.6 : 1
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '1.5rem',
                fontSize: '4rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                opacity: 0.05,
                lineHeight: 1
            }}>
                {number}
            </div>

            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                marginBottom: '2rem'
            }}>
                {icon}
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, marginBottom: '2rem' }}>{description}</p>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                color: locked ? 'var(--text-secondary)' : 'var(--text-primary)'
            }}>
                {locked ? (
                    <>Locked <LockIcon size={18} /></>
                ) : (
                    <>Start Module <ArrowRight size={18} /></>
                )}
            </div>

            {!locked && (
                <motion.div
                    variants={{
                        rest: { scaleX: 0 },
                        hover: { scaleX: 1 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '4px',
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    );
}
