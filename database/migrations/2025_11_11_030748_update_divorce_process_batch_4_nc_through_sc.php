<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateDivorceProcessBatch4NcThroughSc extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'NC' => "File a complaint for divorce in the superior court of your county. North Carolina requires 30 days of residency. Your spouse must be served with the complaint. North Carolina requires a 30-day waiting period after the complaint is filed before the divorce can be finalized. Both parties must reach an agreement on property division and custody. After the 30-day period expires, you can submit the settlement agreement to the court. The judge reviews and approves the decree.",

            'ND' => "File a petition for divorce in the district court. North Dakota requires 6 months of residency. Your spouse is served with the petition. North Dakota does not have a mandatory waiting period for uncontested divorces. Both parties must agree on property division, custody, and support arrangements. File the joint stipulation with the court. The judge reviews the settlement agreement and enters the judgment of divorce.",

            'NM' => "File a petition for dissolution of marriage in the district court. New Mexico requires 6 months of residency. Your spouse must be served with the petition. New Mexico does not require a waiting period for uncontested divorces if both parties agree on all issues. Submit your settlement agreement addressing property division, custody, and support to the court. The judge reviews the agreement and, if satisfactory, signs the judgment of dissolution.",

            'NY' => "File a summons and complaint for divorce in the supreme court of your county. New York requires 2 years of residency or that the divorce action is commenced in New York. New York does not have a mandatory waiting period if both parties have signed a separation agreement and acknowledge the grounds for divorce. Once all terms are agreed and documented, submit the papers to the court. The judge reviews and signs the judgment of divorce.",

            'OH' => "File a complaint for divorce in the court of common pleas. Ohio requires 6 months of residency. Your spouse must be served with the complaint. Ohio requires a 30-day waiting period from the service of the complaint. During this time, both parties must attempt to reach a settlement on all issues including property division and custody. After the 30-day period, if all matters are agreed, submit the settlement agreement. The judge approves and enters the decree.",

            'OK' => "File a petition for divorce in the district court. Oklahoma requires 6 months of residency. Your spouse is served with the petition. Oklahoma has a 6-month waiting period from filing to final judgment, unless both parties waive it. If the divorce is contested and children are involved, there may be additional waiting periods. Once both parties agree on all issues, the settlement agreement can be presented to the court. The judge signs the final decree.",

            'OR' => "File a petition for dissolution of marriage in the circuit court. Oregon requires 6 months of residency. Your spouse must be served with the petition. Oregon does not have a mandatory waiting period for uncontested divorces. Once both parties agree on property division, custody, and support arrangements, submit the settlement agreement to the court. The judge reviews the settlement agreement and, if all terms are fair, signs the judgment of dissolution.",

            'PA' => "File a complaint for divorce in the court of common pleas. Pennsylvania requires 6 months of residency. Your spouse must be served with the complaint. Pennsylvania requires a 90-day waiting period from filing, or 120 days if contested. Both parties must reach an agreement on property division, custody, and support. After the waiting period, with a settlement agreement in place, you can request final judgment. The judge approves and signs the decree of divorce.",

            'RI' => "File a complaint for divorce in the family court. Rhode Island requires 1 year of residency. Your spouse must be served with the complaint. Rhode Island does not have a mandatory waiting period for uncontested divorces with a settlement agreement. Both parties must agree on property division, custody, and support. Submit the settlement agreement and other required documents to the court. The judge reviews the agreement and signs the judgment of divorce.",

            'SC' => "File a complaint for divorce in the family court. South Carolina requires 3 months of residency. Your spouse must be served with the complaint. South Carolina does not have a mandatory waiting period for uncontested divorces if both parties have signed the settlement agreement. However, if contested, there is typically a 30-day waiting period from service. Once all issues are resolved and documented, submit to the court. The judge approves and enters the final decree.",
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
