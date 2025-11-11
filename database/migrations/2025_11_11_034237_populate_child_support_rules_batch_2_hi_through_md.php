<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateChildSupportRulesBatch2HiThroughMd extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'HI' => "Hawaii uses an income shares model. The guideline percentage is 17% of combined gross income for one child; 25% for two; 29% for three; 31% for four; and 32% for five or more children. Hawaii adjusts for other children and may deviate if the guideline would be unjust or unconscionable. The court considers the child's special needs and educational expenses. Child support continues until the child is 18, graduates from high school, or becomes emancipated.",

            'ID' => "Idaho uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined adjusted gross income. Idaho adjusts for parenting time and other children. The court may deviate from the guideline if appropriate under the circumstances. Child support continues until the child is 18 or graduates from high school.",

            'IL' => "Illinois uses an income shares model. The guideline percentage is 20% for one child; 28% for two; 32% for three; 40% for four; 45% for five; and 50% for six or more children. Illinois adjusts for parenting time and other children. The court may deviate from the guideline after considering statutory factors. Child support continues until the child is 18 or permanently emancipated.",

            'IN' => "Indiana uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. Indiana adjusts for parenting time and other court-ordered support. The court may deviate from the guideline if following it would be unjust. Support continues until the child is 18 or completes high school.",

            'IA' => "Iowa uses an income shares model. The guideline percentage is 20% for one child; 27% for two; 32% for three; 37% for four; and 40% for five or more children of combined adjusted gross income. Iowa adjusts for other children and may deviate if the guideline would be unjust or inappropriate. The court considers the child's special needs and educational opportunities. Support continues until age 18 or emancipation.",

            'KS' => "Kansas uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. Kansas adjusts for parenting time and may deviate if the guideline would be unjust. The court considers material changes in circumstance. Child support continues until the child is 18 or graduates from high school.",

            'KY' => "Kentucky uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 29% for three; 31% for four; and 32% for five or more children of combined gross income. Kentucky adjusts for parenting time and other children. The court may deviate from the guideline if it would be unjust. Child support generally continues until the child is 18 or graduates from high school.",

            'LA' => "Louisiana uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined monthly gross income. Louisiana adjusts for parenting time and other children. The court may deviate from the guideline if doing so would be more equitable. Child support continues until the child is 18 or completes high school.",

            'ME' => "Maine uses an income shares model with percentages of 20% for one child; 27% for two; 32% for three; 37% for four; and 40% for five or more children of combined income. Maine adjusts for other children and may deviate from the guideline. The court considers the financial resources of both parents and the standard of living. Support continues until the child is 18 or high school graduation.",

            'MD' => "Maryland uses an income shares model. The guideline percentage is 20% for one child; 26% for two; 32% for three; 37% for four; and 40% for five or more children of combined adjusted gross income. Maryland adjusts for parenting time and other children. The court may deviate from the guideline if following it would be unjust. Child support continues until the child is 18 or graduates from high school.",
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
