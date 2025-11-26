import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function FooterStatesList() {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/states');
            setStates(response.data.data || response.data);
        } catch (err) {
            console.error('Failed to load states');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null;

    return (
        <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Available States
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {states.map(state => (
                    <Link
                        key={state.id}
                        to={`/states/${state.state_code.toLowerCase()}`}
                        className="text-center hover:text-blue-400 transition"
                    >
                        <p className="text-gray-400 hover:text-blue-400 transition font-medium">
                            Divorce in {state.state_name}
                        </p>
                    </Link>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    We support all {states.length} states with state-specific divorce forms and procedures
                </p>
            </div>
        </div>
    );
}
