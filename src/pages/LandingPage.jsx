import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, LogOut, Terminal, Zap, User, Lock, CheckCircle2, PlayCircle, Sparkles, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import LogoTicker from '../components/LogoTicker';
import { useTheme } from '../context/ThemeContext';
import { day1Content } from '../data/content.jsx';
import OnboardingModal from '../components/OnboardingModal';
import OrgFitSurveyModal from '../components/OrgFitSurveyModal';
import GsapHero from '../components/GsapHero';

export default function LandingPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, userData, user } = useAuth();
    const { theme } = useTheme();
    const curriculumRef = useRef(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showOrgFitModal, setShowOrgFitModal] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('scroll') === 'curriculum' && curriculumRef.current) {
            // Small delay to ensure render
            setTimeout(() => {
                curriculumRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [location]);

    const handleLogout = () => {
        logout();
    };

    const handleStartModule = (path) => {
        if (!user) {
            navigate('/login');
        } else if (path === '/day1') {
            // Check if already onboarded (mock check)
            const hasOnboarded = localStorage.getItem('onboarding_v2_complete');
            if (hasOnboarded) {
                navigate(path);
            } else {
                setShowOnboarding(true);
            }
        } else if (path === '/day2') {
            // Check if Org Fit Survey done
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
            navigate('/day1'); // Fallback
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>

            {/* --- Navbar --- */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem 5%',
                position: 'fixed',
                top: 0, left: 0, right: 0,
                background: 'transparent',
                backdropFilter: 'blur(0px)',
                zIndex: 50,
                borderBottom: 'none'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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

            {/* --- Gsap Hero --- */}
            <GsapHero />

            {/* Hero Visual/Stats */}






            {/* Footer */}
            <footer style={{
                padding: '4rem 5%',
                borderTop: '1px solid var(--border-color)',
                textAlign: 'center',
                color: 'var(--text-secondary)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.5rem', opacity: 0.7 }}>
                    <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                    <span style={{ fontWeight: 700 }}>LetsUpgrade</span>
                </div>
                <p>&copy; {new Date().getFullYear()} LetsUpgrade. All rights reserved.</p>
            </footer>
            {/* Onboarding Modal */}
            <OnboardingModal
                isOpen={showOnboarding}
                onClose={() => setShowOnboarding(false)}
                onComplete={handleOnboardingComplete}
            />
            <OrgFitSurveyModal
                isOpen={showOrgFitModal}
                onClose={() => setShowOrgFitModal(false)}
                onComplete={handleOrgFitComplete}
            />
        </div>
    );
}

function StatBox({ number, label, icon }) {
    return (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.8rem', background: 'var(--bg-primary)', borderRadius: '50%', marginBottom: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                {React.cloneElement(icon, { size: 24, color: 'var(--text-primary)' })}
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>{number}</h3>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>{label}</span>
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
