<?php

namespace App\Services;

use App\Models\Document;
use App\Models\User;
use App\Models\AssessmentResult;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

class DocumentGeneratorService
{
    /**
     * Generate divorce documents for a user
     */
    public function generateDocuments(User $user, AssessmentResult $result, array $userResponses, string $stateCode)
    {
        $documents = [];

        // Generate main petition document
        $petitionContent = $this->generatePetitionDocument($user, $result, $userResponses, $stateCode);
        $documents[] = $this->saveDocument($user, $result, $stateCode, 'petition', $petitionContent);

        // Generate summons document
        $summonsContent = $this->generateSummonsDocument($user, $result, $userResponses, $stateCode);
        $documents[] = $this->saveDocument($user, $result, $stateCode, 'summons', $summonsContent);

        // Generate settlement agreement if applicable
        if ($result->is_eligible && !isset($userResponses['contested'])) {
            $settlementContent = $this->generateSettlementAgreement($user, $result, $userResponses, $stateCode);
            $documents[] = $this->saveDocument($user, $result, $stateCode, 'settlement_agreement', $settlementContent);
        }

        return $documents;
    }

    /**
     * Generate petition document content
     */
    private function generatePetitionDocument(User $user, AssessmentResult $result, array $userResponses, string $stateCode): string
    {
        $date = now()->format('F j, Y');
        $userName = $user->name;

        $content = "PETITION FOR DIVORCE

STATE OF $stateCode

In the Matter of the Divorce of:

{$userName},
Petitioner,

and

[Spouse Name],
Respondent.

PETITION FOR DIVORCE

TO THE HONORABLE COURT:

Petitioner, {$userName}, by and through the undersigned attorney, respectfully submits this Petition for Divorce and in support thereof states as follows:

I. JURISDICTION

1. This Court has jurisdiction over this matter pursuant to the applicable divorce laws of the State of $stateCode.

2. The petitioner has been a resident of the State of $stateCode for the required period as established by state law.

3. The marriage is irretrievably broken and there is no reasonable likelihood of reconciliation.

II. PETITIONER'S INFORMATION

1. The petitioner is a resident of the State of $stateCode.

2. The petitioner requests relief as set forth herein.

III. RELIEF SOUGHT

1. That the marriage be dissolved;

2. That the property and assets of the parties be divided equitably;

3. That appropriate orders be entered regarding custody and support matters, if applicable;

4. For such other and further relief as the Court deems just and proper.

WHEREFORE, the petitioner requests that this Court grant this Petition for Divorce and enter appropriate orders and judgment therein.

Dated this {$date}

Respectfully submitted,

{$userName}
Petitioner

---
IMPORTANT: This document is for informational purposes only and should be reviewed by an attorney before filing.
FILING INSTRUCTIONS:
1. Make two copies of this document
2. File the original with the Court Clerk in your county
3. Keep one copy for your records
4. Mail a copy to your spouse or have it officially served
";

        return $content;
    }

    /**
     * Generate summons document content
     */
    private function generateSummonsDocument(User $user, AssessmentResult $result, array $userResponses, string $stateCode): string
    {
        $date = now()->format('F j, Y');
        $userName = $user->name;

        $content = "SUMMONS FOR DIVORCE

STATE OF $stateCode

SUMMONS

TO THE ABOVE NAMED RESPONDENT:

A civil action concerning divorce has been commenced against you by the above named petitioner in the District Court of $stateCode. You are hereby summoned and required to serve upon Petitioner's attorney, or upon Petitioner if Petitioner has no attorney, an Answer to the Petition within the time required by law from the date of the issuance of this Summons.

If you fail to so answer, judgment by default will be rendered against you for the relief sought in the Petition.

NOTICE TO RESPONDENT:
You are entitled to have an attorney represent you. If you cannot afford an attorney, you may apply to the court for appointment of an attorney.

The action is to be brought in the District Court, $stateCode.

Issued {$date}

By Order of the Court

---
IMPORTANT: Do not ignore this summons. You must respond within the time specified by law.
INSTRUCTIONS FOR SERVICE:
This summons must be served on the respondent personally or as otherwise required by law.
";

        return $content;
    }

    /**
     * Generate marital settlement agreement
     */
    private function generateSettlementAgreement(User $user, AssessmentResult $result, array $userResponses, string $stateCode): string
    {
        $date = now()->format('F j, Y');
        $userName = $user->name;

        $content = "MARITAL SETTLEMENT AGREEMENT AND PROPERTY SETTLEMENT

STATE OF $stateCode

This Marital Settlement Agreement and Property Settlement (\"Agreement\") is entered into as of {$date}, by and between {$userName} (\"Husband/Wife\"), and [Spouse Name] (\"Wife/Husband\").

RECITALS:

WHEREAS, the parties were married on [date of marriage]; and

WHEREAS, the parties have decided to dissolve their marriage and desire to settle all matters relating to their marital property, debts, and other obligations.

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:

1. PROPERTY DIVISION

1.1 The parties agree to divide the marital property as follows:

[Property Division Details - to be customized by user]

2. DEBTS AND OBLIGATIONS

2.1 Each party shall be responsible for their own debts incurred during the marriage as allocated herein.

3. CUSTODY AND SUPPORT

3.1 Custody and support matters shall be as agreed between the parties or as determined by the Court, if applicable.

4. MAINTENANCE

4.1 Each party waives any claim for maintenance or spousal support.

5. GENERAL PROVISIONS

5.1 This Agreement constitutes the entire agreement between the parties regarding the property settlement and settlement of all issues related to the divorce.

5.2 This Agreement shall be binding upon the heirs, successors, and assigns of the parties.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

{$userName}
Signature: _________________________ Date: _________

[Spouse Name]
Signature: _________________________ Date: _________

---
IMPORTANT: Both parties should have an attorney review this document before signing.
This document must be signed by both parties and notarized in most states.
";

        return $content;
    }

    /**
     * Save document to storage and create database record
     */
    private function saveDocument(User $user, AssessmentResult $result, string $stateCode, string $documentType, string $content): Document
    {
        $fileName = $this->generateFileName($user->id, $stateCode, $documentType);
        $filePath = "documents/{$user->id}/{$stateCode}/{$fileName}";

        // Convert text content to HTML and then to PDF
        $htmlContent = $this->contentToHtml($content);
        $pdf = Pdf::loadHTML($htmlContent);
        $pdfContent = $pdf->output();

        // Store the document
        Storage::disk('local')->put($filePath, $pdfContent);

        // Create database record
        $document = Document::create([
            'user_id' => $user->id,
            'assessment_result_id' => $result->id,
            'state_code' => $stateCode,
            'document_type' => $documentType,
            'file_name' => $fileName,
            'file_path' => $filePath,
            'status' => 'generated',
            'document_data' => [
                'generated_at' => now(),
                'content_preview' => substr($content, 0, 500),
            ],
        ]);

        return $document;
    }

    /**
     * Convert plain text content to HTML for PDF generation
     */
    private function contentToHtml(string $content): string
    {
        // Escape HTML special characters and convert line breaks
        $htmlContent = htmlspecialchars($content, ENT_QUOTES, 'UTF-8');
        $htmlContent = str_replace("\n\n", "</p><p>", $htmlContent);
        $htmlContent = str_replace("\n", "<br>", $htmlContent);

        return "
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset=\"UTF-8\">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 11pt;
                        line-height: 1.5;
                        color: #333;
                        margin: 20px;
                    }
                    p {
                        margin: 0 0 12px 0;
                        text-align: justify;
                    }
                    .footer {
                        margin-top: 40px;
                        font-size: 9pt;
                        color: #666;
                        border-top: 1px solid #ccc;
                        padding-top: 10px;
                    }
                </style>
            </head>
            <body>
                <p>{$htmlContent}</p>
                <div class=\"footer\">
                    <p>This document was generated by WithMilestone. Please review carefully and consult with an attorney before filing.</p>
                </div>
            </body>
            </html>
        ";
    }

    /**
     * Generate a unique file name for the document
     */
    private function generateFileName(int $userId, string $stateCode, string $documentType): string
    {
        $timestamp = now()->format('Ymd_His');
        return "{$documentType}_{$stateCode}_{$timestamp}.pdf";
    }

    /**
     * Get user documents by state
     */
    public function getUserDocuments(User $user, string $stateCode = null)
    {
        $query = $user->documents();

        if ($stateCode) {
            $query->where('state_code', $stateCode);
        }

        return $query->latest()->get();
    }

    /**
     * Download document content
     */
    public function downloadDocument(Document $document): string
    {
        return Storage::disk('local')->get($document->file_path);
    }
}
