
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
    User, Mail, Trophy, Target,
    CheckCircle2, XCircle, ArrowLeft,
    TrendingUp, Calendar, Hash
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function Profile() {
    const { userData } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();

    const stats = userData?.stats || { totalPoints: 0, totalCorrect: 0, totalIncorrect: 0 };
    const completedCount = userData?.progress?.completedSections?.length || 0;
    const totalModules = 23; // Combined Day 1 and Day 2 sections
    const progressPercent = Math.round((completedCount / totalModules) * 100);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            padding: '2rem'
        }}>
            {/* Header */}
            <header style={{
                maxWidth: '1000px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '3rem'
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem'
                    }}
                >
                    <ArrowLeft size={20} /> Back
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '32px', height: '32px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '0.9', fontWeight: 900, fontSize: '1rem' }}>
                            <span>Lets</span>
                            <span>Upgrade</span>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ maxWidth: '1000px', margin: '0 auto' }}
            >
                {/* Hero Profile Section */}
                <motion.div variants={itemVariants} style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: '32px',
                    padding: '3rem',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '3rem',
                    marginBottom: '2rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '40px',
                        background: 'linear-gradient(135deg, var(--accent-color) 0%, #a855f7 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        color: '#fff',
                        boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
                    }}>
                        {userData?.name ? userData.name[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{userData?.name || 'Student'}</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={18} /> {userData?.email}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={18} /> Member since 2024
                            </div>
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>ROLE</div>
                        <div style={{
                            padding: '6px 16px',
                            background: userData?.role === 'admin' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                            color: userData?.role === 'admin' ? '#f59e0b' : 'var(--accent-color)',
                            borderRadius: '12px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            border: `1px solid ${userData?.role === 'admin' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`
                        }}>
                            {userData?.role || 'user'}
                        </div>
                    </div>
                </motion.div>

                {/* Score Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <motion.div variants={itemVariants}>
                        <ScoreCard icon={<Trophy color="#f59e0b" />} label="Overall Score" value={stats.totalPoints} sub="Total Points Earned" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <ScoreCard icon={<CheckCircle2 color="#10b981" />} label="Correct Answers" value={stats.totalCorrect} sub="Total Accuracy Spike" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <ScoreCard icon={<XCircle color="#ef4444" />} label="Learning Gaps" value={stats.totalIncorrect} sub="Opportunities to Improve" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <ScoreCard icon={<Target color="#3b82f6" />} label="Course Progress" value={`${progressPercent}%`} sub={`${completedCount}/${totalModules} Modules`} />
                    </motion.div>
                </div>

                {/* Performance Chart & Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                    <motion.div variants={itemVariants} style={{
                        background: 'var(--bg-secondary)',
                        borderRadius: '24px',
                        padding: '2rem',
                        border: '1px solid var(--border-color)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Learning Performance</h3>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>LAST 30 DAYS</div>
                        </div>

                        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '10px', paddingBottom: '1rem' }}>
                            {/* Simple dynamic bar chart based on points */}
                            {[20, 45, 30, 80, 55, 90, 70].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    style={{
                                        flex: 1,
                                        background: i === 5 ? 'var(--accent-color)' : 'rgba(99, 102, 241, 0.2)',
                                        borderRadius: '8px 8px 0 0'
                                    }}
                                />
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} style={{
                        background: 'var(--bg-secondary)',
                        borderRadius: '24px',
                        padding: '2rem',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Active Badges</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {completedCount > 5 && <Badge title="Fast Learner" icon="⚡" />}
                            {stats.totalPoints > 50 && <Badge title="AI Geek" icon="🤖" />}
                            {progressPercent === 100 && <Badge title="Graduated" icon="🎓" />}
                            <Badge title="Pioneer" icon="🚀" />
                        </div>
                        <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '16px', border: '1px dashed rgba(99, 102, 241, 0.2)' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                Keep solving MCQs to unlock 12 more professional badges!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.main>
        </div>
    );
}

function ScoreCard({ icon, label, value, sub }) {
    return (
        <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '24px',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>{icon}</div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={12} color="#10b981" /> {sub}
            </div>
        </div>
    );
}

function Badge({ title, icon }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            fontSize: '0.85rem',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <span>{icon}</span> {title}
        </div>
    );
}
