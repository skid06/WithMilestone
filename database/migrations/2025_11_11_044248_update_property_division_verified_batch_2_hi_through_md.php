<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
class UpdatePropertyDivisionVerifiedBatch2HiThroughMd extends Migration
{
    public function up()
    {
        DB::table('states')->where('state_code', 'HI')->update(['property_division' => "Hawaii is equitable distribution state. Court divides marital property fairly based on length of marriage, financial condition, contribution to acquisition of property, earning capacity, and age/health. Separate property (owned before marriage, inherited, gifted) remains with owning spouse. Source: HRS § 580-47."]);
        DB::table('states')->where('state_code', 'ID')->update(['property_division' => "Idaho is equitable distribution state per Idaho Code § 32-712. Court divides marital property fairly. Separate property includes assets owned before marriage and inheritances. Length of marriage, financial condition, contributions to property, earning capacity considered."]);
        DB::table('states')->where('state_code', 'IL')->update(['property_division' => "Illinois is equitable distribution state per 750 ILCS 5/503. Court divides marital property fairly considering contribution to acquisition, length of marriage, financial condition, earning capacity, and other relevant factors. Not necessarily 50/50."]);
        DB::table('states')->where('state_code', 'IN')->update(['property_division' => "Indiana is equitable distribution state per IC 31-15-7-1. Court divides marital property fairly and justly. Separate property (before marriage, inherited) not divided. Considers length of marriage, financial condition, contribution to property, earning capacity."]);
        DB::table('states')->where('state_code', 'IA')->update(['property_division' => "Iowa is equitable distribution state per Iowa Code § 598.21. Court divides marital property fairly which may be equal or unequal. Separate property (before marriage, inherited, gifted) remains separate. Length of marriage, contributions, earning capacity considered."]);
        DB::table('states')->where('state_code', 'KS')->update(['property_division' => "Kansas is equitable distribution state per KSA 60-1610. Court divides marital property fairly. Separate property includes assets owned before marriage and inheritances. Length of marriage, financial condition, contributions to property, earning capacity considered."]);
        DB::table('states')->where('state_code', 'KY')->update(['property_division' => "Kentucky is equitable distribution state per KRS 403.190. Court divides marital property fairly but not necessarily equally. Separate property (before marriage, inherited, gifted) not divided. Length of marriage, financial condition, contributions considered."]);
        DB::table('states')->where('state_code', 'LA')->update(['property_division' => "Louisiana is community property state per La. C.C. Art. 871. Property acquired during marriage is community property and divided equally (50/50). Separate property (before marriage, inherited, gifted) remains with owning spouse. Clear distinction between community and separate."]);
        DB::table('states')->where('state_code', 'ME')->update(['property_division' => "Maine is equitable distribution state per 19-A M.R.S. § 953. Court divides marital property fairly. Separate property (before marriage, inherited, gifted) not divided. Length of marriage, contribution to property, financial condition, earning capacity considered."]);
        DB::table('states')->where('state_code', 'MD')->update(['property_division' => "Maryland is equitable distribution state per MD Code Family § 8-205. Court divides marital property fairly considering contribution of each spouse. Separate property (before marriage, inherited, gifted) not divided. Length of marriage, financial condition, earning capacity considered."]);
    }
    public function down() { }
}
