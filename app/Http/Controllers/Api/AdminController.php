<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AssessmentSession;
use App\Models\AssessmentResult;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Middleware to ensure user is admin
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin');
    }

    /**
     * Get all assessment results with optional filters
     */
    public function getApplications(Request $request)
    {
        $query = AssessmentSession::with(['result', 'user'])
            ->where('is_completed', true);

        // Filter by state
        if ($request->filled('state_code')) {
            $query->where('state_code', $request->state_code);
        }

        // Filter by eligibility status
        if ($request->filled('eligibility_status')) {
            $query->where('eligibility_status', $request->eligibility_status);
        }

        // Filter by is_eligible (result)
        if ($request->filled('is_eligible')) {
            $isEligible = $request->is_eligible === 'true' || $request->is_eligible === true;
            $query->whereHas('result', function($q) use ($isEligible) {
                $q->where('is_eligible', $isEligible);
            });
        }

        // Filter by date range
        if ($request->filled('date_from') && $request->filled('date_to')) {
            $query->whereBetween('completion_date', [
                $request->date_from,
                $request->date_to
            ]);
        }

        // Search by email or user name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->whereHas('user', function($userQuery) use ($search) {
                    $userQuery->where('email', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%");
                })->orWhere('session_token', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortBy = $request->get('sort_by', 'completion_date');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginate
        $perPage = $request->get('per_page', 20);
        $applications = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $applications->items(),
            'pagination' => [
                'total' => $applications->total(),
                'per_page' => $applications->perPage(),
                'current_page' => $applications->currentPage(),
                'last_page' => $applications->lastPage(),
            ],
        ]);
    }

    /**
     * Get single application details
     */
    public function getApplicationDetail(Request $request, $id)
    {
        $application = AssessmentSession::with(['result', 'user', 'responses.question'])
            ->find($id);

        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $application,
        ]);
    }

    /**
     * Get dashboard statistics
     */
    public function getDashboardStats(Request $request)
    {
        $query = AssessmentSession::where('is_completed', true);

        // Apply date filter if provided
        if ($request->filled('date_from') && $request->filled('date_to')) {
            $query->whereBetween('completion_date', [
                $request->date_from,
                $request->date_to
            ]);
        }

        $totalApplications = $query->count();
        $eligibleCount = $query->clone()
            ->whereHas('result', function($q) {
                $q->where('is_eligible', true);
            })->count();

        $ineligibleCount = $totalApplications - $eligibleCount;

        // Group by state
        $byState = AssessmentSession::selectRaw('state_code, COUNT(*) as count')
            ->where('is_completed', true)
            ->when($request->filled('date_from') && $request->filled('date_to'), function($q) use ($request) {
                return $q->whereBetween('completion_date', [
                    $request->date_from,
                    $request->date_to
                ]);
            })
            ->groupBy('state_code')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        // Eligible rate
        $eligibilityRate = $totalApplications > 0 ? round(($eligibleCount / $totalApplications) * 100, 2) : 0;

        return response()->json([
            'success' => true,
            'data' => [
                'total_applications' => $totalApplications,
                'eligible_count' => $eligibleCount,
                'ineligible_count' => $ineligibleCount,
                'eligibility_rate' => $eligibilityRate,
                'by_state' => $byState,
            ],
        ]);
    }

    /**
     * Export applications to CSV
     */
    public function exportApplications(Request $request)
    {
        $query = AssessmentSession::with(['result', 'user'])
            ->where('is_completed', true);

        // Apply filters
        if ($request->filled('state_code')) {
            $query->where('state_code', $request->state_code);
        }

        if ($request->filled('eligibility_status')) {
            $query->where('eligibility_status', $request->eligibility_status);
        }

        if ($request->filled('is_eligible')) {
            $isEligible = $request->is_eligible === 'true' || $request->is_eligible === true;
            $query->whereHas('result', function($q) use ($isEligible) {
                $q->where('is_eligible', $isEligible);
            });
        }

        $applications = $query->get();

        // Generate CSV
        $csv = "ID,Email,Name,State,Status,Eligible,Completion Date\n";

        foreach ($applications as $app) {
            $user = $app->user;
            $result = $app->result;
            $email = $user ? $user->email : 'N/A';
            $name = $user ? $user->name : 'Anonymous';
            $eligible = $result ? ($result->is_eligible ? 'Yes' : 'No') : 'N/A';

            $csv .= "\"{$app->id}\",\"{$email}\",\"{$name}\",\"{$app->state_code}\",\"{$app->eligibility_status}\",\"{$eligible}\",\"{$app->completion_date}\"\n";
        }

        return response($csv)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="applications-' . date('Y-m-d') . '.csv"');
    }
}
