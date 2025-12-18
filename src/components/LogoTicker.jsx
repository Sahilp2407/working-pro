import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    { name: 'ChatGPT', url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
    { name: 'Claude', url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Anthropic_logo.svg' },
    { name: 'Gemini', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg' },
    { name: 'Jasper', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Jasper_AI_logo.svg/2560px-Jasper_AI_logo.svg.png' },
    { name: 'Notion AI', url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
    { name: 'DALL·E', url: 'https://seeklogo.com/images/D/dall-e-logo-509D698B82-seeklogo.com.png' },
    { name: 'Midjourney', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Midjourney_Emblem.png' },
    { name: 'Stable Diffusion', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Stability_AI_logo.svg/1024px-Stability_AI_logo.svg.png' },
    { name: 'Adobe Firefly', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Adobe_Creative_Cloud_Rainbow_logo.svg/2560px-Adobe_Creative_Cloud_Rainbow_logo.svg.png' }, // Firefly generic fallback if specific logo hard to find, but checking firefly specifically.
];

// Correcting URLs to more reliable ones where possible or using what I have.
// Anthropic -> Claude
// Adobe Firefly specific logo is better if available, but CC logo is fallback. 
// Actually I'll use a better DALL-E and Firefly one if I can guess it.
// Let's use text for DALL-E if logo is bad.
// Re-defining for cleanliness:

const logoData = [
    { name: 'ChatGPT', src: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
    { name: 'Claude', src: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Anthropic_logo.svg' },
    { name: 'Gemini', src: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg' },
    { name: 'Jasper', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Jasper_AI_logo.svg/512px-Jasper_AI_logo.svg.png' },
    { name: 'Notion AI', src: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
    { name: 'DALL·E', src: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg' },
    { name: 'Midjourney', src: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Midjourney_Emblem.png' },
    { name: 'Stable Diffusion', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Stability_AI_logo.svg/512px-Stability_AI_logo.svg.png' },
    { name: 'Adobe Firefly', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Adobe_Firefly_Icon.svg/512px-Adobe_Firefly_Icon.svg.png' },
];

const LogoTicker = () => {
    return (
        <div style={{
            width: '100%',
            overflow: 'hidden',
            background: 'var(--bg-secondary)',
            padding: '2rem 0',
            borderTop: '1px solid var(--border-color)',
            borderBottom: '1px solid var(--border-color)',
            position: 'relative',
            marginTop: 'auto' // Push to bottom if flex container
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100px',
                height: '100%',
                background: 'linear-gradient(to right, var(--bg-secondary) 0%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100%',
                background: 'linear-gradient(to left, var(--bg-secondary) 0%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />

            <motion.div
                style={{ display: 'flex', gap: '4rem', width: 'max-content' }}
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30
                }}
            >
                {[...logoData, ...logoData].map((logo, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        opacity: 0.6,
                        filter: 'grayscale(100%)',
                        transition: 'all 0.3s'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = 1;
                            e.currentTarget.style.filter = 'grayscale(0%)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = 0.6;
                            e.currentTarget.style.filter = 'grayscale(100%)';
                        }}
                    >
                        <img
                            src={logo.src}
                            alt={logo.name}
                            onError={(e) => e.target.style.display = 'none'} // Hide if broken
                            style={{
                                height: '40px',
                                width: 'auto',
                                objectFit: 'contain',
                                maxHeight: '40px',
                                maxWidth: '120px'
                            }}
                        />
                        <span style={{
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            color: 'var(--text-secondary)',
                            whiteSpace: 'nowrap'
                        }}>
                            {logo.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default LogoTicker;
