import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Zap } from 'lucide-react';

const toolCategories = [
    {
        name: "Text & Chat",
        tools: [
            { name: "ChatGPT", src: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
            { name: "Claude", src: "https://upload.wikimedia.org/wikipedia/commons/7/77/Anthropic_logo.svg" },
            { name: "Gemini", src: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
            { name: "Jasper", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Jasper_AI_logo.svg/512px-Jasper_AI_logo.svg.png" },
            { name: "Notion AI", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
        ]
    },
    {
        name: "Image Gen",
        tools: [
            { name: "DALL·E", src: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
            { name: "Midjourney", src: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Midjourney_Emblem.png" },
            { name: "Stable Diffusion", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Stability_AI_logo.svg/512px-Stability_AI_logo.svg.png" },
            { name: "Adobe Firefly", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Adobe_Firefly_Icon.svg/512px-Adobe_Firefly_Icon.svg.png" },
        ]
    },
    {
        name: "Video AI",
        tools: [
            { name: "Runway", src: "https://cdn.worldvectorlogo.com/logos/runway-1.svg" },
            { name: "Pika", src: "" }, // Fallback to text
            { name: "Synthesia", src: "https://cdn.worldvectorlogo.com/logos/synthesia-1.svg" },
            { name: "HeyGen", src: "" },
        ]
    },
    {
        name: "Voice & Audio",
        tools: [
            { name: "ElevenLabs", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/ElevenLabs_logo.svg/512px-ElevenLabs_logo.svg.png" }, // Hypothetical, fallback likely
            { name: "PlayHT", src: "" },
            { name: "Descript", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Descript_logo.svg/512px-Descript_logo.svg.png" },
        ]
    },
    {
        name: "Coding",
        tools: [
            { name: "GitHub Copilot", src: "https://upload.wikimedia.org/wikipedia/commons/2/29/GitHub_Copilot_logo.svg" },
            { name: "Replit AI", src: "https://upload.wikimedia.org/wikipedia/commons/7/78/Replit_Logo.svg" },
            { name: "CodeWhisperer", src: "" },
        ]
    },
    {
        name: "Design & UI",
        tools: [
            { name: "Uizard", src: "https://cdn.worldvectorlogo.com/logos/uizard-1.svg" },
            { name: "Galileo AI", src: "" },
        ]
    }
];

export default function Sidebar({ topics, activeId }) {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
            display: 'flex',
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
                    {topics.map(topic => (
                        <li key={topic.id} style={{ marginBottom: '0.5rem' }}>
                            <button
                                onClick={() => scrollToSection(topic.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    width: '100%',
                                    padding: '0.5rem 0.75rem',
                                    fontSize: '0.9rem',
                                    color: activeId === topic.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    fontWeight: activeId === topic.id ? 600 : 400,
                                    borderRadius: '6px',
                                    background: activeId === topic.id ? 'var(--bg-secondary)' : 'transparent',
                                    transition: 'all 0.2s ease',
                                    display: 'block'
                                }}
                            >
                                {topic.title}
                            </button>
                        </li>
                    ))}
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
                    <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.4rem',
                        borderRadius: '6px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        overflow: 'hidden'
                    }}>
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
                    </div>
                ))}
            </div>
        </div>
    );
}
