import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqCategories = [
        {
            title: 'Getting Started',
            questions: [
                {
                    q: 'How do I start the process?',
                    a: 'Simply click "Check Your Eligibility" or "Start My Divorce" and answer our assessment questionnaire. It takes about 20-30 minutes and helps us understand your divorce situation.',
                },
                {
                    q: 'Do I need to be online the entire time?',
                    a: 'No! You can save your progress and come back later. Your answers are saved securely, so you can complete the assessment whenever you have time.',
                },
                {
                    q: 'What information do I need to provide?',
                    a: 'We\'ll ask about your marriage, children, assets, debts, and any agreements with your spouse. Have basic information about your finances and children ready.',
                },
                {
                    q: 'Can I get help during the process?',
                    a: 'Yes! Our support team is available 24/7 to answer questions. We also have detailed guides and explanations throughout the questionnaire.',
                },
            ],
        },
        {
            title: 'Eligibility & Requirements',
            questions: [
                {
                    q: 'Does WithMilestone work in my state?',
                    a: 'We support uncontested divorces in all 50 states. However, eligibility depends on your specific situation. Take our assessment to find out.',
                },
                {
                    q: 'What is an uncontested divorce?',
                    a: 'An uncontested divorce is when both you and your spouse agree on all major issues: division of assets, custody, support, etc. This is what WithMilestone is designed for.',
                },
                {
                    q: 'What if my spouse disagrees with the divorce terms?',
                    a: 'WithMilestone is designed for cases where both spouses agree. If there\'s disagreement, you may need to work with an attorney or mediator.',
                },
                {
                    q: 'Can I use WithMilestone if I have children?',
                    a: 'Yes! If you both agree on custody and support arrangements. If there\'s disagreement about children, you may need legal assistance.',
                },
                {
                    q: 'What if I own a business or have complex assets?',
                    a: 'Our service works best for straightforward divorces. For complex financial situations, consult with an attorney or financial advisor.',
                },
            ],
        },
        {
            title: 'Documents & Forms',
            questions: [
                {
                    q: 'What documents will I receive?',
                    a: 'You\'ll receive all necessary divorce documents customized for your state, including petition, summons, agreements, and supporting forms.',
                },
                {
                    q: 'Are the forms court-approved?',
                    a: 'Yes! All our forms are based on official court documents and templates for your state. We update them regularly as laws change.',
                },
                {
                    q: 'Can I edit the documents after I receive them?',
                    a: 'Yes, you can edit the documents before filing. However, we recommend reviewing carefully and using our guidance to ensure accuracy.',
                },
                {
                    q: 'What if I find an error in my documents?',
                    a: 'We guarantee accuracy. If there\'s an error on our part, we\'ll revise the documents at no cost. Contact our support team immediately.',
                },
                {
                    q: 'How do I get the documents in different formats?',
                    a: 'You can download documents as PDF or Word files, making them easy to print, edit, or share with your spouse.',
                },
            ],
        },
        {
            title: 'Pricing & Payment',
            questions: [
                {
                    q: 'How much does WithMilestone cost?',
                    a: 'Pricing varies by state and complexity, but typically ranges from $200-$500. We show you the exact price before you pay.',
                },
                {
                    q: 'What payment methods do you accept?',
                    a: 'We accept all major credit cards, debit cards, and digital payment methods. All transactions are secure and encrypted.',
                },
                {
                    q: 'Is there a money-back guarantee?',
                    a: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied for any reason, we\'ll refund your full payment.',
                },
                {
                    q: 'Are there any hidden fees?',
                    a: 'No hidden fees! What you see is what you pay. We\'re transparent about all costs upfront.',
                },
                {
                    q: 'Can I get a refund after I\'ve used the documents?',
                    a: 'Our 30-day guarantee applies to all purchases. After 30 days, documents are generally non-refundable as they\'re customized.',
                },
            ],
        },
        {
            title: 'Filing & Legal Process',
            questions: [
                {
                    q: 'Will WithMilestone file the documents for me?',
                    a: 'No, we provide you with the documents. You\'ll file them with your local court. We provide detailed filing instructions.',
                },
                {
                    q: 'How do I file my divorce?',
                    a: 'You\'ll file your documents with your county courthouse. We provide step-by-step instructions specific to your state.',
                },
                {
                    q: 'Do I need a lawyer to file?',
                    a: 'For uncontested divorces, many people successfully file without a lawyer using our documents. Consult with an attorney if you\'re unsure.',
                },
                {
                    q: 'How long does the divorce process take?',
                    a: 'Our document preparation takes hours to days. Court processing varies by state, typically 30-90 days for uncontested divorces.',
                },
                {
                    q: 'What if the court rejects my documents?',
                    a: 'If rejected due to our error, we\'ll revise them at no cost. If rejected due to missing information from you, we\'ll help you correct it.',
                },
            ],
        },
        {
            title: 'Account & Support',
            questions: [
                {
                    q: 'Can I access my documents after I download them?',
                    a: 'Yes! Your documents are saved in your account. You can download them again anytime. Log in to your account to access them.',
                },
                {
                    q: 'Is my information kept private?',
                    a: 'Absolutely! Your information is encrypted and never shared with third parties. We take privacy very seriously.',
                },
                {
                    q: 'How do I contact customer support?',
                    a: 'You can reach our support team via email, phone, or chat. We\'re available 24/7 to help with questions.',
                },
                {
                    q: 'Can I get a refund if I decide not to proceed?',
                    a: 'Yes, within 30 days of purchase. Just contact our support team for a hassle-free refund.',
                },
                {
                    q: 'What if I need help after filing?',
                    a: 'We provide lifetime access to support resources and FAQ. Contact us if you have questions throughout your divorce process.',
                },
            ],
        },
        {
            title: 'Specific Situations',
            questions: [
                {
                    q: 'Can I use WithMilestone if my spouse is out of state?',
                    a: 'Yes, as long as you meet residency requirements in your state. The location of your spouse doesn\'t prevent an uncontested divorce.',
                },
                {
                    q: 'What if I don\'t know where my spouse is?',
                    a: 'You may still be able to proceed, but you\'ll need to follow specific legal procedures. Consult with an attorney about your options.',
                },
                {
                    q: 'Can I use WithMilestone for a same-sex divorce?',
                    a: 'Yes! We support divorce for all couples, regardless of gender or sexual orientation.',
                },
                {
                    q: 'What if we don\'t have a written agreement?',
                    a: 'Our service helps you create the agreements. As you answer the questionnaire, we generate documents that formalize your agreements.',
                },
                {
                    q: 'Can I modify the documents after filing?',
                    a: 'Modifications after filing require court approval and additional paperwork. It\'s best to ensure accuracy before filing.',
                },
            ],
        },
    ];

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Find answers to common questions about WithMilestone and our divorce service.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <p className="text-gray-700">
                            Don't see your question? <Link to="#" className="text-blue-600 hover:text-blue-700 font-semibold">Contact our support team</Link> - we're available 24/7!
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Sections */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="space-y-8">
                    {faqCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-blue-600">
                                {category.title}
                            </h2>
                            <div className="space-y-4">
                                {category.questions.map((item, itemIndex) => {
                                    const globalIndex = categoryIndex * 100 + itemIndex;
                                    const isOpen = openIndex === globalIndex;
                                    return (
                                        <div
                                            key={itemIndex}
                                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                                        >
                                            <button
                                                onClick={() => toggleQuestion(globalIndex)}
                                                className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between"
                                            >
                                                <span>{item.q}</span>
                                                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                                                    ▼
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                                    <p className="text-gray-700 leading-relaxed">{item.a}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Additional Help Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Still Have Questions?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl mb-4">📧</div>
                            <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
                            <p className="text-gray-600 mb-4">support@withmilestone.com</p>
                            <p className="text-sm text-gray-600">Response within 24 hours</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">📞</div>
                            <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
                            <p className="text-gray-600 mb-4">1-800-DIVORCE-1</p>
                            <p className="text-sm text-gray-600">Available 24/7</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">💬</div>
                            <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
                            <p className="text-gray-600 mb-4">Chat with our team</p>
                            <p className="text-sm text-gray-600">Instant answers to your questions</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-xl mb-8 text-blue-50">
                        See if you qualify for WithMilestone and start your divorce journey today.
                    </p>
                    <Link
                        to="/assessment"
                        className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition"
                    >
                        Check Your Eligibility
                    </Link>
                </div>
            </section>
        </div>
    );
}
