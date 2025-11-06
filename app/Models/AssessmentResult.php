<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_session_id',
        'is_eligible',
        'ineligibility_reasons',
        'recommended_package',
        'estimated_cost',
        'completed_at',
    ];

    protected $casts = [
        'is_eligible' => 'boolean',
        'ineligibility_reasons' => 'json',
        'estimated_cost' => 'decimal:2',
        'completed_at' => 'datetime',
    ];

    public function session()
    {
        return $this->belongsTo(AssessmentSession::class, 'assessment_session_id');
    }
}
