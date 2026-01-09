import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Check, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Day1FeedbackModal({ isOpen, onClose, onComplete }) {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [rating, setRating] = useState(0);
    const [formData, setFormData] = useState({
        mostUseful: '',
        needsImprovement: '',
        interestedInPaid: null // 'Yes', 'No', 'Maybe'
    });

    const handleNext = () => {
        if (step === 1 && rating === 0) return;
        if (step === 2 && !formData.mostUseful.trim()) return;
        if (step === 3 && !formData.needsImprovement.trim()) return;

        if (step < 4) {
            setStep(step + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        const finalData = { rating, ...formData };
        if (user) {
            setDoc(doc(db, 'users', user.uid), {
                surveys: {
                    day1_feedback: finalData
                }
            }, { merge: true }).catch(e => console.error("Error saving feedback:", e));
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
                    background: 'rgba(5, 5, 5, 0.85)',
                    backdropFilter: 'blur(16px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}
            >
                <div style={{
                    position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1
                }}>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '600px', height: '600px',
                        background: 'radial-gradient(circle, rgba(255, 87, 34, 0.05) 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }} />
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                    style={{
                        background: 'linear-gradient(180deg, rgba(30, 30, 30, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '28px',
                        width: '100%',
                        maxWidth: '520px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
                        fontFamily: "'Inter', sans-serif",
                        position: 'relative'
                    }}
                >
                    {/* Top Neon Line */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                        background: 'linear-gradient(90deg, transparent, #FF5722, transparent)',
                        opacity: 0.8
                    }} />

                    {/* Header */}
                    <div style={{
                        padding: '2rem 2.5rem 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, colr: 'white', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #fff, #bbb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Day 1 Feedback
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginTop: '4px' }}>Step {step} of 4</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', margin: '1.5rem 2.5rem 0', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div
                            animate={{ width: `${(step / 4) * 100}%` }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #FF5722, #FF8A65)', borderRadius: '4px', boxShadow: '0 0 10px rgba(255, 87, 34, 0.5)' }}
                        />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '2rem 2.5rem 2.5rem' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {step === 1 && (
                                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>
                                            How would you rate Day 1?
                                        </h3>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '1rem' }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                    style={{
                                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                                        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                    }}
                                                >
                                                    <Star
                                                        size={42}
                                                        fill={rating >= star ? "#FFB300" : "transparent"}
                                                        color={rating >= star ? "#FFB300" : "rgba(255,255,255,0.2)"}
                                                        strokeWidth={1.5}
                                                        style={{ filter: rating >= star ? 'drop-shadow(0 0 8px rgba(255, 179, 0, 0.4))' : 'none' }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px', margin: '0 auto', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', fontWeight: 500 }}>
                                            <span>Needs Work</span>
                                            <span>Mind Blowing</span>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                                            What was the most <span style={{ color: '#FF5722' }}>valuable</span> part for you?
                                        </h3>
                                        <textarea
                                            value={formData.mostUseful}
                                            onChange={(e) => setFormData({ ...formData, mostUseful: e.target.value })}
                                            placeholder="The practical demos, the theory..."
                                            autoFocus
                                            rows={5}
                                            style={{
                                                width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
                                                color: 'white', fontSize: '1rem', outline: 'none', resize: 'none',
                                                fontFamily: 'inherit', transition: 'all 0.2s',
                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                                            }}
                                            onFocus={(e) => { e.target.style.borderColor = '#FF5722'; e.target.style.background = 'rgba(255, 87, 34, 0.05)'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                                        />
                                    </>
                                )}

                                {step === 3 && (
                                    <>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                                            What could be <span style={{ color: '#FF5722' }}>improved</span>?
                                        </h3>
                                        <textarea
                                            value={formData.needsImprovement}
                                            onChange={(e) => setFormData({ ...formData, needsImprovement: e.target.value })}
                                            placeholder="Too fast? Too slow? Unclear concepts..."
                                            autoFocus
                                            rows={5}
                                            style={{
                                                width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
                                                color: 'white', fontSize: '1rem', outline: 'none', resize: 'none',
                                                fontFamily: 'inherit', transition: 'all 0.2s',
                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                                            }}
                                            onFocus={(e) => { e.target.style.borderColor = '#FF5722'; e.target.style.background = 'rgba(255, 87, 34, 0.05)'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                                        />
                                    </>
                                )}

                                {step === 4 && (
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                                            Interested in a <span style={{ color: '#FF5722' }}>paid advanced program</span> (3 mo+)?
                                        </h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {['Yes, absolutely', 'No, not right now', 'Maybe, send me details'].map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => {
                                                        setFormData({ ...formData, interestedInPaid: option });
                                                        setTimeout(() => handleComplete(), 300);
                                                    }}
                                                    style={{
                                                        position: 'relative',
                                                        padding: '1.2rem 1.5rem',
                                                        borderRadius: '16px',
                                                        background: formData.interestedInPaid === option
                                                            ? 'linear-gradient(90deg, rgba(255, 87, 34, 0.15), rgba(255, 87, 34, 0.05))'
                                                            : 'rgba(255, 255, 255, 0.02)',
                                                        border: formData.interestedInPaid === option
                                                            ? '1px solid #FF5722'
                                                            : '1px solid rgba(255, 255, 255, 0.06)',
                                                        color: formData.interestedInPaid === option ? 'white' : 'rgba(255, 255, 255, 0.7)',
                                                        textAlign: 'left',
                                                        fontSize: '1rem',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                        fontWeight: formData.interestedInPaid === option ? 600 : 400,
                                                        overflow: 'hidden'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        if (formData.interestedInPaid !== option) {
                                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                                        }
                                                    }}
                                                    onMouseOut={(e) => {
                                                        if (formData.interestedInPaid !== option) {
                                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                                                        }
                                                    }}
                                                >
                                                    <span style={{ zIndex: 2 }}>{option}</span>
                                                    {formData.interestedInPaid === option && (
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ zIndex: 2 }}>
                                                            <div style={{ background: '#FF5722', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                                                                <Check size={14} color="white" strokeWidth={4} />
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                    {formData.interestedInPaid === option && (
                                                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#FF5722', boxShadow: '0 0 10px #FF5722' }} />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        {step < 4 && (
                            <button
                                onClick={handleNext}
                                disabled={(step === 1 && rating === 0) || (step === 2 && !formData.mostUseful) || (step === 3 && !formData.needsImprovement)}
                                style={{
                                    marginTop: '2.5rem',
                                    width: '100%',
                                    padding: '1.2rem',
                                    background: ((step === 1 && rating > 0) || (step === 2 && formData.mostUseful) || (step === 3 && formData.needsImprovement))
                                        ? 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)'
                                        : 'rgba(255,255,255,0.05)',
                                    color: ((step === 1 && rating > 0) || (step === 2 && formData.mostUseful) || (step === 3 && formData.needsImprovement))
                                        ? 'white'
                                        : 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    borderRadius: '16px',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    cursor: ((step === 1 && rating > 0) || (step === 2 && formData.mostUseful) || (step === 3 && formData.needsImprovement))
                                        ? 'pointer'
                                        : 'not-allowed',
                                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                    boxShadow: ((step === 1 && rating > 0) || (step === 2 && formData.mostUseful) || (step === 3 && formData.needsImprovement))
                                        ? '0 10px 30px rgba(255, 107, 0, 0.25)'
                                        : 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                }}
                                onMouseOver={(e) => {
                                    if (e.currentTarget.disabled) return;
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 107, 0, 0.35)';
                                }}
                                onMouseOut={(e) => {
                                    if (e.currentTarget.disabled) return;
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 0, 0.25)';
                                }}
                            >
                                Continue <ArrowRight size={20} />
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
