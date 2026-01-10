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
    const outcomes = ["Promotion", "Role Switch", "Acceleration"];

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
            minHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)',
            paddingTop: 'clamp(7rem, 12vh, 9rem)',
            paddingBottom: 'clamp(8rem, 15vh, 10rem)'
        }}>
            {/* Canvas Background */}
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />

            {/* Main Content Container */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 clamp(1rem, 4vw, 2rem)',
                position: 'relative',
                zIndex: 1,
                width: '100%'
            }}>

                {/* Inline CSS for animations */}
                <style>
                    {`
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(5px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        @keyframes gradientShift {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                        @keyframes float {
                            0%, 100% { transform: translate(0, 0); }
                            50% { transform: translate(30px, -30px); }
                        }
                        @keyframes buttonPulse {
                            0%, 100% { box-shadow: 0 0 0 0 rgba(255, 170, 2, 0.7); }
                            50% { box-shadow: 0 0 0 20px rgba(255, 170, 2, 0); }
                        }
                        @keyframes pulse {
                            0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.15; }
                            50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.25; }
                            100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.15; }
                        }
                        @keyframes textGlow {
                            0% { text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 170, 2, 0.1); }
                            50% { text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), 0 0 30px rgba(255, 170, 2, 0.4); }
                            100% { text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 170, 2, 0.1); }
                        }
                        @keyframes shimmerText {
                            0% { background-position: -200% 0; }
                            100% { background-position: 200% 0; }
                        }
                        @keyframes glow {
                            0% { opacity: 0.6; }
                            50% { opacity: 1; }
                            100% { opacity: 0.6; }
                        }
                        @keyframes expandContract {
                            0% { width: 120px; }
                            50% { width: 150px; }
                            100% { width: 120px; }
                        }
                        @keyframes bounce {
                            0%, 100% { transform: translateX(-50%) translateY(0); }
                            50% { transform: translateX(-50%) translateY(-10px); }
                        }
                        @keyframes scroll {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        @keyframes slideUpFade {
                            0% {
                                opacity: 0;
                                transform: translateY(30px) scale(0.95);
                            }
                            100% {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }
                    `}
                </style>
                {/* CTA Section - Simple & Clean */}
                <div ref={ctaRef} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'clamp(1.5rem, 4vw, 2.5rem)',
                    marginBottom: 'clamp(2rem, 6vw, 4rem)',
                    textAlign: 'center'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(1.1rem, 4vw, 2rem)',
                        color: '#FFAA02',
                        fontWeight: 600,
                        margin: 0,
                        letterSpacing: '-0.01em',
                        marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
                    }}>
                        Why LetsUpgrade?
                    </h1>

                    <h2
                        key={outcomeIndex}
                        style={{
                            fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                            color: 'var(--text-primary)',
                            fontWeight: 900,
                            margin: 0,
                            lineHeight: 1,
                            letterSpacing: '-0.04em',
                            textAlign: 'center',
                            animation: 'slideUpFade 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
                        }}
                    >
                        GET {outcomes[outcomeIndex]}
                    </h2>

                    {/* Simple Tagline */}
                    <p style={{
                        fontSize: 'clamp(1rem, 3vw, 1.75rem)',
                        fontWeight: 600,
                        color: '#1a1a1a',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.5,
                        margin: 0,
                        textAlign: 'center',
                        maxWidth: '700px',
                        padding: '0 1rem'
                    }}>
                        Future-proof your career—
                        <br />
                        <span style={{
                            color: '#FFAA02',
                            fontWeight: 700
                        }}>without quitting your job.</span>
                    </p>
                </div>



                {/* Feature Boxes - Auto Horizontal Scroll */}
                <div style={{
                    width: '100%',
                    marginTop: 'clamp(2rem, 5vw, 3.5rem)',
                    marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
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
                            <div key={`first-${index}`}
                                className="feature-card"
                                style={{
                                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF8 100%)',
                                    border: '2px solid rgba(255, 170, 2, 0.15)',
                                    borderRadius: 'clamp(16px, 3vw, 24px)',
                                    padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 3vw, 2rem)',
                                    textAlign: 'center',
                                    transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                    cursor: 'default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 'clamp(0.75rem, 2vw, 1rem)',
                                    position: 'relative',
                                    boxShadow: '0 8px 30px rgba(255, 170, 2, 0.08)',
                                    overflow: 'hidden',
                                    minWidth: 'clamp(240px, 60vw, 280px)',
                                    flex: '0 0 auto'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-12px) scale(1.03) rotateY(5deg)';
                                    e.currentTarget.style.boxShadow = '0 30px 60px rgba(255, 170, 2, 0.25)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 170, 2, 0.5)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #FFF8E1 100%)';
                                    e.currentTarget.querySelector('.card-glow').style.opacity = 1;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 170, 2, 0.08)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 170, 2, 0.15)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF8 100%)';
                                    e.currentTarget.querySelector('.card-glow').style.opacity = 0;
                                }}
                            >
                                {/* Glow effect on hover */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-50%',
                                    left: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    background: 'radial-gradient(circle, rgba(255, 170, 2, 0.1) 0%, transparent 70%)',
                                    opacity: 0,
                                    transition: 'opacity 0.5s',
                                    pointerEvents: 'none'
                                }} className="card-glow" />
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
                                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF8 100%)',
                                    border: '2px solid rgba(255, 170, 2, 0.15)',
                                    borderRadius: 'clamp(16px, 3vw, 24px)',
                                    padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 3vw, 2rem)',
                                    textAlign: 'center',
                                    transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                    cursor: 'default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 'clamp(0.75rem, 2vw, 1rem)',
                                    position: 'relative',
                                    boxShadow: '0 8px 30px rgba(255, 170, 2, 0.08)',
                                    overflow: 'hidden',
                                    minWidth: 'clamp(240px, 60vw, 280px)',
                                    flex: '0 0 auto'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-12px) scale(1.03) rotateY(5deg)';
                                    e.currentTarget.style.boxShadow = '0 30px 60px rgba(255, 170, 2, 0.25)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 170, 2, 0.5)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #FFF8E1 100%)';
                                    e.currentTarget.querySelector('.card-glow').style.opacity = 1;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 170, 2, 0.08)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 170, 2, 0.15)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF8 100%)';
                                    e.currentTarget.querySelector('.card-glow').style.opacity = 0;
                                }}
                            >
                                {/* Glow effect on hover */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-50%',
                                    left: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    background: 'radial-gradient(circle, rgba(255, 170, 2, 0.1) 0%, transparent 70%)',
                                    opacity: 0,
                                    transition: 'opacity 0.5s',
                                    pointerEvents: 'none'
                                }} className="card-glow" />
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

                <div style={{
                    marginTop: 'clamp(2rem, 4vw, 3rem)',
                    position: 'relative',
                    display: 'inline-block',
                    width: '100%',
                    maxWidth: '400px'
                }}>
                    {/* Pulsing glow ring */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50px',
                        animation: 'pulse 2s ease-in-out infinite',
                        pointerEvents: 'none'
                    }} />

                    <button
                        onClick={() => navigate('/get-started')}
                        style={{
                            background: 'linear-gradient(135deg, #FFAA02 0%, #FF8C00 100%)',
                            color: '#000',
                            padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(2rem, 6vw, 3.5rem)',
                            borderRadius: '50px',
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                            fontWeight: 800,
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
                            boxShadow: '0 20px 60px -10px rgba(255, 170, 2, 0.5), 0 0 0 3px rgba(255, 170, 2, 0.1)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, { scale: 1.08, duration: 0.3 });
                            e.currentTarget.style.boxShadow = '0 25px 80px -10px rgba(255, 170, 2, 0.6), 0 0 0 4px rgba(255, 170, 2, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                            e.currentTarget.style.boxShadow = '0 20px 60px -10px rgba(255, 170, 2, 0.5), 0 0 0 3px rgba(255, 170, 2, 0.1)';
                        }}
                    >
                        {/* Shimmer effect */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                            animation: 'shimmer 3s infinite'
                        }} />
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
