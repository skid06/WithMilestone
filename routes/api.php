<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\Api\AssessmentController;
use App\Http\Controllers\Api\StateController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\PaymentController;

// Public authentication routes (no auth required)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected authentication routes (auth required)
Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

// Public assessment routes (no auth required - users can take assessment anonymously)
Route::prefix('assessment')->group(function () {
    Route::post('/start', [AssessmentController::class, 'startSession']);
    Route::post('/question', [AssessmentController::class, 'getQuestion']);
    Route::post('/answer', [AssessmentController::class, 'submitAnswer']);
    Route::post('/results', [AssessmentController::class, 'getResults']);
});

// Public state information routes
Route::prefix('states')->group(function () {
    Route::get('/', [StateController::class, 'index']);
    Route::get('/{stateCode}', [StateController::class, 'show']);
});

// Protected document routes (auth required)
Route::middleware('auth:sanctum')->prefix('documents')->group(function () {
    Route::post('/generate', [DocumentController::class, 'generate']);
    Route::get('/', [DocumentController::class, 'index']);
    Route::get('/{document}', [DocumentController::class, 'preview']);
    Route::get('/{document}/download', [DocumentController::class, 'download']);
    Route::delete('/{document}', [DocumentController::class, 'delete']);
});

// Protected payment routes (auth required)
Route::middleware('auth:sanctum')->prefix('payments')->group(function () {
    Route::post('/create-intent', [PaymentController::class, 'createPaymentIntent']);
    Route::post('/confirm', [PaymentController::class, 'confirmPayment']);
    Route::get('/{order}', [PaymentController::class, 'getOrder']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
