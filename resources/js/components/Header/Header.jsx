import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ isAuthenticated, user, onLogout }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

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

                    {/* Hamburger Menu Button (Mobile) */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex gap-6 items-center">
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

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setMobileMenuOpen(false)}
            >
                <div
                    className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col h-full">
                        {/* Mobile Menu Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <span className="text-lg font-bold text-blue-600">Menu</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Menu Items */}
                        <div className="flex-1 overflow-y-auto py-4">
                            {/* Divorce Services */}
                            <div className="border-b">
                                <button
                                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                    className="w-full px-4 py-3 text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium flex items-center justify-between"
                                >
                                    Divorce Services
                                    <svg
                                        className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {mobileDropdownOpen && (
                                    <div className="bg-gray-50">
                                        {divorcServices.map((service) => (
                                            <Link
                                                key={service.label}
                                                to={service.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-8 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                                            >
                                                {service.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Reviews */}
                            <Link
                                to="/reviews"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium border-b"
                            >
                                Reviews
                            </Link>

                            {/* FAQ */}
                            <Link
                                to="/faq"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium border-b"
                            >
                                FAQ
                            </Link>

                            {/* Blog */}
                            <Link
                                to="/blog"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium border-b"
                            >
                                Blog
                            </Link>

                            {/* Auth Section */}
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium border-b"
                                    >
                                        Dashboard
                                    </Link>
                                    {user && user.role === 'admin' && (
                                        <Link
                                            to="/admin/dashboard"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-4 py-3 text-blue-600 hover:text-blue-900 hover:bg-gray-50 font-bold border-b"
                                        >
                                            Admin Panel
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            onLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-red-600 hover:text-red-900 hover:bg-gray-50 font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium border-b"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block mx-4 my-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-lg"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
