import React, { useState } from 'react';

const US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const STATE_NAMES = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
    'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
    'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
    'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
    'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
    'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
    'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
    'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
};

export default function QuestionCard({ question, onSubmit, loading, stateCode, onGoBack, canGoBack }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [textResponse, setTextResponse] = useState('');
    const [showStateVerification, setShowStateVerification] = useState(false);
    const [selectedStateManually, setSelectedStateManually] = useState(null);

    const isLocationQuestion = question.section === 'location';

    const getSelectedStateCode = () => {
        if (selectedOption && question.options) {
            const option = question.options.find(opt => opt.id === selectedOption);
            return option?.value?.toUpperCase() || null;
        }
        return null;
    };

    const handleLocationSelection = (e) => {
        e.preventDefault();

        if (!selectedOption) {
            alert('Please select an option');
            return;
        }

        const selectedStateFromOption = getSelectedStateCode();

        // If state code from URL exists and doesn't match selection, show verification
        if (stateCode && isLocationQuestion && selectedStateFromOption !== stateCode.toUpperCase()) {
            setShowStateVerification(true);
            return;
        }

        // Otherwise proceed normally
        onSubmit(selectedOption, textResponse);
    };

    const handleConfirmState = () => {
        // User wants to continue with their selection despite mismatch
        setShowStateVerification(false);
        onSubmit(selectedOption, textResponse);
    };

    const handleChangeState = (e) => {
        const newStateCode = e.target.value;
        setSelectedStateManually(newStateCode);
    };

    const handleConfirmNewState = () => {
        // Find the option that matches the manually selected state
        const matchingOption = question.options.find(opt => opt.value?.toUpperCase() === selectedStateManually?.toUpperCase());
        if (matchingOption) {
            setSelectedOption(matchingOption.id);
            setShowStateVerification(false);
            onSubmit(matchingOption.id, textResponse);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.type === 'text' && !textResponse.trim()) {
            alert('Please enter a response');
            return;
        }
        if (!question.type.includes('text') && !selectedOption) {
            alert('Please select an option');
            return;
        }

        if (isLocationQuestion) {
            handleLocationSelection(e);
        } else {
            onSubmit(selectedOption, textResponse);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    {question.section.replace(/_/g, ' ').toUpperCase()}
                </span>
                <h2 className="text-2xl font-bold text-gray-900">{question.text}</h2>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Radio or Select Questions */}
                {question.type === 'radio' && (
                    <div className="space-y-3 mb-6">
                        {question.options.map((option) => (
                            <label
                                key={option.id}
                                className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value={option.id}
                                    checked={selectedOption === option.id}
                                    onChange={(e) => setSelectedOption(parseInt(e.target.value))}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="ml-3 text-gray-900 font-medium">{option.text}</span>
                                {option.is_exit_condition && (
                                    <span className="ml-auto text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                        Exit Condition
                                    </span>
                                )}
                            </label>
                        ))}
                    </div>
                )}

                {/* Checkbox Questions */}
                {question.type === 'checkbox' && (
                    <div className="space-y-3 mb-6">
                        {question.options.map((option) => (
                            <label
                                key={option.id}
                                className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
                            >
                                <input
                                    type="checkbox"
                                    value={option.id}
                                    checked={selectedOption === option.id}
                                    onChange={(e) => setSelectedOption(parseInt(e.target.value))}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="ml-3 text-gray-900 font-medium">{option.text}</span>
                                {option.is_exit_condition && (
                                    <span className="ml-auto text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                        Exit Condition
                                    </span>
                                )}
                            </label>
                        ))}
                    </div>
                )}

                {/* Select Dropdown */}
                {question.type === 'select' && (
                    <div className="mb-6">
                        <select
                            value={selectedOption || ''}
                            onChange={(e) => setSelectedOption(parseInt(e.target.value))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                        >
                            <option value="">-- Select an option --</option>
                            {question.options.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Text Input */}
                {question.type === 'text' && (
                    <div className="mb-6">
                        <input
                            type="text"
                            value={textResponse}
                            onChange={(e) => setTextResponse(e.target.value)}
                            placeholder="Enter your response..."
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                    </div>
                )}

                {/* State Verification Message */}
                {showStateVerification && stateCode && (
                    <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                        <h3 className="font-bold text-yellow-800 mb-3">State Mismatch Detected</h3>
                        <p className="text-yellow-700 mb-4">
                            You selected <strong>{STATE_NAMES[getSelectedStateCode()]}</strong>, but we started with <strong>{STATE_NAMES[stateCode.toUpperCase()]}</strong>.
                            Would you like to confirm your selection or choose a different state?
                        </p>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select a State:
                            </label>
                            <select
                                value={selectedStateManually || ''}
                                onChange={handleChangeState}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                            >
                                <option value="">-- Select a state --</option>
                                {US_STATES.map(state => (
                                    <option key={state} value={state}>
                                        {STATE_NAMES[state]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleConfirmState}
                                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition"
                            >
                                Keep {STATE_NAMES[getSelectedStateCode()]}
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmNewState}
                                disabled={!selectedStateManually}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
                            >
                                Change to Selected
                            </button>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                {!showStateVerification && (
                    <div className="flex gap-4">
                        {canGoBack && (
                            <button
                                type="button"
                                onClick={onGoBack}
                                disabled={loading}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
                            >
                                {loading ? 'Loading...' : '← Back'}
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`${canGoBack ? 'flex-1' : 'w-full'} bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition`}
                        >
                            {loading ? 'Loading...' : 'Next'}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
