import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const assessmentId = searchParams.get('assessment_id');
    const stateCode = searchParams.get('state_code');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('signup'); // 'signup' or 'guest'

    // Signup form state
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // Guest checkout state
    const [guestData, setGuestData] = useState({
        email: '',
    });

    const [paymentInfo, setPaymentInfo] = useState(null);

    useEffect(() => {
        // Get pre-filled values from URL params
        const fullName = searchParams.get('fullName');
        const email = searchParams.get('email');

        // Pre-populate the signup form if values are provided
        if (fullName || email) {
            setSignupData(prev => ({
                ...prev,
                ...(fullName && { name: fullName }),
                ...(email && { email: email }),
            }));
            setGuestData(prev => ({
                ...prev,
                ...(email && { email: email }),
            }));
        }

        // Allow either assessmentId or fullName (from quick qualification form)
        const hasValidPath = assessmentId || searchParams.get('fullName');
        if (!hasValidPath) {
            setError('Missing assessment ID. Please complete the eligibility assessment first.');
            return;
        }

        if (!stateCode) {
            setError('Missing state information. Please select a state first.');
            return;
        }

        // Fetch order details (pricing)
        fetchOrderDetails();
    }, [assessmentId, stateCode, searchParams]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            // This will get pricing information
            setPaymentInfo({
                amount: 19900, // $199.00 in cents
                currency: 'usd',
            });
        } catch (err) {
            console.error('Error fetching order details:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prev => ({ ...prev, [name]: value }));
    };

    const handleGuestChange = (e) => {
        const { name, value } = e.target;
        setGuestData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);

        // Validate
        if (!signupData.name || !signupData.email || !signupData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (signupData.password !== signupData.password_confirmation) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);

            // Register the user
            const registerResponse = await axios.post('/api/auth/register', {
                name: signupData.name,
                email: signupData.email,
                password: signupData.password,
                password_confirmation: signupData.password_confirmation,
            });

            if (registerResponse.data.success) {
                // Store token
                localStorage.setItem('auth_token', registerResponse.data.token);

                // Proceed to payment
                proceedToPayment(registerResponse.data.token);
            } else {
                setError(registerResponse.data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const errorMessages = Object.values(errors).flat().join(', ');
                setError(errorMessages || 'Registration failed. Please check your information.');
            } else {
                setError(err.response?.data?.message || 'Registration error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGuestCheckout = async (e) => {
        e.preventDefault();
        setError(null);

        if (!guestData.email) {
            setError('Please enter your email');
            return;
        }

        try {
            setLoading(true);

            // Create a guest user account with the provided email
            // Use a random password for guest accounts
            const guestPassword = Math.random().toString(36).slice(-12);

            const registerResponse = await axios.post('/api/auth/register', {
                name: `Guest - ${guestData.email}`,
                email: guestData.email,
                password: guestPassword,
                password_confirmation: guestPassword,
            });

            if (registerResponse.data.success) {
                // Store token for this guest session
                localStorage.setItem('auth_token', registerResponse.data.token);

                // Proceed to payment with the guest account token
                proceedToPayment(registerResponse.data.token);
            } else {
                setError(registerResponse.data.message || 'Failed to create guest account');
            }
        } catch (err) {
            console.error('Guest checkout error:', err);
            // If email already exists
            if (err.response?.status === 422) {
                if (err.response?.data?.errors?.email) {
                    setError('This email is already registered. Please use login or sign up instead.');
                } else if (err.response?.data?.errors) {
                    const errors = err.response.data.errors;
                    const errorMessages = Object.values(errors).flat().join(', ');
                    setError(errorMessages || 'Validation error. Please check your information.');
                } else {
                    setError(err.response?.data?.message || 'This email is already in use.');
                }
            } else {
                setError(err.response?.data?.message || 'Checkout error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const proceedToPayment = async (token, guestEmail = null) => {
        try {
            // Navigate to payment page with assessment info
            const config = token ? {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            } : {};

            navigate(`/payment?assessment_id=${assessmentId}&state_code=${stateCode}${guestEmail ? `&email=${guestEmail}` : ''}`);
        } catch (err) {
            setError('Failed to proceed to payment');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Checkout Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Order</h1>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                    <p className="text-red-800">{error}</p>
                                </div>
                            )}

                            {/* Tab Navigation */}
                            <div className="flex gap-4 mb-8 border-b border-gray-200">
                                <button
                                    onClick={() => setActiveTab('signup')}
                                    className={`pb-4 px-4 font-semibold transition ${
                                        activeTab === 'signup'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Create Account
                                </button>
                                <button
                                    onClick={() => setActiveTab('guest')}
                                    className={`pb-4 px-4 font-semibold transition ${
                                        activeTab === 'guest'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Continue as Guest
                                </button>
                            </div>

                            {/* Signup Form */}
                            {activeTab === 'signup' && (
                                <form onSubmit={handleSignup}>
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={signupData.name}
                                                onChange={handleSignupChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={signupData.email}
                                                onChange={handleSignupChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                                placeholder="your@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={signupData.password}
                                                onChange={handleSignupChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                                placeholder="••••••••"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password_confirmation"
                                                value={signupData.password_confirmation}
                                                onChange={handleSignupChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition"
                                    >
                                        {loading ? 'Processing...' : 'Create Account & Continue to Payment'}
                                    </button>

                                    <p className="text-sm text-gray-600 mt-4 text-center">
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => navigate('/login')}
                                            className="text-blue-600 hover:underline font-semibold"
                                        >
                                            Sign in here
                                        </button>
                                    </p>
                                </form>
                            )}

                            {/* Guest Checkout Form */}
                            {activeTab === 'guest' && (
                                <form onSubmit={handleGuestCheckout}>
                                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                                        <p className="text-blue-800 text-sm">
                                            You can continue without an account. We'll create one for you after payment with your provided email.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={guestData.email}
                                            onChange={handleGuestChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="your@email.com"
                                        />
                                        <p className="text-sm text-gray-600 mt-2">
                                            We'll send your documents and payment confirmation to this email.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition mt-6"
                                    >
                                        {loading ? 'Processing...' : 'Continue to Payment'}
                                    </button>
                                </form>
                            )}

                            {/* Security Notice */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="flex items-start gap-4">
                                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Your Information is Secure</h3>
                                        <p className="text-gray-600 text-sm">
                                            Your payment and personal information are encrypted and secure. We use industry-standard SSL encryption.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div>
                        <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Uncontested Divorce Package</span>
                                    <span className="font-semibold text-gray-900">$199.00</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>✓ Customized documents</p>
                                    <p>✓ {stateCode} court forms</p>
                                    <p>✓ 24-hour support</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-bold text-gray-900">Total:</span>
                                <span className="text-2xl font-bold text-blue-600">$199.00</span>
                            </div>

                            <button
                                onClick={() => window.history.back()}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                            >
                                Back to Assessment
                            </button>

                            {/* Trust Badges */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <p className="text-sm text-gray-600 mb-4 font-semibold">We Accept:</p>
                                <div className="flex gap-4">
                                    <div className="text-2xl">💳</div>
                                    <div className="text-2xl">🔒</div>
                                    <div className="text-2xl">✓</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
