<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateDivorceProcessBatch5SdThroughWy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'SD' => "File a petition for divorce in the circuit court. South Dakota requires 30 days of residency. Your spouse must be served with the petition. South Dakota does not have a mandatory waiting period for uncontested divorces. Both parties must reach a settlement agreement on property division, spousal support, and custody. Once all issues are agreed upon and documented, submit the settlement agreement to the court. The judge reviews and approves the judgment of divorce.",

            'TN' => "File a complaint for divorce in the chancery court. Tennessee requires 6 months of residency. Your spouse must be served with the complaint. Tennessee has a 30-day waiting period from the filing of the complaint. During this period, both parties should reach an agreement on all issues including property division and custody. After the waiting period expires with a settlement agreement in place, submit it to the court. The judge approves and enters the decree of divorce.",

            'TX' => "File a petition for divorce in the district court. Texas requires 6 months of residency. Your spouse must be served with the petition. Texas has a 60-day waiting period from the filing of the divorce petition before it can be finalized. Both parties must reach a settlement agreement on property division, custody (called conservatorship in Texas), and support. After the waiting period, submit the final decree to the court. The judge signs the decree.",

            'UT' => "File a complaint for divorce in the district court. Utah requires 3 months of residency. Your spouse must be served with the complaint. Utah does not have a mandatory waiting period for uncontested divorces. Both parties must agree on property division, custody, and support arrangements and document these in a settlement agreement. Once agreed, submit the settlement agreement to the court. The judge reviews and approves the judgment of divorce.",

            'VT' => "File a complaint for divorce in the superior court. Vermont requires 6 months of residency. Your spouse must be served with the complaint. Vermont does not have a mandatory waiting period for uncontested divorces. Both parties must reach an agreement on property division, custody, and support. File the settlement agreement with the court. The judge reviews the agreement and, if all terms are fair and legal, signs the judgment of divorce.",

            'VA' => "File a complaint for divorce in the circuit court. Virginia requires 6 months of residency or 1 year depending on whether there are minor children and grounds are agreed. Your spouse must be served. Virginia requires a waiting period that varies: for uncontested divorces with agreement, 30 days if no children or 6 months if children are involved (or 1 year if contested). Once the waiting period passes with a settlement agreement, submit to the court. The judge approves and enters the decree.",

            'WA' => "File a petition for dissolution of marriage in the superior court. Washington requires 6 months of residency. Your spouse must be served with the petition. Washington does not have a mandatory waiting period for uncontested divorces. Both parties must reach a settlement agreement on property division, spousal support, and custody. Once all terms are agreed, submit the settlement agreement to the court. The judge reviews the agreement and enters the judgment of dissolution.",

            'WV' => "File a complaint for divorce in the circuit court. West Virginia requires 6 months of residency. Your spouse must be served with the complaint. West Virginia requires a 60-day waiting period from the service of the complaint (or filing for divorce from bed and board). Both parties must agree on property distribution and custody arrangements. After the 60-day period, if all matters are settled, submit the settlement agreement to the court. The judge approves and signs the decree.",

            'WI' => "File a petition for divorce in the family court. Wisconsin requires 6 months of residency. Your spouse must be served with the petition. Wisconsin requires a 120-day waiting period from the filing of the divorce petition before final judgment can be entered. Both parties must reach an agreement on property division, support, and custody. After the 120-day period expires, submit the settlement agreement to the court. The judge reviews and approves the judgment of divorce.",

            'WY' => "File a complaint for divorce in the district court. Wyoming requires 6 months of residency. Your spouse must be served with the complaint. Wyoming does not have a mandatory waiting period for uncontested divorces. Both parties must agree on property division, spousal support, and custody arrangements. File the settlement agreement with the court. The judge reviews the agreement and, if fair and reasonable, signs the final judgment of divorce.",
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
