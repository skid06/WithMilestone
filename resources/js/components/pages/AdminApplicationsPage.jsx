import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../Admin/AdminLayout';

export default function AdminApplicationsPage() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        search: '',
        state_code: '',
        eligibility_status: '',
        is_eligible: '',
        sort_by: 'completion_date',
        sort_order: 'desc',
        per_page: 20,
        page: 1,
    });

    // Fetch applications
    useEffect(() => {
        fetchApplications();
    }, [filters]);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('auth_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get('/api/admin/applications', {
                params: filters,
                ...config,
            });

            setApplications(response.data.data || []);
        } catch (err) {
            console.error('Failed to fetch applications:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
            page: 1, // Reset to first page when filter changes
        }));
    };

    const handleSort = (column) => {
        if (filters.sort_by === column) {
            setFilters(prev => ({
                ...prev,
                sort_order: prev.sort_order === 'asc' ? 'desc' : 'asc',
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                sort_by: column,
                sort_order: 'desc',
            }));
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/admin/applications/${id}`);
    };

    const handleExport = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            };

            const response = await axios.get('/api/admin/applications/export/csv', {
                params: filters,
                ...config,
            });

            // Create blob and download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `applications-${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error('Failed to export applications:', err);
        }
    };

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications</h1>
                        <p className="text-gray-600">View and manage all submitted assessment applications</p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filters
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    placeholder="Email, name, or session ID..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    State
                                </label>
                                <select
                                    name="state_code"
                                    value={filters.state_code}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="">All States</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Eligibility
                                </label>
                                <select
                                    name="is_eligible"
                                    value={filters.is_eligible}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="">All</option>
                                    <option value="true">Eligible</option>
                                    <option value="false">Ineligible</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Per Page
                                </label>
                                <select
                                    name="per_page"
                                    value={filters.per_page}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-4">
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export to CSV
                            </button>
                        </div>
                    </div>

                    {/* Applications Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <button
                                                onClick={() => handleSort('id')}
                                                className="text-sm font-bold text-gray-700 hover:text-blue-600 flex items-center gap-1"
                                            >
                                                ID
                                                {filters.sort_by === 'id' && (
                                                    <svg className={`w-4 h-4 ${filters.sort_order === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <button
                                                onClick={() => handleSort('completion_date')}
                                                className="text-sm font-bold text-gray-700 hover:text-blue-600 flex items-center gap-1"
                                            >
                                                Submitted
                                                {filters.sort_by === 'completion_date' && (
                                                    <svg className={`w-4 h-4 ${filters.sort_order === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">State</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Eligible</th>
                                        <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                                                    <p className="mt-4 text-gray-500">Loading applications...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : applications.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center">
                                                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    <p className="text-gray-500 text-lg">No applications found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        applications.map((app) => (
                                            <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 text-gray-900 font-semibold">#{app.id}</td>
                                                <td className="px-6 py-4 text-gray-600 text-sm">
                                                    {new Date(app.completion_date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-gray-900">
                                                    {app.user ? app.user.email : 'Anonymous'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                                                        {app.state_code}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        app.eligibility_status === 'eligible'
                                                            ? 'bg-green-100 text-green-800'
                                                            : app.eligibility_status === 'ineligible'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {app.eligibility_status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {app.result ? (
                                                        app.result.is_eligible ? (
                                                            <span className="text-green-600 font-semibold flex items-center gap-1">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                Yes
                                                            </span>
                                                        ) : (
                                                            <span className="text-red-600 font-semibold flex items-center gap-1">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                                No
                                                            </span>
                                                        )
                                                    ) : (
                                                        <span className="text-gray-400">N/A</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleViewDetails(app.id)}
                                                        className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}