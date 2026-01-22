import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Zap, CheckCircle2, Lock } from 'lucide-react';

const toolCategories = [
    {
        name: "Text & Chat",
        tools: [
            { name: "ChatGPT", src: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", url: "https://chatgpt.com" },
            { name: "Claude", src: "https://upload.wikimedia.org/wikipedia/commons/7/77/Anthropic_logo.svg", url: "https://claude.ai" },
            { name: "Gemini", src: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg", url: "https://gemini.google.com" },
            { name: "Jasper", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Jasper_AI_logo.svg/512px-Jasper_AI_logo.svg.png", url: "https://jasper.ai" },
            { name: "Notion AI", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", url: "https://notion.so" },
        ]
    },
    {
        name: "Image Gen",
        tools: [
            { name: "DALL·E", src: "https://cdn.worldvectorlogo.com/logos/openai-2.svg", url: "https://openai.com/dall-e-3" },
            { name: "Midjourney", src: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Midjourney_Emblem.png", url: "https://midjourney.com" },
            { name: "Stable Diffusion", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Stability_AI_logo.svg/512px-Stability_AI_logo.svg.png", url: "https://stability.ai" },
            { name: "Adobe Firefly", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Adobe_Firefly_Icon.svg/512px-Adobe_Firefly_Icon.svg.png", url: "https://firefly.adobe.com" },
        ]
    },
    {
        name: "Video AI",
        tools: [
            { name: "Runway", src: "https://cdn.worldvectorlogo.com/logos/runway-1.svg", url: "https://runwayml.com" },
            { name: "Pika", src: "", url: "https://pika.art" },
            { name: "Synthesia", src: "https://cdn.worldvectorlogo.com/logos/synthesia-1.svg", url: "https://synthesia.io" },
            { name: "HeyGen", src: "", url: "https://heygen.com" },
        ]
    },
    {
        name: "Voice & Audio",
        tools: [
            { name: "ElevenLabs", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/ElevenLabs_logo.svg/512px-ElevenLabs_logo.svg.png", url: "https://elevenlabs.io" },
            { name: "PlayHT", src: "", url: "https://play.ht" },
            { name: "Descript", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Descript_logo.svg/512px-Descript_logo.svg.png", url: "https://descript.com" },
        ]
    },
    {
        name: "Coding",
        tools: [
            { name: "GitHub Copilot", src: "https://upload.wikimedia.org/wikipedia/commons/2/29/GitHub_Copilot_logo.svg", url: "https://github.com/features/copilot" },
            { name: "Replit AI", src: "https://upload.wikimedia.org/wikipedia/commons/7/78/Replit_Logo.svg", url: "https://replit.com/ai" },
            { name: "CodeWhisperer", src: "", url: "https://aws.amazon.com/codewhisperer/" },
        ]
    },
    {
        name: "Design & UI",
        tools: [
            { name: "Uizard", src: "https://cdn.worldvectorlogo.com/logos/uizard-1.svg", url: "https://uizard.io" },
            { name: "Galileo AI", src: "", url: "https://usegalileo.ai" },
        ]
    }
];

export default function Sidebar({ topics, activeId, completedSections = [] }) {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const isTopicLocked = (index) => {
        return false;
        // if (index === 0) return false;
        // return !completedSections.includes(topics[index - 1].id);
    };

    return (
        <nav style={{
            width: 'var(--sidebar-width)',
            height: 'calc(100vh - 60px)',
            position: 'sticky',
            top: '60px',
            overflowY: 'auto',
            padding: '2rem 1rem',
            borderRight: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            display: window.innerWidth < 1024 ? 'none' : 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    marginBottom: '1rem',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-secondary)'
                }}>
                    Topics
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {topics.map((topic, index) => {
                        const locked = isTopicLocked(index);
                        const done = completedSections.includes(topic.id);

                        return (
                            <li key={topic.id} style={{ marginBottom: '0.5rem' }}>
                                <button
                                    onClick={() => !locked && scrollToSection(topic.id)}
                                    style={{
                                        border: 'none',
                                        cursor: locked ? 'not-allowed' : 'pointer',
                                        textAlign: 'left',
                                        width: '100%',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.9rem',
                                        color: activeId === topic.id ? 'var(--text-primary)' : (locked ? 'var(--text-secondary)' : 'var(--text-secondary)'),
                                        fontWeight: activeId === topic.id ? 600 : 400,
                                        borderRadius: '6px',
                                        background: activeId === topic.id ? 'var(--bg-secondary)' : 'none',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        opacity: locked ? 0.5 : 1
                                    }}
                                >
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {topic.title}
                                    </span>
                                    {done && <CheckCircle2 size={14} color="#10b981" />}
                                    {locked && <Lock size={14} />}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{
                    marginBottom: '1rem',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Zap size={14} /> AI Ecosystem
                </div>

                {toolCategories.map((cat, idx) => (
                    <ToolCategory key={idx} category={cat} />
                ))}
            </div>
        </nav>
    );
}

const ToolCategory = ({ category }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div style={{ marginBottom: '1rem' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '0.25rem 0',
                    marginBottom: '0.25rem'
                }}
            >
                {category.name}
                {/* Fixed visibility here: Only show chevron if collapsible interaction is desired, currently standard list view is cleaner for scanning */}
            </button>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem'
            }}>
                {category.tools.map((tool, idx) => (
                    <a
                        key={idx}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.4rem',
                            borderRadius: '6px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            overflow: 'hidden',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent-color)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {tool.src && (
                            <img
                                src={tool.src}
                                alt={tool.name}
                                onError={(e) => e.target.style.display = 'none'}
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    objectFit: 'contain',
                                    flexShrink: 0
                                }}
                            />
                        )}
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {tool.name}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}
