import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { auth, db, googleProvider, signInWithPopup, signOut } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Safety timeout to prevent infinite loading/black screen
        const safetyTimer = setTimeout(() => {
            console.warn("Auth loading timed out, forcing render");
            setLoading(false);
        }, 2500);

        let unsubscribeSnapshot = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            // Clean up previous snapshot listener
            if (unsubscribeSnapshot) unsubscribeSnapshot();

            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.uid);

                // Start Listening for REAL-TIME updates
                unsubscribeSnapshot = onSnapshot(userRef, async (snap) => {
                    if (snap.exists()) {
                        setUserData(snap.data());
                        setLoading(false);
                        clearTimeout(safetyTimer);
                    } else {
                        // Create new user doc if it doesn't exist
                        const localName = localStorage.getItem('user_name');
                        const localPhone = localStorage.getItem('user_phone');
                        const newUser = {
                            uid: currentUser.uid,
                            email: currentUser.email,
                            name: localName || currentUser.displayName || currentUser.email.split('@')[0],
                            phone: localPhone || '',
                            photoURL: currentUser.photoURL,
                            createdAt: serverTimestamp(),
                            progress: { completedSections: [] },
                            stats: { totalPoints: 0, totalCorrect: 0, totalIncorrect: 0 },
                            role: 'user'
                        };
                        try {
                            await setDoc(userRef, newUser);
                            // snap listener will trigger again with new data
                        } catch (err) {
                            console.error("Error creating user:", err);
                        }
                    }
                }, (error) => {
                    console.error("Snapshot error:", error);
                    // Critical fallback if snapshot listener fails
                    setUserData({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        progress: { completedSections: [] },
                        stats: { totalPoints: 0, totalCorrect: 0, totalIncorrect: 0 }
                    });
                    setLoading(false);
                });

            } else {
                setUserData(null);
                setLoading(false);
                clearTimeout(safetyTimer);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeSnapshot) unsubscribeSnapshot();
            clearTimeout(safetyTimer);
        };
    }, []);

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            console.error("Google Sign-in Error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setUserData(null);
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_phone');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    // Dummy functions for compatibility if app uses email/pass elsewhere
    const login = async () => console.warn("Email login not implemented in this version");
    const signup = async () => console.warn("Email signup not implemented in this version");

    const value = {
        user,
        userData,
        loading,
        loginWithGoogle,
        logout,
        login,
        signup,
        setUserData // Exposing this to allow updates if needed
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};
