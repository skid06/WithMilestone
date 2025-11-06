<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEligibilityCriteriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eligibility_criteria', function (Blueprint $table) {
            $table->id();
            $table->string('criteria_name');
            $table->enum('criteria_type', ['location_based', 'family_based', 'filing_status', 'assets_complexity', 'communication_status']);
            $table->json('rule_logic')->nullable(); // stores complex logic
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eligibility_criteria');
    }
}
