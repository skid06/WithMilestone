<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateChildSupportRulesBatch5SdThroughWy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'SD' => "South Dakota uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. South Dakota adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or graduates from high school.",

            'TN' => "Tennessee uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. Tennessee adjusts for parenting time and other children. The court may deviate from the guideline if it would be unjust. Child support continues until the child is 18 or completes high school.",

            'TX' => "Texas uses an income percentage model. The guideline is 20% of obligor's net monthly income for one child; 25% for two; 30% for three; 35% for four; and 40% for five or more children. Texas applies a cap on net income. The court may deviate if the guideline would be unjust or inappropriate. Child support continues until the child is 18 or graduates from high school.",

            'UT' => "Utah uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined adjusted gross income. Utah adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or graduates from high school.",

            'VT' => "Vermont uses an income shares model. The guideline percentage is 20% for one child; 27% for two; 32% for three; 37% for four; and 40% for five or more children of combined adjusted gross income. Vermont adjusts for parenting time and other children. The court may deviate from the guideline. Child support continues until the child is 18 or completes secondary education.",

            'VA' => "Virginia uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. Virginia adjusts for parenting time and other children. The court may deviate from the guideline if following it would be unjust. Support continues until the child is 18 or graduates from high school.",

            'WA' => "Washington uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined adjusted gross income. Washington adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or graduates from high school.",

            'WV' => "West Virginia uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. West Virginia adjusts for parenting time and other children. The court may deviate from the guideline if it would be unjust. Child support continues until the child is 18 or completes high school.",

            'WI' => "Wisconsin uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined adjusted gross income. Wisconsin adjusts for parenting time and other children. The court may deviate from the guideline if following it would be unjust. Support continues until the child is 18 or completes high school.",

            'WY' => "Wyoming uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. Wyoming adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or graduates from high school.",
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
