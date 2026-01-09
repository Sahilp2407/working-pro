import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, LogOut, Terminal, Zap, User, Lock, CheckCircle2, X, Sparkles, Trophy, Target, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { day1Content } from '../data/content.jsx';

export default function Dashboard() {
    const navigate = useNavigate();
    const { logout, userData, user, setUserData } = useAuth();
    const { theme } = useTheme();

    const [showWelcomeModal, setShowWelcomeModal] = useState(true);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        mobile: userData?.mobile || '',
        location: userData?.location || ''
    });

    useEffect(() => {
        if (userData) {
            setFormData(prev => ({
                ...prev,
                name: userData.name || prev.name,
                mobile: userData.mobile || prev.mobile
            }));
        }
    }, [userData]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleStartModule = (path) => {
        navigate(path);
    };

    const handleWelcomeContinue = () => {
        setShowWelcomeModal(false);
        // If mobile is missing, show profile modal
        if (!userData?.mobile) {
            setShowProfileModal(true);
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        // Save user data (Mock - simulates saving to Firebase later)
        setUserData({
            ...userData,
            name: formData.name,
            mobile: formData.mobile,
            location: formData.location,
            isProfileComplete: true
        });
        setShowProfileModal(false);
    };

    const completedSections = userData?.progress?.completedSections || [];
    const day1Finished = day1Content.every(s => completedSections.includes(s.id));

    // Calculate progress
    const totalDay1 = day1Content.length;
    const completedDay1 = completedSections.filter(id => day1Content.find(s => s.id === id)).length;
    const progressPercentage = Math.round((completedDay1 / totalDay1) * 50); // Day 1 is 50% of total

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', position: 'relative', overflow: 'hidden' }}>

            {/* Background Blobs */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,87,34,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(244,139,54,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0 }} />

            {/* --- Navbar --- */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem 5%',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid var(--border-color)',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #FF5722, #F44336)', padding: '6px', borderRadius: '8px' }}>
                        <img src="/logo.png" alt="Logo" style={{ width: '20px', height: '20px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>LetsUpgrade</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    {userData?.role === 'admin' && (
                        <button onClick={() => navigate('/admin')} className="nav-btn">
                            <Terminal size={18} /> Admin
                        </button>
                    )}
                    <button onClick={() => navigate('/profile')} className="nav-btn-icon">
                        <User size={20} />
                    </button>
                    <button onClick={handleLogout} className="nav-btn">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            {/* --- Main Dashboard Content --- */}
            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 5%', position: 'relative', zIndex: 1 }}>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}
                >
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '3rem' }}>👋</span>
                            <h1 style={{ fontSize: '3rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Welcome back, {userData?.name || 'Learner'}!
                            </h1>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
                            Your journey to mastering Generative AI continues here. You're making great progress!
                        </p>
                    </div>

                    {/* Progress Card */}
                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: '1.5rem 2rem',
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <svg width="60" height="60" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border-color)" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#FF5722" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * progressPercentage / 100)} strokeLinecap="round" transform="rotate(-90 50 50)" />
                            </svg>
                            <span style={{ position: 'absolute', fontWeight: 700, fontSize: '0.9rem' }}>{progressPercentage}%</span>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.2rem' }}>Course Progress</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Day 1 In Progress</div>
                        </div>
                    </div>
                </motion.div>

                {/* Modules Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem' }}>

                    {/* Module 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="module-card group"
                    >
                        <div className="card-bg-glow" />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div className="icon-box" style={{ background: 'rgba(255, 87, 34, 0.1)', color: '#FF5722' }}>
                                    <BookOpen size={28} />
                                </div>
                                <div className="badge-day1">DAY 1</div>
                            </div>
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>Generative AI<br />Fundamentals</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                                Master LLMs, Prompt Engineering, and see how transformers 'think' with visual interactive demos.
                            </p>
                            <button
                                onClick={() => handleStartModule('/day1')}
                                className="btn-primary"
                            >
                                Continue Learning <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Module 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="module-card"
                        style={{ opacity: day1Finished ? 1 : 0.8 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                            <div className="icon-box" style={{ background: 'rgba(244, 139, 54, 0.1)', color: '#F48B36' }}>
                                <Zap size={28} />
                            </div>
                            <div className="badge-day2">DAY 2</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 }}>Advanced<br />Applications</h3>
                            {!day1Finished && <span className="locked-pill"><Lock size={14} /> Locked</span>}
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                            Build real-world systems with RAG, Vector Databases, and Orchestrate Autonomous Agents.
                        </p>
                        <button
                            onClick={() => handleStartModule('/day2')}
                            disabled={!day1Finished}
                            className={day1Finished ? "btn-secondary-active" : "btn-locked"}
                        >
                            {day1Finished ? (
                                <>Start Day 2 <ArrowRight size={18} /></>
                            ) : (
                                <>Complete Day 1 to Unlock</>
                            )}
                        </button>
                    </motion.div>
                </div>
            </main>

            {/* --- Modals Container --- */}
            <AnimatePresence mode="wait">

                {/* 1. Welcome Modal */}
                {showWelcomeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-backdrop"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="modal-content"
                        >
                            {/* Decorative gradient */}
                            <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,87,34,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }} />

                            <button
                                onClick={() => setShowWelcomeModal(false)}
                                style={{
                                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                                    background: 'transparent', border: 'none', cursor: 'pointer',
                                    color: 'var(--text-secondary)', zIndex: 2
                                }}
                            >
                                <X size={24} />
                            </button>

                            <motion.div
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                style={{
                                    width: '90px', height: '90px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #FF5722, #F44336)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 2rem auto',
                                    boxShadow: '0 20px 40px -10px rgba(255, 87, 34, 0.4)',
                                    position: 'relative', zIndex: 1
                                }}
                            >
                                <Sparkles color="white" size={40} />
                            </motion.div>

                            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.8rem', lineHeight: 1.1 }}>Ready to Launch?</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.5 }}>
                                Essential tools and simulators are prepped for you. Let's master <span style={{ color: '#FF5722', fontWeight: 700 }}>Generative AI</span>.
                            </p>

                            <button
                                onClick={handleWelcomeContinue}
                                className="btn-primary"
                                style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}
                            >
                                Let's Get Started
                            </button>
                        </motion.div>
                    </motion.div>
                )}

                {/* 2. Profile Completion Modal (If needed) */}
                {(!showWelcomeModal && showProfileModal) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-backdrop"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="modal-content"
                            style={{ maxWidth: '500px' }}
                        >
                            <button
                                onClick={() => setShowProfileModal(false)}
                                style={{
                                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                                    background: 'transparent', border: 'none', cursor: 'pointer',
                                    color: 'var(--text-secondary)', zIndex: 2
                                }}
                            >
                                <X size={24} />
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '20px',
                                    background: 'rgba(255, 87, 34, 0.1)', color: '#FF5722',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <User size={30} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}>Complete Profile</h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.3rem' }}>Help us personalize your experience.</p>
                                </div>
                            </div>

                            <form onSubmit={handleProfileSubmit} style={{ textAlign: 'left', display: 'grid', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={{
                                            width: '100%', padding: '1rem', borderRadius: '12px',
                                            border: '1px solid var(--border-color)', background: 'var(--bg-primary)',
                                            color: 'var(--text-primary)', fontSize: '1rem', outline: 'none'
                                        }}
                                        placeholder="e.g. Sahil Pandey"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Mobile Number</label>
                                    <div style={{ position: 'relative' }}>
                                        <Smartphone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                        <input
                                            type="tel"
                                            required
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                            style={{
                                                width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px',
                                                border: '1px solid var(--border-color)', background: 'var(--bg-primary)',
                                                color: 'var(--text-primary)', fontSize: '1rem', outline: 'none'
                                            }}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem' }}
                                >
                                    Save & Continue <ArrowRight size={20} />
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .modal-backdrop {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.6);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 1000;
                    backdrop-filter: blur(8px);
                }
                .modal-content {
                    background: var(--bg-primary);
                    padding: 3rem;
                    border-radius: 32px;
                    width: 90%;
                    max-width: 480px;
                    position: relative;
                    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.4);
                    border: 1px solid var(--border-color);
                    text-align: center;
                    overflow: hidden;
                }
                .module-card {
                    background: var(--bg-secondary);
                    padding: 3rem;
                    border-radius: 32px;
                    border: 1px solid var(--border-color);
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.4s ease;
                }
                .module-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 60px -15px rgba(0,0,0,0.1);
                }
                .card-bg-glow {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: radial-gradient(800px circle at top right, rgba(255,87,34,0.03), transparent 40%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .module-card:hover .card-bg-glow {
                    opacity: 1;
                }
                .icon-box {
                    width: 60px;
                    height: 60px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .badge-day1 {
                    padding: 0.5rem 1.2rem;
                    background: rgba(255, 87, 34, 0.1);
                    color: #FF5722;
                    border-radius: 100px;
                    font-weight: 800;
                    font-size: 0.85rem;
                    letter-spacing: 0.05em;
                }
                .badge-day2 {
                    padding: 0.5rem 1.2rem;
                    background: rgba(244, 139, 54, 0.1);
                    color: #F48B36;
                    border-radius: 100px;
                    font-weight: 800;
                    font-size: 0.85rem;
                    letter-spacing: 0.05em;
                }
                .locked-pill {
                    font-size: 0.8rem;
                    padding: 0.4rem 0.8rem;
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: 100px;
                    font-weight: 600;
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }
                .btn-primary {
                    background: linear-gradient(135deg, #FF5722 0%, #F44336 100%);
                    color: #fff;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 25px -5px rgba(255, 87, 34, 0.4);
                }
                .btn-primary:hover {
                    box-shadow: 0 15px 35px -5px rgba(255, 87, 34, 0.5);
                    transform: translateY(-2px);
                }
                .btn-secondary-active {
                    background: linear-gradient(135deg, #F48B36 0%, #FFB74D 100%);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 25px -5px rgba(244, 139, 54, 0.4);
                }
                .btn-locked {
                    width: 100%;
                    padding: 1rem;
                    border-radius: 16px;
                    border: 1px solid var(--border-color);
                    background: var(--bg-primary);
                    color: var(--text-secondary);
                    font-weight: 600;
                    cursor: not-allowed;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0.7;
                }
                .nav-btn {
                    padding: 0.6rem 1.2rem;
                    border-radius: 12px;
                    border: 1px solid var(--border-color);
                    background: transparent;
                    color: var(--text-primary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .nav-btn:hover {
                    background: var(--bg-secondary);
                }
                .nav-btn-icon {
                    width: 40px; 
                    height: 40px; 
                    border-radius: 12px;
                    border: 1px solid var(--border-color);
                    background: transparent;
                    color: var(--text-primary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .nav-btn-icon:hover {
                    background: var(--bg-secondary);
                }
            `}</style>
        </div>
    );
}
