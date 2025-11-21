import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function PaymentSuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!orderId) {
            setError('No order found');
            setLoading(false);
            return;
        }

        fetchOrderDetails();
        fetchDocuments();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(`/api/payments/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });

            if (response.data.success) {
                setOrder(response.data.order);
            }
        } catch (err) {
            console.error('Error fetching order:', err);
        }
    };

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('/api/documents', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });

            if (response.data.success) {
                setDocuments(response.data.documents);
            }
        } catch (err) {
            console.error('Error fetching documents:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (docId, fileName) => {
        try {
            const response = await axios.get(`/api/documents/${docId}/download`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
                responseType: 'blob',
            });

            // Create a blob URL and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading document:', err);
            alert('Failed to download document. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your documents...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="text-center mb-8">
                    <svg className="w-20 h-20 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-green-600 text-center mb-2">Payment Successful!</h1>
                <p className="text-lg text-gray-600 text-center mb-8">
                    Your divorce documents have been generated and are ready for download.
                </p>

                {order && (
                    <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
                        <h2 className="font-semibold text-green-900 mb-4">Order Details</h2>
                        <div className="grid grid-cols-2 gap-4 text-green-800">
                            <div>
                                <p className="text-sm text-green-700">Order ID</p>
                                <p className="font-semibold">{order.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-green-700">State</p>
                                <p className="font-semibold">{order.state_code}</p>
                            </div>
                            <div>
                                <p className="text-sm text-green-700">Amount Paid</p>
                                <p className="font-semibold">${(order.amount / 100).toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-green-700">Payment Date</p>
                                <p className="font-semibold">{new Date(order.paid_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Generated Documents */}
            {documents && documents.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8" style={{ display: 'none' }}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Documents</h2>

                    {documents.map((doc) => (
                        <div key={doc.id} className="border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                        {doc.type.replace(/_/g, ' ')}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Created: {new Date(doc.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {doc.status}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleDownload(doc.id, doc.file_name)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                                >
                                    Download
                                </button>
                                <button
                                    onClick={() => navigate(`/documents/${doc.id}`)}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                                >
                                    Preview
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Next Steps */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            1
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Review Your Documents</h3>
                            <p className="text-gray-600 mt-1">
                                Carefully review all generated documents to ensure accuracy and completeness.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            2
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Print & Make Copies</h3>
                            <p className="text-gray-600 mt-1">
                                Print your documents and make the required number of copies for filing.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            3
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">File with Court</h3>
                            <p className="text-gray-600 mt-1">
                                File the original documents with the appropriate court in your jurisdiction.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            4
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Consult an Attorney (Optional)</h3>
                            <p className="text-gray-600 mt-1">
                                For complex situations, consider consulting with a family law attorney for guidance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-8">
                <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
                <p className="text-yellow-800 text-sm">
                    These documents are provided for informational purposes only. While they contain standard legal language, divorce laws vary by jurisdiction. Please review all documents carefully and consider consulting with a licensed attorney before filing. WithMilestone is not a law firm and does not provide legal advice.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                    Go to Dashboard
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
