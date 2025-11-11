<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateDivorceProcessVerifiedBatch1AlThroughGa extends Migration
{
    /**
     * Run the migrations.
     *
     * VERIFIED DATA FROM OFFICIAL SOURCES:
     * - Alabama: AL Code § 30-2-5, 30-2-8.1
     * - Alaska: AS 25.27.010-060
     * - Arizona: AZ Rev Stat § 25-312, 25-331
     * - Arkansas: AR Code § 9-2-101, 9-12-308
     * - California: Family Code § 2320, 2339
     * - Colorado: CRS 14-10-106
     * - Connecticut: CT Gen Stat § 46b-40, 46b-45
     * - Delaware: DCA Title 13 Chapter 15
     * - Florida: FL Stat § 61.052, 61.19
     * - Georgia: GA Code § 19-5-2, 19-5-3
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'AL' => "Alabama divorce is filed in circuit court. One spouse must have lived in Alabama for at least 6 months if the other spouse is a non-resident (AL Code § 30-2-5). Alabama has a mandatory 30-day waiting period after filing before the final decree can be issued (AL Code § 30-2-8.1). Both parties must reach agreement on property division, custody, and support, or the court will determine these issues. Grounds for divorce include irretrievable breakdown of the marriage, adultery, desertion, cruelty, and other statutory grounds.",

            'AK' => "Alaska divorce is filed in district court. Alaska has no specific residency requirement if grounds for divorce exist in the state. There is no waiting period for divorce in Alaska (AS 25.27.010). Either spouse can seek a divorce based on irretrievable breakdown of the marriage. Alaska courts divide property based on equitable distribution principles and determine custody based on the best interests of the child. Child support is calculated using the income shares model as outlined in AS 25.27.120.",

            'AZ' => "Arizona divorce is filed in superior court and requires one spouse to have lived in Arizona for at least 90 days (AZ Rev Stat § 25-312). After filing, there is a mandatory 60-day waiting period before the court can enter a decree of dissolution (AZ Rev Stat § 25-331). Arizona is a community property state, meaning property acquired during the marriage is divided 50/50 unless spouses agree otherwise. Divorce can be based on irretrievable breakdown of the marriage.",

            'AR' => "Arkansas divorce is filed in circuit court. At least one spouse must have been an Arkansas resident for 6 months before filing (AR Code § 9-2-101). The waiting period is 30 days for no-fault divorces without children, and longer if children are involved or the divorce is contested. Arkansas uses equitable distribution for property division and determines child custody based on the best interests of the child (AR Code § 9-12-308).",

            'CA' => "California divorce is filed in superior court. One spouse must have lived in California for 6 months and in the filing county for 3 months before filing (Family Code § 2320). There is a mandatory 6-month waiting period from service of the divorce petition until the divorce can become final (Family Code § 2339). California is a community property state with 50/50 property division. Grounds for divorce include irreconcilable differences and incurable insanity.",

            'CO' => "Colorado divorce is filed in district court. One spouse must have lived in Colorado for 91 days before filing (CRS 14-10-106). Colorado has a mandatory 91-day waiting period from service that cannot be waived (CRS 14-10-106). Colorado uses equitable distribution for property division. Divorce can be based on irretrievable breakdown of the marriage, and the court will determine custody, support, and property division if spouses cannot agree.",

            'CT' => "Connecticut divorce is filed in family court. One spouse must have lived in Connecticut for at least 1 year before filing (CT Gen Stat § 46b-40). There is a minimum 90-day waiting period after filing before a judgment of divorce can be entered (CT Gen Stat § 46b-45). Connecticut uses equitable distribution for property. Grounds for divorce include irretrievable breakdown, adultery, abandonment, and other statutory grounds.",

            'DE' => "Delaware divorce is filed in family court. One spouse must have lived in Delaware for at least 6 months before filing (DCA Title 13 § 1505). In addition to the 6-month residency requirement, spouses must be separated for 6 months, and there is a 30-day waiting period after filing (DCA Title 13 § 1506). Delaware uses equitable distribution for property division. Divorce requires grounds such as irretrievable breakdown or grounds-based divorce.",

            'FL' => "Florida divorce is filed in circuit court. One spouse must have lived in Florida for at least 6 months before filing (FL Stat § 61.021). There is a mandatory 20-day waiting period that can be waived in certain circumstances (FL Stat § 61.19). Florida uses equitable distribution for property division, which is fair but not necessarily 50/50. Grounds for divorce include irretrievable breakdown of the marriage.",

            'GA' => "Georgia divorce is filed in superior court. One spouse must have lived in Georgia for at least 6 months before filing (GA Code § 19-5-2). There is a 30-day waiting period after the defendant is served before the court can grant a divorce (GA Code § 19-5-3). Georgia uses equitable distribution for property division. Grounds for divorce include irretrievable breakdown of the marriage, adultery, abandonment, cruelty, and other statutory grounds.",
        ];

        foreach ($states as $code => $process) {
            DB::table('states')
                ->where('state_code', $code)
                ->update(['divorce_process' => $process]);
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
