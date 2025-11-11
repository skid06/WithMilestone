<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateChildSupportRulesBatch3MaThroughNj extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'MA' => "Massachusetts uses an income shares model. The guideline is 20% for one child; 25% for two; 29% for three; 31% for four; and 33% for five or more children of combined gross income. Massachusetts adjusts for other children and may deviate from the guideline. The court considers day care and health insurance costs. Child support continues until the child is 18, graduates high school, or becomes emancipated.",

            'MI' => "Michigan uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. Michigan adjusts for parenting time and other children. The court may deviate if the guideline would be unjust or inappropriate. Child support continues until the child is 18 or graduates from high school.",

            'MN' => "Minnesota uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined adjusted gross income. Minnesota adjusts for parenting time and other children. The court may deviate from the guideline if doing so is in the best interest of the child. Support continues until the child is 18 or completes secondary education.",

            'MS' => "Mississippi uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. Mississippi adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or graduates from high school.",

            'MO' => "Missouri uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined adjusted gross income. Missouri adjusts for parenting time and other children. The court may deviate from the guideline if following it would be unjust. Support continues until the child is 18 or completes high school.",

            'MT' => "Montana uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. Montana adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or graduates from high school.",

            'NE' => "Nebraska uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined adjusted gross income. Nebraska adjusts for parenting time and other court-ordered support. The court may deviate from the guideline if warranted. Child support continues until the child is 18 or completes high school.",

            'NV' => "Nevada uses an income shares model. The guideline percentage is 18% for one child; 25% for two; 30% for three; 35% for four; and 40% for five or more children of combined gross income. Nevada adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or graduates from high school.",

            'NH' => "New Hampshire uses an income shares model with percentages of 17% for one child; 25% for two; 29% for three; 31% for four; and 33% for five or more children of combined income. New Hampshire adjusts for parenting time and may deviate from the guideline. The court considers care and health insurance costs. Support continues until the child is 18 or completes high school.",

            'NJ' => "New Jersey uses an income shares model. The guideline percentage is 20% for one child; 27.5% for two; 32.5% for three; 37.5% for four; and 40% for five or more children of combined gross income. New Jersey adjusts for custody time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 19 or emancipated.",
        ];

        foreach ($states as $code => $rules) {
            DB::table('states')
                ->where('state_code', $code)
                ->update(['child_support_rules' => $rules]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Not reverting to maintain data integrity
    }
}
