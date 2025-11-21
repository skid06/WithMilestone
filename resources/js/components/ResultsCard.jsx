import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResultsCard({ results, onBackToHome, assessmentId, stateCode, fullName, email }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            {results.is_eligible ? (
                <div className="text-center">
                    <div className="mb-6">
                        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-green-600 mb-2">You're Eligible!</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Great news! Based on your responses, you qualify for our online divorce services.
                    </p>
                    <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
                        <p className="text-green-800 font-semibold">Flat Rate: $199</p>
                        <p className="text-green-700 mt-2">All documents included for your state</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                const finalStateCode = stateCode || results.state_code || 'unknown';
                                const finalAssessmentId = assessmentId || 'unknown';
                                let checkoutUrl = `/checkout?assessment_id=${finalAssessmentId}&state_code=${finalStateCode}`;
                                if (fullName) checkoutUrl += `&fullName=${encodeURIComponent(fullName)}`;
                                if (email) checkoutUrl += `&email=${encodeURIComponent(email)}`;
                                navigate(checkoutUrl);
                            }}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition"
                        >
                            Continue to Checkout
                        </button>
                        <button
                            onClick={onBackToHome}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded-lg transition"
                        >
                            Start Another Assessment
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="mb-6">
                        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-red-600 mb-2">Ineligible at This Time</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Based on your responses, you may not be eligible for our online divorce services at this time.
                    </p>

                    {results.reasons && results.reasons.length > 0 && (
                        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 text-left">
                            <p className="font-semibold text-red-800 mb-2">Reasons:</p>
                            <ul className="list-disc list-inside text-red-700 space-y-1">
                                {results.reasons.map((reason, idx) => (
                                    <li key={idx}>{reason}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <p className="text-gray-600 mb-6">
                        We recommend contacting a local family law attorney who can better assist with your specific situation.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={onBackToHome}
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg"
                        >
                            Start Another Assessment
                        </button>
                        <button
                            onClick={() => window.location.href = 'https://www.google.com/search?q=family+lawyer'}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
                        >
                            Find a Family Law Attorney
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
