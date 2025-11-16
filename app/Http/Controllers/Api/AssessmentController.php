<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AssessmentSession;
use App\Models\UserResponse;
use App\Models\AssessmentResult;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AssessmentController extends Controller
{
    /**
     * Start a new assessment session (anonymous or authenticated)
     */
    public function startSession(Request $request)
    {
        $sessionToken = Str::random(32);

        $session = AssessmentSession::create([
            'user_id' => auth()->id(), // Can be null for anonymous users
            'session_token' => $sessionToken,
            'current_step' => 1,
            'eligibility_status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'session_id' => $session->id,
            'session_token' => $sessionToken,
            'current_step' => 1,
        ]);
    }

    /**
     * Get the current question for the assessment
     */
    public function getQuestion(Request $request)
    {
        $request->validate([
            'session_id' => 'required|exists:assessment_sessions,id',
        ]);

        $session = AssessmentSession::find($request->session_id);

        if ($session->is_completed) {
            return response()->json([
                'success' => false,
                'message' => 'Assessment already completed',
            ], 422);
        }

        // Get question by section order
        $question = Question::orderBy('section')
            ->orderBy('order_index')
            ->skip($session->current_step - 1)
            ->first();

        if (!$question) {
            // Complete the assessment
            return $this->completeAssessment($session);
        }

        return response()->json([
            'success' => true,
            'question' => [
                'id' => $question->id,
                'text' => $question->question_text,
                'type' => $question->question_type,
                'section' => $question->section,
                'order_index' => $question->order_index,
                'is_disqualifier' => $question->is_disqualifier,
                'options' => $question->options()->orderBy('order_index')->get()->map(function($opt) {
                    return [
                        'id' => $opt->id,
                        'text' => $opt->option_text,
                        'value' => $opt->option_value,
                        'is_exit_condition' => $opt->is_exit_condition,
                    ];
                }),
            ],
            'current_step' => $session->current_step,
        ]);
    }

    /**
     * Submit answer to a question
     */
    public function submitAnswer(Request $request)
    {
        $request->validate([
            'session_id' => 'required|exists:assessment_sessions,id',
            'question_id' => 'required|exists:questions,id',
            'selected_option_id' => 'nullable|exists:question_options,id',
            'text_response' => 'nullable|string',
        ]);

        $session = AssessmentSession::find($request->session_id);
        $question = Question::find($request->question_id);

        // Check for exit conditions
        if ($request->selected_option_id) {
            $option = QuestionOption::find($request->selected_option_id);
            if ($option->is_exit_condition) {
                // Mark as ineligible and complete
                $session->update([
                    'is_completed' => true,
                    'completion_date' => now(),
                    'eligibility_status' => 'ineligible',
                ]);

                $result = AssessmentResult::create([
                    'assessment_session_id' => $session->id,
                    'is_eligible' => false,
                    'ineligibility_reasons' => [
                        "Exit condition triggered: " . $option->option_text
                    ],
                    'completed_at' => now(),
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Assessment completed - Ineligible',
                    'is_complete' => true,
                    'is_eligible' => false,
                    'reasons' => ["Exit condition triggered: " . $option->option_text],
                    'assessment_result_id' => $result->id,
                    'state_code' => $session->state_code,
                ]);
            }
        }

        // Record the response
        UserResponse::create([
            'assessment_session_id' => $session->id,
            'question_id' => $question->id,
            'selected_option_id' => $request->selected_option_id,
            'text_response' => $request->text_response,
            'answered_at' => now(),
        ]);

        // If this is the location question, store the state code
        if ($question->section === 'location' && $request->selected_option_id) {
            $option = QuestionOption::find($request->selected_option_id);
            if ($option && strlen($option->option_value) === 2 && ctype_alpha($option->option_value)) {
                // Store any valid 2-letter state code (all 50 US states)
                $session->update(['state_code' => strtoupper($option->option_value)]);
            }
        }

        // Move to next step
        $session->update(['current_step' => $session->current_step + 1]);

        return response()->json([
            'success' => true,
            'current_step' => $session->current_step,
        ]);
    }

    /**
     * Complete assessment and generate results
     */
    private function completeAssessment($session)
    {
        $session->update([
            'is_completed' => true,
            'completion_date' => now(),
            'eligibility_status' => 'eligible',
        ]);

        // Get all responses and check eligibility rules
        $ineligibilityReasons = [];

        // Check filing status - is an exit condition
        $filingResponse = UserResponse::where('assessment_session_id', $session->id)
            ->whereHas('question', function($q) { $q->where('section', 'filing_status'); })
            ->first();

        if ($filingResponse && $filingResponse->selectedOption && $filingResponse->selectedOption->is_exit_condition) {
            $ineligibilityReasons[] = "One spouse has already filed - requires legal representation";
            $session->update(['eligibility_status' => 'ineligible']);
        }

        // Check residency
        $residencyResponse = UserResponse::where('assessment_session_id', $session->id)
            ->whereHas('question', function($q) { $q->where('section', 'residency'); })
            ->first();

        if ($residencyResponse && $residencyResponse->selectedOption && $residencyResponse->selectedOption->is_exit_condition) {
            $ineligibilityReasons[] = "Non-US/Canada residency - outside service area";
            $session->update(['eligibility_status' => 'ineligible']);
        }

        $result = AssessmentResult::create([
            'assessment_session_id' => $session->id,
            'is_eligible' => empty($ineligibilityReasons),
            'ineligibility_reasons' => !empty($ineligibilityReasons) ? $ineligibilityReasons : null,
            'recommended_package' => empty($ineligibilityReasons) ? 'standard_divorce' : null,
            'estimated_cost' => empty($ineligibilityReasons) ? 199.00 : null,
            'completed_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'is_complete' => true,
            'is_eligible' => empty($ineligibilityReasons),
            'reasons' => $ineligibilityReasons,
            'assessment_result_id' => $result->id,
            'state_code' => $session->state_code,
        ]);
    }

    /**
     * Undo the last answer and go back to previous question
     */
    public function undoAnswer(Request $request)
    {
        $request->validate([
            'session_id' => 'required|exists:assessment_sessions,id',
        ]);

        $session = AssessmentSession::find($request->session_id);

        if ($session->is_completed) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot undo completed assessment',
            ], 422);
        }

        if ($session->current_step <= 1) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot go back from first question',
            ], 422);
        }

        // Delete the last response
        UserResponse::where('assessment_session_id', $session->id)
            ->orderBy('created_at', 'desc')
            ->limit(1)
            ->delete();

        // Decrement the current step
        $session->update(['current_step' => $session->current_step - 1]);

        return response()->json([
            'success' => true,
            'current_step' => $session->current_step,
        ]);
    }

    /**
     * Get assessment results
     */
    public function getResults(Request $request)
    {
        $request->validate([
            'session_id' => 'required|exists:assessment_sessions,id',
        ]);

        $session = AssessmentSession::with('result')->find($request->session_id);

        if (!$session->is_completed) {
            return response()->json([
                'success' => false,
                'message' => 'Assessment not yet completed',
            ], 422);
        }

        $result = $session->result;

        return response()->json([
            'success' => true,
            'result' => [
                'is_eligible' => $result->is_eligible,
                'ineligibility_reasons' => $result->ineligibility_reasons,
                'recommended_package' => $result->recommended_package,
                'estimated_cost' => $result->estimated_cost,
                'completed_at' => $result->completed_at,
            ],
        ]);
    }
}
