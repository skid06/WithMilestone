import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
    const steps = [
        {
            number: '1',
            title: 'Take Our Assessment',
            description: 'Answer a few simple questions about your divorce situation. Our intelligent questionnaire takes about 20-30 minutes and helps us understand your specific needs.',
            icon: '📋',
        },
        {
            number: '2',
            title: 'Review Your Eligibility',
            description: 'Get instant results showing whether you qualify for our online divorce service. We support uncontested divorces in all 50 states.',
            icon: '✓',
        },
        {
            number: '3',
            title: 'Complete Your Forms',
            description: 'We generate all necessary divorce documents customized for your state and situation. Review them carefully at your own pace.',
            icon: '📄',
        },
        {
            number: '4',
            title: 'Make Payment',
            description: 'Secure payment for your divorce document package. Our pricing is transparent with no hidden fees.',
            icon: '💳',
        },
        {
            number: '5',
            title: 'Download & Print',
            description: 'Download your completed documents and print them. You can print at home or at a local print shop.',
            icon: '🖨️',
        },
        {
            number: '6',
            title: 'File with Court',
            description: 'Submit your documents to the appropriate court in your jurisdiction. We provide filing guidance and instructions.',
            icon: '⚖️',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How It Works</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Our simple 6-step process makes getting a divorce online easier than ever. Get started in minutes.
                    </p>
                    <Link
                        to="/assessment"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
                    >
                        Start Your Assessment
                    </Link>
                </div>
            </section>

            {/* Steps Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <div key={step.number} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
                            <div className="text-5xl mb-4">{step.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Step {step.number}: {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Timeline</h2>
                    <div className="space-y-6">
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white font-bold">
                                    ⏱️
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">20-30 Minutes</h3>
                                <p className="text-gray-600">Time to complete the initial assessment questionnaire</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white font-bold">
                                    ⏱️
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">1-2 Hours</h3>
                                <p className="text-gray-600">Time to review and download your generated documents</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white font-bold">
                                    ⏱️
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Variable</h3>
                                <p className="text-gray-600">Court processing time varies by state and complexity (typically 30-90 days for uncontested divorces)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need an attorney?</h3>
                        <p className="text-gray-600">
                            For uncontested divorces, many people successfully use our service without an attorney. However, if you have complex issues like significant assets or child custody disputes, you may want to consult with a family law attorney.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">What if my spouse doesn't agree?</h3>
                        <p className="text-gray-600">
                            WithMilestone is designed for uncontested divorces where both spouses agree. If your spouse disagrees with the terms, you'll need to work through mediation or hire an attorney.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I file with the court?</h3>
                        <p className="text-gray-600">
                            We provide detailed instructions on how to file your documents with the court. The process varies by state, but generally involves submitting the documents to your local courthouse.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-xl mb-8 text-blue-50">
                        Take our assessment to see if you qualify for online divorce.
                    </p>
                    <Link
                        to="/assessment"
                        className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition"
                    >
                        Start Your Assessment Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
