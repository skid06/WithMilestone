<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'assessment_result_id',
        'state_code',
        'document_type',
        'file_name',
        'file_path',
        'status',
        'document_data',
    ];

    protected $casts = [
        'document_data' => 'json',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assessmentResult()
    {
        return $this->belongsTo(AssessmentResult::class);
    }
}
