import React from 'react';
import { Link } from 'react-router-dom';
import StatesFooter from '../StatesFooter';

export default function HomePage() {
    return (
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Milestone – Divorce Made Simple, Fast, and Affordable
                            </h1>
                            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                Handle your divorce entirely online, from the comfort of your home, without the hassle
                                of expensive lawyers or court appearances.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/assessment"
                                    className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition text-center"
                                >
                                    Check Your Eligibility
                                </Link>
                            </div>
                        </div>
                        <div
                            className="bg-blue-500 bg-opacity-20 rounded-lg p-8 backdrop-blur-sm border border-white border-opacity-30">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl text-white">✓</span>
                                    <span className="text-lg text-white">Simple, step-by-step process</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl text-white">✓</span>
                                    <span className="text-lg text-white">Just $199 - no hidden fees</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl text-white">✓</span>
                                    <span className="text-lg text-white">Available in all 50 states</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl text-white">✓</span>
                                    <span className="text-lg text-white">Uncontested divorces only</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl text-white">✓</span>
                                    <span className="text-lg text-white">Fast completion - weeks not months</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Get your divorce finalized in just 3 simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div
                                className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Answer Simple Questions Online</h3>
                            <p className="text-gray-600">
                                Fill out our secure online questionnaire. It’s easy, private, and designed for anyone to
                                complete in minutes
                            </p>
                        </div>

                        <div className="text-center">
                            <div
                                className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">We Prepare Your Documents</h3>
                            <p className="text-gray-600">
                                Our system generates all the required legal documents based on your answers. No legal
                                jargon, no confusion.
                            </p>
                        </div>

                        <div className="text-center">
                            <div
                                className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">File and Finalize</h3>
                            <p className="text-gray-600">
                                Download, review, and file your documents with the court. We guide you through every
                                step to make it smooth and stress-free.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            No hidden fees. No lawyer costs. Just one flat price.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-blue-600 text-white p-8 text-center">
                            <h3 className="text-3xl font-bold mb-2">Uncontested Divorce</h3>
                            <p className="text-blue-100">All 50 states</p>
                        </div>
                        <div className="p-8">
                            <div className="text-5xl font-bold text-gray-900 text-center mb-2">
                                $199
                            </div>
                            <p className="text-center text-gray-600 mb-8">One-time flat fee</p>

                            <ul className="space-y-3 mb-8 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 text-xl">✓</span>
                                    <span>All court documents prepared</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 text-xl">✓</span>
                                    <span>Filing instructions included</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 text-xl">✓</span>
                                    <span>Email support</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 text-xl">✓</span>
                                    <span>Money-back guarantee</span>
                                </li>
                            </ul>

                            <Link
                                to="/assessment"
                                className="w-full block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose WithMilestone?</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Affordable: Save thousands compared to traditional lawyers.
                            Fast & Convenient: Complete the process from home, on your own schedule.
                            Easy to Understand: Clear instructions, no legalese.
                            Secure & Private: Your personal information is protected with industry-standard encryption.
                        </p>
                    </div>

                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Can Use WithMilestone?</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Milestone is ideal for couples seeking a straightforward, uncontested divorce. If both
                            parties agree on key issues like property, finances, and children, Milestone makes the
                            process easy and fast.
                        </p>
                    </div>

                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Started Today</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Start your divorce online now and take the first step toward a fresh start. It’s fast,
                            simple, and completely confidential.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                            <div className="text-4xl font-bold text-blue-600 mb-4">98%</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Success Rate</h3>
                            <p className="text-gray-600">
                                Our uncontested divorce process has a 98% approval rate from courts.
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-8 border border-green-200">
                            <div className="text-4xl font-bold text-green-600 mb-4">50+</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">States Covered</h3>
                            <p className="text-gray-600">
                                Available in all 50 states with state-specific forms and procedures.
                            </p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-8 border border-purple-200">
                            <div className="text-4xl font-bold text-purple-600 mb-4">10K+</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Happy Customers</h3>
                            <p className="text-gray-600">
                                Join thousands who saved money and time with our online divorce service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Frequently Asked Questions</h2>

                    <div className="space-y-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Do I need a lawyer?</h3>
                            <p className="text-gray-600">
                                For uncontested divorces, you don't need a lawyer. Our service provides all the
                                documents and guidance you need. If your divorce is contested, you may want to consult
                                with a lawyer.
                            </p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">How long does it take?</h3>
                            <p className="text-gray-600">
                                The timeline varies by state, but most uncontested divorces are finalized within 30-90
                                days after you file. Some states have mandatory waiting periods.
                            </p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">What if my spouse doesn't
                                agree?</h3>
                            <p className="text-gray-600">
                                Our service is designed for uncontested divorces where both spouses agree. If your
                                divorce is contested, we recommend consulting with a family law attorney.
                            </p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Is my information secure?</h3>
                            <p className="text-gray-600">
                                Yes, we use bank-level encryption to protect your personal information. All data is
                                stored securely and never shared with third parties.
                            </p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">What if I'm not eligible?</h3>
                            <p className="text-gray-600">
                                If you're not eligible for our uncontested divorce service, we'll let you know and can
                                recommend resources to help you find appropriate legal assistance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Move Forward?</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Start with our eligibility assessment. It only takes a few minutes and could save you thousands.
                    </p>
                    <Link
                        to="/assessment"
                        className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-lg text-lg hover:bg-gray-100 transition"
                    >
                        Start Your Assessment Today
                    </Link>
                </div>
            </section>

            {/* States Footer */}
            <StatesFooter />
        </div>
    );
}
