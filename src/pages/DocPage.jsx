import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import WorkplaceUsageCard from '../components/WorkplaceUsageCard';
import { day1Content, day2Content } from '../data/content.jsx';
import { ArrowLeft } from 'lucide-react';

export default function DocPage({ day }) {
    const navigate = useNavigate();
    const content = day === 'day1' ? day1Content : day2Content;
    const [activeId, setActiveId] = useState(content[0]?.id);

    // Scroll Spy Logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -50% 0px' }
        );

        content.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [content]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Top Bar */}
            <header style={{
                height: '60px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                position: 'sticky',
                top: 0,
                background: 'var(--bg-primary)',
                zIndex: 100,
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                        GEN AI / {day === 'day1' ? 'Day 1' : 'Day 2'}
                    </span>
                </div>
                <ThemeToggle />
            </header>

            {/* Main Layout */}
            <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
                <Sidebar topics={content} activeId={activeId} />

                <main style={{ flex: 1, padding: '4rem 6rem', maxWidth: '800px' }}>
                    {content.map((section, index) => (
                        <section
                            key={section.id}
                            id={section.id}
                            style={{ marginBottom: '6rem' }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <h2 style={{
                                    fontSize: '2rem',
                                    marginBottom: '1.5rem',
                                    paddingBottom: '0.5rem',
                                    borderBottom: '1px solid var(--border-color)'
                                }}>
                                    {section.title}
                                </h2>

                                <div className="doc-content">
                                    {section.content}
                                </div>
                            </motion.div>
                        </section>
                    ))}

                    <footer style={{ marginTop: '8rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        &copy; 2025 Gen AI Workshop. All rights reserved.
                    </footer>
                </main>

                <WorkplaceUsageCard day={day} />
            </div>
        </div>
    );
}
