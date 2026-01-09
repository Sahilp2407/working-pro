import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function OrgFitSurveyModal({ isOpen, onClose, onComplete }) {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        usesLms: '', // Yes, No, Not sure
        wantsDemo: '', // Yes, No, Maybe
        workEmail: '',
        demoTime: '' // Morning, Afternoon, Evening
    });

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
                    org_fit: formData
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
                    background: '#121212',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '1.5rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>
                            Organization-fit Questions
                        </h2>
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
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>
                                    Does your organization currently use an LMS or LXP?
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {['Yes', 'No', 'Not sure'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                setFormData({ ...formData, usesLms: opt });
                                                setTimeout(() => setStep(2), 200);
                                            }}
                                            style={{
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                background: formData.usesLms === opt ? 'rgba(244, 139, 54, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                                border: formData.usesLms === opt ? '1px solid #F48B36' : '1px solid rgba(255, 255, 255, 0.1)',
                                                color: 'white',
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
                                                setFormData({ ...formData, wantsDemo: opt });
                                                // Handle logic in handleNext but provide visual feedback here
                                                if (opt === 'Yes') {
                                                    setTimeout(() => setStep(3), 200);
                                                } else {
                                                    setTimeout(() => handleComplete(), 300);
                                                }
                                            }}
                                            style={{
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                background: formData.wantsDemo === opt ? 'rgba(244, 139, 54, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                                border: formData.wantsDemo === opt ? '1px solid #F48B36' : '1px solid rgba(255, 255, 255, 0.1)',
                                                color: 'white',
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
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            color: 'white',
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
                                        background: (!formData.workEmail || !formData.demoTime) ? 'rgba(255,255,255,0.1)' : '#F48B36',
                                        color: (!formData.workEmail || !formData.demoTime) ? 'rgba(255,255,255,0.3)' : 'white',
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
