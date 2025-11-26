import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterLegalSection() {
    return (
        <div className="border-t border-gray-700 pt-8 mt-8">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 justify-center mb-8 text-sm">
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition">Terms of Use</Link>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition">Privacy Policy</Link>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition">Sitemap</Link>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition">Sample Documents by State</Link>
            </div>

            {/* Copyright */}
            <div className="mb-8 text-sm text-gray-500 text-center">
                © 2000-2025 WithMilestone.com, LLC WithMilestone.com, All Rights Reserved
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-gray-400 space-y-4 leading-relaxed">
                <div>
                    <p className="font-semibold text-gray-300 mb-2">Disclaimer:</p>
                    <p>
                        WithMilestone is not a law firm and its services, website, forms and templates are not a substitute for the advice or services of a licensed attorney in your state. WithMilestone provides access to computer-aided self-help services at your specific direction. WithMilestone's website and written instructions provide general information about the divorce process only; we cannot give you any specific advice, opinions or recommendations as to your selection or completion of forms or your particular legal rights, remedies or options. WithMilestone does not sell blank forms. You may be able to download blank forms from a government website depending on your state. Communications between you and WithMilestone are governed by our <Link to="/" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link> but are not covered by the attorney-client or work product privileges. Your access to WithMilestone's website and any purchase from WithMilestone is subject to and governed by our <Link to="/" className="text-blue-400 hover:text-blue-300">Terms of Use</Link>.
                    </p>
                </div>
                <div>
                    <p>* Purchase provides access to the platform and support services for 30 days. After 30 days, access automatically renews monthly and your card will automatically be charged $39.99. Cancel renewals any time by visiting My Profile.</p>
                </div>
            </div>
        </div>
    );
}
