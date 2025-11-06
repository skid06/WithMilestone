<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssessmentResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assessment_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_session_id')->unique()->constrained('assessment_sessions')->onDelete('cascade');
            $table->boolean('is_eligible')->default(false);
            $table->json('ineligibility_reasons')->nullable(); // array of reasons
            $table->string('recommended_package')->nullable(); // document types
            $table->decimal('estimated_cost', 10, 2)->nullable();
            $table->timestamp('completed_at');
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
        Schema::dropIfExists('assessment_results');
    }
}
