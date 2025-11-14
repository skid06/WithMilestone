<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateDivorceProcessBatch2HiThroughMd extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'HI' => "File a petition for divorce in the family court. Hawaii requires six months of residency in the islands. Your spouse must be served. Hawaii does not impose a mandatory waiting period for uncontested divorces. Once both parties agree on all issues and sign a settlement agreement, you can submit the documents to court. The judge reviews and signs the final divorce decree.",

            'ID' => "File a complaint for divorce in the district court. Idaho requires six months of residency. Your spouse must be served with the complaint. Idaho does not require a waiting period for uncontested divorces. Once you reach a marital settlement agreement with a parenting plan, you can file it with the court. The judge reviews the agreement and issues the final decree of divorce.",

            'IL' => "File a petition for dissolution of marriage in the circuit court. Illinois requires 90 days of residency. Your spouse is served and can respond within 30 days. Illinois does not mandate a waiting period for uncontested divorces with a marital settlement agreement. Once both parties agree on all terms, the court can enter the final judgment of dissolution.",

            'IN' => "File a petition in the circuit or superior court. Indiana requires six months of residency. Your spouse is served with the petition. Indiana requires a minimum of 60 days from filing before the divorce can be finalized. In uncontested cases where both parties agree, you can meet the waiting period and finalize once the agreement is approved by the court.",

            'IA' => "File a petition for dissolution of marriage in the district court. Iowa requires one year of residency. Your spouse is served and can respond. Iowa has a 90-day waiting period after filing before a divorce can be finalized. During this time, you negotiate and reach a settlement agreement. After the waiting period, if all terms are agreed upon, the court enters the final decree.",

            'KS' => "File a petition in the district court. Kansas requires 60 days of residency. Your spouse must be served. Kansas does not require a waiting period for divorce. If both parties agree on all issues, you can file a joint settlement agreement. The court reviews and approves the agreement, and the judge signs the final decree.",

            'KY' => "File a petition for dissolution of marriage in the district or circuit court. Kentucky requires six months of residency. Your spouse is served with the petition. Kentucky requires a 60-day waiting period from filing. After this period, if the parties have reached a settlement agreement, the court can enter the final judgment of dissolution.",

            'LA' => "File a petition for divorce in the district court. Louisiana requires six months of residency. Your spouse is served. Louisiana has unique divorce laws. For uncontested divorces, if both parties agree, you can file a joint petition. The court reviews the agreement and can enter judgment without a waiting period if all terms are agreed upon.",

            'ME' => "File a complaint for divorce in the district court. Maine requires six months of residency. Your spouse is served with the complaint. Maine does not require a waiting period for uncontested divorces. If both parties agree on all issues, you can submit your settlement agreement to the court. The judge reviews and approves the decree.",

            'MD' => "File a complaint for divorce in the circuit court. Maryland requires six months of residency. Your spouse is served. For uncontested divorces with mutual consent, there is no waiting period. Once both parties agree on all terms and sign the settlement agreement, you can file it with the court for the judge's approval and signature.",
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
