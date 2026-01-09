import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CreditCard, ShieldCheck, Mail, CheckCircle } from 'lucide-react';
import { db } from '../config/firebase';
import { doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function HardcopyPage() {
    const { user, userData } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Details, 2: Payment/Success
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: userData?.name || user?.displayName || '',
        email: userData?.email || user?.email || '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: userData?.phone || ''
    });

    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, failed

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await loadRazorpay();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        // Mock Order Creation - In production, this should call your backend
        const options = {
            key: "rzp_test_placeholder", // REPLACE WITH YOUR KEY
            amount: 39900, // Amount is in currency subunits. Default currency is INR. Hence, 39900 refers to 39900 paise
            currency: "INR",
            name: "Gen AI Masterclass",
            description: "Hardcopy Certificate Request",
            image: "https://letsupgrade.in/assets/logo.png",
            handler: async function (response) {
                // Payment Success
                setPaymentStatus('success');
                setStep(2);

                // Save Order to Firestore
                try {
                    await addDoc(collection(db, 'orders'), {
                        userId: user.uid,
                        type: 'hardcopy_certificate',
                        amount: 399,
                        paymentId: response.razorpay_payment_id,
                        shippingDetails: formData,
                        status: 'paid',
                        createdAt: serverTimestamp()
                    });
                } catch (error) {
                    console.error("Error saving order:", error);
                }
            },
            prefill: {
                name: formData.fullName,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: "#F48B36"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setLoading(false);
    };

    if (paymentStatus === 'success') {
        return (
            <div style={{ minHeight: '100vh', background: '#121212', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ background: '#1E1E1E', padding: '3rem', borderRadius: '24px', textAlign: 'center', maxWidth: '500px', border: '1px solid #333' }}
                >
                    <div style={{ width: '80px', height: '80px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                        <CheckCircle size={40} color="#22c55e" />
                    </div>
                    <h2 style={{ color: 'white', marginBottom: '1rem' }}>Order Confirmed!</h2>
                    <p style={{ color: '#a1a1aa', marginBottom: '2rem' }}>
                        Thank you for your order. We will ship your hardcopy certificate to the provided address within 5-7 business days.
                    </p>
                    <button
                        onClick={() => navigate('/certificate')}
                        style={{ padding: '0.8rem 2rem', background: '#F48B36', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Return to Certificate
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#121212', color: 'white', padding: '2rem' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '2rem' }}>
                <ArrowLeft size={20} /> Back
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>

                {/* Left Column: Details */}
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Get Your Hardcopy</h1>
                    <p style={{ color: '#a1a1aa', marginBottom: '3rem' }}>Official certificate delivered straight to your doorstep.</p>

                    <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Section: Contact */}
                        <div style={{ background: '#1E1E1E', padding: '1.5rem', borderRadius: '16px', border: '1px solid #333' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={18} color="#F48B36" /> Contact Info
                            </h3>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Full Name</label>
                                    <input
                                        type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                                        style={{ width: '100%', padding: '0.8rem', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Email Address</label>
                                    <input
                                        type="email" name="email" value={formData.email} onChange={handleChange} required
                                        style={{ width: '100%', padding: '0.8rem', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', color: 'white' }}
                                    />
                                </div>
                                {/* Phone added for razorpay contact prefill */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Phone Number</label>
                                    <input
                                        type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                                        style={{ width: '100%', padding: '0.8rem', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', color: 'white' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Address */}
                        <div style={{ background: '#1E1E1E', padding: '1.5rem', borderRadius: '16px', border: '1px solid #333' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={18} color="#F48B36" /> Shipping Address
                            </h3>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Street Address</label>
                                    <textarea
                                        name="address" value={formData.address} onChange={handleChange} required rows={3}
                                        style={{ width: '100%', padding: '0.8rem', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', color: 'white', resize: 'vertical' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>City</label>
                                        <input
                                            type="text" name="city" value={formData.city} onChange={handleChange} required
                                            style={{ width: '100%', padding: '0.8rem', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', color: 'white' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Pincode</label>
                                        <input
                                            type="text" name="pincode" value={formData.pincode} onChange={handleChange} required
                                            style={{ width: '100%', padding: '0.8rem', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', color: 'white' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>State</label>
                                    <input
                                        type="text" name="state" value={formData.state} onChange={handleChange} required
                                        style={{ width: '100%', padding: '0.8rem', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', color: 'white' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '1.2rem',
                                background: 'linear-gradient(135deg, #F48B36 0%, #D97706 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                marginTop: '1rem',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Processing...' : 'Pay ₹399 & Place Order'}
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#71717a', fontSize: '0.85rem' }}>
                            <ShieldCheck size={14} /> Secure Payment via Razorpay
                        </div>

                    </form>
                </div>

                {/* Right Column: Order Summary (Sticky) */}
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'sticky', top: '2rem', background: '#1E1E1E', padding: '2rem', borderRadius: '24px', border: '1px solid #333' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Order Summary</h3>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #333' }}>
                            <div style={{ width: '80px', height: '60px', background: '#333', borderRadius: '8px', overflow: 'hidden' }}>
                                <img src="/assets/certificate_template.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Cert" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Hardcopy Certificate</div>
                                <div style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>Gen AI Masterclass</div>
                            </div>
                            <div style={{ marginLeft: 'auto', fontWeight: 600 }}>₹399</div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#a1a1aa' }}>
                            <span>Subtotal</span>
                            <span>₹399</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#a1a1aa' }}>
                            <span>Shipping</span>
                            <span style={{ color: '#22c55e' }}>Free</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 700 }}>
                            <span>Total</span>
                            <span>₹399</span>
                        </div>

                        <div style={{ background: 'rgba(244, 139, 54, 0.1)', padding: '1rem', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'start' }}>
                            <CreditCard size={20} color="#F48B36" style={{ marginTop: '2px' }} />
                            <div style={{ fontSize: '0.9rem', color: '#fdba74' }}>
                                Includes high-quality printing, protective casing, and tracked shipping.
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
