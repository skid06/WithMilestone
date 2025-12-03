import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ isAuthenticated, user, onLogout }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const divorcServices = [
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Why Us', href: '/why-us' },
        { label: 'About Us', href: '/about-us' },
        { label: 'Our Guarantee', href: '/our-guarantee' },
    ];

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                        WithMilestone
                    </Link>

                    {/* Right Navigation */}
                    <div className="flex gap-6 items-center">
                        {/* Divorce Services Dropdown */}
                        <div className="relative group">
                            <button className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 py-2">
                                Divorce Services
                                <svg
                                    className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                {divorcServices.map((service, index) => (
                                    <Link
                                        key={service.label}
                                        to={service.href}
                                        className={`block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition ${
                                            index === 0 ? 'rounded-t-lg' : ''
                                        } ${index === divorcServices.length - 1 ? 'rounded-b-lg' : ''}`}
                                    >
                                        {service.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Link */}
                        <Link to="/reviews" className="text-gray-600 hover:text-gray-900 font-medium">
                            Reviews
                        </Link>

                        {/* FAQ Link */}
                        <Link to="/faq" className="text-gray-600 hover:text-gray-900 font-medium">
                            FAQ
                        </Link>

                        {/* Blog Link */}
                        <Link to="/blog" className="text-gray-600 hover:text-gray-900 font-medium">
                            Blog
                        </Link>

                        {/* Vertical Separator */}
                        <div className="h-6 w-px bg-gray-300"></div>

                        {/* Auth Section */}
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
                                    onClick={onLogout}
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
            </div>
        </nav>
    );
}
