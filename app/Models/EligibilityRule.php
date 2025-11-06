<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EligibilityRule extends Model
{
    use HasFactory;

    protected $fillable = [
        'eligibility_criteria_id',
        'question_id',
        'required_response_id',
        'makes_ineligible',
        'priority',
    ];

    protected $casts = [
        'makes_ineligible' => 'boolean',
    ];

    public function criteria()
    {
        return $this->belongsTo(EligibilityCriteria::class, 'eligibility_criteria_id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function requiredResponse()
    {
        return $this->belongsTo(QuestionOption::class, 'required_response_id');
    }
}
