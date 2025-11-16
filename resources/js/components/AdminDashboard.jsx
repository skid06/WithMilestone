import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

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

    // Fetch applications and stats
    useEffect(() => {
        fetchApplications();
        fetchStats();
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

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get('/api/admin/dashboard/stats', {
                ...config,
            });

            setStats(response.data.data || null);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
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

    const handleViewDetails = async (id) => {
        try {
            const token = localStorage.getItem('auth_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(`/api/admin/applications/${id}`, config);
            setSelectedApplication(response.data.data);
            setShowDetailModal(true);
        } catch (err) {
            console.error('Failed to fetch application details:', err);
        }
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
            link.parentChild.removeChild(link);
        } catch (err) {
            console.error('Failed to export applications:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage and view all submitted assessment applications</p>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-500 text-sm font-semibold">Total Applications</p>
                            <p className="text-4xl font-bold text-blue-600 mt-2">{stats.total_applications}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-500 text-sm font-semibold">Eligible</p>
                            <p className="text-4xl font-bold text-green-600 mt-2">{stats.eligible_count}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-500 text-sm font-semibold">Ineligible</p>
                            <p className="text-4xl font-bold text-red-600 mt-2">{stats.ineligible_count}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-500 text-sm font-semibold">Eligibility Rate</p>
                            <p className="text-4xl font-bold text-purple-600 mt-2">{stats.eligibility_rate}%</p>
                        </div>
                    </div>
                )}

                {/* Top States */}
                {stats && stats.by_state.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Top States</h2>
                        <div className="space-y-3">
                            {stats.by_state.map((state, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <span className="text-gray-700 font-semibold">{state.state_code}</span>
                                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{
                                                width: `${(state.count / stats.total_applications) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-gray-600 font-semibold">{state.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Filters</h2>
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
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
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                            >
                                <option value="">All</option>
                                <option value="true">Eligible</option>
                                <option value="false">Ineligible</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Items per Page
                            </label>
                            <select
                                name="per_page"
                                value={filters.per_page}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
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
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                        >
                            📥 Export to CSV
                        </button>
                    </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('id')}
                                        className="text-gray-700 font-semibold hover:text-blue-600"
                                    >
                                        ID {filters.sort_by === 'id' && (filters.sort_order === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('completion_date')}
                                        className="text-gray-700 font-semibold hover:text-blue-600"
                                    >
                                        Submitted {filters.sort_by === 'completion_date' && (filters.sort_order === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">State</th>
                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Eligible</th>
                                <th className="px-6 py-3 text-center text-gray-700 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                        Loading applications...
                                    </td>
                                </tr>
                            ) : applications.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                        No applications found
                                    </td>
                                </tr>
                            ) : (
                                applications.map((app) => (
                                    <tr key={app.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-3 text-gray-900">{app.id}</td>
                                        <td className="px-6 py-3 text-gray-600 text-sm">
                                            {new Date(app.completion_date).toLocaleDateString()} {new Date(app.completion_date).toLocaleTimeString()}
                                        </td>
                                        <td className="px-6 py-3 text-gray-900">
                                            {app.user ? app.user.email : 'Anonymous'}
                                        </td>
                                        <td className="px-6 py-3 text-gray-900 font-semibold">{app.state_code}</td>
                                        <td className="px-6 py-3">
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
                                        <td className="px-6 py-3">
                                            {app.result ? (
                                                app.result.is_eligible ? (
                                                    <span className="text-green-600 font-semibold">✓ Yes</span>
                                                ) : (
                                                    <span className="text-red-600 font-semibold">✗ No</span>
                                                )
                                            ) : (
                                                <span className="text-gray-400">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <button
                                                onClick={() => handleViewDetails(app.id)}
                                                className="text-blue-600 hover:text-blue-800 font-semibold"
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

            {/* Detail Modal */}
            {showDetailModal && selectedApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl max-h-96 overflow-y-auto p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-600 text-sm">ID</p>
                                <p className="text-gray-900 font-semibold">{selectedApplication.id}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Email</p>
                                <p className="text-gray-900 font-semibold">
                                    {selectedApplication.user ? selectedApplication.user.email : 'Anonymous'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Name</p>
                                <p className="text-gray-900 font-semibold">
                                    {selectedApplication.user ? selectedApplication.user.name : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">State</p>
                                <p className="text-gray-900 font-semibold">{selectedApplication.state_code}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Status</p>
                                <p className="text-gray-900 font-semibold">{selectedApplication.eligibility_status}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Eligible</p>
                                <p className="text-gray-900 font-semibold">
                                    {selectedApplication.result ? (
                                        selectedApplication.result.is_eligible ? '✓ Yes' : '✗ No'
                                    ) : (
                                        'N/A'
                                    )}
                                </p>
                            </div>
                            {selectedApplication.result && selectedApplication.result.ineligibility_reasons && (
                                <div>
                                    <p className="text-gray-600 text-sm">Ineligibility Reasons</p>
                                    <ul className="list-disc list-inside text-gray-900">
                                        {selectedApplication.result.ineligibility_reasons.map((reason, idx) => (
                                            <li key={idx}>{reason}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div>
                                <p className="text-gray-600 text-sm">Completion Date</p>
                                <p className="text-gray-900 font-semibold">
                                    {new Date(selectedApplication.completion_date).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowDetailModal(false)}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
