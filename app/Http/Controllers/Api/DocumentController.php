<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\AssessmentResult;
use App\Models\UserResponse;
use App\Services\DocumentGeneratorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    protected $documentGenerator;

    public function __construct(DocumentGeneratorService $documentGenerator)
    {
        $this->documentGenerator = $documentGenerator;
    }

    /**
     * Generate documents for an assessment
     */
    public function generate(Request $request)
    {
        $request->validate([
            'assessment_result_id' => 'required|exists:assessment_results,id',
            'state_code' => 'required|string|exists:states,state_code',
        ]);

        // Get the assessment result
        $result = AssessmentResult::findOrFail($request->assessment_result_id);

        // Verify user owns this assessment
        if ($result->session->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        // Check if eligible
        if (!$result->is_eligible) {
            return response()->json([
                'success' => false,
                'message' => 'Not eligible for uncontested divorce',
            ], 422);
        }

        // Get user responses for context
        $responses = UserResponse::where('assessment_session_id', $result->assessment_session_id)
            ->with('question', 'selectedOption')
            ->get();

        $userResponses = $responses->map(fn($r) => [
            'question' => $r->question->question_text,
            'answer' => $r->selectedOption->option_text ?? $r->text_response,
        ])->toArray();

        try {
            // Generate documents
            $documents = $this->documentGenerator->generateDocuments(
                auth()->user(),
                $result,
                $userResponses,
                strtoupper($request->state_code)
            );

            return response()->json([
                'success' => true,
                'message' => 'Documents generated successfully',
                'documents' => array_map(fn($doc) => [
                    'id' => $doc->id,
                    'type' => $doc->document_type,
                    'file_name' => $doc->file_name,
                    'status' => $doc->status,
                    'created_at' => $doc->created_at,
                ], $documents),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error generating documents: ' . $e->getMessage(),
            ], 500);
        }

    }

    /**
     * Get user's documents
     */
    public function index(Request $request)
    {
        $stateCode = $request->query('state_code');

        $documents = $this->documentGenerator->getUserDocuments(auth()->user(), $stateCode);

        return response()->json([
            'success' => true,
            'documents' => $documents->map(fn($doc) => [
                'id' => $doc->id,
                'type' => $doc->document_type,
                'file_name' => $doc->file_name,
                'state_code' => $doc->state_code,
                'status' => $doc->status,
                'created_at' => $doc->created_at,
            ]),
        ]);
    }

    /**
     * Download a document
     */
    public function download(Document $document)
    {
        // Verify user owns this document
        if ($document->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        try {
            $content = $this->documentGenerator->downloadDocument($document);

            return response($content, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . $document->file_name . '"',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error downloading document: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get document preview
     */
    public function preview(Document $document)
    {
        // Verify user owns this document
        if ($document->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        try {
            $content = $this->documentGenerator->downloadDocument($document);

            return response()->json([
                'success' => true,
                'document' => [
                    'id' => $document->id,
                    'type' => $document->document_type,
                    'file_name' => $document->file_name,
                    'content' => $content,
                    'created_at' => $document->created_at,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving document: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a document
     */
    public function delete(Document $document)
    {
        // Verify user owns this document
        if ($document->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        try {
            // Delete from storage
            if (Storage::disk('local')->exists($document->file_path)) {
                Storage::disk('local')->delete($document->file_path);
            }

            // Delete from database
            $document->delete();

            return response()->json([
                'success' => true,
                'message' => 'Document deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting document: ' . $e->getMessage(),
            ], 500);
        }
    }
}
