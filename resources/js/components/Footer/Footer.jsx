import React from 'react';
import FooterMainSection from './FooterMainSection';
import FooterPrivacySection from './FooterPrivacySection';
import FooterStatesList from './FooterStatesList';
import FooterLegalSection from './FooterLegalSection';

export default function Footer() {
    return (
        <>
            {/* Main Footer Section */}
            <div className="bg-gray-900 mt-20 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
                <footer className="text-white py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <FooterMainSection />
                        <FooterPrivacySection />
                    </div>
                </footer>
            </div>

            {/* States Footer Section */}
            <div className="bg-gray-900 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <FooterStatesList />
                        <FooterLegalSection />
                    </div>
                </section>
            </div>
        </>
    );
}
