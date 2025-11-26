import React from 'react';
import { Link } from 'react-router-dom';

export default function OurGuaranteePage() {
    const guarantees = [
        {
            title: '100% Court-Approved Forms',
            description: 'All our documents are based on official court forms and templates for your state. If a document is rejected by the court, we\'ll revise it at no additional cost.',
            icon: '✓',
        },
        {
            title: 'Money-Back Guarantee',
            description: 'If you\'re not satisfied with our service within 30 days, we\'ll refund your full payment, no questions asked.',
            icon: '💰',
        },
        {
            title: 'Accuracy Guaranteed',
            description: 'Our legal team reviews every document to ensure accuracy and completeness. We guarantee all forms are customized correctly for your state and situation.',
            icon: '🎯',
        },
        {
            title: 'State-Specific Compliance',
            description: 'Every document meets the specific requirements of your state. We stay updated with all state law changes.',
            icon: '⚖️',
        },
        {
            title: 'Privacy Protected',
            description: 'Your personal information is encrypted and protected. We never share your data with third parties.',
            icon: '🔒',
        },
        {
            title: 'Lifetime Support Access',
            description: 'Get access to our support resources and FAQ for life. We\'re here to help, even after your divorce is complete.',
            icon: '🤝',
        },
    ];

    const faqs = [
        {
            question: 'What does your money-back guarantee cover?',
            answer: 'Our 30-day money-back guarantee applies if you\'re not satisfied with the service for any reason. This includes if you decide an uncontested divorce isn\'t right for your situation. Simply contact our support team within 30 days of purchase.',
        },
        {
            question: 'What if the court rejects my documents?',
            answer: 'We guarantee our documents are court-approved and properly formatted. If a court rejects them due to an error on our part, we\'ll revise them at no cost. Note: Court rejections due to missing information from you are not covered.',
        },
        {
            question: 'Are the forms really customized for my state?',
            answer: 'Yes! Every document is customized based on your state\'s specific divorce laws and court requirements. We maintain up-to-date information for all 50 states.',
        },
        {
            question: 'How long does the guarantee last?',
            answer: 'The money-back guarantee is valid for 30 days from purchase. The court-approval guarantee covers your documents for the entire divorce process.',
        },
        {
            question: 'What if I change my mind about getting divorced?',
            answer: 'You can cancel within 30 days and receive a full refund. After 30 days, documents are generally non-refundable as they\'re customized for your specific situation.',
        },
        {
            question: 'Is there a guarantee if the divorce takes longer?',
            answer: 'Our guarantee covers the documents themselves, not the court processing time. Court timelines vary by state and are outside our control.',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Guarantee</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        We stand behind our service with comprehensive guarantees that protect your investment.
                    </p>
                    <div className="inline-block bg-green-100 border-2 border-green-600 text-green-800 px-6 py-3 rounded-lg font-bold">
                        ✓ Risk-Free. Money-Back Guaranteed.
                    </div>
                </div>
            </section>

            {/* Guarantees Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Commitments to You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {guarantees.map((guarantee, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition border-l-4 border-blue-600">
                            <div className="text-5xl mb-4">{guarantee.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{guarantee.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{guarantee.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Money-Back Guarantee Details */}
            <section className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">30-Day Money-Back Guarantee</h2>
                    <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">How It Works</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    If you're not completely satisfied with WithMilestone within 30 days of your purchase, simply contact our support team. We'll process your refund within 5 business days. No hassle, no questions asked.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">What's Covered</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>✓ You changed your mind about getting divorced</li>
                                    <li>✓ An uncontested divorce doesn't work for your situation</li>
                                    <li>✓ You're not satisfied with the quality of the documents</li>
                                    <li>✓ You prefer to hire an attorney instead</li>
                                    <li>✓ Any other reason within 30 days of purchase</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">How to Claim</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Contact our support team via email or phone. Provide your order number and reason for the refund. We'll verify your claim and process your refund within 5 business days.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Court-Approval Guarantee */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Court-Approval Guarantee</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Commitment</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Every document we provide is 100% court-approved and based on official court forms for your state. We guarantee that our documents meet all filing requirements.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">If Documents Are Rejected</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If a court rejects your documents due to an error on our part, we'll revise them at no additional cost. This includes:
                            </p>
                            <ul className="space-y-2 text-gray-700 ml-6">
                                <li>✓ Formatting errors</li>
                                <li>✓ Missing required fields (due to our error)</li>
                                <li>✓ Outdated legal language</li>
                                <li>✓ Incorrect state-specific requirements</li>
                            </ul>
                        </div>
                        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
                            <p className="text-gray-700">
                                <strong>Note:</strong> Court rejections due to information you didn't provide or errors in completing the questionnaire are not covered. We recommend reviewing all documents carefully before filing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Guarantee FAQs</h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Support Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">We're Here to Help</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Have questions about our guarantee? Contact our support team anytime.
                    </p>
                    <div className="space-y-4">
                        <p className="text-gray-700">📧 Email: support@withmilestone.com</p>
                        <p className="text-gray-700">📞 Phone: 1-800-DIVORCE-1</p>
                        <p className="text-gray-700">⏰ Available: 24/7</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Divorce With Confidence</h2>
                    <p className="text-xl mb-8 text-blue-50">
                        Start your divorce today, backed by our comprehensive guarantee.
                    </p>
                    <Link
                        to="/assessment"
                        className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition"
                    >
                        Start Your Assessment
                    </Link>
                </div>
            </section>
        </div>
    );
}
