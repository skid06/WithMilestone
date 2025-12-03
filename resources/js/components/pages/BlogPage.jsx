import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Coming Soon Section */}
                <section className="bg-white rounded-lg shadow-lg p-12">
                    <div className="mb-8">
                        <div className="text-6xl mb-6">📝</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Coming Soon
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Our blog is coming soon! We're working hard to bring you valuable insights, tips, and resources about divorce, legal processes, and more.
                        </p>
                    </div>

                    {/* Features Preview */}
                    <div className="bg-blue-50 rounded-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h2>
                        <div className="space-y-4 text-left">
                            <div className="flex items-start gap-4">
                                <span className="text-blue-600 text-2xl font-bold">✓</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Expert Guides</h3>
                                    <p className="text-gray-600 text-sm">In-depth articles on divorce law, legal processes, and your rights</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-blue-600 text-2xl font-bold">✓</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">State-Specific Information</h3>
                                    <p className="text-gray-600 text-sm">Laws, requirements, and resources specific to your state</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-blue-600 text-2xl font-bold">✓</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Tips & Best Practices</h3>
                                    <p className="text-gray-600 text-sm">Practical advice to make your divorce process smoother</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-blue-600 text-2xl font-bold">✓</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">FAQ Updates</h3>
                                    <p className="text-gray-600 text-sm">Answers to common questions from our community</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/faq"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
                        >
                            View FAQ
                        </Link>
                        <Link
                            to="/assessment"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-8 rounded-lg transition"
                        >
                            Check Your Eligibility
                        </Link>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Launch Timeline</h2>
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6 text-left border-l-4 border-blue-600">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900">Q1 2025</h3>
                                    <p className="text-gray-600">Initial blog launch with foundational guides</p>
                                </div>
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">Next</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 text-left border-l-4 border-gray-300">
                            <h3 className="font-bold text-gray-900">Q2 2025</h3>
                            <p className="text-gray-600">State-specific legal guides and case studies</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 text-left border-l-4 border-gray-300">
                            <h3 className="font-bold text-gray-900">Q3 2025</h3>
                            <p className="text-gray-600">Community forums and expert interviews</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
