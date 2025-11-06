<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('assessment_result_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('state_code');
            $table->string('document_type'); // petition, summons, settlement_agreement, etc.
            $table->string('file_name');
            $table->string('file_path');
            $table->string('status')->default('generated'); // generated, downloaded, filed
            $table->json('document_data')->nullable(); // Store the document content
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
        Schema::dropIfExists('documents');
    }
}
