import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/HomePage';
import EligibilityAssessment from './EligibilityAssessment';
import StateDetailPage from './pages/StateDetailPage';
import LoginPage from './auth/LoginPage';
import AdminLoginPage from './auth/AdminLoginPage';
import RegisterPage from './auth/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import AdminDashboard from './AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import HowItWorksPage from './pages/HowItWorksPage';
import WhyUsPage from './pages/WhyUsPage';
import AboutUsPage from './pages/AboutUsPage';
import OurGuaranteePage from './pages/OurGuaranteePage';
import Header from './Header/Header';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    const googleClientId = process.env.MIX_GOOGLE_CLIENT_ID || '';

    const AppContent = () => (
        <div className="min-h-screen bg-gray-50">
            <Header
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/why-us" element={<WhyUsPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/our-guarantee" element={<OurGuaranteePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/login/admin" element={<AdminLoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/assessment" element={<EligibilityAssessment onComplete={() => window.location.href = '/'} />} />
                    <Route path="/states/:stateCode" element={<StateDetailPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                        path="/payment"
                        element={
                            <ProtectedRoute>
                                <PaymentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/payment-success"
                        element={
                            <ProtectedRoute>
                                <PaymentSuccessPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedAdminRoute>
                                <AdminDashboard />
                            </ProtectedAdminRoute>
                        }
                    />
                </Routes>
            </main>
        </div>
    );

    // Wrap with GoogleOAuthProvider if clientId is available
    if (!googleClientId) {
        console.warn('Google OAuth Client ID is not configured. Google Sign-up will be disabled.');
        return <AppContent />;
    }

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <AppContent />
        </GoogleOAuthProvider>
    );
}
