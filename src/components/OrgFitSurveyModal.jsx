import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function OrgFitSurveyModal({ isOpen, onClose, onComplete }) {
    const { user } = useAuth();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        usesLms: '', // Yes, No, Not sure
        wantsDemo: '', // Yes, No, Maybe
        workEmail: '',
        demoTime: '' // Morning, Afternoon, Evening
    });

    const { userData } = useAuth();
    const [initialized, setInitialized] = useState(false);

    // Resume from saved progress
    useEffect(() => {
        if (userData?.surveys?.org_fit_survey && !initialized) {
            const data = userData.surveys.org_fit_survey;
            setFormData({
                usesLms: data.usesLms || '',
                wantsDemo: data.wantsDemo || '',
                workEmail: data.workEmail || '',
                demoTime: data.demoTime || ''
            });

            // Set Step
            if (!data.usesLms) setStep(1);
            else if (!data.wantsDemo) setStep(2);
            else if (data.wantsDemo === 'Yes' && (!data.workEmail || !data.demoTime)) setStep(3);
            else setStep(1);

            setInitialized(true);
        }
    }, [userData, initialized]);

    const saveProgress = (data) => {
        if (user) {
            setDoc(doc(db, 'users', user.uid), {
                surveys: {
                    org_fit_survey: data
                }
            }, { merge: true }).catch(e => console.error("Autosave error:", e));
        }
    };

    const handleNext = () => {
        if (step === 1 && !formData.usesLms) return;

        if (step === 2) {
            if (!formData.wantsDemo) return;
            if (formData.wantsDemo === 'Yes') {
                setStep(3); // Go to email collection
            } else {
                handleComplete(); // Skip if No/Maybe
            }
            return;
        }

        if (step === 3) {
            if (!formData.workEmail || !formData.demoTime) return;
            handleComplete();
        }
    };

    const handleComplete = () => {
        console.log("Org Fit Survey Data:", formData);

        if (user) {
            setDoc(doc(db, 'users', user.uid), {
                surveys: {
                    org_fit_survey: formData
                }
            }, { merge: true }).catch(e => console.error("Error saving org fit:", e));
        }
        onComplete();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}
            >
                <div style={{
                    width: '100%',
                    maxWidth: '500px',
                    background: isDark ? '#121212' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 40px rgba(0,0,0,0.1)'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '1.5rem',
                        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: isDark ? 'white' : '#1a1a1a' }}>
                                Know Your Career Seeker
                            </h2>
                            <p style={{ fontSize: '0.8rem', color: isDark ? '#a1a1aa' : '#666', marginTop: '0.2rem' }}>
                                Quick intro—who are you?
                            </p>
                        </div>
                        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', width: '100%' }}>
                        <motion.div
                            animate={{ width: `${(step / (formData.wantsDemo === 'Yes' ? 3 : 2)) * 100}%` }}
                            style={{ height: '100%', background: '#F48B36' }} // Day 2 Orange
                        />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '2rem' }}>

                        {/* Step 1: LMS Usage */}
                        {step === 1 && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDark ? 'white' : '#1a1a1a', marginBottom: '1.5rem' }}>
                                    Does your organization currently use an LMS or LXP?
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {['Yes', 'No', 'Not sure'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                const newData = { ...formData, usesLms: opt };
                                                setFormData(newData);
                                                saveProgress(newData);
                                                setTimeout(() => setStep(2), 200);
                                            }}
                                            style={{
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                background: formData.usesLms === opt ? 'rgba(244, 139, 54, 0.1)' : (isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.05)'),
                                                border: formData.usesLms === opt ? '1px solid #F48B36' : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'),
                                                color: isDark ? 'white' : '#1a1a1a',
                                                textAlign: 'left',
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {opt}
                                            {formData.usesLms === opt && <Check size={18} color="#F48B36" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Demo Interest */}
                        {step === 2 && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>
                                    Would you like a demo of our LMS/LXP platform for your organization?
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {['Yes', 'No', 'Maybe'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                const newData = { ...formData, wantsDemo: opt };
                                                setFormData(newData);
                                                // Handle logic in handleNext but provide visual feedback here
                                                if (opt === 'Yes') {
                                                    saveProgress(newData);
                                                    setTimeout(() => setStep(3), 200);
                                                } else {
                                                    // handleComplete saves final
                                                    setTimeout(() => handleComplete(), 300);
                                                }
                                            }}
                                            style={{
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                background: formData.wantsDemo === opt ? 'rgba(244, 139, 54, 0.1)' : (isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.05)'),
                                                border: formData.wantsDemo === opt ? '1px solid #F48B36' : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'),
                                                color: isDark ? 'white' : '#1a1a1a',
                                                textAlign: 'left',
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {opt}
                                            {formData.wantsDemo === opt && <Check size={18} color="#F48B36" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Contact Details (If Yes) */}
                        {step === 3 && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>
                                    Share your work email + best time to connect
                                </h3>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Work Email</label>
                                    <input
                                        type="email"
                                        value={formData.workEmail}
                                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                                        placeholder="name@company.com"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                                            borderRadius: '12px',
                                            color: isDark ? 'white' : '#1a1a1a',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Preferred Time Slot</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                                        {['Morning', 'Afternoon', 'Evening'].map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setFormData({ ...formData, demoTime: time })}
                                                style={{
                                                    padding: '0.8rem',
                                                    borderRadius: '10px',
                                                    background: formData.demoTime === time ? '#F48B36' : 'rgba(255,255,255,0.05)',
                                                    color: formData.demoTime === time ? 'white' : '#a1a1aa',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleComplete}
                                    disabled={!formData.workEmail || !formData.demoTime}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        background: (!formData.workEmail || !formData.demoTime) ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') : '#F48B36',
                                        color: (!formData.workEmail || !formData.demoTime) ? (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)') : 'white',
                                        border: 'none',
                                        cursor: (!formData.workEmail || !formData.demoTime) ? 'not-allowed' : 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: 600
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
