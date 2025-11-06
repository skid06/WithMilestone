<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'assessment_result_id',
        'state_code',
        'amount',
        'currency',
        'status',
        'stripe_payment_intent_id',
        'stripe_charge_id',
        'payment_metadata',
        'paid_at',
        'error_message',
    ];

    protected $casts = [
        'payment_metadata' => 'json',
        'paid_at' => 'datetime',
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
