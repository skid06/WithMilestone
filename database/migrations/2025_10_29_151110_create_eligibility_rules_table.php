<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEligibilityRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eligibility_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('eligibility_criteria_id')->constrained('eligibility_criteria')->onDelete('cascade');
            $table->foreignId('question_id')->nullable()->constrained('questions')->onDelete('cascade');
            $table->foreignId('required_response_id')->nullable()->constrained('question_options')->onDelete('cascade');
            $table->boolean('makes_ineligible')->default(false);
            $table->integer('priority')->default(0);
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
        Schema::dropIfExists('eligibility_rules');
    }
}
