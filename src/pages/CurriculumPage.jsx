import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import OnboardingModal from '../components/OnboardingModal';
import OrgFitSurveyModal from '../components/OrgFitSurveyModal';
import { day1Content, day2Content } from '../data/content';

export default function CurriculumPage() {
    const navigate = useNavigate();
    const { logout, userData, user } = useAuth();
    const { theme } = useTheme();
    // Keeping state in case we want to use them later, but currently bypassing
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showOrgFitModal, setShowOrgFitModal] = useState(false);

    // Calculate Completion Status (Optional now since everything is unlocked)
    const completedSections = userData?.progress?.completedSections || [];
    const isDay1Complete = day1Content.length > 0 && day1Content.every(section => completedSections.includes(section.id));
    const isDay2Complete = day2Content.length > 0 && day2Content.every(section => completedSections.includes(section.id));

    const handleLogout = () => { logout(); };

    const handleStartModule = (path) => {
        // Direct navigation, bypassing login and onboarding checks
        navigate(path);
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
                    <ThemeToggle />
                </div>
            </header>

            <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ padding: '2rem clamp(1rem, 5%, 5%)' }}
                >
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Curriculum Overview</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>A structured path from basics to advanced autonomous agents.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(1.5rem, 4vw, 3rem)' }}>
                            {/* Module 1 */}
                            <div style={{
                                background: 'var(--bg-primary)',
                                padding: 'clamp(1.25rem, 4vw, 3rem)',
                                borderRadius: 'clamp(24px, 4vw, 32px)',
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
                                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: '1rem' }}>Generative AI Fundamentals</h3>
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
                                        background: 'linear-gradient(135deg, #FF5722 0%, #F44336 100%)',
                                        color: '#fff',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 10px 25px -5px rgba(255, 87, 34, 0.4)'
                                    }}
                                >
                                    <ArrowRight size={18} /> Start Learning
                                </button>
                            </div>

                            {/* Module 2 */}
                            <div style={{
                                background: 'var(--bg-primary)',
                                padding: 'clamp(1.25rem, 4vw, 3rem)',
                                borderRadius: 'clamp(24px, 4vw, 32px)',
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
                                    <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700 }}>Advanced Applications</h3>
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
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #F48B36 0%, #FFB74D 100%)',
                                        color: '#fff',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 10px 25px -5px rgba(244, 139, 54, 0.4)'
                                    }}
                                >
                                    <ArrowRight size={18} /> Start Day 2
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
