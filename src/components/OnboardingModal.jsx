import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const JOB_ROLES = [
    "Account Executive", "Account Manager", "Accountant", "Administrative Assistant", "Agile Coach", "AI Engineer", "Android Developer", "Architect", "Art Director", "Attorney", "Auditor",
    "Backend Developer", "Blockchain Developer", "Brand Manager", "Business Analyst", "Business Development Manager", "Business Intelligence Developer",
    "CEO", "CFO", "Chemical Engineer", "Chief Information Officer (CIO)", "Chief Marketing Officer (CMO)", "Chief Operating Officer (COO)", "Chief Product Officer (CPO)", "Chief Technology Officer (CTO)", "Civil Engineer", "Cloud Architect", "Cloud Engineer", "Co-Founder", "Communications Manager", "Community Manager", "Compliance Officer", "Computer Vision Engineer", "Consultant", "Content Strategist", "Content Writer", "Controller", "Copywriter", "Corporate Trainer", "Creative Director", "Customer Success Manager", "Cybersecurity Analyst",
    "Data Analyst", "Data Engineer", "Data Scientist", "Database Administrator", "Database Developer", "Deep Learning Researcher", "Dentist", "DevOps Engineer", "Digital Marketer", "Director of Engineering", "Director of Product",
    "Electrical Engineer", "Embedded Systems Engineer", "Engineering Manager", "Ethical Hacker", "Event Manager", "Executive Assistant",
    "Finance Manager", "Financial Analyst", "Firmware Engineer", "Flutter Developer", "Founder", "Frontend Developer", "Full Stack Developer",
    "Game Developer", "General Manager", "Graphic Designer", "Growth Hacker",
    "Hardware Engineer", "Head of Engineering", "Head of Marketing", "Head of Product", "Help Desk Technician", "HR Business Partner", "HR Director", "HR Manager",
    "Information Security Manager", "Instructional Designer", "Intern", "Investment Banker", "iOS Developer", "IT Manager", "IT Support Specialist",
    "Java Developer", "Journalist", "Junior Software Engineer",
    "Legal Counsel", "Logistics Coordinator",
    "Machine Learning Engineer", "Management Consultant", "Marketing Coordinator", "Marketing Manager", "Mechanical Engineer", "Mobile Developer",
    "Network Engineer", "Nurse",
    "Office Manager", "Operations Manager",
    "Paralegal", "Performance Marketer", "Pharmacist", "Physician", "Platform Engineer", "Principal Engineer", "Procurement Specialist", "Product Designer", "Product Manager", "Product Owner", "Professor", "Project Manager", "Psychologist", "Public Relations Specialist", "Python Developer",
    "QA Engineer", "Quality Assurance Manager",
    "React Native Developer", "Recruiter", "Release Manager", "Researcher", "Risk Manager", "Robotics Engineer",
    "Sales Director", "Sales Manager", "Sales Representative", "Scrum Master", "Senior Software Engineer", "SEO Specialist", "Site Reliability Engineer (SRE)", "Social Media Manager", "Software Architect", "Software Engineer", "Solutions Architect", "Staff Engineer", "Strategist", "Student", "Supply Chain Manager", "Support Specialist", "System Administrator",
    "Talent Acquisition Specialist", "Teacher", "Technical Lead", "Technical Program Manager", "Technical Recruiter", "Technical Writer", "Test Automation Engineer",
    "UI Designer", "UI/UX Designer", "User Researcher", "UX Designer", "UX Researcher",
    "VP of Engineering", "VP of HR", "VP of Marketing", "VP of Product", "VP of Sales",
    "Web Developer"
].sort();

const DEPARTMENTS = [
    "HR", "Marketing", "Sales", "Operations", "Finance", "Product", "IT", "Other"
];

const CTC_RANGES = [
    "< ₹5L", "₹5–10L", "₹10–20L", "₹20–35L", "₹35L+"
];

export default function OnboardingModal({ isOpen, onClose, onComplete }) {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        profession: '',
        organization: '',
        department: '',
        role: '',
        ctc: ''
    });

    const [roleSearch, setRoleSearch] = useState('');
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);

    const [loading, setLoading] = useState(false);

    // Initial question: Student / Working Professional / Fresher
    const handleProfessionSelect = (profession) => {
        const newData = { ...formData, profession };
        setFormData(newData);

        if (profession === 'Student' || profession === 'Fresher') {
            // Skip remaining questions
            handleComplete(newData);
        } else {
            // Go to next step for Working Professionals
            setStep(2);
        }
    };

    const handleComplete = (data) => {
        const finalData = data || formData;
        setLoading(true);
        console.log("Survey Data:", finalData);

        // Fire and forget DB save to prevent hanging
        if (user) {
            setDoc(doc(db, 'users', user.uid), {
                onboarding: finalData,
                profile: finalData
            }, { merge: true }).catch(e => console.error("Error saving onboarding:", e));
        }

        // Ensure we proceed after a short delay for UX
        setTimeout(() => {
            setLoading(false);
            onComplete();
        }, 1500);
    };

    // ... (rest of code)



    const filteredRoles = useMemo(() => {
        return JOB_ROLES.filter(role =>
            role.toLowerCase().includes(roleSearch.toLowerCase())
        );
    }, [roleSearch]);

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
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    style={{
                        background: '#09090b', // Darker, more premium bg
                        backgroundImage: 'radial-gradient(circle at top right, rgba(255, 87, 34, 0.08), transparent 40%)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '500px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                        position: 'relative'
                        // Removed overflow: hidden so dropdown can show
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '1.5rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderTopLeftRadius: '24px',
                        borderTopRightRadius: '24px'
                    }}>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'white',
                            background: 'linear-gradient(to right, #fff, #a1a1aa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {step === 1 ? 'Welcome to Day 1' : 'KYC :- Know Your Customer'}
                        </h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#a1a1aa',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Progress Bar (Only for Step 2+) */}
                    {step > 1 && (
                        <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', width: '100%' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${((step - 1) / 4) * 100}%` }}
                                style={{ height: '100%', background: '#FF5722' }}
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div style={{ padding: '2rem' }}>
                        {step === 1 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <p style={{ color: '#a1a1aa', marginBottom: '1rem' }}>You are currently:</p>
                                {['Student', 'Fresher', 'Working Professional'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => handleProfessionSelect(item)}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'white',
                                            textAlign: 'left',
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 87, 34, 0.1)';
                                            e.currentTarget.style.borderColor = '#FF5722';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        }}
                                    >
                                        {item}
                                        <ChevronRight size={18} color="#a1a1aa" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 2 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                        Organization Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Google, Microsoft, Startup Inc."
                                        value={formData.organization}
                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '10px',
                                            color: 'white',
                                            outline: 'none',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={() => formData.organization && setStep(3)}
                                    disabled={!formData.organization}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        background: formData.organization ? '#FF5722' : 'rgba(255,255,255,0.1)',
                                        color: formData.organization ? 'white' : 'rgba(255,255,255,0.3)',
                                        border: 'none',
                                        cursor: formData.organization ? 'pointer' : 'not-allowed',
                                        fontWeight: 600,
                                        marginTop: '1rem'
                                    }}
                                >
                                    Continue
                                </button>
                            </div>
                        )}

                        {step === 3 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <p style={{ color: '#a1a1aa', marginBottom: '0.5rem' }}>Which department best matches you?</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    {DEPARTMENTS.map((dept) => (
                                        <button
                                            key={dept}
                                            onClick={() => {
                                                setFormData({ ...formData, department: dept });
                                                setStep(4);
                                            }}
                                            style={{
                                                padding: '0.875rem',
                                                borderRadius: '10px',
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: 'white',
                                                fontSize: '0.95rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
                                        >
                                            {dept}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                        Current Role / Job Title
                                    </label>
                                    <div
                                        onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                                        style={{
                                            padding: '0.875rem',
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '10px',
                                            color: formData.role ? 'white' : '#666',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {formData.role || "Select or type your role"}
                                        <Search size={16} color="#666" />
                                    </div>

                                    {/* Dropdown */}
                                    {showRoleDropdown && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            right: 0,
                                            marginTop: '0.5rem',
                                            background: '#1a1a1a',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '12px',
                                            maxHeight: '250px', // Slightly reduced to ensure it fits
                                            overflowY: 'auto',
                                            zIndex: 9999, // High z-index to stay on top
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.8)' // Stronger shadow
                                        }}>
                                            <div style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, background: '#1a1a1a' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Search roles..."
                                                    value={roleSearch}
                                                    onChange={(e) => setRoleSearch(e.target.value)}
                                                    autoFocus
                                                    style={{
                                                        width: '100%',
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: 'white',
                                                        outline: 'none',
                                                        fontSize: '0.95rem'
                                                    }}
                                                />
                                            </div>

                                            {filteredRoles.map((role) => (
                                                <div
                                                    key={role}
                                                    onClick={() => {
                                                        setFormData({ ...formData, role });
                                                        setRoleSearch('');
                                                        setShowRoleDropdown(false);
                                                        setStep(5);
                                                    }}
                                                    style={{
                                                        padding: '0.75rem 1rem',
                                                        color: '#d4d4d8',
                                                        cursor: 'pointer',
                                                        fontSize: '0.95rem',
                                                        borderBottom: '1px solid rgba(255,255,255,0.02)'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 87, 34, 0.1)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    {role}
                                                </div>
                                            ))}

                                            {/* Other Option */}
                                            {roleSearch && !filteredRoles.includes(roleSearch) && (
                                                <div
                                                    onClick={() => {
                                                        setFormData({ ...formData, role: roleSearch });
                                                        setShowRoleDropdown(false);
                                                        setStep(5);
                                                    }}
                                                    style={{
                                                        padding: '0.75rem 1rem',
                                                        color: '#FF5722',
                                                        cursor: 'pointer',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    Use "{roleSearch}"
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <p style={{ color: '#a1a1aa', marginBottom: '1rem', fontSize: '0.95rem' }}>Your current annual CTC range:</p>
                                {CTC_RANGES.map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setFormData({ ...formData, ctc: range })}
                                        style={{
                                            padding: '1.2rem',
                                            borderRadius: '16px',
                                            background: formData.ctc === range
                                                ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.02))'
                                                : 'rgba(255, 255, 255, 0.02)',
                                            border: formData.ctc === range
                                                ? '1px solid #10b981'
                                                : '1px solid rgba(255, 255, 255, 0.06)',
                                            color: formData.ctc === range ? '#10b981' : 'white',
                                            textAlign: 'left',
                                            fontSize: '1.05rem',
                                            fontWeight: formData.ctc === range ? 600 : 400,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            boxShadow: formData.ctc === range ? '0 0 20px rgba(16, 185, 129, 0.1)' : 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (formData.ctc !== range) {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (formData.ctc !== range) {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                                            }
                                        }}
                                    >
                                        {range}
                                        {formData.ctc === range && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            >
                                                <Check size={20} color="#10b981" strokeWidth={3} />
                                            </motion.div>
                                        )}
                                    </button>
                                ))}

                                <button
                                    onClick={() => formData.ctc && handleComplete(formData)}
                                    disabled={!formData.ctc || loading}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '16px',
                                        background: formData.ctc ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(255,255,255,0.05)',
                                        color: formData.ctc ? 'white' : 'rgba(255,255,255,0.2)',
                                        border: 'none',
                                        cursor: (formData.ctc && !loading) ? 'pointer' : 'not-allowed',
                                        fontWeight: 700,
                                        marginTop: '1.5rem',
                                        fontSize: '1.1rem',
                                        width: '100%',
                                        boxShadow: formData.ctc ? '0 10px 25px -5px rgba(16, 185, 129, 0.4)' : 'none',
                                        transition: 'all 0.3s ease',
                                        opacity: (formData.ctc && !loading) ? 1 : 0.7,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                    onMouseEnter={(e) => (formData.ctc && !loading) && (e.currentTarget.style.transform = 'translateY(-2px)')}
                                    onMouseLeave={(e) => (formData.ctc && !loading) && (e.currentTarget.style.transform = 'translateY(0)')}
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
