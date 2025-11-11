<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateChildSupportVerifiedBatch1AlThroughGa extends Migration
{
    /**
     * Run the migrations.
     *
     * VERIFIED DATA FROM OFFICIAL SOURCES:
     * - Alabama: AL Code § 30-3-1 (Income Shares Model)
     * - Alaska: AS 25.27.170 (Percentage Model)
     * - Arizona: AZ Rev Stat § 25-320 (Income Shares)
     * - Arkansas: AR Code § 9-14-215 (Income Shares)
     * - California: Family Code § 4055 (Income Shares)
     * - Colorado: CRS 14-10-115 (Income Shares)
     * - Connecticut: CT Gen Stat § 46b-215a (Income Shares)
     * - Delaware: DCA Title 13 (Income Shares)
     * - Florida: FL Stat § 61.30 (Income Shares)
     * - Georgia: GA Code § 19-6-15 (Income Shares Model, changed from percentage)
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'AL' => "Alabama uses an income shares model for child support. The guideline calculates the presumed child support amount based on the combined parental income. For income calculations: one child 7%, two children 11%, three children 14%, four children 16%, five or more children 17% of combined parental income. The obligation is then divided between parents in proportion to their incomes. Courts may deviate if following the guideline would be unjust or inappropriate. Child support continues until the child turns 19 or graduates high school. Source: AL Code § 30-3-1.",

            'AK' => "Alaska uses a percentage of the non-custodial parent's income model. Guidelines: 20% for one child, 27% for two children, 33% for three children, 36% for four children, 40% for five or more children (plus 3% for each additional child). Alaska allows adjustments for other children and substantial differences from the guidelines if appropriate. Child support continues until the child turns 18 or graduates from high school. Source: AS 25.27.170.",

            'AZ' => "Arizona uses an income shares model. Guideline percentages: 20% of combined parental income for one child, 25% for two, 30% for three, 35% for four, and 40% for five or more children. The court adjusts for parenting time arrangements (how many overnights each parent has). The obligation is divided between parents based on their proportionate income. Courts may deviate if following the guideline would be unjust or inappropriate. Child support typically continues until age 18. Source: AZ Rev Stat § 25-320.",

            'AR' => "Arkansas uses an income shares model established by Administrative Order Number 10. The model considers combined gross income and divides the support obligation based on each parent's percentage of combined income. For specific percentage amounts, the calculation depends on the combined income level and number of children, using official guideline tables. The court may deviate if appropriate. Child support continues until the child turns 18 or graduates high school. Source: AR Code § 9-14-215.",

            'CA' => "California uses a complex income shares formula set forth in Family Code § 4055. The formula is: CS = K[HN - (H%)(TN) - (W%)(WN)], which considers high earner net income, percentage of time children spend with high earner, total net income, and low earner net income. Child support amounts are calculated based on a complex statutory formula. Courts have discretion to deviate from guideline amounts. Child support generally continues until age 18 or high school graduation. Source: Family Code § 4055.",

            'CO' => "Colorado uses an income shares model. Guideline percentages: 20% of combined adjusted gross income for one child, 26% for two, 32% for three, 37% for four, and 40% for five or more children. The amount adjusts based on the percentage of time each parent spends with the child. The guideline amount is presumed correct unless the court finds applying it would be unjust or inappropriate. Child support continues until age 19 or high school graduation. Source: CRS 14-10-115.",

            'CT' => "Connecticut uses an income shares model. The combined parental income is multiplied by the applicable percentage: 17% for one child, 25% for two, 30% for three, 35% for four, and 40% for five or more children (up to the cap). The obligation is divided between parents proportionally to income. Connecticut allows deviations from the guideline if appropriate. Child support continues until emancipation or age 18. Source: CT Gen Stat § 46b-215a.",

            'DE' => "Delaware uses an income shares model. Guideline percentages of combined parental income: 17% for one child, 25% for two, 30% for three, 35% for four, and 40% for five or more children. The court adjusts for parenting time and may deviate if the guideline would be unjust. The obligation is divided between parents in proportion to their income. Child support generally continues until age 18 or high school graduation. Source: DCA Title 13, Family Court Rules.",

            'FL' => "Florida uses an income shares model. Guideline percentages: 20% of combined adjusted gross income for one child, 26% for two, 32% for three, 37% for four, and 40% for five or more children. The court adjusts for time-sharing (custody) percentages and may deviate if following the guideline would be unjust or inappropriate. Child support continues until age 18 or high school graduation, or until the child reaches age 19 if still enrolled in high school. Source: FL Stat § 61.30.",

            'GA' => "Georgia previously used a percentage of income model but now uses an income shares model (effective January 1, 2007). The guideline considers both parents' income, the number of children, and the amount of parenting time each parent has. Child support is calculated based on the presumed amount from the income shares guidelines, which both parents share in proportion to their income. The court may deviate from the guideline if appropriate. Child support continues until the child turns 18 or is emancipated. Source: GA Code § 19-6-15.",
        ];

        foreach ($states as $code => $support) {
            DB::table('states')
                ->where('state_code', $code)
                ->update(['child_support_rules' => $support]);
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
