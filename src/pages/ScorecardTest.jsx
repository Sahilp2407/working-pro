// Quick test file to show scorecard
import { useNavigate } from 'react-router-dom';

export default function ScorecardTest() {
    const navigate = useNavigate();

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '3rem',
                maxWidth: '600px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(255, 87, 34, 0.2)',
                border: '2px solid rgba(255, 87, 34, 0.2)',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    margin: '0 auto 2rem',
                    background: 'linear-gradient(135deg, #FF5722, #F48B36)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem'
                }}>
                    🏆
                </div>

                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #FF5722, #FFB74D)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Course Mastered! 🎊
                </h2>

                <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
                    Incredible achievement! You've conquered the entire course!
                </p>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '1.5rem', background: '#fff8f5', borderRadius: '16px', border: '2px solid #FFE8DC' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FF5722' }}>40</div>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>Day 1 Questions</div>
                    </div>
                    <div style={{ padding: '1.5rem', background: '#fff8f5', borderRadius: '16px', border: '2px solid #FFE8DC' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#F48B36' }}>75</div>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>Day 2 Questions</div>
                    </div>
                </div>

                <div style={{
                    padding: '2rem',
                    background: 'linear-gradient(135deg, rgba(255, 87, 34, 0.1), rgba(244, 139, 54, 0.1))',
                    borderRadius: '20px',
                    border: '2px solid rgba(255, 87, 34, 0.3)',
                    marginBottom: '2rem'
                }}>
                    <div style={{ fontSize: '4rem', fontWeight: 900, color: '#FF5722', marginBottom: '0.5rem' }}>115</div>
                    <div style={{ fontSize: '1.2rem', color: '#333', fontWeight: 700 }}>Total Questions Mastered</div>
                    <div style={{
                        marginTop: '1rem',
                        padding: '0.8rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '12px',
                        border: '2px solid rgba(16, 185, 129, 0.3)'
                    }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>✅ Perfect Score!</span>
                    </div>
                </div>

                <button
                    onClick={() => window.open('https://certificate.letsupgrade.in', '_blank')}
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        border: 'none',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                    }}
                >
                    🎓 Get Your Certificate
                </button>
            </div>
        </div>
    );
}
