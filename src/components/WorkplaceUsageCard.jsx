import React from 'react';
import { Briefcase } from 'lucide-react';
import { db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function WorkplaceUsageCard({ day = 'day1', style = {} }) {
    const isDay1 = day === 'day1';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

    const responsiveCardStyle = {
        background: 'var(--bg-primary)',
        borderLeft: isMobile ? 'none' : '1px solid var(--border-color)',
        borderBottom: isMobile ? '1px solid var(--border-color)' : 'none',
        padding: isMobile ? '1.5rem 1rem' : '2rem 1.5rem',
        height: isMobile ? 'auto' : 'calc(100vh - 60px)',
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? '0' : '60px',
        overflowY: isMobile ? 'visible' : 'auto',
        width: isMobile ? '100%' : '320px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        ...style
    };

    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
        const docRef = doc(db, 'config', 'liveSession');
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setSessionData(docSnap.data());
            }
        });
        return () => unsubscribe();
    }, []);

    // Fallback data
    const dayConfig = isDay1 ? (sessionData?.day1) : (sessionData?.day2);
    const mentor = sessionData?.mentor || { name: 'Sahil Pandey', title: 'AI & ML Specialist' };
    const title = dayConfig?.title || (isDay1 ? 'Fundamentals' : 'Advanced Applications');
    const time = dayConfig?.time || (isDay1 ? 'Monday, 6:00 PM - 8:00 PM IST' : 'Tuesday, 6:00 PM - 8:00 PM IST');
    const link = dayConfig?.link || 'https://meet.google.com/your-meeting-link';

    return (
        <div style={responsiveCardStyle}>
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #FF5722 0%, #F48B36 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Live Session Details
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Join the {isDay1 ? 'Day 1 Fundamentals' : 'Day 2 Advanced'} class
                </p>
            </div>

            {/* Session Time */}
            <div style={{
                marginBottom: '1.5rem',
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(255, 87, 34, 0.08) 0%, rgba(244, 139, 54, 0.08) 100%)',
                borderRadius: '16px',
                border: '2px solid rgba(255, 87, 34, 0.2)',
                boxShadow: '0 4px 15px rgba(255, 87, 34, 0.1)'
            }}>
                <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#ff8a65',
                    marginBottom: '0.75rem'
                }}>
                    📅 Session Time
                </div>
                <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem'
                }}>
                    Day {isDay1 ? '1' : '2'} - {title}
                </div>
                <div style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                }}>
                    {time}
                </div>
            </div>

            {/* Mentor Info */}
            <div style={{
                marginBottom: '1.5rem',
                padding: '1.25rem',
                background: 'var(--bg-secondary)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#ff8a65',
                    marginBottom: '0.75rem'
                }}>
                    👨‍🏫 Mentor
                </div>
                <div style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem'
                }}>
                    {mentor.name}
                </div>
                <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                }}>
                    {mentor.title}
                </div>
            </div>

            {/* Class Link */}
            <div style={{
                marginBottom: '1.5rem',
                padding: '1.25rem',
                background: 'var(--bg-secondary)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#ff8a65',
                    marginBottom: '0.75rem'
                }}>
                    🔗 Join Class
                </div>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'block',
                        padding: '0.75rem',
                        background: 'linear-gradient(135deg, rgba(255, 87, 34, 0.1) 0%, rgba(244, 139, 54, 0.1) 100%)',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 87, 34, 0.3)',
                        color: '#ff8a65',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        wordBreak: 'break-all',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 87, 34, 0.2) 0%, rgba(244, 139, 54, 0.2) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(255, 87, 34, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 87, 34, 0.1) 0%, rgba(244, 139, 54, 0.1) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(255, 87, 34, 0.3)';
                    }}
                >
                    {link.replace('https://', '')}
                </a>
            </div>

            {/* Join Button */}
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '1.1rem',
                    background: 'linear-gradient(135deg, #FF5722 0%, #F48B36 100%)',
                    color: '#ffffff',
                    borderRadius: '14px',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(255, 87, 34, 0.3)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 87, 34, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 87, 34, 0.3)';
                }}
            >
                🎥 Join Live Session
            </a>

            {/* Info Note */}
            <div style={{
                marginTop: 'auto',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border-color)'
            }}>
                <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '1rem',
                    borderRadius: '10px',
                    borderLeft: '3px solid #FF5722'
                }}>
                    <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.5',
                        margin: 0
                    }}>
                        💡 <strong style={{ color: 'var(--text-primary)' }}>Pro Tip:</strong> Join 5 minutes early to test your audio and video setup.
                    </p>
                </div>
            </div>
        </div>
    );
}


