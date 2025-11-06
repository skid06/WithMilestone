<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'option_text',
        'option_value',
        'order_index',
        'is_exit_condition',
    ];

    protected $casts = [
        'is_exit_condition' => 'boolean',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function responses()
    {
        return $this->hasMany(UserResponse::class, 'selected_option_id');
    }
}
