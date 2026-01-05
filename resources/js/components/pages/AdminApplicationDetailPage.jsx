import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../Admin/AdminLayout';

export default function AdminApplicationDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplicationDetails();
    }, [id]);

    const fetchApplicationDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('auth_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(`/api/admin/applications/${id}`, config);
            setApplication(response.data.data);
        } catch (err) {
            setError('Failed to load application details');
            console.error('Failed to fetch application details:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600 font-medium">Loading application details...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error || !application) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="text-red-600 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Application</h2>
                        <p className="text-gray-600 mb-6">{error || 'Application not found'}</p>
                        <Link
                            to="/admin/dashboard"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            to="/admin/dashboard"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Dashboard
                        </Link>
                    </div>

                    {/* Header Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">
                                        Application #{application.id}
                                    </h1>
                                    <p className="text-blue-100">
                                        Submitted on {formatDate(application.completion_date)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    {application.result && (
                                        <span className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold ${
                                            application.result.is_eligible
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-500 text-white'
                                        }`}>
                                            {application.result.is_eligible ? '✓ Eligible' : '✗ Ineligible'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* User Information Card */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                User Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {application.user ? application.user.name : 'Anonymous User'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {application.user ? application.user.email : 'Not provided'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Session ID</p>
                                    <p className="text-lg font-mono text-gray-700 bg-gray-100 px-3 py-1 rounded">
                                        {application.session_id || 'N/A'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">User ID</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {application.user_id || 'Guest'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Status
                            </h2>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">State</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {application.state_code}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Application Status</p>
                                    <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${
                                        application.eligibility_status === 'eligible'
                                            ? 'bg-green-100 text-green-800'
                                            : application.eligibility_status === 'ineligible'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {application.eligibility_status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Eligibility Result Card */}
                    {application.result && (
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Eligibility Assessment Results
                            </h2>

                            <div className="mb-6">
                                <div className={`p-6 rounded-lg ${
                                    application.result.is_eligible
                                        ? 'bg-green-50 border-2 border-green-200'
                                        : 'bg-red-50 border-2 border-red-200'
                                }`}>
                                    <div className="flex items-start">
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                            application.result.is_eligible
                                                ? 'bg-green-500'
                                                : 'bg-red-500'
                                        }`}>
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {application.result.is_eligible ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                )}
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className={`text-xl font-bold ${
                                                application.result.is_eligible ? 'text-green-900' : 'text-red-900'
                                            }`}>
                                                {application.result.is_eligible
                                                    ? 'Applicant is Eligible for Divorce'
                                                    : 'Applicant is Not Eligible for Divorce'}
                                            </h3>
                                            <p className={`mt-1 ${
                                                application.result.is_eligible ? 'text-green-700' : 'text-red-700'
                                            }`}>
                                                {application.result.is_eligible
                                                    ? 'This application meets all eligibility criteria for divorce proceedings.'
                                                    : 'This application does not meet one or more eligibility criteria.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ineligibility Reasons */}
                            {application.result.ineligibility_reasons && application.result.ineligibility_reasons.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Ineligibility Reasons</h3>
                                    <div className="space-y-3">
                                        {application.result.ineligibility_reasons.map((reason, idx) => (
                                            <div key={idx} className="flex items-start bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                                <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-red-800 font-medium">{reason}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Additional Result Data */}
                            {application.result.message && (
                                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                                    <h3 className="text-lg font-bold text-blue-900 mb-2">Additional Information</h3>
                                    <p className="text-blue-800">{application.result.message}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Timeline Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Timeline
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold text-gray-900">Application Completed</p>
                                    <p className="text-sm text-gray-600">{formatDate(application.completion_date)}</p>
                                </div>
                            </div>
                            {application.created_at && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-bold text-gray-900">Application Created</p>
                                        <p className="text-sm text-gray-600">{formatDate(application.created_at)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}