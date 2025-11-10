import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function StatesFooter() {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/states');
            setStates(response.data.data || response.data);
        } catch (err) {
            setError('Failed to load states');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading || error) return null;

    return (
        <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    Available States
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {states.map(state => (
                        <Link
                            key={state.id}
                            to={`/states/${state.state_code.toLowerCase()}`}
                            className="text-center hover:text-blue-600 transition"
                        >
                            <p className="text-gray-700 hover:text-blue-600 transition font-medium">
                                Divorce in {state.state_name}
                            </p>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        We support all {states.length} states with state-specific divorce forms and procedures
                    </p>
                </div>
            </div>
        </section>
    );
}
