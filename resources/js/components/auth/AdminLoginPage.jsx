import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminLoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/auth/login', formData);

            // Check if user is admin
            if (response.data.user.role !== 'admin') {
                setError('Access denied. Admin account required.');
                return;
            }

            // Store token and user data
            localStorage.setItem('auth_token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Set axios default header
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            // Redirect to admin dashboard
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-purple-600 text-white p-8 text-center">
                    <h1 className="text-3xl font-bold">WithMilestone</h1>
                    <p className="text-purple-100 mt-2">Admin Portal - Sign In</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                        {loading ? 'Signing In...' : 'Sign In as Admin'}
                    </button>

                    <div className="text-center text-sm space-y-2">
                        <p className="text-gray-600">
                            <Link to="/login/user" className="text-purple-600 hover:text-purple-700 font-semibold">
                                Sign in as regular user instead
                            </Link>
                        </p>
                        <p className="text-gray-600">
                            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                                Back to login selection
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
