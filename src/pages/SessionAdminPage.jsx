import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Save, Calendar, Video, User, Check, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SessionAdminPage() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [authError, setAuthError] = useState('');

    // Data State
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [success, setSuccess] = useState(false);

    // Form Data
    const [sessionData, setSessionData] = useState({
        day1: {
            title: 'Fundamentals',
            time: 'Monday, 6:00 PM - 8:00 PM IST',
            link: 'https://meet.google.com/example-link',
            active: true
        },
        day2: {
            title: 'Advanced Applications',
            time: 'Tuesday, 6:00 PM - 8:00 PM IST',
            link: 'https://meet.google.com/example-link',
            active: true
        },
        mentor: {
            name: 'Sahil Pandey',
            title: 'AI & ML Specialist'
        }
    });

    // Check for previous session or fetch data
    useEffect(() => {
        const checkAuth = () => {
            const savedAuth = sessionStorage.getItem('admin_auth');
            if (savedAuth === 'true') {
                setIsAuthenticated(true);
                fetchConfig();
            } else {
                setFetching(false);
            }
        };
        checkAuth();
    }, []);

    const fetchConfig = async () => {
        setFetching(true);
        try {
            const docRef = doc(db, 'config', 'liveSession');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSessionData(docSnap.data());
            }
        } catch (error) {
            console.error("Error fetching config:", error);
        } finally {
            setFetching(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded generic passcode for simple protection as requested
        if (passcode === 'admin123' || passcode === 'genai2024') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_auth', 'true');
            setAuthError('');
            fetchConfig();
        } else {
            setAuthError('Invalid passcode');
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await setDoc(doc(db, 'config', 'liveSession'), sessionData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (error) {
            console.error("Error saving config:", error);
            alert("Failed to save changes. Check permissions.");
        } finally {
            setLoading(false);
        }
    };

    const updateField = (section, field, value) => {
        setSessionData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // --- Authentication View ---
    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: '1rem' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ background: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '400px', textAlign: 'center' }}
                >
                    <div style={{ width: '60px', height: '60px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#FF5722' }}>
                        <Lock size={30} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Admin Access</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enter passcode to manage sessions</p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Passcode"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            style={{
                                width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)',
                                background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '1rem', outline: 'none'
                            }}
                            autoFocus
                        />
                        {authError && <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>{authError}</p>}
                        <button
                            type="submit"
                            style={{
                                width: '100%', padding: '1rem', borderRadius: '12px', border: 'none',
                                background: '#FF5722', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '1rem'
                            }}
                        >
                            Access Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    // --- Dashboard View ---
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', paddingBottom: '3rem' }}>
            <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', position: 'sticky', top: 0, zIndex: 10 }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={() => navigate('/curriculum')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                            <ArrowLeft size={24} />
                        </button>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Live Session Manager</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {success && <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}><Check size={16} /> Saved!</span>}
                        <ThemeToggle />
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.75rem 1.5rem', borderRadius: '12px', border: 'none',
                                background: loading ? '#ccc' : '#FF5722', color: 'white', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            Save Changes
                        </button>
                    </div>
                </div>
            </header>

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                {fetching ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading configuration...</div>
                ) : (
                    <div style={{ display: 'grid', gap: '2rem' }}>

                        {/* Day 1 Section */}
                        <section style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#FF5722' }}>
                                <Calendar size={24} />
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Day 1: Fundamentals</h2>
                            </div>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <InputGroup label="Session Title" value={sessionData.day1.title} onChange={v => updateField('day1', 'title', v)} placeholder="e.g. Fundamentals of AI" />
                                <InputGroup label="Session Time" value={sessionData.day1.time} onChange={v => updateField('day1', 'time', v)} placeholder="e.g. Monday, 6:00 PM - 8:00 PM IST" />
                                <InputGroup label="Meeting Link" value={sessionData.day1.link} onChange={v => updateField('day1', 'link', v)} placeholder="https://meet.google.com/..." />
                            </div>
                        </section>

                        {/* Day 2 Section */}
                        <section style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#FF5722' }}>
                                <Calendar size={24} />
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Day 2: Advanced</h2>
                            </div>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <InputGroup label="Session Title" value={sessionData.day2.title} onChange={v => updateField('day2', 'title', v)} placeholder="e.g. Advanced Applications" />
                                <InputGroup label="Session Time" value={sessionData.day2.time} onChange={v => updateField('day2', 'time', v)} placeholder="e.g. Tuesday, 6:00 PM - 8:00 PM IST" />
                                <InputGroup label="Meeting Link" value={sessionData.day2.link} onChange={v => updateField('day2', 'link', v)} placeholder="https://meet.google.com/..." />
                            </div>
                        </section>

                        {/* Mentor Section */}
                        <section style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#10b981' }}>
                                <User size={24} />
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Mentor Details</h2>
                            </div>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <InputGroup label="Mentor Name" value={sessionData.mentor.name} onChange={v => updateField('mentor', 'name', v)} placeholder="e.g. Sahil Pandey" />
                                <InputGroup label="Mentor Title" value={sessionData.mentor.title} onChange={v => updateField('mentor', 'title', v)} placeholder="e.g. AI & ML Specialist" />
                            </div>
                        </section>

                    </div>
                )}
            </main>
        </div>
    );
}

function InputGroup({ label, value, onChange, placeholder }) {
    return (
        <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>
            <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{
                    width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', fontSize: '1rem'
                }}
            />
        </div>
    );
}
