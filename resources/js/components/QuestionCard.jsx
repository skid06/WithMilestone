import React, { useState } from 'react';

export default function QuestionCard({ question, onSubmit, loading }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [textResponse, setTextResponse] = useState('');

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

        onSubmit(selectedOption, textResponse);
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

                {/* Submit Button */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
                    >
                        {loading ? 'Loading...' : 'Next'}
                    </button>
                </div>
            </form>
        </div>
    );
}
