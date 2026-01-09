import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Zap, Lock, LogOut, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import OnboardingModal from '../components/OnboardingModal';
import OrgFitSurveyModal from '../components/OrgFitSurveyModal';
import { day1Content } from '../data/content';

export default function CurriculumPage() {
    const navigate = useNavigate();
    const { logout, userData, user } = useAuth();
    const { theme } = useTheme();
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showOrgFitModal, setShowOrgFitModal] = useState(false);

    // Calculate Completion Status
    const completedSections = userData?.progress?.completedSections || [];
    const isDay1Complete = day1Content.length > 0 && day1Content.every(section => completedSections.includes(section.id));

    const handleLogout = () => { logout(); };

    const handleStartModule = (path) => {
        if (!user) {
            navigate('/login');
        } else if (path === '/day1') {
            const hasOnboarded = localStorage.getItem('onboarding_v2_complete');
            if (hasOnboarded) {
                navigate(path);
            } else {
                setShowOnboarding(true);
            }
        } else if (path === '/day2') {
            if (!isDay1Complete) return; // Prevent navigation if locked

            const hasFitSurvey = localStorage.getItem('org_fit_survey_done');
            if (hasFitSurvey) {
                navigate(path);
            } else {
                setShowOrgFitModal(true);
            }
        } else {
            navigate(path);
        }
    };

    const handleOrgFitComplete = () => {
        localStorage.setItem('org_fit_survey_done', 'true');
        setShowOrgFitModal(false);
        navigate('/day2');
    };

    const handleOnboardingComplete = () => {
        try {
            localStorage.setItem('onboarding_v2_complete', 'true');
            setShowOnboarding(false);
            navigate('/day1');
        } catch (error) {
            console.error("Error saving onboarding:", error);
            navigate('/day1');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
            {/* Navbar */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem 5%',
                position: 'fixed',
                top: 0, left: 0, right: 0,
                background: 'var(--bg-primary)',
                zIndex: 50,
                borderBottom: '1px solid var(--border-color)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.03em' }}>
                        <span>LetsUpgrade</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {user && (
                        <div style={{
                            padding: '10px 24px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '50px',
                            border: '1px solid rgba(255, 87, 34, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginRight: '0.8rem'
                        }}>
                            <span style={{
                                fontSize: '1.1rem',
                                color: 'var(--text-secondary)',
                                fontWeight: 500,
                            }}>
                                Hello,
                            </span>
                            <span style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #FF5722 0%, #FFB74D 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textTransform: 'capitalize',
                            }}>
                                {userData?.name?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Sahil'}
                            </span>
                            <div className="animate-pulse" style={{
                                width: '8px',
                                height: '8px',
                                background: '#00e676',
                                borderRadius: '50%',
                                boxShadow: '0 0 10px #00e676'
                            }} />
                        </div>
                    )}
                    <ThemeToggle />
                    {user ? (
                        <button onClick={handleLogout} className="nav-btn">
                            Logout <LogOut size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                background: 'white',
                                color: 'black',
                                border: '1px solid #ddd',
                                padding: '0.5rem 1.2rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                transition: 'transform 0.2s',
                            }}
                        >
                            Login
                        </button>
                    )}
                </div>
            </header>

            <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ padding: '2rem 5%' }}
                >
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Curriculum Overview</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>A structured path from basics to advanced autonomous agents.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem' }}>
                            {/* Module 1 */}
                            <div style={{
                                background: 'var(--bg-primary)',
                                padding: '3rem',
                                borderRadius: '32px',
                                border: '1px solid var(--border-color)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div style={{ color: '#FF5722' }}><BookOpen size={40} /></div>
                                    <div style={{
                                        padding: '0.4rem 1rem',
                                        background: 'rgba(255, 87, 34, 0.1)',
                                        color: '#FF5722',
                                        borderRadius: '20px',
                                        fontWeight: 700,
                                        fontSize: '0.9rem'
                                    }}>
                                        DAY 1
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Generative AI Fundamentals</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                    The foundation step. Understand how LLMs 'think', learn to control them with advanced prompting, and explore the transformer architecture visually.
                                </p>
                                <ul style={{ display: 'grid', gap: '0.8rem', marginBottom: '2.5rem' }}>
                                    <ListItem>Understanding Tokens & Context Windows</ListItem>
                                    <ListItem>Zero-shot vs Few-shot Prompting</ListItem>
                                    <ListItem>Visualizing Neural Networks</ListItem>
                                    <ListItem>Prompt Engineering Frameworks</ListItem>
                                </ul>
                                <button
                                    onClick={() => handleStartModule('/day1')}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: isDay1Complete
                                            ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' // Green for completed
                                            : user ? 'linear-gradient(135deg, #FF5722 0%, #F44336 100%)' : 'var(--bg-secondary)',
                                        color: user ? '#fff' : 'var(--text-secondary)',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: (user && !isDay1Complete) ? '0 10px 25px -5px rgba(255, 87, 34, 0.4)' : 'none'
                                    }}
                                >
                                    {isDay1Complete ? (
                                        <><CheckCircle2 size={18} /> Completed</>
                                    ) : user ? (
                                        <><ArrowRight size={18} /> Start Learning</>
                                    ) : (
                                        <><Lock size={18} /> Login to Access</>
                                    )}
                                </button>
                            </div>

                            {/* Module 2 */}
                            <div style={{
                                background: 'var(--bg-primary)',
                                padding: '3rem',
                                borderRadius: '32px',
                                border: '1px solid var(--border-color)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div style={{ color: '#F48B36' }}><Zap size={40} /></div>
                                    <div style={{
                                        padding: '0.4rem 1rem',
                                        background: 'rgba(244, 139, 54, 0.1)',
                                        color: '#F48B36',
                                        borderRadius: '20px',
                                        fontWeight: 700,
                                        fontSize: '0.9rem'
                                    }}>
                                        DAY 2
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>Advanced Applications</h3>
                                    {!isDay1Complete && (
                                        <span style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'var(--bg-secondary)', borderRadius: '20px', fontWeight: 600 }}>Locked</span>
                                    )}
                                </div>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                    Building real systems. Connect AI to data with RAG, create autonomous agents, and orchestrate multi-agent workflows.
                                </p>
                                <ul style={{ display: 'grid', gap: '0.8rem', marginBottom: '2.5rem' }}>
                                    <ListItem>Retrieval Augmented Generation (RAG)</ListItem>
                                    <ListItem>Vector Databases & Embeddings</ListItem>
                                    <ListItem>Building Autonomous Agents</ListItem>
                                    <ListItem>Multi-Modal AI Systems</ListItem>
                                </ul>
                                <button
                                    onClick={() => handleStartModule('/day2')}
                                    disabled={!user || !isDay1Complete}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: (user && isDay1Complete) ? 'linear-gradient(135deg, #F48B36 0%, #FFB74D 100%)' : 'var(--bg-secondary)',
                                        color: (user && isDay1Complete) ? '#fff' : 'rgba(255,255,255,0.4)',
                                        fontWeight: 700,
                                        cursor: (user && isDay1Complete) ? 'pointer' : 'not-allowed',
                                        transition: 'all 0.3s',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: (user && isDay1Complete) ? '0 10px 25px -5px rgba(244, 139, 54, 0.4)' : 'none'
                                    }}
                                >
                                    {user && isDay1Complete ? (
                                        <><ArrowRight size={18} /> Start Day 2</>
                                    ) : (
                                        <><Lock size={18} /> {isDay1Complete ? "Login to Access" : "Complete Day 1 First"}</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
            <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} onComplete={handleOnboardingComplete} />
            <OrgFitSurveyModal isOpen={showOrgFitModal} onClose={() => setShowOrgFitModal(false)} onComplete={handleOrgFitComplete} />
        </div>
    );
}

function ListItem({ children }) {
    return (
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-primary)', fontSize: '1rem', listStyle: 'none' }}>
            <CheckCircle2 size={18} color="var(--accent-color)" />
            {children}
        </li>
    );
}
