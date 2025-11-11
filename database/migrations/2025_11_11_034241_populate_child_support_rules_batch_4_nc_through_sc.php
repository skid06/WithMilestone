<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateChildSupportRulesBatch4NcThroughSc extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'NC' => "North Carolina uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. North Carolina adjusts for parenting time and other children. The court may deviate from the guideline if it would be unjust or inappropriate. Child support continues until the child is 18, graduates from high school, or becomes emancipated.",

            'ND' => "North Dakota uses an income shares model. The guideline percentage is 20% for one child; 27% for two; 32% for three; 37% for four; and 40% for five or more children of combined adjusted gross income. North Dakota adjusts for other children and may deviate from the guideline. The court considers the special needs of the child. Support continues until the child is 18 or completes high school.",

            'NM' => "New Mexico uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. New Mexico adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or graduates from high school.",

            'NY' => "New York uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 29% for three; 31% for four; and 35% for five or more children of combined parental income up to a cap. New York adjusts for parenting time and other children. The court may deviate from the guideline under statutory factors. Child support continues until the child is 21 or completes college.",

            'OH' => "Ohio uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. Ohio adjusts for parenting time and other children. The court may deviate from the guideline if following it would be unjust. Child support continues until the child is 18 or graduates from high school.",

            'OK' => "Oklahoma uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. Oklahoma adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or completes high school.",

            'OR' => "Oregon uses an income shares model. The guideline is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined adjusted gross income. Oregon adjusts for parenting time and other children. The court may deviate from the guideline if it would be unjust. Support continues until the child is 18 or completes high school.",

            'PA' => "Pennsylvania uses an income shares model. The guideline percentage is 18% for one child; 26% for two; 32% for three; 36% for four; and 40% for five or more children of combined net income. Pennsylvania adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or graduates from high school.",

            'RI' => "Rhode Island uses an income shares model. The guideline is 20% for one child; 27% for two; 32% for three; 37% for four; and 40% for five or more children of combined income. Rhode Island adjusts for parenting time and other children. The court may deviate from the guideline if doing so is in the best interest of the child. Support continues until the child is 18 or completes secondary education.",

            'SC' => "South Carolina uses an income shares model. The guideline percentage is 17% for one child; 25% for two; 30% for three; 35% for four; and 37% for five or more children of combined gross income. South Carolina adjusts for parenting time and other children. The court may deviate from the guideline if appropriate. Child support continues until the child is 18 or graduates from high school.",
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
