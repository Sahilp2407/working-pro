import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DocPage from './pages/DocPage';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/curriculum" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { userData, loading } = useAuth();
  if (loading) return null;
  if (userData?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

import LandingPage from './pages/LandingPage';
import ScorecardTest from './pages/ScorecardTest';
import CertificatePage from './pages/CertificatePage'; // Re-imported
import HardcopyPage from './pages/HardcopyPage';
import CurriculumPage from './pages/CurriculumPage';
import SelectionPage from './pages/SelectionPage';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/get-started" element={<SelectionPage />} />

            {/* Login Page (Redirects to /dashboard if already logged in) */}
            <Route path="/login" element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            } />

            {/* Dashboard redirects to Curriculum */}
            <Route path="/dashboard" element={<Navigate to="/curriculum" replace />} />

            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/day1" element={
              <ProtectedRoute>
                <DocPage day="day1" />
              </ProtectedRoute>
            } />
            <Route path="/day2" element={
              <ProtectedRoute>
                <DocPage day="day2" />
              </ProtectedRoute>
            } />
            <Route path="/scorecard-test" element={<ScorecardTest />} />

            {/* Certificate Route */}
            <Route path="/certificate" element={
              <ProtectedRoute>
                <CertificatePage />
              </ProtectedRoute>
            } />

            <Route path="/hardcopy" element={
              <ProtectedRoute>
                <HardcopyPage />
              </ProtectedRoute>
            } />

          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
