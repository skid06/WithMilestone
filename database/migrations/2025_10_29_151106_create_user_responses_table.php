<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_session_id')->constrained('assessment_sessions')->onDelete('cascade');
            $table->foreignId('question_id')->constrained('questions')->onDelete('cascade');
            $table->foreignId('selected_option_id')->nullable()->constrained('question_options')->onDelete('set null');
            $table->text('text_response')->nullable(); // for open text fields
            $table->timestamp('answered_at');
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
        Schema::dropIfExists('user_responses');
    }
}
