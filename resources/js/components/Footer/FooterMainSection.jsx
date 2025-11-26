import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterMainSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand & Address */}
            <div>
                <h2 className="text-2xl font-bold text-blue-400 mb-6">WithMilestone</h2>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-300 mb-2 flex items-center gap-2">
                            📍 Address
                        </h4>
                        <p className="text-gray-400 text-sm">
                            WithMilestone Services<br />
                            Professional Divorce Solutions<br />
                            United States
                        </p>
                    </div>
                </div>
            </div>

            {/* Company */}
            <div>
                <h4 className="font-bold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                    <li>
                        <Link to="/" className="text-gray-400 hover:text-blue-400 transition">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="text-gray-400 hover:text-blue-400 transition">
                            Blog
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Offers */}
            <div>
                <h4 className="font-bold text-white mb-4">Offers</h4>
                <ul className="space-y-2 text-sm">
                    <li>
                        <Link to="/assessment" className="text-gray-400 hover:text-blue-400 transition">
                            Get Divorced
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="text-gray-400 hover:text-blue-400 transition">
                            Affiliate Partners
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Support */}
            <div>
                <h4 className="font-bold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                    <li>
                        <Link to="/" className="text-gray-400 hover:text-blue-400 transition">
                            FAQ
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="text-gray-400 hover:text-blue-400 transition">
                            Contact us
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Legal */}
            <div>
                <h4 className="font-bold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                    <li>
                        <Link to="/" className="text-gray-400 hover:text-blue-400 transition">
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="text-gray-400 hover:text-blue-400 transition">
                            Terms of Use
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="text-gray-400 hover:text-blue-400 transition">
                            Disclaimer
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Social */}
            <div>
                <h4 className="font-bold text-white mb-4">Social</h4>
                <div className="flex flex-col gap-2">
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm">Instagram</a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm">Facebook</a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm">LinkedIn</a>
                </div>
            </div>
        </div>
    );
}
