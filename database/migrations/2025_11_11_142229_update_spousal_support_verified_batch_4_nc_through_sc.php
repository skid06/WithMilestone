<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateSpousalSupportVerifiedBatch4NcThroughSc extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('states')->where('state_code', 'NC')->update(['spousal_support_rules' => "North Carolina awards alimony under NC Gen Stat § 50-16.1 to 50-16.9. Depends on need, ability to pay, standard of living during marriage. Factors: earning capacity, education, property distribution, length of marriage, conduct of parties, age/health, contributions. No formula. Alimony may be periodic or lump sum. Terminates upon remarriage or cohabitation. Source: NC General Statutes § 50-16.1."]);
        DB::table('states')->where('state_code', 'ND')->update(['spousal_support_rules' => "North Dakota awards spousal support under ND Cent Code § 14-05-24. Court may award if obligee unable to be self-supporting. No formula. Factors: earning capacity, ability to work, standard of living, length of marriage, age/health, contributions to earning capacity, and other factors. Support may be temporary or permanent. Modifiable upon substantial change. Source: North Dakota Century Code § 14-05-24."]);
        DB::table('states')->where('state_code', 'NM')->update(['spousal_support_rules' => "New Mexico awards spousal support under NMSA 1978 § 40-4-7. Court may award based on need and ability to pay. Factors: earning capacity, ability to be self-supporting, contributions, standard of living, marriage length, age/health, and property division. Limited or indefinite support. Terminates upon remarriage. Modifiable for substantial change. Source: New Mexico Statutes § 40-4-7."]);
        DB::table('states')->where('state_code', 'NY')->update(['spousal_support_rules' => "New York awards maintenance under DRL § 236. Guideline formula for income up to $203,000: 30% of payer income - 20% of payee income. Durational alimony: 15-30% of marriage length for 0-15 year marriages; 35-50% for 15-20 years; 50-100% for 20+ years. Factors apply for deviation. Source: New York Domestic Relations Law § 236."]);
        DB::table('states')->where('state_code', 'OH')->update(['spousal_support_rules' => "Ohio awards spousal support under Ohio Revised Code § 3105.18. Court may award indefinite or fixed term. No formula; factors: earning capacity, education, age/health, standard of living, contributions to education/career, length of marriage, property distribution, and ability to be self-supporting. Support modifiable upon remarriage or substantial change. Source: Ohio Revised Code § 3105.18."]);
        DB::table('states')->where('state_code', 'OK')->update(['spousal_support_rules' => "Oklahoma awards alimony under Oklahoma Statutes § 43-121 et seq. Court may award based on need and ability to pay. No formula. Factors: earning capacity, ability to become self-supporting, education/training, length of marriage, standard of living, conduct of parties, and statutory factors. Alimony terminates upon remarriage or cohabitation. Modifiable for substantial change. Source: Oklahoma Statutes Title 43."]);
        DB::table('states')->where('state_code', 'OR')->update(['spousal_support_rules' => "Oregon awards spousal support under ORS 107.105 et seq. Court may award based on need and ability to pay. No formula; factors: earning capacity, education, property, standard of living, length of marriage, contributions, and age/health. Support may be temporary, indefinite, or term. Terminates upon remarriage or specified event. Source: Oregon Revised Statutes § 107.105."]);
        DB::table('states')->where('state_code', 'PA')->update(['spousal_support_rules' => "Pennsylvania awards spousal support (alimony) under Title 23 § 3701 et seq. Court may award for indefinite or limited duration. No formula; judicial discretion. Factors: earning capacity, training/education, standard of living, length of marriage, contributions, age/health, property, and ability to be self-supporting. Terminates upon remarriage. Modifiable for material change. Source: Pennsylvania Consolidated Statutes Title 23."]);
        DB::table('states')->where('state_code', 'RI')->update(['spousal_support_rules' => "Rhode Island awards alimony under RI Gen Laws § 15-5-16. Court may award indefinite or term alimony. No formula; factors: length of marriage, financial resources, earning capacity, standard of living, age/health, education, and ability to become self-supporting. Alimony terminates upon remarriage or cohabitation. Modifiable for substantial change. Source: Rhode Island General Laws § 15-5-16."]);
        DB::table('states')->where('state_code', 'SC')->update(['spousal_support_rules' => "South Carolina awards alimony under SC Code § 20-3-130. Court may award indefinite or limited alimony. Factors: length of marriage, need, ability to pay, standard of living, age/health, earning capacity, property, and contributions. No formula. Court must make findings of fact. Alimony terminates upon remarriage. Modifiable for substantial change in circumstances. Source: South Carolina Code § 20-3-130."]);
    }

    public function down() { }
}
