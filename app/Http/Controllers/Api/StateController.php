<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\State;
use Illuminate\Http\Request;

class StateController extends Controller
{
    /**
     * Get all states
     */
    public function index()
    {
        $states = State::all();

        return response()->json([
            'success' => true,
            'data' => $states,
        ]);
    }

    /**
     * Get a specific state by code
     */
    public function show($stateCode)
    {
        $state = State::where('state_code', strtoupper($stateCode))->first();

        if (!$state) {
            return response()->json([
                'success' => false,
                'message' => 'State not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $state,
        ]);
    }
}
