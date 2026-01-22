import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DocPage from './pages/DocPage';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import SessionAdminPage from './pages/SessionAdminPage';

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
            {/* Public Landing Page replaced with Curriculum Page as requested */}
            <Route path="/" element={<CurriculumPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/get-started" element={<SelectionPage />} />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard redirects to Curriculum */}
            <Route path="/dashboard" element={<Navigate to="/curriculum" replace />} />

            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </ProtectedRoute>
            } />
            <Route path="/live-admin" element={<SessionAdminPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/day1" element={<DocPage day="day1" />} />
            <Route path="/day2" element={<DocPage day="day2" />} />
            <Route path="/scorecard-test" element={<ScorecardTest />} />

            {/* Certificate Route */}
            <Route path="/certificate" element={<CertificatePage />} />

            <Route path="/hardcopy" element={<HardcopyPage />} />

          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
