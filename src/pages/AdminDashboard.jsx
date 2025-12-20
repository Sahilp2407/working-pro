
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Users, BookOpen, CheckCircle, BarChart3, ArrowLeft, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCol = collection(db, 'users');
            const userSnapshot = await getDocs(usersCol);
            const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const totalUsers = users.length;
    const completedSome = users.filter(u => u.progress?.completedSections?.length > 0).length;
    const totalCompletedSections = users.reduce((acc, u) => acc + (u.progress?.completedSections?.length || 0), 0);
    const avgProgress = totalUsers > 0 ? (totalCompletedSections / (totalUsers * 23) * 100).toFixed(1) : 0;

    const filteredUsers = users.filter(u =>
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', padding: '2rem' }}>
            <header style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <ArrowLeft size={24} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '0.9', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.04em' }}>
                            <span>Lets</span>
                            <span>Upgrade</span>
                        </div>
                    </div>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 400, marginLeft: '0.75rem', fontSize: '1.2rem' }}>/ Admin</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    <button
                        onClick={() => navigate('/profile')}
                        style={{
                            background: 'none', border: '1px solid var(--border-color)',
                            borderRadius: '50%', width: '40px', height: '40px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--text-primary)'
                        }}
                    >
                        <User size={20} />
                    </button>
                </div>
            </header>

            <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <StatCard icon={<Users size={24} />} label="Total Students" value={totalUsers} color="#3b82f6" />
                    <StatCard icon={<CheckCircle size={24} />} label="Active Learners" value={completedSome} color="#10b981" />
                    <StatCard icon={<BarChart3 size={24} />} label="Avg. Completion" value={`${avgProgress}%`} color="#a855f7" />
                    <StatCard icon={<BookOpen size={24} />} label="Total Modules Done" value={totalCompletedSections} color="#f59e0b" />
                </div>

                {/* User Table */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Student Progress</h2>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder="Search email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '8px 12px 8px 40px',
                                    borderRadius: '10px',
                                    background: 'var(--bg-primary)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                                    <th style={{ padding: '1rem 1.5rem' }}>Student Email</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Modules Done</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Progress</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, idx) => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{user.email}</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>{user.progress?.completedSections?.length || 0}</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ width: '100px', height: '6px', background: 'var(--border-color)', borderRadius: '3px', position: 'relative' }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    left: 0, top: 0, bottom: 0,
                                                    width: `${Math.min(((user.progress?.completedSections?.length || 0) / 23) * 100, 100)}%`,
                                                    background: 'var(--accent-color)',
                                                    borderRadius: '3px'
                                                }} />
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                background: user.role === 'admin' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.05)',
                                                color: user.role === 'admin' ? '#f59e0b' : 'var(--text-secondary)',
                                                border: user.role === 'admin' ? '1px solid rgba(245, 158, 11, 0.2)' : '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ icon, label, value, color }) {
    return (
        <div style={{
            padding: '1.5rem',
            background: 'var(--bg-secondary)',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
        }}>
            <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: `${color}15`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</div>
            </div>
        </div>
    );
}
