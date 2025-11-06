<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concern extends Model
{
    use HasFactory;

    protected $fillable = [
        'concern_name',
        'concern_category',
        'complexity_weight',
    ];

    protected $casts = [
        'complexity_weight' => 'decimal:2',
    ];
}
