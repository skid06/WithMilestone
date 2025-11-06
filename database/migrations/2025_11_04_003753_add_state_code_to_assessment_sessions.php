<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStateCodeToAssessmentSessions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('assessment_sessions', function (Blueprint $table) {
            $table->string('state_code')->nullable()->after('eligibility_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('assessment_sessions', function (Blueprint $table) {
            $table->dropColumn('state_code');
        });
    }
}
