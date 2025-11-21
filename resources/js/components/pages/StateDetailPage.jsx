import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import StatesFooter from '../StatesFooter';

export default function StateDetailPage() {
    const { stateCode } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Qualification form state
    const [showQualificationForm, setShowQualificationForm] = useState(false);
    const [qualificationData, setQualificationData] = useState({
        agreement: '',
        fullName: '',
        email: '',
    });
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

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

    const handleQualificationChange = (e) => {
        const { name, value } = e.target;
        setQualificationData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckAvailability = (e) => {
        e.preventDefault();

        // Validate form
        if (!qualificationData.agreement || !qualificationData.fullName || !qualificationData.email) {
            alert('Please fill in all fields');
            return;
        }

        // If they don't agree, show message
        if (qualificationData.agreement === 'no') {
            alert('Unfortunately, WithMilestone is designed for uncontested divorces where both spouses agree. Please consult with a family law attorney for contested divorces.');
            return;
        }

        // Navigate to assessment page with the qualification data
        const params = new URLSearchParams({
            state_code: stateCode,
            fullName: qualificationData.fullName,
            email: qualificationData.email,
        });
        navigate(`/assessment?${params.toString()}`);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                setIsLoadingGoogle(true);

                // Exchange Google token for user info
                const googleTokenResponse = await axios.get(
                    'https://www.googleapis.com/oauth2/v1/userinfo',
                    {
                        headers: {
                            Authorization: `Bearer ${codeResponse.access_token}`,
                        },
                    }
                );

                const googleUser = googleTokenResponse.data;

                // Use form data if available, otherwise use Google data
                const userName = qualificationData.fullName || googleUser.name || googleUser.email;
                const userEmail = qualificationData.email || googleUser.email;

                // Register user with Google account data
                const registerResponse = await axios.post('/api/auth/register', {
                    name: userName,
                    email: userEmail,
                    password: googleUser.id + '@Google',
                    password_confirmation: googleUser.id + '@Google',
                    google_id: googleUser.id,
                });

                if (registerResponse.data.success) {
                    // Store token and user data
                    localStorage.setItem('auth_token', registerResponse.data.token);
                    localStorage.setItem('user', JSON.stringify(registerResponse.data.user));

                    // Set axios default header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${registerResponse.data.token}`;

                    // Navigate to assessment with the qualification data
                    const params = new URLSearchParams({
                        state_code: stateCode,
                        fullName: userName,
                        email: userEmail,
                    });
                    navigate(`/assessment?${params.toString()}`);
                }
            } catch (err) {
                console.error('Google Sign-up error:', err);
                // If email already exists, just log them in and proceed
                if (err.response?.status === 422) {
                    try {
                        const googleUser = await axios.get(
                            'https://www.googleapis.com/oauth2/v1/userinfo',
                            {
                                headers: {
                                    Authorization: `Bearer ${err.config.headers.Authorization}`,
                                },
                            }
                        ).catch(() => null);

                        const userName = qualificationData.fullName || googleUser?.name || qualificationData.email || '';
                        const userEmail = qualificationData.email || googleUser?.email || '';

                        // User already exists, just proceed to assessment
                        localStorage.setItem('google_user', JSON.stringify({
                            name: userName,
                            email: userEmail,
                        }));

                        const params = new URLSearchParams({
                            state_code: stateCode,
                            fullName: userName,
                            email: userEmail,
                        });
                        navigate(`/assessment?${params.toString()}`);
                    } catch (loginErr) {
                        alert('An error occurred. Please try again.');
                    }
                } else {
                    alert('An error occurred during sign-up. Please try again.');
                }
            } finally {
                setIsLoadingGoogle(false);
            }
        },
        onError: (error) => {
            console.error('Google Sign-up Error:', error);
            alert('Google Sign-up failed. Please try again.');
            setIsLoadingGoogle(false);
        },
        flow: 'implicit',
    });

    const handleGoogleSignUp = () => {
        // Initiate Google login directly without validation
        googleLogin();
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
            {/* Hero Section */}
            <section className="bg-white text-gray-900 py-20 px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                                Divorce in {state.state_name}
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Comprehensive guide to filing for divorce in {state.state_name}. Get the information you need to navigate the process efficiently and affordably.
                            </p>

                            {/* Check Eligibility Form */}
                            <div className="rounded-lg p-6 border-2 border-blue-100 mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">See If You Qualify</h3>
                                <form onSubmit={handleCheckAvailability} className="space-y-4">
                                    {/* Agreement Question */}
                                    <div>
                                        <label className="block font-semibold text-gray-900 mb-3 text-sm">
                                            Are you and your spouse both in agreement with signing the divorce papers?
                                        </label>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="agreement-yes"
                                                    name="agreement"
                                                    value="yes"
                                                    checked={qualificationData.agreement === 'yes'}
                                                    onChange={handleQualificationChange}
                                                    className="w-4 h-4 text-blue-600 cursor-pointer"
                                                />
                                                <label htmlFor="agreement-yes" className="ml-2 text-gray-700 text-sm cursor-pointer">
                                                    Yes, we both agree
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="agreement-no"
                                                    name="agreement"
                                                    value="no"
                                                    checked={qualificationData.agreement === 'no'}
                                                    onChange={handleQualificationChange}
                                                    className="w-4 h-4 text-blue-600 cursor-pointer"
                                                />
                                                <label htmlFor="agreement-no" className="ml-2 text-gray-700 text-sm cursor-pointer">
                                                    No, we don't agree
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Full Name Field */}
                                    <div>
                                        <label htmlFor="fullName" className="block font-semibold text-gray-900 mb-2 text-sm">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={qualificationData.fullName}
                                            onChange={handleQualificationChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className="block font-semibold text-gray-900 mb-2 text-sm">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={qualificationData.email}
                                            onChange={handleQualificationChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="space-y-3">
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
                                        >
                                            Check Eligibility
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleGoogleSignUp}
                                            disabled={isLoadingGoogle}
                                            className="w-full bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg transition text-sm border border-gray-300 flex items-center justify-center gap-2 disabled:opacity-75"
                                        >
                                            {isLoadingGoogle ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-800"></div>
                                                    Signing up...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                    </svg>
                                                    Sign Up with Google
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="flex justify-center">
                            <img src="/images/hero-dissolution.png" alt="Professional mediation meeting" className="w-full rounded-lg shadow-xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {/* Left Column - Detailed Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Process Section */}
                    <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-2xl mr-3">⚙️</span>
                            Divorce Process in {state.state_name}
                        </h2>
                        {state.divorce_process && (
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {state.divorce_process}
                            </p>
                        )}
                    </section>

                    {/* Custody of Child Section */}
                    <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-2xl mr-3">👨‍👩‍👧</span>
                            Custody of Child in {state.state_name}
                        </h2>
                        {state.custody_of_child && (
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {state.custody_of_child}
                            </p>
                        )}
                    </section>

                    {/* Child Support Rules Section */}
                    <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-2xl mr-3">💰</span>
                            Child Support Rules in {state.state_name}
                        </h2>
                        {state.child_support_rules && (
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {state.child_support_rules}
                            </p>
                        )}
                    </section>

                    {/* Property Division Section */}
                    <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-2xl mr-3">🏠</span>
                            Property Division in {state.state_name}
                        </h2>
                        {state.property_division && (
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {state.property_division}
                            </p>
                        )}
                    </section>

                    {/* Spousal Support Rules Section */}
                    <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-2xl mr-3">💍</span>
                            Spousal Support in {state.state_name}
                        </h2>
                        {state.spousal_support_rules && (
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {state.spousal_support_rules}
                            </p>
                        )}
                    </section>

                    {/* Mediation Support Section */}
                    <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-2xl mr-3">🤝</span>
                            Mediation Support in {state.state_name}
                        </h2>
                        {state.mediation_support && (
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {state.mediation_support}
                            </p>
                        )}
                    </section>

                    {/* Divorce Forms Section */}
                    <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-2xl mr-3">📄</span>
                            Divorce Forms in {state.state_name}
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {state.state_name} forms produced by WithMilestone.com are court-approved divorce forms. We have automated filling out paperwork to simplify matters and avoid any difficulties that may occur with filling out paperwork alone. By utilizing WithMilestone.com, you can simplify preparing divorce documents and help both parties move forward with their lives.
                        </p>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <Link
                                to={`/assessment?state_code=${stateCode}`}
                                className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition text-center"
                            >
                                Start My Divorce
                            </Link>
                        </div>
                    </section>

                    {/* Filing Fees Section */}
                    <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="text-2xl mr-3">⚖️</span>
                            Filing fees for divorce in {state.state_name}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Filing fees for divorce in {state.state_name}</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    When you file your divorce papers, the court will charge filing fees that may vary by county. These costs are in addition to the cost of using WithMilestone.com. Please check with your local courthouse to determine the exact amount.
                                </p>
                            </div>
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="font-semibold text-gray-900 mb-3 text-lg">How long will it take?</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Using the WithMilestone.com service usually takes between 30 minutes and two hours or more, depending on the complexity of your case. Start by filling out the questionnaire. You can do it in one sitting or save your progress and complete it at a later date. Whatever is most convenient for you.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Once you've received the completed documents, you will need to file them and get your spouse's signature. You'll receive more information regarding the finalization of the divorce case once the paperwork has been completed and submitted to the courts.
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <Link
                                to={`/assessment?state_code=${stateCode}`}
                                className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition text-center"
                            >
                                Start My Divorce
                            </Link>
                        </div>
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
