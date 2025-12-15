import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHeader({ user, onLogout }) {
    return (
        <nav className="bg-white shadow-sm border-b-2 border-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/admin/dashboard" className="flex items-center flex-shrink-0">
                        <img
                            src="/images/withMilestone-logo.png"
                            alt="WithMilestone"
                            className="h-12 w-auto lg:h-16"
                        />
                    </Link>

                    {/* Admin Info & Actions */}
                    <div className="flex gap-4 items-center">
                        {user && (
                            <>
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                                    <span className="text-xs text-blue-600 font-medium">Admin Panel</span>
                                </div>

                                <Link
                                    to="/dashboard"
                                    className="text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base"
                                >
                                    User Dashboard
                                </Link>

                                <button
                                    onClick={onLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition text-sm sm:text-base"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
