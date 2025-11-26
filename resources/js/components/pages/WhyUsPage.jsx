import React from 'react';
import { Link } from 'react-router-dom';

export default function WhyUsPage() {
    const features = [
        {
            title: 'Affordable',
            description: 'Our service costs a fraction of hiring a traditional attorney. No hidden fees, transparent pricing.',
            icon: '💰',
        },
        {
            title: 'Fast & Easy',
            description: 'Complete your divorce paperwork in as little as 20-30 minutes. Simple questionnaire format.',
            icon: '⚡',
        },
        {
            title: 'All 50 States',
            description: 'We support uncontested divorces in all 50 states with state-specific forms and procedures.',
            icon: '🗺️',
        },
        {
            title: 'Court-Approved Forms',
            description: 'All forms are based on official court documents and templates for your state.',
            icon: '✓',
        },
        {
            title: 'Expert-Drafted',
            description: 'Our documents are created by legal professionals with extensive divorce experience.',
            icon: '👨‍⚖️',
        },
        {
            title: 'Privacy & Security',
            description: 'Your information is protected with industry-standard encryption and privacy measures.',
            icon: '🔒',
        },
        {
            title: 'Save Time',
            description: 'No need to search for forms, understand legal requirements, or coordinate with lawyers.',
            icon: '⏰',
        },
        {
            title: 'Support Available',
            description: 'Access to resources, guidance, and FAQ support throughout your divorce process.',
            icon: '🤝',
        },
    ];

    const stats = [
        { number: '50+', label: 'States Supported' },
        { number: '1000+', label: 'Happy Customers' },
        { number: '$', label: 'Affordable Pricing' },
        { number: '24/7', label: 'Online Access' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose WithMilestone?</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        The most affordable, simple, and reliable way to get a divorce online.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-blue-600 text-white py-12 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold mb-2">{stat.number}</div>
                            <p className="text-blue-100">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Key Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Comparison Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">WithMilestone vs. Traditional Attorney</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                                    <th className="text-center py-4 px-4 font-bold text-gray-900">WithMilestone</th>
                                    <th className="text-center py-4 px-4 font-bold text-gray-900">Traditional Attorney</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-4 text-gray-900">Cost</td>
                                    <td className="py-4 px-4 text-center">✓ Affordable</td>
                                    <td className="py-4 px-4 text-center">✗ Expensive ($1,000+)</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-4 text-gray-900">Speed</td>
                                    <td className="py-4 px-4 text-center">✓ Hours/Days</td>
                                    <td className="py-4 px-4 text-center">✗ Weeks/Months</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-4 text-gray-900">24/7 Access</td>
                                    <td className="py-4 px-4 text-center">✓ Yes</td>
                                    <td className="py-4 px-4 text-center">✗ Business Hours</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-4 text-gray-900">Privacy</td>
                                    <td className="py-4 px-4 text-center">✓ Complete Control</td>
                                    <td className="py-4 px-4 text-center">✓ Confidential</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-4 text-gray-900">All States</td>
                                    <td className="py-4 px-4 text-center">✓ 50 States</td>
                                    <td className="py-4 px-4 text-center">✓ Local Only</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-4 text-gray-900">Legal Advice</td>
                                    <td className="py-4 px-4 text-center">✗ General Info Only</td>
                                    <td className="py-4 px-4 text-center">✓ Professional Advice</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="flex items-center gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                        </div>
                        <p className="text-gray-600 mb-4">
                            "WithMilestone made the process so easy. I was done in less than an hour and saved thousands compared to hiring an attorney."
                        </p>
                        <p className="font-semibold text-gray-900">Sarah M.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="flex items-center gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                        </div>
                        <p className="text-gray-600 mb-4">
                            "I was nervous about doing this myself, but the questionnaire was straightforward and the documents were exactly what I needed."
                        </p>
                        <p className="font-semibold text-gray-900">John D.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="flex items-center gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                        </div>
                        <p className="text-gray-600 mb-4">
                            "Great service, great price, and the whole process was seamless. Highly recommend WithMilestone!"
                        </p>
                        <p className="font-semibold text-gray-900">Emily R.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Join thousands of happy customers</h2>
                    <p className="text-xl mb-8 text-blue-50">
                        Start your divorce today and save thousands.
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
