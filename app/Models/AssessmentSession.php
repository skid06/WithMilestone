<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_token',
        'current_step',
        'is_completed',
        'completion_date',
        'eligibility_status',
        'state_code',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'completion_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function responses()
    {
        return $this->hasMany(UserResponse::class);
    }

    public function result()
    {
        return $this->hasOne(AssessmentResult::class);
    }
}
