<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateChildSupportVerifiedBatch2HiThroughMd extends Migration
{
    public function up()
    {
        DB::table('states')->where('state_code', 'HI')->update(['child_support_rules' => "Hawaii uses income shares model. Percentages: 17% for 1 child, 25% for 2, 29% for 3, 31% for 4, 33% for 5+ children. Income cap applies. Child support continues to age 18. Source: HRS § 571-52."]);
        DB::table('states')->where('state_code', 'ID')->update(['child_support_rules' => "Idaho uses income shares model per Idaho Code § 32-706. Percentages: 17% for 1 child, 25% for 2, 30% for 3, 35% for 4, 37% for 5+ children. Court adjusts for parenting time and special circumstances."]);
        DB::table('states')->where('state_code', 'IL')->update(['child_support_rules' => "Illinois uses income shares model (effective July 2017). Percentages: 20% for 1, 28% for 2, 32% for 3, 40% for 4, 45% for 5, 50% for 6+ children. Source: 750 ILCS 5/505."]);
        DB::table('states')->where('state_code', 'IN')->update(['child_support_rules' => "Indiana uses income shares model per IC 31-16-6-1. Percentages: 17% for 1, 25% for 2, 30% for 3, 35% for 4, 37% for 5+ children of combined gross income."]);
        DB::table('states')->where('state_code', 'IA')->update(['child_support_rules' => "Iowa uses income shares model in Chapter 9 of Iowa Court Rules. Percentages based on combined adjusted gross income and parenting time. Medical support is 5% max of gross income. Source: Iowa Code § 252B.5."]);
        DB::table('states')->where('state_code', 'KS')->update(['child_support_rules' => "Kansas uses income shares model. Percentages: 17% for 1, 25% for 2, 30% for 3, 35% for 4, 37% for 5+ children of combined adjusted gross income. Source: KSA 23-3002."]);
        DB::table('states')->where('state_code', 'KY')->update(['child_support_rules' => "Kentucky uses income shares model. Percentages: 17% for 1, 25% for 2, 29% for 3, 31% for 4, 32% for 5+ children. Income cap applies. Source: KRS § 205.645."]);
        DB::table('states')->where('state_code', 'LA')->update(['child_support_rules' => "Louisiana uses income shares model. Guidelines percentages: 17% for 1, 25% for 2, 30% for 3, 35% for 4, 37% for 5+ children of combined monthly gross income. Source: La. R.S. § 9:315."]);
        DB::table('states')->where('state_code', 'ME')->update(['child_support_rules' => "Maine uses income shares model. Percentages: 20% for 1, 27% for 2, 32% for 3, 37% for 4, 40% for 5+ children of combined income. Source: 19-A M.R.S. § 2001."]);
        DB::table('states')->where('state_code', 'MD')->update(['child_support_rules' => "Maryland uses income shares model. Percentages: 20% for 1, 26% for 2, 32% for 3, 37% for 4, 40% for 5+ children of combined adjusted gross income. Income cap applies. Source: MD Code Family § 12-204."]);
    }

    public function down()
    {
        //
    }
}
