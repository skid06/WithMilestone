<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\AssessmentResult;
use App\Services\DocumentGeneratorService;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    protected $documentGenerator;

    public function __construct(DocumentGeneratorService $documentGenerator)
    {
        $this->documentGenerator = $documentGenerator;
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    /**
     * Create a Stripe payment intent for an assessment
     */
    public function createPaymentIntent(Request $request)
    {
        $request->validate([
            'assessment_result_id' => 'required|exists:assessment_results,id',
            'state_code' => 'required|string|exists:states,state_code',
        ]);

        $result = AssessmentResult::findOrFail($request->assessment_result_id);

        // Verify user owns this assessment OR claim it if it's anonymous
        if ($result->session->user_id !== null && $result->session->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        // If the assessment was taken anonymously, link it to the current user
        if ($result->session->user_id === null) {
            $result->session->update(['user_id' => auth()->id()]);
        }

        // Check if eligible
        if (!$result->is_eligible) {
            return response()->json([
                'success' => false,
                'message' => 'Not eligible for uncontested divorce',
            ], 422);
        }

        try {
            // Create or update order
            $order = Order::updateOrCreate(
                [
                    'user_id' => auth()->id(),
                    'assessment_result_id' => $result->id,
                    'state_code' => strtoupper($request->state_code),
                    'status' => 'pending',
                ],
                [
                    'amount' => 19900, // $199.00 in cents
                    'currency' => 'usd',
                ]
            );

            // Create Stripe payment intent
            $paymentIntent = PaymentIntent::create([
                'amount' => 19900, // $199.00 in cents
                'currency' => 'usd',
                'metadata' => [
                    'order_id' => $order->id,
                    'user_id' => auth()->id(),
                    'state_code' => strtoupper($request->state_code),
                ],
                'description' => "Divorce services for {$request->state_code}",
            ]);

            // Update order with Stripe intent ID
            $order->update([
                'stripe_payment_intent_id' => $paymentIntent->id,
            ]);

            return response()->json([
                'success' => true,
                'client_secret' => $paymentIntent->client_secret,
                'order_id' => $order->id,
                'amount' => $order->amount,
                'currency' => $order->currency,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating payment intent: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Confirm payment and trigger document generation
     */
    public function confirmPayment(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
        ]);

        $order = Order::findOrFail($request->order_id);

        // Verify user owns this order
        if ($order->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        try {
            // Retrieve payment intent from Stripe
            $paymentIntent = PaymentIntent::retrieve($order->stripe_payment_intent_id);

            if ($paymentIntent->status === 'succeeded') {
                // Update order status
                $order->update([
                    'status' => 'completed',
                    'stripe_charge_id' => $paymentIntent->charges->data[0]->id ?? null,
                    'paid_at' => now(),
                ]);

                // Generate documents
                $result = $order->assessmentResult;
                $userResponses = []; // Get from assessment if needed

                $documents = $this->documentGenerator->generateDocuments(
                    auth()->user(),
                    $result,
                    $userResponses,
                    $order->state_code
                );

                return response()->json([
                    'success' => true,
                    'message' => 'Payment confirmed and documents generated',
                    'order_id' => $order->id,
                    'documents' => array_map(fn($doc) => [
                        'id' => $doc->id,
                        'type' => $doc->document_type,
                        'file_name' => $doc->file_name,
                        'status' => $doc->status,
                    ], $documents),
                ]);
            } else {
                $order->update([
                    'status' => 'failed',
                    'error_message' => 'Payment intent status: ' . $paymentIntent->status,
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Payment not completed. Status: ' . $paymentIntent->status,
                ], 422);
            }
        } catch (\Exception $e) {
            $order->update([
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error confirming payment: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get order details
     */
    public function getOrder(Order $order)
    {
        // Verify user owns this order
        if ($order->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'order' => [
                'id' => $order->id,
                'state_code' => $order->state_code,
                'amount' => $order->amount,
                'currency' => $order->currency,
                'status' => $order->status,
                'paid_at' => $order->paid_at,
                'created_at' => $order->created_at,
            ],
        ]);
    }
}
