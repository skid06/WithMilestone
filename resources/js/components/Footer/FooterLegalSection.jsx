import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterLegalSection() {
    return (
        <div className="border-t border-gray-700 pt-6 sm:pt-8 mt-6 sm:mt-8">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mb-6 sm:mb-8 text-xs sm:text-sm px-4">
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition py-1">Terms of Use</Link>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition py-1">Privacy Policy</Link>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition py-1">Sitemap</Link>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition py-1">Sample Documents by State</Link>
            </div>

            {/* Copyright */}
            <div className="mb-6 sm:mb-8 text-xs sm:text-sm text-gray-500 text-center px-4">
                © 2000-2025 WithMilestone.com, LLC WithMilestone.com, All Rights Reserved
            </div>

            {/* Disclaimer */}
            <div className="text-xs sm:text-xs text-gray-400 space-y-4 leading-relaxed px-4">
                <div>
                    <p className="font-semibold text-gray-300 mb-2 text-sm sm:text-base">Disclaimer:</p>
                    <p className="leading-loose sm:leading-relaxed">
                        WithMilestone is not a law firm and its services, website, forms and templates are not a substitute for the advice or services of a licensed attorney in your state. WithMilestone provides access to computer-aided self-help services at your specific direction. WithMilestone's website and written instructions provide general information about the divorce process only; we cannot give you any specific advice, opinions or recommendations as to your selection or completion of forms or your particular legal rights, remedies or options. WithMilestone does not sell blank forms. You may be able to download blank forms from a government website depending on your state. Communications between you and WithMilestone are governed by our <Link to="/" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> but are not covered by the attorney-client or work product privileges. Your access to WithMilestone's website and any purchase from WithMilestone is subject to and governed by our <Link to="/" className="text-blue-400 hover:text-blue-300 underline">Terms of Use</Link>.
                    </p>
                </div>
                <div>
                    <p className="leading-loose sm:leading-relaxed">* Purchase provides access to the platform and support services for 30 days. After 30 days, access automatically renews monthly and your card will automatically be charged $39.99. Cancel renewals any time by visiting My Profile.</p>
                </div>
            </div>
        </div>
    );
}
