<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateDivorceProcessBatch3MaThroughNj extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'MA' => "File a joint petition for divorce in the probate and family court. Massachusetts requires one year of residency. Both spouses should file jointly, which streamlines the process. Massachusetts has a mandatory 120-day waiting period from filing before the divorce can be finalized. During this period, you negotiate property division, support, and custody arrangements. If both parties agree on all terms and the waiting period has passed, the judge reviews the Separation Agreement and issues the Judgment of Divorce.",

            'MI' => "File a complaint for divorce in the circuit court. Michigan requires six months of residency. Your spouse must be served with the complaint. Michigan requires a waiting period of 180 days from filing if there are minor children; if there are no children, you can proceed without a waiting period. Both parties must reach a settlement agreement on all issues. Once agreed, file the Joint Stipulation and Sign-Off. The court reviews the documents and the judge signs the judgment of divorce.",

            'MN' => "File a petition for dissolution of marriage in the district court. Minnesota requires one year of residency. Your spouse is served with the petition and can respond within 30 days. Minnesota does not have a post-filing waiting period for uncontested divorces. Once both parties agree on all terms, you can submit the joint stipulation and motion for divorce. The court reviews the settlement agreement and the judge enters the judgment of dissolution.",

            'MS' => "File a complaint for divorce in the circuit court. Mississippi requires six months of residency. Your spouse must be served with the complaint. Mississippi requires a 60-day waiting period from service for no-fault divorces. If there is contested custody, the waiting period is extended. Once both parties agree on all issues after the waiting period, submit the settlement agreement to the court. The judge approves the agreement and enters the judgment of divorce.",

            'MO' => "File a petition for dissolution of marriage in the circuit court. Missouri requires 30 days of residency. Your spouse is served with the petition. Missouri has a 30-day waiting period from filing before a divorce can be finalized. Both parties must reach an agreement on property division and custody. After the waiting period, if all matters are resolved, you can request the final judgment. The judge reviews the settlement agreement and issues the decree of divorce.",

            'MT' => "File a petition for dissolution of marriage in the district court. Montana requires one year of residency. Your spouse is served with the petition. Montana does not have a mandatory waiting period for uncontested divorces. If both parties agree on property division and custody arrangements, you can submit the settlement agreement to the court. The judge reviews the agreement and, if all terms are satisfactory, enters the judgment of dissolution.",

            'NE' => "File a complaint for divorce in the district court. Nebraska requires one year of residency. Your spouse must be served with the complaint. Nebraska requires a 60-day waiting period from filing before a divorce can be finalized. During this period, both parties negotiate their settlement agreement on all issues. Once the waiting period expires and both parties have agreed, you can submit the settlement agreement to the court for approval. The judge signs the decree of divorce.",

            'NV' => "File a complaint for divorce in the district court. Nevada requires six weeks of residency. Your spouse must be served with the complaint. Nevada does not have a mandatory waiting period for uncontested divorces. Both parties should agree on property division, spousal support, and custody arrangements. Once all terms are agreed upon and documented in the settlement agreement, file it with the court. The judge reviews and approves the judgment of divorce.",

            'NH' => "File a petition for divorce in the family division of the circuit court. New Hampshire requires one year of residency. Your spouse is served with the petition. New Hampshire does not have a mandatory waiting period for uncontested divorces. Both parties must reach a settlement agreement on all issues including property division, support, and custody. Once the agreement is signed, file it with the court along with a notice of intent to obtain a final decree. The judge approves and signs the decree.",

            'NJ' => "File a complaint for divorce in the family court. New Jersey requires one year of residency. Your spouse must be served with the complaint. New Jersey does not have a waiting period for uncontested divorces if both parties agree on all terms. File a marital settlement agreement addressing property division, custody, support, and all other issues. If all parties agree and the settlement is fair, the court can approve the judgment of divorce. Once approved, the judge signs the final decree.",
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
