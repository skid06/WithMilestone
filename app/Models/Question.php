<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_text',
        'question_type',
        'section',
        'order_index',
        'is_disqualifier',
    ];

    protected $casts = [
        'is_disqualifier' => 'boolean',
    ];

    public function options()
    {
        return $this->hasMany(QuestionOption::class);
    }

    public function responses()
    {
        return $this->hasMany(UserResponse::class);
    }
}
