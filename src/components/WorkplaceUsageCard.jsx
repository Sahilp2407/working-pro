import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Briefcase, Mail, FileText, Lightbulb, FileCheck, Image, Smartphone, Cpu, Zap, Puzzle, User } from 'lucide-react';

const UseCaseSection = ({ title, icon, color, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ marginBottom: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden', flexShrink: 0 }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    textAlign: 'left'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        padding: '8px',
                        background: `${color}20`,
                        borderRadius: '8px',
                        color: color
                    }}>
                        {icon}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{title}</span>
                </div>
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div style={{ padding: '0 1rem 1rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function WorkplaceUsageCard({ day = 'day1' }) {
    if (day === 'day1') {
        return (
            <div style={cardStyle}>
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={headerStyle}>AI at Work (Today)</h3>
                    <p style={subHeaderStyle}>Why this session matters from Day One</p>
                </div>

                <UseCaseSection title="Drafting emails" icon={<Mail size={18} />} color="#3b82f6">
                    <ContentBlock title="What this means:" text="AI can write a full professional email almost instantly." />
                    <ContentBlock title="How it works:" text="You tell AI who it's for, what to say, and the tone." />
                    <CodeBlock text='"Write a polite email to my manager asking for 2 days leave."' />
                </UseCaseSection>

                <UseCaseSection title="Summarizing reports" icon={<FileText size={18} />} color="#a855f7">
                    <ContentBlock title="What this means:" text="AI reads long docs and gives short summaries." />
                    <ContentBlock title="Why it matters:" text="Faster decision making, no need to read everything." />
                    <CodeBlock text='"Summarize this 10-page report into 5 bullet points."' />
                </UseCaseSection>

                <UseCaseSection title="Brainstorming Ideas" icon={<Lightbulb size={18} />} color="#eab308">
                    <ContentBlock title="What this means:" text="AI helps you think when you’re stuck." />
                    <ContentBlock title="Why it matters:" text="Removes creative blocks and gives starting points." />
                    <CodeBlock text='"Give me 10 Instagram content ideas for a fitness brand."' />
                </UseCaseSection>

                <UseCaseSection title="Notes to Documents" icon={<FileCheck size={18} />} color="#22c55e">
                    <ContentBlock title="What this means:" text="AI converts rough notes into professional docs." />
                    <ContentBlock title="Where used:" text="Meeting notes → formal summary." />
                    <CodeBlock text='"Convert these meeting notes into a professional summary."' />
                </UseCaseSection>

                <Footer
                    title="Why This Slide Works"
                    items={["Instantly answers: 'Why carry?'", "Shows real work problems", "No jargon, no coding"]}
                    quote='"AI is already doing these things today. This session is about learning how to use it correctly."'
                />
            </div>
        );
    }

    return (
        <div style={cardStyle}>
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={headerStyle}>AI at Work (Advanced)</h3>
                <p style={subHeaderStyle}>Automation, Visuals & Custom Agents</p>
            </div>

            <UseCaseSection title="Professional Visuals" icon={<Image size={18} />} color="#f472b6">
                <ContentBlock title="What this means:" text="AI can create posters, LinkedIn creatives, and slide visuals." />
                <ContentBlock title="How it works:" text="Describe what you want -> AI creates image." />
                <CodeBlock text='"Create a clean LinkedIn post visual announcing a leadership workshop."' />
            </UseCaseSection>

            <UseCaseSection title="Ideas to Video" icon={<Smartphone size={18} />} color="#f43f5e">
                <ContentBlock title="What this means:" text="AI can convert text or images into short videos." />
                <ContentBlock title="Why it matters:" text="Video grabs attention, no editing skills required." />
                <CodeBlock text='"Turn this poster into a 6-second animated video."' />
            </UseCaseSection>

            <UseCaseSection title="Custom AI Helper" icon={<Cpu size={18} />} color="#8b5cf6">
                <ContentBlock title="What this means:" text="Create an AI that acts as a specialist." />
                <ContentBlock title="Example:" text="HR policy assistant, Sales follow-up writer." />
                <CodeBlock text='"Create an HR assistant that answers policy questions in simple English."' />
            </UseCaseSection>

            <UseCaseSection title="Automating Workflows" icon={<Zap size={18} />} color="#eab308">
                <ContentBlock title="What this means:" text="AI handles steps automatically." />
                <ContentBlock title="Example:" text="Trigger → AI thinks → AI acts." />
                <CodeBlock text='"When a new lead is added, summarize it and send to Slack."' />
            </UseCaseSection>

            <UseCaseSection title="Connecting Tools" icon={<Puzzle size={18} />} color="#14b8a6">
                <ContentBlock title="What this means:" text="AI works across apps like Sheets, Email, Slack." />
                <ContentBlock title="Example:" text="New row in sheet → AI summary → email to manager." />
            </UseCaseSection>

            <UseCaseSection title="The AI Person" icon={<User size={18} />} color="#06b6d4">
                <ContentBlock title="What this means:" text="You become the go-to person for AI at work." />
                <ContentBlock title="Why it matters:" text="More visibility, career growth, leadership advantage." />
            </UseCaseSection>

            <Footer
                title="Why This Slide Works"
                items={["Instantly answers: 'What's in it for me?'", "Shows practical next-level use", "Day 1 → Understanding, Day 2 → Applying"]}
                quote='"Day One showed you what AI can do. Day Two shows how it fits into your work."'
            />
        </div>
    );
}

// Sub-components for cleaner code
const ContentBlock = ({ title, text }) => (
    <div style={{ marginBottom: '1rem' }}>
        <strong style={{ color: 'var(--text-primary)' }}>{title}</strong>
        <br />{text}
    </div>
);

const CodeBlock = ({ text }) => (
    <div style={{ background: 'var(--code-bg)', padding: '0.75rem', borderRadius: '8px', fontStyle: 'italic' }}>
        {text}
    </div>
);

const Footer = ({ title, items, quote }) => (
    <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <Briefcase size={20} color="var(--text-primary)" />
            <strong style={{ fontSize: '0.9rem' }}>{title}</strong>
        </div>
        <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>

        <div style={{ marginTop: '1.5rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--text-primary)' }}>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
                {quote}
            </p>
        </div>
    </div>
);

const cardStyle = {
    background: 'var(--bg-primary)',
    borderLeft: '1px solid var(--border-color)',
    padding: '2rem 1.5rem',
    height: 'calc(100vh - 60px)',
    position: 'sticky',
    top: '60px',
    overflowY: 'auto',
    width: '320px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column'
};

const headerStyle = { fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' };
const subHeaderStyle = { fontSize: '0.85rem', color: 'var(--text-secondary)' };
