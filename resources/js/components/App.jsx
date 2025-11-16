import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
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

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                        WithMilestone
                    </Link>
                    <div className="flex gap-6 items-center">
                        <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                            Home
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
                                    Dashboard
                                </Link>
                                {user && user.role === 'admin' && (
                                    <Link to="/admin/dashboard" className="text-blue-600 hover:text-blue-900 font-bold">
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                                    Log In
                                </Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
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
}
