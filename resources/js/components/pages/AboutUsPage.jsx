import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUsPage() {
    const values = [
        {
            title: 'Accessibility',
            description: 'We believe quality legal documents should be accessible to everyone, regardless of income level.',
            icon: '🌍',
        },
        {
            title: 'Simplicity',
            description: 'We break down complex legal processes into simple, understandable steps anyone can follow.',
            icon: '📝',
        },
        {
            title: 'Transparency',
            description: 'No hidden fees, no surprises. What you see is what you pay. Complete transparency in all dealings.',
            icon: '💎',
        },
        {
            title: 'Reliability',
            description: 'Our documents are accurate, up-to-date, and based on official court requirements for each state.',
            icon: '✓',
        },
    ];

    const timeline = [
        {
            year: '2020',
            event: 'WithMilestone Founded',
            description: 'Started with a mission to make divorce affordable and accessible for everyone.',
        },
        {
            year: '2021',
            event: 'Expanded to All States',
            description: 'Achieved support for all 50 states with state-specific forms and procedures.',
        },
        {
            year: '2022',
            event: 'Serving Thousands',
            description: 'Helped over 5,000 customers successfully complete their divorces online.',
        },
        {
            year: '2023',
            event: 'Industry Recognition',
            description: 'Recognized as a leading online divorce solution provider.',
        },
        {
            year: '2024',
            event: 'Continuous Innovation',
            description: 'Launching new features and improvements based on customer feedback.',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About WithMilestone</h1>
                    <p className="text-xl text-gray-600">
                        Making divorce simple, affordable, and accessible since 2020.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        At WithMilestone, we believe that divorce doesn't have to be complicated or expensive. Our mission is to empower individuals by providing affordable, easy-to-use tools and forms to navigate the divorce process with confidence.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We're committed to removing barriers to access and making quality legal documents available to everyone, regardless of their financial situation. With WithMilestone, thousands of people have successfully completed their divorces at a fraction of the traditional cost.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
                            <div className="text-5xl mb-4">{value.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Journey</h2>
                    <div className="space-y-8">
                        {timeline.map((item, index) => (
                            <div key={index} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold">
                                        {item.year.slice(-2)}
                                    </div>
                                </div>
                                <div className="flex-grow pb-8 border-l border-gray-300 pl-6">
                                    <h3 className="text-xl font-bold text-gray-900">{item.event}</h3>
                                    <p className="text-gray-600 mt-2">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Philosophy Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-blue-50 rounded-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Approach</h2>
                    <div className="space-y-4 text-gray-700">
                        <p className="text-lg leading-relaxed">
                            We combine expert legal knowledge with cutting-edge technology to create a service that's both comprehensive and user-friendly. Our team includes legal professionals, divorce specialists, and customer service experts dedicated to helping you navigate the process smoothly.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Every document we create is:
                        </p>
                        <ul className="space-y-2 ml-6 text-lg">
                            <li>✓ Based on official court requirements for your state</li>
                            <li>✓ Reviewed and updated regularly to reflect law changes</li>
                            <li>✓ Created with input from legal professionals</li>
                            <li>✓ Tested by real customers in various situations</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Impact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-600 mb-2">10,000+</div>
                            <p className="text-gray-600">Customers Served</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-600 mb-2">$50M+</div>
                            <p className="text-gray-600">Saved by Customers</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-600 mb-2">50</div>
                            <p className="text-gray-600">States Supported</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-600 mb-2">24/7</div>
                            <p className="text-gray-600">Online Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
                    <p className="text-xl mb-8 text-blue-50">
                        Be part of the thousands who've successfully completed their divorce with WithMilestone.
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
