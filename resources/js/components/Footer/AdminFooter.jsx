import React from 'react';
import FooterLegalSection from './FooterLegalSection';

export default function AdminFooter() {
    return (
        <div className="bg-gray-900 mt-12 sm:mt-16 lg:mt-20 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
            <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <FooterLegalSection />
                </div>
            </section>
        </div>
    );
}
