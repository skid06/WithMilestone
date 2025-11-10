import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StatesFooter from '../StatesFooter';

export default function StateDetailPage() {
    const { stateCode } = useParams();
    const [state, setState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStateDetails();
    }, [stateCode]);

    const fetchStateDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/states/${stateCode}`);
            setState(response.data.data || response.data);
        } catch (err) {
            setError('Failed to load state details. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading state information...</p>
            </div>
        );
    }

    if (error || !state) {
        return (
            <div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{error || 'State not found'}</p>
                </div>
                <Link to="/states" className="text-blue-600 hover:text-blue-700 font-semibold">
                    ← Back to States
                </Link>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-12 mb-12">
                <h1 className="text-5xl font-bold mb-4">{state.state_name}</h1>
                <p className="text-xl opacity-90 mb-6">
                    Comprehensive guide to filing for divorce in {state.state_name}
                </p>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-6 mt-8">
                    {state.residency_requirement_days && (
                        <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4 backdrop-blur-sm border border-white border-opacity-30">
                            <p className="text-sm opacity-75 text-white">Residency Requirement</p>
                            <p className="text-2xl font-bold text-white">{state.residency_requirement_days} days</p>
                        </div>
                    )}
                    {state.min_filing_fee && (
                        <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4 backdrop-blur-sm border border-white border-opacity-30">
                            <p className="text-sm opacity-75 text-white">Filing Fee</p>
                            <p className="text-2xl font-bold text-white">${state.min_filing_fee}</p>
                        </div>
                    )}
                    {state.supports_uncontested !== undefined && (
                        <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4 backdrop-blur-sm border border-white border-opacity-30">
                            <p className="text-sm opacity-75 text-white">Uncontested Divorce</p>
                            <p className="text-2xl font-bold text-white">{state.supports_uncontested ? '✓ Yes' : '✗ No'}</p>
                        </div>
                    )}
                    {state.supports_contested !== undefined && (
                        <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4 backdrop-blur-sm border border-white border-opacity-30">
                            <p className="text-sm opacity-75 text-white">Contested Divorce</p>
                            <p className="text-2xl font-bold text-white">{state.supports_contested ? '✓ Yes' : '✗ No'}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {/* Left Column - Detailed Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Requirements Section */}
                    <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-2xl mr-3">📋</span>
                            Divorce Requirements
                        </h2>
                        <div className="space-y-4">
                            <div className="pb-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">Residency Requirement</h3>
                                <p className="text-gray-600">
                                    {state.residency_requirement_days
                                        ? `At least one spouse must have resided in ${state.state_name} for ${state.residency_requirement_days} days before filing.`
                                        : `Check with your local court for residency requirements in ${state.state_name}.`}
                                </p>
                            </div>

                            <div className="pb-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">Filing Fee</h3>
                                <p className="text-gray-600">
                                    {state.min_filing_fee
                                        ? `The minimum filing fee is $${state.min_filing_fee}. Actual fees may vary by county.`
                                        : `Contact your county courthouse for current filing fees.`}
                                </p>
                            </div>

                            <div className="pb-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">Waiting Period</h3>
                                <p className="text-gray-600">
                                    Most states have a waiting period between filing and finalization. Check with your county clerk for specific timelines.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Grounds for Divorce</h3>
                                <p className="text-gray-600">
                                    {state.state_name} accepts both contested and uncontested divorces. Common grounds include irreconcilable differences and fault-based reasons.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Process Section */}
                    <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-2xl mr-3">⚙️</span>
                            Divorce Process in {state.state_name}
                        </h2>
                        <ol className="space-y-4">
                            <li className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-semibold">1</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">File Petition</h3>
                                    <p className="text-gray-600">File the divorce petition with your county court</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-semibold">2</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Serve Spouse</h3>
                                    <p className="text-gray-600">Serve the petition to your spouse according to state requirements</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-semibold">3</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Respond & Waiting Period</h3>
                                    <p className="text-gray-600">Spouse has time to respond while waiting period elapses</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-semibold">4</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Settlement Agreement</h3>
                                    <p className="text-gray-600">Reach agreement on property division, custody, and support</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-semibold">5</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Final Judgment</h3>
                                    <p className="text-gray-600">Court issues final divorce decree</p>
                                </div>
                            </li>
                        </ol>
                    </section>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                    {/* CTA Box */}
                    <div className="bg-blue-600 text-white rounded-lg p-8">
                        <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                        <p className="mb-6 text-blue-50">
                            Check if you qualify for our online divorce services in {state.state_name}.
                        </p>
                        <Link
                            to={`/assessment?state_code=${stateCode}`}
                            className="block w-full bg-white text-blue-600 font-bold py-3 px-4 rounded text-center hover:bg-gray-100 transition"
                        >
                            Take Eligibility Quiz
                        </Link>
                    </div>

                    {/* Key Documents */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4 text-lg">📄 Required Documents</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>Petition for Divorce</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>Summons</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>Marital Settlement Agreement</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>Financial Disclosure</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>Child Custody Agreement (if applicable)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Help Section */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Our team can guide you through the {state.state_name} divorce process.
                        </p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">How long does a divorce take in {state.state_name}?</h3>
                        <p className="text-gray-600">
                            In an uncontested divorce, the process typically takes 30-90 days after the waiting period expires. Contested divorces may take longer.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Do I need a lawyer?</h3>
                        <p className="text-gray-600">
                            For uncontested divorces, many people successfully file without a lawyer. We provide documents and guidance to help you through the process.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">What about child custody?</h3>
                        <p className="text-gray-600">
                            {state.state_name} courts prioritize the best interests of the child. You'll need a custody agreement as part of your divorce settlement.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Can I get a divorce online?</h3>
                        <p className="text-gray-600">
                            You can prepare and file documents online, but you must file through the court. We handle the document preparation and filing guidance.
                        </p>
                    </div>
                </div>
            </section>

            {/* States Footer */}
            <StatesFooter />
        </div>
    );
}
