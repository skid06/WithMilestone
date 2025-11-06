<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConcernsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('concerns', function (Blueprint $table) {
            $table->id();
            $table->string('concern_name');
            $table->enum('concern_category', ['assets', 'custody', 'support', 'communication', 'other']);
            $table->decimal('complexity_weight', 5, 2)->default(1.0); // weight factor for complexity calculation
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
        Schema::dropIfExists('concerns');
    }
}
