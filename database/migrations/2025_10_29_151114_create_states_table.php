<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('states', function (Blueprint $table) {
            $table->id();
            $table->string('state_code')->unique(); // MN, CA, TX, etc.
            $table->string('state_name');
            $table->integer('residency_requirement_days')->default(6 * 30); // 6 months
            $table->decimal('min_filing_fee', 10, 2)->default(0);
            $table->boolean('supports_uncontested')->default(true);
            $table->boolean('supports_contested')->default(true);
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
        Schema::dropIfExists('states');
    }
}
