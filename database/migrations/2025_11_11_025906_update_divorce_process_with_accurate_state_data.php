<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateDivorceProcessWithAccurateStateData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'AL' => "In Alabama, file a petition in the county district court where you reside. Alabama requires a 30-day waiting period after filing before the divorce can be finalized. You must serve your spouse with divorce papers and wait for their response. In uncontested divorces where both parties agree, the process typically takes 30-60 days after the waiting period expires. The court reviews your settlement agreement on property division, custody, and support. Once approved, the judge signs the final divorce decree.",

            'AK' => "Alaska requires only 30 days of residency to file for divorce. File your petition in the district court of the judicial district where you live. Your spouse must be served with the divorce papers. Alaska does not have a mandatory waiting period for uncontested divorces. You can file for a divorce and, if both parties agree on all terms, it can be finalized relatively quickly. The court reviews your settlement agreement and, once approved, issues the final decree of dissolution of marriage.",

            'AZ' => "Arizona's divorce process begins with filing a petition for dissolution of marriage in the superior court. You must meet the 90-day residency requirement. After filing, your spouse is served and has 20 days to respond. Arizona does not impose a mandatory waiting period. In uncontested cases where both parties agree on all issues, the divorce can be finalized within weeks. The court approves the joint dissolution agreement, and the judge signs the decree.",

            'AR' => "To file for divorce in Arkansas, file a complaint in the circuit court of your county. Arkansas requires only 60 days of residency. You must serve your spouse with the divorce papers. There is no mandatory waiting period for uncontested divorces. After filing and serving, if both parties agree on terms, you can reach a settlement relatively quickly. The judge reviews the marital settlement agreement and, if everything is in order, signs the divorce decree.",

            'CA' => "California divorces begin with filing a petition for dissolution of marriage in the superior court. You must have lived in California for six months. After filing, your spouse is served and can respond within 30 days. California has a mandatory six-month waiting period from filing to final judgment. During this time, you negotiate settlement terms. In uncontested cases, once the waiting period ends and agreements are reached, the judge signs the final divorce decree.",

            'CO' => "File a petition for dissolution of marriage in the district court. Colorado requires 90 days of residency. Your spouse must be served with the petition. Colorado has a mandatory 91-day waiting period from filing before a divorce can be finalized. This waiting period cannot be waived or shortened. Once both parties agree on all issues, you can submit a joint decree for the judge's approval. The court reviews the settlement and enters the final divorce decree.",

            'CT' => "Connecticut requires one year of residency before filing for dissolution of marriage. File your complaint in the family court of your district. You must serve your spouse with the papers. Connecticut has a 90-day waiting period before a final divorce decree can be entered. Once filed, if both parties agree on all terms including property division and custody, you can move forward with your settlement agreement. The judge reviews and approves the decree.",

            'DE' => "Delaware has one of the shortest residency requirements at just six days. File your complaint for divorce in the family court. Your spouse must be served with the complaint. Delaware does not have a mandatory waiting period for uncontested divorces. If both parties agree on all terms, the process can move quickly. The court approves the settlement agreement and issues the final divorce decree.",

            'FL' => "File a petition for dissolution of marriage in the circuit court. Florida requires six months of residency. Your spouse must be served with the petition. Florida does not mandate a waiting period for uncontested divorces if both parties have signed a marital settlement agreement. Florida has a minimum 20-day waiting period from service, which can be waived in certain circumstances. Once the agreement is complete and signed, you can submit it to the court for approval. The judge signs the final judgment of dissolution.",

            'GA' => "File your complaint for divorce in the superior court of your county. Georgia requires six months of residency. Your spouse is served and has 30 days to respond. Georgia requires a 30-day waiting period after serving your spouse before the divorce can be finalized. If both parties agree on all terms, you can reach a settlement agreement. The court approves the joint agreement, and the judge issues the final divorce decree.",
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
        // This down() method would revert to the old generic content
        // For now, we're not reverting to maintain data integrity
    }
}
