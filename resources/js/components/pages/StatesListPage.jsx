import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function StatesListPage() {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/states');
            setStates(response.data.data || response.data);
        } catch (err) {
            setError('Failed to load states. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredStates = states.filter(state =>
        state.state_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        state.state_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading states...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <section className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Divorce Information by State
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Find state-specific requirements, fees, and procedures for your divorce
                </p>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search by state name or code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
            </section>

            {/* States Grid */}
            {filteredStates.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStates.map(state => (
                        <Link
                            key={state.id}
                            to={`/states/${state.state_code.toLowerCase()}`}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 overflow-hidden hover:border-blue-300"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {state.state_name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{state.state_code}</p>
                                    </div>
                                    <span className="text-2xl">→</span>
                                </div>

                                {/* Quick Info */}
                                <div className="space-y-2 text-sm text-gray-600">
                                    {state.residency_requirement_days && (
                                        <p>
                                            <span className="font-semibold">Residency:</span> {state.residency_requirement_days} days
                                        </p>
                                    )}
                                    {state.min_filing_fee && (
                                        <p>
                                            <span className="font-semibold">Filing Fee:</span> From ${state.min_filing_fee}
                                        </p>
                                    )}
                                    {state.supports_uncontested && (
                                        <p className="text-green-600">
                                            ✓ Uncontested Divorce Available
                                        </p>
                                    )}
                                </div>

                                <button className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-2 rounded transition">
                                    View Details
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                        No states found matching "{searchTerm}"
                    </p>
                </div>
            )}

            {/* Results count */}
            <div className="mt-8 text-center text-gray-600">
                Showing {filteredStates.length} of {states.length} states
            </div>
        </div>
    );
}
