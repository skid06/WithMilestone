<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EligibilityCriteria extends Model
{
    use HasFactory;

    protected $table = 'eligibility_criteria';

    protected $fillable = [
        'criteria_name',
        'criteria_type',
        'rule_logic',
    ];

    protected $casts = [
        'rule_logic' => 'json',
    ];

    public function rules()
    {
        return $this->hasMany(EligibilityRule::class, 'eligibility_criteria_id');
    }
}
