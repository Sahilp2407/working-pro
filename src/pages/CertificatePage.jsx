import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Download, Linkedin, Mail, BookOpen, Copy, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function CertificatePage() {
    const { user, userData } = useAuth();
    const navigate = useNavigate();
    const certificateRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Get Name
    // Check onboarding data/profile first for full details
    const studentName =
        userData?.profile?.name ||
        userData?.onboarding?.name ||
        userData?.name ||
        user?.displayName ||
        "Student Name";

    // Get Date
    let dateStr = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    }); // Default to today

    if (userData?.surveys?.certificateDate) {
        dateStr = new Date(userData.surveys.certificateDate).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    }

    const handleDownload = async () => {
        if (certificateRef.current) {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: null
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save('GenAI_Masterclass_Certificate.pdf');
        }
    };

    const handleDownloadImage = async () => {
        if (certificateRef.current) {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: null
            });
            const link = document.createElement('a');
            link.download = 'GenAI_Masterclass_Certificate.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.8rem 1.5rem',
        borderRadius: '12px',
        fontSize: '0.95rem',
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        color: 'white'
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#121212',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            {/* Toolbar */}
            <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ color: 'white', margin: 0, fontSize: '2rem' }}>Congratulations, {studentName.split(' ')[0]}!</h2>

                {/* Main Download Button */}
                <button
                    onClick={handleDownload}
                    style={{
                        ...buttonStyle,
                        padding: '1rem 2rem',
                        fontSize: '1.1rem',
                        background: 'linear-gradient(135deg, #F48B36 0%, #D97706 100%)',
                        boxShadow: '0 4px 12px rgba(244, 139, 54, 0.3)',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Download size={22} /> Download Certificate
                </button>

                {/* Secondary Actions */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
                    {/* LinkedIn */}
                    {/* LinkedIn */}
                    <button
                        onClick={() => {
                            const text = `Hello Connection,\nI attended a GenAI Workshop by LetsUpgrade today and genuinely enjoyed it.\nThe concepts were explained in a super simple way (even for a non-technical background), and the real-life examples made it easy to understand how GenAI can be used in everyday work. Big thanks to the team for a clear and engaging session—practical and value-packed.\nIf you’re also looking to start learning AI/GenAI, you can register here:\nhttps://letsupgrade.in/programs/generative-ai-masterclass\nWant to go deeper next? Stay tuned for upcoming enrollments. Keep learning, keep leveling up 🚀\nTag:\nLetsupgrade: https://www.linkedin.com/company/letsupgrade-in/\nITM: https://www.linkedin.com/school/itm-group-of-institutions/\nLISA AI: https://www.linkedin.com/company/lisaapp-in/`;

                            // Auto download certificate as PNG (Image)
                            handleDownloadImage();

                            // Try to pre-fill text using the feed share URL
                            const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;

                            // Copy to clipboard as backup + Alert
                            navigator.clipboard.writeText(text).then(() => {
                                alert("Certificate Downloaded! Text has been copied/pre-filled. Please ATTACH the image to your post.");
                                window.open(linkedInUrl, '_blank');
                            });
                        }}
                        style={{
                            ...buttonStyle,
                            background: '#0077b5', // LinkedIn Blue
                            boxShadow: '0 4px 12px rgba(0, 119, 181, 0.3)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <Linkedin size={18} /> Share on LinkedIn
                    </button>

                    {/* Email */}
                    <a
                        href="mailto:?subject=Exciting News: Completed Gen AI Masterclass!&body=I am excited to share that I have just completed the Generative AI Masterclass!"
                        style={{
                            ...buttonStyle,
                            background: '#333',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <Mail size={18} /> Share on Email
                    </a>

                    {/* Hardcopy */}
                    <button
                        onClick={() => navigate('/hardcopy')}
                        style={{
                            ...buttonStyle,
                            background: '#333',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <BookOpen size={18} /> Get Hardcopy
                    </button>
                </div>
            </div>

            {/* Certificate Container */}
            <div
                ref={certificateRef}
                style={{
                    position: 'relative',
                    width: '900px', // Slightly larger display
                    maxWidth: '90vw',
                    aspectRatio: '1.414 / 1', // Standard landscape aspect rough
                    background: '#fff',
                    boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                    overflow: 'hidden'
                }}
            >
                {/* Background Image Template */}
                <img
                    src="/assets/certificate_template.png"
                    alt="Certificate Template"
                    onLoad={() => setImageLoaded(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                    }}
                />

                {/* Overlays - Adjust top/left percentages based on the image provided */}
                {imageLoaded && (
                    <>
                        {/* Name Overlay - Centered roughly above the middle line */}
                        <div style={{
                            position: 'absolute',
                            top: '42%',  // Adjusted based on visual estimation
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            textAlign: 'center',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '36px',
                            fontWeight: '700',
                            color: '#000',
                            textTransform: 'capitalize'
                        }}>
                            {studentName}
                        </div>

                        {/* Date Overlay - Bottom Right */}
                        <div style={{
                            position: 'absolute',
                            bottom: '14%', // Adjusted based on visual estimation of the 'Date' line
                            right: '12%', // Adjusted center
                            width: '200px',
                            textAlign: 'center',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '15px',
                            fontWeight: '600',
                            color: '#333'
                        }}>
                            {dateStr}
                        </div>
                    </>
                )}
            </div>
            {/* Upsell Promo Section */}
            <PromoSection />
        </div>
    );
}

function PromoSection() {
    const [step, setStep] = useState('question'); // 'question', 'yes', 'no'
    const [copied, setCopied] = useState(false);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{
            marginTop: '5rem',
            marginBottom: '3rem',
            width: '100%',
            maxWidth: '800px',
            background: 'linear-gradient(135deg, #1A1A1A 0%, #0d0d0d 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
                width: '300px', height: '300px', background: '#F48B36', opacity: 0.05, filter: 'blur(100px)', borderRadius: '50%'
            }} />

            {step === 'question' && (
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1rem', fontWeight: 700 }}>
                        Take Your AI Career to the Next Level?
                    </h3>
                    <p style={{ color: '#a1a1aa', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                        Are you interested in our 3-Month Premium AI Program for working professionals?
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <button
                            onClick={() => setStep('yes')}
                            style={{
                                padding: '1rem 2.5rem',
                                background: 'white',
                                color: 'black',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Yes, I'm Interested
                        </button>
                        <button
                            onClick={() => setStep('no')}
                            style={{
                                padding: '1rem 2.5rem',
                                background: 'transparent',
                                color: '#a1a1aa',
                                border: '1px solid #333',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = '#666';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = '#333';
                                e.currentTarget.style.color = '#a1a1aa';
                            }}
                        >
                            No, not right now
                        </button>
                    </div>
                </div>
            )}

            {step === 'yes' && (
                <div style={{ position: 'relative', zIndex: 1, animation: 'fadeIn 0.5s ease' }}>
                    <h3 style={{ fontSize: '1.8rem', color: '#4ade80', marginBottom: '0.5rem', fontWeight: 700 }}>
                        Fantastic Decision!
                    </h3>
                    <p style={{ color: '#d1d5db', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        Here is an exclusive <span style={{ color: 'white', fontWeight: 600 }}>₹5,000 Voucher</span> just for you.
                    </p>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        display: 'inline-flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        border: '1px dashed #F48B36'
                    }}>
                        <div style={{ fontSize: '0.9rem', color: '#a1a1aa', letterSpacing: '1px' }}>USE CODE AT CHECKOUT</div>
                        <div
                            onClick={() => handleCopy('MASTERCLASS5000')}
                            style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                color: '#F48B36',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            MASTERCLASS5000
                            {copied ? <Check size={24} color="#4ade80" /> : <Copy size={24} color="#666" />}
                        </div>
                        {copied && <span style={{ fontSize: '0.8rem', color: '#4ade80' }}>Copied to clipboard!</span>}
                    </div>

                    <button
                        onClick={() => window.open('https://letsupgrade.in/programs', '_blank')}
                        style={{
                            display: 'block',
                            margin: '2rem auto 0 auto',
                            color: 'white',
                            textDecoration: 'underline',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        View Programs &rarr;
                    </button>
                </div>
            )}

            {step === 'no' && (
                <div style={{ position: 'relative', zIndex: 1, animation: 'fadeIn 0.5s ease' }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '0.5rem', fontWeight: 700 }}>
                        No Problem at all!
                    </h3>
                    <p style={{ color: '#a1a1aa', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        But hey, here is a <span style={{ color: 'white', fontWeight: 600 }}>₹5,000 Gift Voucher</span> you can share with a friend who might benefit!
                    </p>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        display: 'inline-flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        border: '1px dashed #a1a1aa'
                    }}>
                        <div style={{ fontSize: '0.9rem', color: '#a1a1aa', letterSpacing: '1px' }}>GIFT THIS CODE</div>
                        <div
                            onClick={() => handleCopy('GIFT5000')}
                            style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                color: 'white',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            GIFT5000
                            {copied ? <Check size={24} color="#4ade80" /> : <Copy size={24} color="#666" />}
                        </div>
                        {copied && <span style={{ fontSize: '0.8rem', color: '#4ade80' }}>Copied to clipboard!</span>}
                    </div>
                </div>
            )}
        </div>
    );
}
