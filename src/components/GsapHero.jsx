import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Target, TrendingUp, Rocket, Repeat, Crown, BrainCircuit, Map, FileCode, UserCheck, MessageSquare, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LogoTicker from './LogoTicker';

gsap.registerPlugin(ScrollTrigger);

export default function GsapHero() {
    const { user, userData } = useAuth();
    const navigate = useNavigate();
    const component = useRef(null);
    const textRef = useRef(null);
    const subtextRef = useRef(null);
    const ctaRef = useRef(null);
    const canvasRef = useRef(null);
    const floatRef1 = useRef(null);
    const floatRef2 = useRef(null);

    const [outcomeIndex, setOutcomeIndex] = useState(0);
    const [showSelection, setShowSelection] = useState(false);
    const outcomes = ["Promotion", "Role Switch", "Productivity Boost"];

    useEffect(() => {
        const interval = setInterval(() => {
            setOutcomeIndex((prev) => (prev + 1) % outcomes.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // ... (rest of GSAP code)
            // 1. Initial Reveal
            const tl = gsap.timeline();

            tl.from(ctaRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.6");

            // 2. Floating Elements Animation
            gsap.to(floatRef1.current, {
                y: -30,
                rotation: 10,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            gsap.to(floatRef2.current, {
                y: 40,
                x: -20,
                rotation: -15,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1
            });

            // 3. Mouse Parallax (Simple)
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 40;
                const y = (clientY / window.innerHeight - 0.5) * 40;

                gsap.to([floatRef1.current, floatRef2.current], {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, component);

        return () => ctx.revert();
    }, []);

    // Canvas Particle Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 60;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? 'hsla(48, 100%, 50%, 0.30)' : 'rgba(255, 170, 2, 0.3)'
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Connect particles
                particles.forEach((p2, j) => {
                    if (i === j) return;
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(150, 150, 150, ${0.1 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={component} style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)'
        }}>
            {/* Canvas Background */}
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />

            {/* Glowing Gradient Orbs */}
            <div ref={floatRef1} style={{
                position: 'absolute', top: '15%', right: '15%',
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(255, 170, 2, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            <div ref={floatRef2} style={{
                position: 'absolute', bottom: '15%', left: '10%',
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(255, 170, 2, 0.12) 0%, transparent 70%)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Main Content */}
            <div style={{ position: 'relative', zIndex: 10, padding: '0 2rem', textAlign: 'center', maxWidth: '1000px' }}>

                <style>
                    {`
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(5px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}
                </style>
                <div ref={ctaRef} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '3rem'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        color: '#FFAA02',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        margin: 0,
                        letterSpacing: '-0.5px'
                    }}>
                        Why LetsUpgrade ?
                    </h1>

                    <h2
                        key={outcomeIndex}
                        style={{
                            fontSize: 'clamp(3rem, 7vw, 6rem)',
                            color: 'var(--text-primary)',
                            fontWeight: 800,
                            margin: 0,
                            animation: 'fadeIn 0.5s ease',
                            opacity: 1,
                            lineHeight: 1.1,
                            whiteSpace: 'nowrap', // Force single line
                            minHeight: '1.5em', // Reduced minHeight for single line stability
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        GET {outcomes[outcomeIndex]}
                    </h2>
                </div>

                {/* Hero Text */}
                <div ref={textRef} style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                        position: 'relative'
                    }}>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.4,
                            margin: 0,
                            padding: '0.5rem 1rem',
                            position: 'relative',
                            display: 'inline-block',
                            animation: 'subtlePulse 3s ease-in-out infinite'
                        }}>
                            Future-proof your career—<span style={{
                                background: 'linear-gradient(135deg, #FFAA02 0%, #FF8C00 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontWeight: 700
                            }}>without quitting your job.</span>
                        </p>

                        {/* Decorative underline */}
                        <div style={{
                            width: '60px',
                            height: '3px',
                            background: 'linear-gradient(90deg, transparent, #FFAA02, transparent)',
                            margin: '1rem auto 0',
                            borderRadius: '2px',
                            animation: 'shimmer 2s ease-in-out infinite'
                        }} />
                    </div>

                </div>



                {/* Feature Boxes - Auto Horizontal Scroll */}
                <div style={{
                    width: '100%',
                    marginTop: '3.5rem',
                    marginBottom: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div
                        className="auto-scroll-container"
                        style={{
                            display: 'flex',
                            gap: '1.5rem',
                            animation: 'scroll 30s linear infinite',
                            width: 'max-content'
                        }}
                    >
                        {[
                            { icon: <Map size={28} color="#FFAA02" />, title: "Personalized Roadmap", desc: "Tailored learning path" },
                            { icon: <FileCode size={28} color="#FFAA02" />, title: "Proof-of-Work Projects", desc: "Build real portfolio" },
                            { icon: <UserCheck size={28} color="#FFAA02" />, title: "Resume + LinkedIn Upgrade", desc: "Stand out professionally" },
                            { icon: <MessageSquare size={28} color="#FFAA02" />, title: "Interview Prep + Mentors", desc: "Expert guidance" },
                            { icon: <Users size={28} color="#FFAA02" />, title: "Community + Weekly Sprints", desc: "Learn together" }
                        ].map((item, index) => (
                            <div key={index}
                                className="feature-card"
                                style={{
                                    background: '#FFFFFF',
                                    border: '1px solid rgba(255, 170, 2, 0.1)',
                                    borderRadius: '24px',
                                    padding: '2rem 1.8rem',
                                    textAlign: 'center',
                                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                    cursor: 'default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    position: 'relative',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                                    overflow: 'hidden',
                                    minWidth: '280px',
                                    flex: '0 0 auto'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 170, 2, 0.15)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 170, 2, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 170, 2, 0.1)';
                                }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: 'rgba(255, 170, 2, 0.08)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s'
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    margin: 0,
                                    lineHeight: 1.3
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#666',
                                    margin: 0,
                                    lineHeight: 1.5
                                }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}

                        {/* Duplicate for seamless loop */}
                        {[
                            { icon: <Map size={28} color="#FFAA02" />, title: "Personalized Roadmap", desc: "Tailored learning path" },
                            { icon: <FileCode size={28} color="#FFAA02" />, title: "Proof-of-Work Projects", desc: "Build real portfolio" },
                            { icon: <UserCheck size={28} color="#FFAA02" />, title: "Resume + LinkedIn Upgrade", desc: "Stand out professionally" },
                            { icon: <MessageSquare size={28} color="#FFAA02" />, title: "Interview Prep + Mentors", desc: "Expert guidance" },
                            { icon: <Users size={28} color="#FFAA02" />, title: "Community + Weekly Sprints", desc: "Learn together" }
                        ].map((item, index) => (
                            <div key={`dup-${index}`}
                                className="feature-card"
                                style={{
                                    background: '#FFFFFF',
                                    border: '1px solid rgba(255, 170, 2, 0.1)',
                                    borderRadius: '24px',
                                    padding: '2rem 1.8rem',
                                    textAlign: 'center',
                                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                    cursor: 'default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    position: 'relative',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                                    overflow: 'hidden',
                                    minWidth: '280px',
                                    flex: '0 0 auto'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 170, 2, 0.15)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 170, 2, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 170, 2, 0.1)';
                                }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: 'rgba(255, 170, 2, 0.08)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s'
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    margin: 0,
                                    lineHeight: 1.3
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#666',
                                    margin: 0,
                                    lineHeight: 1.5
                                }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <button
                        onClick={() => navigate('/get-started')}
                        style={{
                            background: 'linear-gradient(135deg, #FFAA02 0%, #F59E0B 100%)',
                            color: '#000',
                            padding: '1rem 3rem',
                            borderRadius: '50px',
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
                            boxShadow: '0 20px 40px -10px rgba(255, 170, 2, 0.3)'
                        }}
                        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 })}
                        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
                    >
                        Get Started <ArrowRight size={24} />
                    </button>
                </div>

                {/* Logo Ticker - Moved here */}
            </div>

            {/* Logo Ticker - Absolute Bottom */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 15,
                opacity: 0.9,
                background: 'var(--bg-primary)' // Blend seamlessly
            }}>
                <LogoTicker />
            </div>
        </div >
    );
}
