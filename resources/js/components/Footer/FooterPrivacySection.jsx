import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterPrivacySection() {
    return (
        <div className="border-t border-gray-700 pt-6 sm:pt-8 pb-6 sm:pb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h4 className="font-bold text-white mb-3 sm:mb-4 text-base sm:text-lg">Your Privacy Choices</h4>
                    <p className="text-gray-400 text-sm sm:text-base">
                        🔐 Your privacy is important to us
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <Link
                        to="/assessment"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-2 px-6 rounded-lg transition text-center whitespace-nowrap"
                    >
                        Check Eligibility
                    </Link>
                    <Link
                        to="/login"
                        className="border border-white text-white hover:bg-white hover:text-gray-900 font-bold py-3 sm:py-2 px-6 rounded-lg transition text-center whitespace-nowrap"
                    >
                        Log In →
                    </Link>
                </div>
            </div>
        </div>
    );
}
