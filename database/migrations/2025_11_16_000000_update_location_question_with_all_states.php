<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateLocationQuestionWithAllStates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Get the location question
        $question = DB::table('questions')
            ->where('section', 'location')
            ->first();

        if ($question) {
            // Delete existing options for this question
            DB::table('question_options')
                ->where('question_id', $question->id)
                ->delete();

            // Array of all US states
            $states = [
                ['code' => 'AL', 'name' => 'Alabama'],
                ['code' => 'AK', 'name' => 'Alaska'],
                ['code' => 'AZ', 'name' => 'Arizona'],
                ['code' => 'AR', 'name' => 'Arkansas'],
                ['code' => 'CA', 'name' => 'California'],
                ['code' => 'CO', 'name' => 'Colorado'],
                ['code' => 'CT', 'name' => 'Connecticut'],
                ['code' => 'DE', 'name' => 'Delaware'],
                ['code' => 'FL', 'name' => 'Florida'],
                ['code' => 'GA', 'name' => 'Georgia'],
                ['code' => 'HI', 'name' => 'Hawaii'],
                ['code' => 'ID', 'name' => 'Idaho'],
                ['code' => 'IL', 'name' => 'Illinois'],
                ['code' => 'IN', 'name' => 'Indiana'],
                ['code' => 'IA', 'name' => 'Iowa'],
                ['code' => 'KS', 'name' => 'Kansas'],
                ['code' => 'KY', 'name' => 'Kentucky'],
                ['code' => 'LA', 'name' => 'Louisiana'],
                ['code' => 'ME', 'name' => 'Maine'],
                ['code' => 'MD', 'name' => 'Maryland'],
                ['code' => 'MA', 'name' => 'Massachusetts'],
                ['code' => 'MI', 'name' => 'Michigan'],
                ['code' => 'MN', 'name' => 'Minnesota'],
                ['code' => 'MS', 'name' => 'Mississippi'],
                ['code' => 'MO', 'name' => 'Missouri'],
                ['code' => 'MT', 'name' => 'Montana'],
                ['code' => 'NE', 'name' => 'Nebraska'],
                ['code' => 'NV', 'name' => 'Nevada'],
                ['code' => 'NH', 'name' => 'New Hampshire'],
                ['code' => 'NJ', 'name' => 'New Jersey'],
                ['code' => 'NM', 'name' => 'New Mexico'],
                ['code' => 'NY', 'name' => 'New York'],
                ['code' => 'NC', 'name' => 'North Carolina'],
                ['code' => 'ND', 'name' => 'North Dakota'],
                ['code' => 'OH', 'name' => 'Ohio'],
                ['code' => 'OK', 'name' => 'Oklahoma'],
                ['code' => 'OR', 'name' => 'Oregon'],
                ['code' => 'PA', 'name' => 'Pennsylvania'],
                ['code' => 'RI', 'name' => 'Rhode Island'],
                ['code' => 'SC', 'name' => 'South Carolina'],
                ['code' => 'SD', 'name' => 'South Dakota'],
                ['code' => 'TN', 'name' => 'Tennessee'],
                ['code' => 'TX', 'name' => 'Texas'],
                ['code' => 'UT', 'name' => 'Utah'],
                ['code' => 'VT', 'name' => 'Vermont'],
                ['code' => 'VA', 'name' => 'Virginia'],
                ['code' => 'WA', 'name' => 'Washington'],
                ['code' => 'WV', 'name' => 'West Virginia'],
                ['code' => 'WI', 'name' => 'Wisconsin'],
                ['code' => 'WY', 'name' => 'Wyoming'],
            ];

            // Insert all state options
            foreach ($states as $idx => $state) {
                DB::table('question_options')->insert([
                    'question_id' => $question->id,
                    'option_text' => $state['name'],
                    'option_value' => $state['code'],
                    'order_index' => $idx + 1,
                    'is_exit_condition' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // Add "Outside US/Canada" as exit condition at the end
            DB::table('question_options')->insert([
                'question_id' => $question->id,
                'option_text' => 'Outside US/Canada',
                'option_value' => 'outside',
                'order_index' => 52,
                'is_exit_condition' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // This down() method would revert to the old state options
        // For now, we're not reverting to maintain data integrity
    }
}
