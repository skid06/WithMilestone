import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                navigate('/login');
                return;
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('/api/auth/user');
            setUser(response.data.user);
        } catch (err) {
            console.error(err);
            setError('Failed to load user data');
            // Clear auth data and redirect to login
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.post('/api/auth/logout');
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
                        <p className="text-gray-600 mt-2">{user?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <section className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/assessment')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition text-left"
                        >
                            Start New Assessment
                        </button>
                        <button
                            onClick={() => navigate('/states')}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition text-left"
                        >
                            Browse by State
                        </button>
                        <button
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition text-left cursor-not-allowed opacity-50"
                            disabled
                        >
                            My Documents (Coming Soon)
                        </button>
                    </div>
                </section>

                {/* Account Information */}
                <section className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-700">Name</label>
                            <p className="text-gray-900">{user?.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <p className="text-gray-900">{user?.email}</p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700">Member Since</label>
                            <p className="text-gray-900">
                                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Assessments Section */}
            <section className="bg-white rounded-lg shadow-sm p-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Assessments</h2>
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-600 mb-4">No assessments yet</p>
                    <p className="text-sm text-gray-500 mb-6">Start your first assessment to see it here</p>
                    <button
                        onClick={() => navigate('/assessment')}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                    >
                        Start Assessment
                    </button>
                </div>
            </section>
        </div>
    );
}
