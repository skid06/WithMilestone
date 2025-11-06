import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Create stripe promise lazily - only when we have the key
let stripePromise = null;
const getStripePromise = () => {
    if (!stripePromise && window.STRIPE_PUBLIC_KEY) {
        stripePromise = loadStripe(window.STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
};

export default function PaymentPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    let assessmentId = searchParams.get('assessment_id');
    let stateCode = searchParams.get('state_code');

    const [loading, setLoading] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [error, setError] = useState(null);
    const [selectedState, setSelectedState] = useState(stateCode || '');
    const [states, setStates] = useState([]);

    useEffect(() => {
        if (!assessmentId) {
            setError('Missing assessment ID');
            return;
        }

        // If no state code, fetch available states so user can select
        if (!stateCode) {
            fetchStates();
        } else {
            setLoading(false);
        }
    }, [assessmentId, stateCode]);

    const handleStateSelect = (selectedStateValue) => {
        if (!selectedStateValue) {
            return;
        }
        // Navigate with the selected state code
        navigate(`/payment?assessment_id=${assessmentId}&state_code=${selectedStateValue}`);
    };

    const fetchStates = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/states');
            if (response.data.success) {
                setStates(response.data.data || response.data.states || []);
            } else {
                setError('Failed to load states');
            }
        } catch (err) {
            console.error('Error fetching states:', err);
            setError('Error loading states. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading payment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <Elements stripe={getStripePromise()}>
            <PaymentForm
                assessmentId={assessmentId}
                stateCode={stateCode || selectedState}
                paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}
                states={states}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
            />
        </Elements>
    );
}

function PaymentForm({
    assessmentId,
    stateCode,
    paymentInfo,
    setPaymentInfo,
    states,
    selectedState,
    setSelectedState,
}) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [stateError, setStateError] = useState(null);

    useEffect(() => {
        // Only create payment intent if we have both assessment ID and state code
        if (assessmentId && stateCode) {
            createPaymentIntent();
        }
    }, [assessmentId, stateCode]);

    const createPaymentIntent = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/payments/create-intent', {
                assessment_result_id: parseInt(assessmentId),
                state_code: stateCode,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });

            if (response.data.success) {
                setClientSecret(response.data.client_secret);
                setOrderId(response.data.order_id);
                setPaymentInfo({
                    amount: response.data.amount,
                    currency: response.data.currency,
                });
            } else {
                setError(response.data.message || 'Failed to create payment intent');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating payment intent');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            setError('Payment system not ready');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Confirm payment with Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (stripeError) {
                setError(stripeError.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                // Confirm payment on backend
                const confirmResponse = await axios.post(
                    '/api/payments/confirm',
                    { order_id: orderId },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                        },
                    }
                );

                if (confirmResponse.data.success) {
                    // Redirect to success page with order ID
                    navigate(`/payment-success?order_id=${orderId}`);
                } else {
                    setError(confirmResponse.data.message || 'Payment confirmation failed');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Payment processing error');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // If no stateCode yet, show state selector
    if (!stateCode) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your State</h1>
                    <p className="text-gray-600 mb-8">Choose the state where you're filing for divorce</p>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            State
                        </label>
                        <select
                            value={selectedState}
                            onChange={(e) => {
                                setSelectedState(e.target.value);
                                setStateError(null);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select a state...</option>
                            {Array.isArray(states) && states.map((state) => (
                                <option key={state.state_code} value={state.state_code}>
                                    {state.state_name}
                                </option>
                            ))}
                        </select>
                        {stateError && (
                            <p className="text-red-600 text-sm mt-2">{stateError}</p>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            if (!selectedState) {
                                setStateError('Please select a state');
                                return;
                            }
                            handleStateSelect(selectedState);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
                    >
                        Continue to Payment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
                <p className="text-gray-600 mb-8">Secure payment for divorce documents in {stateCode}</p>

                {/* Order Summary */}
                {paymentInfo && (
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
                        <h2 className="font-semibold text-blue-900 mb-4">Order Summary</h2>
                        <div className="space-y-2 text-blue-800">
                            <div className="flex justify-between">
                                <span>State:</span>
                                <span className="font-semibold">{stateCode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Service Fee:</span>
                                <span className="font-semibold">${(paymentInfo.amount / 100).toFixed(2)}</span>
                            </div>
                            <div className="border-t border-blue-200 pt-2 mt-2 flex justify-between text-lg font-bold">
                                <span>Total:</span>
                                <span>${(paymentInfo.amount / 100).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                        <p className="text-red-800 font-semibold">Error</p>
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Debug Info */}
                {!stripe && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-yellow-800 text-sm">Loading payment system...</p>
                    </div>
                )}

                {/* Payment Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Card Details
                        </label>
                        <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#fa755a',
                                        },
                                    },
                                }}
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Your payment is secure and encrypted by Stripe.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={loading || !stripe}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Processing...
                                </>
                            ) : (
                                `Pay $${paymentInfo ? (paymentInfo.amount / 100).toFixed(2) : '0.00'}`
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Security Info */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-start gap-4">
                        <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
                            <p className="text-gray-600 text-sm">
                                Your payment information is encrypted and processed securely. We never store your full card details.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
