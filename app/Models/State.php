<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;

    protected $fillable = [
        'state_code',
        'state_name',
        'residency_requirement_days',
        'min_filing_fee',
        'supports_uncontested',
        'supports_contested',
    ];

    protected $casts = [
        'supports_uncontested' => 'boolean',
        'supports_contested' => 'boolean',
    ];
}
