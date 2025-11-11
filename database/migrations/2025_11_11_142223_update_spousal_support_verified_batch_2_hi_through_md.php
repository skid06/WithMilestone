<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateSpousalSupportVerifiedBatch2HiThroughMd extends Migration
{
    public function up()
    {
        DB::table('states')->where('state_code', 'HI')->update(['spousal_support_rules' => "Hawaii awards spousal support under HRS § 580-47. Court may award temporary, transitional, or rehabilitative support for limited or indefinite period. No formula; judges have broad discretion. Courts consider standard of living, financial resources, ability to become self-supporting, and other factors. Terminates upon remarriage. Source: Hawaii Revised Statutes § 580-47."]);
        DB::table('states')->where('state_code', 'ID')->update(['spousal_support_rules' => "Idaho awards maintenance under Idaho Code § 32-705. Court may award indefinite or term-limited. Factors: ability to be self-supporting, education/training needs, marriage length, standard of living, and obligor's ability to pay. No formula. Support may terminate upon remarriage or substantial change. Source: Idaho Code § 32-705."]);
        DB::table('states')->where('state_code', 'IL')->update(['spousal_support_rules' => "Illinois awards maintenance under 750 ILCS 5/504. Formula: (33.3% payer income) - (25% receiver income). Duration 20% of marriage if <5 years, increasing 4% annually to 80% at 19 years. Permanent for 20+ years. Income cap $500,000. Source: 750 ILCS 5/504."]);
        DB::table('states')->where('state_code', 'IN')->update(['spousal_support_rules' => "Indiana awards maintenance under IC 31-15-7-2. Indefinite or term-limited based on need and ability to pay. Factors: earning capacity, education, resources, contributions, custody, standard of living. No formula; broad discretion. Terminates upon remarriage, cohabitation, or death. Source: Indiana Code § 31-15-7-2."]);
        DB::table('states')->where('state_code', 'IA')->update(['spousal_support_rules' => "Iowa awards support under Iowa Code § 598.21. Based on need and ability to pay. Factors: earning capacity, education/training, resources, age/health, contributions, statutory factors. No formula. May be indefinite or term. Terminates upon remarriage, cohabitation, or substantial change. Source: Iowa Code § 598.21."]);
        DB::table('states')->where('state_code', 'KS')->update(['spousal_support_rules' => "Kansas awards maintenance under KSA 60-1610. Court may award if obligee lacks sufficient property and unable to be self-supporting or caring for custody child. No formula. Factors: ability to earn, education/training, resources, and other factors. Terminates upon remarriage. Source: Kansas Statutes § 60-1610."]);
        DB::table('states')->where('state_code', 'KY')->update(['spousal_support_rules' => "Kentucky awards maintenance under KRS 403.200. Temporary during divorce or final award after judgment. No formula; factors: financial position, earning capacity, standard of living, marriage length, ability to be self-supporting. Modifiable upon remarriage or cohabitation. Source: Kentucky Revised Statutes § 403.200."]);
        DB::table('states')->where('state_code', 'LA')->update(['spousal_support_rules' => "Louisiana awards support under La. C.C. Art. 111. Interim support during separation and final after judgment. Factors: financial means, earning capacity, standard of living, marriage duration, age/health. Case-by-case determination; no formula. Terminates upon remarriage. Source: Louisiana Civil Code Articles 111-115."]);
        DB::table('states')->where('state_code', 'ME')->update(['spousal_support_rules' => "Maine awards support under 19-A M.R.S. § 951. Indefinite or specified term. No formula; discretion required. Factors: resources, earning capacity, education/training, standard of living, age/health, marriage length. May terminate upon remarriage, cohabitation, substantial change, or death. Source: Maine Revised Statutes Title 19-A § 951."]);
        DB::table('states')->where('state_code', 'MD')->update(['spousal_support_rules' => "Maryland awards alimony under MD Code Family § 11-106. Indefinite or term alimony. Factors: resources/needs, earning capacity, standard of living, marriage duration, age/health, contributions, self-support capacity. No formula; broad discretion. Terminates upon remarriage. Source: Maryland Code Family § 11-106."]);
    }

    public function down() { }
}
