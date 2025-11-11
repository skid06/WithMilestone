<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateChildSupportRulesBatch1AlThroughGa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'AL' => "Alabama uses an income shares model for child support. The guideline calculates child support based on the combined parental income. For one child, the percentage is approximately 7% of combined income; for two children, 11%; three children, 14%; four children, 16%; and five or more children, 17%. The court may deviate from this guideline if following it would be unjust or inappropriate. Child support typically continues until the child turns 19 or graduates from high school, whichever is later.",

            'AK' => "Alaska uses an income shares model. The guideline percentage is 20% of combined parental income for one child; 27% for two children; 33% for three; 37% for four; and 40% for five or more children. Alaska allows for adjustments based on other children and court-ordered support obligations. The court may deviate if following the guideline would be unjust or inappropriate. Child support generally continues until the child is 18 or graduates from high school.",

            'AZ' => "Arizona uses an income shares model based on combined parental income. The guideline is 20% for one child; 25% for two; 30% for three; 35% for four; and 40% for five or more children. The court adjusts for the parents' custody arrangement and specific parenting time. Arizona allows deviations if the guideline would be unjust. Child support continues until the child is 18 or graduates from high school, whichever is later.",

            'AR' => "Arkansas uses an income shares model. The guideline percentages are 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. The court may adjust for other children and support obligations. Arkansas allows deviations from the guideline if it would be unjust or inappropriate in the particular case. Support continues until the child is 18 or until high school graduation.",

            'CA' => "California uses an income shares model with complex calculations. The guideline considers both parents' incomes, custody time, and tax impacts. The formula is ((HPI – (H%–(WPI × W%)) + (WPI – (W%–(HPI × H%)) × 0.50. California adjusts for joint custody and parenting time. The court may deviate if following the guideline would be unjust or inappropriate. Child support typically continues until age 18 or high school graduation.",

            'CO' => "Colorado uses an income shares model. The guideline is 20% of combined gross income for one child; 26% for two; 32% for three; 37% for four; and 40% for five or more children. Colorado adjusts the percentage based on the amount of parenting time. The court may deviate if the guideline would be unjust. Child support continues until the child is 19 or graduates from high school, whichever is later.",

            'CT' => "Connecticut uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 30% for three; 35% for four; and 40% for five or more children of combined gross income. Connecticut adjusts for other court-ordered support and may deviate from the guideline. The court considers whether the parents' income exceeds the guideline cap. Support continues until the child is 18 or until emancipation.",

            'DE' => "Delaware uses an income shares model with percentages of 17% for one child; 25% for two; 30% for three; 35% for four; and 40% for five or more children of combined income. Delaware adjusts for parenting time and may deviate if the guideline would be unjust. The court considers substantial and material changes in circumstances. Support generally continues until age 18 or high school graduation.",

            'FL' => "Florida uses an income shares model. The guideline percentages are 20% for one child; 26% for two; 32% for three; 37% for four; and 40% for five or more children of combined adjusted gross income. Florida adjusts for time-sharing percentage and other children. Deviations are permitted if following the guideline would be unjust or inappropriate. Child support typically continues until age 18 or high school graduation.",

            'GA' => "Georgia uses an income shares model. The guideline is 20% for one child; 27% for two; 32% for three; 37% for four; and 40% for five or more children of combined income. Georgia adjusts based on parenting time and the amount of time each child spends with each parent. The court may deviate from the guideline if appropriate. Child support continues until the child turns 18, graduates high school, or becomes emancipated.",
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
