<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateDivorceProcessVerifiedBatch2HiThroughMd extends Migration
{
    public function up()
    {
        DB::table('states')->where('state_code', 'HI')->update(['divorce_process' => "Hawaii divorce is filed in family court and requires 6 months residency for at least one spouse (HRS 580-1). There is no mandatory waiting period for divorce in Hawaii (HRS 580-41). Hawaii requires either a 2-year separation or both parties agreeing to divorce based on irretrievable breakdown. If parties agree, the process can be completed quickly. Property division uses equitable distribution principles. Source: HRS Chapter 580."]);

        DB::table('states')->where('state_code', 'ID')->update(['divorce_process' => "Idaho divorce is filed in district court. One spouse must reside in Idaho for 6 months (Idaho Code § 32-701). There is no mandatory waiting period after filing (Idaho Code § 32-707). Idaho allows no-fault divorce based on irreconcilable differences. Both parties must reach agreement or the court determines issues. Property is divided equitably, and custody is determined by best interests of child. Source: Idaho Code § 32-701, 707."]);

        DB::table('states')->where('state_code', 'IL')->update(['divorce_process' => "Illinois divorce is filed in circuit court. One spouse must reside in Illinois for 90 days (750 ILCS 5/401). There is no waiting period for uncontested divorces once 90 days of residency is met (750 ILCS 5/403). Illinois allows divorce based on irreconcilable differences. Property is divided equitably unless spouses agree otherwise. Custody is determined based on best interests of child. Source: 750 ILCS 5/401, 403."]);

        DB::table('states')->where('state_code', 'IN')->update(['divorce_process' => "Indiana divorce is filed in circuit or superior court. One spouse must reside in Indiana for 6 months and in the county for 3 months (IC 31-15-2-6). Indiana has a mandatory 60-day waiting period from filing (IC 31-15-2-10). Both parties must reach agreement on property, custody, and support, or the court determines these issues. Grounds for divorce include irretrievable breakdown. Source: IC 31-15-2-6, 10."]);

        DB::table('states')->where('state_code', 'IA')->update(['divorce_process' => "Iowa divorce is filed in district court. One spouse must reside in Iowa for 1 year (Iowa Code § 598.5). Iowa has a 90-day waiting period after filing before divorce can be finalized (Iowa Code § 598.4). Both parties must reach agreement or court determines custody, support, and property division. Grounds include irretrievable breakdown of marriage. Source: Iowa Code § 598.4, 598.5."]);

        DB::table('states')->where('state_code', 'KS')->update(['divorce_process' => "Kansas divorce is filed in district court. One spouse must reside in Kansas for 60 days (KSA 60-1601). There is no waiting period for divorce in Kansas once residency is met (KSA 60-1610). Kansas allows divorce based on incompatibility. Property is divided fairly, and custody is based on best interests of child. Grounds-based divorce requires grounds like adultery or cruelty. Source: KSA 60-1601, 1610."]);

        DB::table('states')->where('state_code', 'KY')->update(['divorce_process' => "Kentucky divorce is filed in district or circuit court. One spouse must reside in Kentucky for 6 months (KRS 403.140). Kentucky requires a 60-day waiting period from filing during which parties must live separate and apart (KRS 403.140). Both parties must reach agreement or court determines issues. Grounds include irretrievable breakdown of marriage. Property is divided equitably. Source: KRS 403.140."]);

        DB::table('states')->where('state_code', 'LA')->update(['divorce_process' => "Louisiana divorce is filed in district court. One spouse must reside in Louisiana for 6 months (La. C.C. Art. 103). Louisiana allows uncontested divorce without waiting period if spouses agree on issues (La. C.C. Art. 103). For no-fault divorce, parties must be separated for 6 months if both spouses consent. Property is divided according to community property principles. Source: Louisiana Civil Code Article 103."]);

        DB::table('states')->where('state_code', 'ME')->update(['divorce_process' => "Maine divorce is filed in district court. One spouse must reside in Maine for 6 months (19-A M.R.S. § 901). Maine has a 60-day waiting period after filing before divorce can be finalized (19-A M.R.S. § 902). Both parties must reach agreement or court determines custody and support. Property is divided equitably. Grounds include irreconcilable differences. Source: 19-A M.R.S. § 901, 902."]);

        DB::table('states')->where('state_code', 'MD')->update(['divorce_process' => "Maryland divorce is filed in circuit court. One spouse must reside in Maryland for 6 months (MD Code Family § 7-103). For uncontested divorce with agreement, there is no waiting period once residency is met (MD Code Family § 7-103). Maryland allows no-fault divorce based on separation or mutual consent. Property is divided equitably, and custody is based on best interests of child. Source: MD Code Family § 7-103."]);
    }

    public function down()
    {
        //
    }
}
