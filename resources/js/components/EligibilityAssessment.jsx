import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from './QuestionCard';
import ResultsCard from './ResultsCard';

export default function EligibilityAssessment({ onComplete }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlStateCode = searchParams.get('state_code') || '';
    const [stateCode, setStateCode] = useState(urlStateCode);

    const [sessionId, setSessionId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [assessmentResultId, setAssessmentResultId] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(12);
    const [canGoBack, setCanGoBack] = useState(false);

    // Memoize fetchQuestion to prevent stale closures
    const fetchQuestion = useCallback(async (sid) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('auth_token');
            const config = token ? {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            } : {};

            const response = await axios.post('/api/assessment/question', {
                session_id: sid,
            }, config);

            if (response.data.is_complete) {
                // Assessment is complete - clear session storage
                sessionStorage.removeItem('assessmentSessionId');

                // Use state code from results if not provided in URL
                if (!urlStateCode && response.data.state_code) {
                    setStateCode(response.data.state_code);
                }

                // Assessment is complete
                setIsComplete(true);
                setAssessmentResultId(response.data.assessment_result_id);
                setResults({
                    is_eligible: response.data.is_eligible,
                    reasons: response.data.reasons,
                    state_code: response.data.state_code,
                });
                setCanGoBack(false);
            } else if (response.data.question) {
                setCurrentQuestion(response.data.question);
                setCurrentStep(response.data.current_step);
                // Can go back if we're past step 1
                setCanGoBack(response.data.current_step > 1);
            }
        } catch (err) {
            setError('Failed to fetch question. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Memoize startAssessment to prevent stale closures
    const startAssessment = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('auth_token');
            const config = token ? {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            } : {};

            const response = await axios.post('/api/assessment/start', {}, config);
            const newSessionId = response.data.session_id;

            // Save session ID to sessionStorage for persistence on page refresh
            sessionStorage.setItem('assessmentSessionId', newSessionId);

            setSessionId(newSessionId);
            setCurrentStep(response.data.current_step);
            fetchQuestion(newSessionId);
        } catch (err) {
            setError('Failed to start assessment. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [fetchQuestion]);

    const handleGoBack = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('auth_token');
            const config = token ? {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            } : {};

            // Call API to undo the last response
            const response = await axios.post('/api/assessment/undo', {
                session_id: sessionId,
            }, config);

            if (response.data.success) {
                // Fetch the previous question
                fetchQuestion(sessionId);
            }
        } catch (err) {
            setError('Failed to go back. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [sessionId, fetchQuestion]);

    useEffect(() => {
        // Check if there's an existing session in progress
        const existingSessionId = sessionStorage.getItem('assessmentSessionId');
        if (existingSessionId) {
            // Resume existing session
            setSessionId(existingSessionId);
            fetchQuestion(existingSessionId);
        } else {
            // Start new assessment
            startAssessment();
        }
    }, [startAssessment, fetchQuestion]);

    const handleAnswerSubmit = useCallback(async (optionId, textResponse) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('auth_token');
            const config = token ? {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            } : {};

            // Use sessionStorage if sessionId state is not set yet
            const currentSessionId = sessionId || sessionStorage.getItem('assessmentSessionId');

            const response = await axios.post('/api/assessment/answer', {
                session_id: currentSessionId,
                question_id: currentQuestion.id,
                selected_option_id: optionId,
                text_response: textResponse,
            }, config);

            if (response.data.is_complete) {
                // Assessment is complete - clear session storage
                sessionStorage.removeItem('assessmentSessionId');

                // Use state code from results if not provided in URL
                if (!urlStateCode && response.data.state_code) {
                    setStateCode(response.data.state_code);
                }

                // Assessment is complete
                setIsComplete(true);
                setAssessmentResultId(response.data.assessment_result_id);
                setResults({
                    is_eligible: response.data.is_eligible,
                    reasons: response.data.reasons,
                    state_code: response.data.state_code,
                });
            } else {
                // Fetch next question
                setCurrentStep(response.data.current_step);
                fetchQuestion(currentSessionId);
            }
        } catch (err) {
            setError('Failed to submit answer. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [sessionId, currentQuestion, fetchQuestion]);

    if (loading && !currentQuestion && !results) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading assessment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
                <button
                    onClick={startAssessment}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                        Question {currentStep}
                    </span>
                    <span className="text-sm text-gray-600">{totalQuestions} questions total</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / totalQuestions) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Assessment Content */}
            {!isComplete && currentQuestion ? (
                <QuestionCard
                    question={currentQuestion}
                    onSubmit={handleAnswerSubmit}
                    loading={loading}
                    stateCode={stateCode}
                    onGoBack={handleGoBack}
                    canGoBack={canGoBack}
                />
            ) : isComplete && results ? (
                <ResultsCard
                    results={results}
                    onBackToHome={onComplete}
                    assessmentId={assessmentResultId}
                    stateCode={stateCode}
                />
            ) : null}
        </div>
    );
}
