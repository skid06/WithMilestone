import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSelectionPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">WithMilestone</h1>
                    <p className="text-xl text-gray-600">Choose your login type</p>
                </div>

                {/* Login Options */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Regular User Login */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                        onClick={() => navigate('/login/user')}>
                        <div className="bg-blue-600 text-white p-8 text-center">
                            <div className="text-5xl mb-4">👤</div>
                            <h2 className="text-2xl font-bold">User Login</h2>
                        </div>
                        <div className="p-8 space-y-4">
                            <p className="text-gray-600">
                                Sign in to your account to access your dashboard, documents, and manage your divorce process.
                            </p>
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>✓ View your eligibility results</p>
                                <p>✓ Download your documents</p>
                                <p>✓ Track your application status</p>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition">
                                Sign In as User
                            </button>
                        </div>
                    </div>

                    {/* Admin Login */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                        onClick={() => navigate('/login/admin')}>
                        <div className="bg-purple-600 text-white p-8 text-center">
                            <div className="text-5xl mb-4">👨‍💼</div>
                            <h2 className="text-2xl font-bold">Admin Login</h2>
                        </div>
                        <div className="p-8 space-y-4">
                            <p className="text-gray-600">
                                Sign in to the admin panel to manage applications and view comprehensive analytics.
                            </p>
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>✓ View all applications</p>
                                <p>✓ Filter and search submissions</p>
                                <p>✓ Export reports</p>
                                <p>✓ Manage user data</p>
                            </div>
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition">
                                Sign In as Admin
                            </button>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
