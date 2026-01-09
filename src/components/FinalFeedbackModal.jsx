import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Award, CheckCircle2, ChevronRight, MessageSquare, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function FinalFeedbackModal({ isOpen, onClose, onComplete }) {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        overallRating: 0,
        trainerRating: 0,
        nps: null,
        testimonial: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleNext = () => {
        if (step === 1 && formData.overallRating === 0) return;
        if (step === 2 && formData.trainerRating === 0) return;
        if (step === 3 && formData.nps === null) return;

        if (step < 4) {
            setStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);

        if (user) {
            setDoc(doc(db, 'users', user.uid), {
                surveys: {
                    program_feedback: formData,
                    certificate_unlocked: true,
                    certificateDate: new Date().toISOString()
                }
            }, { merge: true }).catch(e => console.error("Error saving final feedback:", e));
        }

        setTimeout(() => {
            setSubmitting(false);
            onComplete();
        }, 1500);
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
                    background: 'rgba(5, 5, 5, 0.9)',
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
                        width: '800px', height: '800px',
                        background: 'radial-gradient(circle, rgba(244, 139, 54, 0.15) 0%, transparent 70%)',
                        filter: 'blur(100px)'
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
                        maxWidth: '550px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
                        position: 'relative'
                    }}
                >
                    {/* Top Neon Line */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                        background: 'linear-gradient(90deg, transparent, #F48B36, transparent)',
                        opacity: 0.8
                    }} />

                    {/* Header */}
                    <div style={{
                        padding: '2rem 2.5rem 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                padding: '10px', background: 'rgba(244, 139, 54, 0.1)', borderRadius: '12px',
                                color: '#F48B36'
                            }}>
                                <Trophy size={24} />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
                                    Final Certification
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginTop: '4px' }}>Step {step} of 4</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', margin: '1.5rem 2.5rem 0', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div
                            animate={{ width: `${(step / 4) * 100}%` }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #F48B36, #FFB74D)', borderRadius: '4px', boxShadow: '0 0 10px rgba(244, 139, 54, 0.5)' }}
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
                                    <div style={{ textAlign: 'center' }}>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
                                            Rate the Program
                                        </h3>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>How was your overall experience in this 2-day workshop?</p>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '2rem' }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setFormData({ ...formData, overallRating: star })}
                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                    style={{
                                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                                        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                    }}
                                                >
                                                    <Star
                                                        size={42}
                                                        fill={formData.overallRating >= star ? "#F59E0B" : "transparent"}
                                                        color={formData.overallRating >= star ? "#F59E0B" : "rgba(255,255,255,0.2)"}
                                                        strokeWidth={1.5}
                                                        style={{ filter: formData.overallRating >= star ? 'drop-shadow(0 0 8px rgba(255, 179, 0, 0.4))' : 'none' }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div style={{ textAlign: 'center' }}>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
                                            Rate the Instructor
                                        </h3>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>How clear and engaging was the teaching?</p>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '2rem' }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setFormData({ ...formData, trainerRating: star })}
                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                    style={{
                                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                                        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                    }}
                                                >
                                                    <Star
                                                        size={42}
                                                        fill={formData.trainerRating >= star ? "#F59E0B" : "transparent"}
                                                        color={formData.trainerRating >= star ? "#F59E0B" : "rgba(255,255,255,0.2)"}
                                                        strokeWidth={1.5}
                                                        style={{ filter: formData.trainerRating >= star ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))' : 'none' }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div style={{ textAlign: 'center' }}>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '1rem' }}>
                                            Would you recommend us?
                                        </h3>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                                            On a scale of 0-10, how likely are you to recommend this workshop to a colleague?
                                        </p>

                                        <div style={{
                                            display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: '6px',
                                            maxWidth: '450px', margin: '0 auto 2rem'
                                        }}>
                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                                                <button
                                                    key={score}
                                                    onClick={() => setFormData({ ...formData, nps: score })}
                                                    style={{
                                                        aspectRatio: '1', borderRadius: '8px',
                                                        border: formData.nps === score ? '1px solid #F48B36' : '1px solid rgba(255,255,255,0.1)',
                                                        background: formData.nps === score ? 'rgba(244, 139, 54, 0.2)' : 'rgba(255,255,255,0.03)',
                                                        color: formData.nps === score ? '#fff' : 'rgba(255,255,255,0.5)',
                                                        fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        boxShadow: formData.nps === score ? '0 0 15px rgba(244, 139, 54, 0.3)' : 'none'
                                                    }}
                                                >
                                                    {score}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div>
                                        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <MessageSquare size={20} color="#F48B36" /> One last thing...
                                            </h3>
                                            <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                                                What changed for you? What did you like most?
                                            </p>
                                        </div>
                                        <textarea
                                            value={formData.testimonial}
                                            onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                                            placeholder="This workshop helped me clarify..."
                                            rows={5}
                                            autoFocus
                                            style={{
                                                width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
                                                color: 'white', fontSize: '1rem', outline: 'none', resize: 'none',
                                                fontFamily: 'inherit', transition: 'all 0.2s',
                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                                            }}
                                            onFocus={(e) => { e.target.style.borderColor = '#F48B36'; e.target.style.background = 'rgba(244, 139, 54, 0.05)'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <button
                            onClick={handleNext}
                            disabled={
                                (step === 1 && formData.overallRating === 0) ||
                                (step === 2 && formData.trainerRating === 0) ||
                                (step === 3 && formData.nps === null) ||
                                submitting
                            }
                            style={{
                                marginTop: '2.5rem',
                                width: '100%',
                                padding: '1.2rem',
                                background: ((step === 1 && formData.overallRating > 0) || (step === 2 && formData.trainerRating > 0) || (step === 3 && formData.nps !== null) || (step === 4))
                                    ? 'linear-gradient(135deg, #F48B36 0%, #FFB74D 100%)'
                                    : 'rgba(255,255,255,0.05)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                boxShadow: ((step === 1 && formData.overallRating > 0) || (step === 2 && formData.trainerRating > 0) || (step === 3 && formData.nps !== null) || (step === 4))
                                    ? '0 10px 30px rgba(244, 139, 54, 0.25)'
                                    : 'none',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                opacity: ((step === 1 && formData.overallRating > 0) || (step === 2 && formData.trainerRating > 0) || (step === 3 && formData.nps !== null) || (step === 4)) ? 1 : 0.5
                            }}
                        >
                            {step === 4
                                ? (submitting ? 'Generating Certificate...' : <>Unlocking Certificate <Award size={20} /></>)
                                : <>Continue <ChevronRight size={20} /></>
                            }
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
