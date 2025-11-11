<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
class UpdateCustodyVerifiedBatch2HiThroughMd extends Migration
{
    public function up()
    {
        DB::table('states')->where('state_code', 'HI')->update(['custody_of_child' => "Hawaii presumes joint custody is in child's best interest. Courts consider child's needs, parent-child relationships, stability, domestic violence, substance abuse, and child's preferences if mature. Both parents encouraged to stay involved. Source: HRS § 571-46."]);
        DB::table('states')->where('state_code', 'ID')->update(['custody_of_child' => "Idaho courts consider best interest of child under Idaho Code § 32-717. Joint custody is frequent. Courts evaluate child's needs, parent relationships, ability to provide care, stability, domestic violence, and child's preferences."]);
        DB::table('states')->where('state_code', 'IL')->update(['custody_of_child' => "Illinois presumes joint custody is in child's best interest per 750 ILCS 5/602. Courts consider parent-child relationships, ability to provide care, stability, cooperation between parents, domestic violence. Both parents encouraged to stay involved."]);
        DB::table('states')->where('state_code', 'IN')->update(['custody_of_child' => "Indiana presumes both parents should be involved per IC 31-17-2-1. Courts consider child's needs, parent relationships, ability to provide care, stability, domestic violence, child's preferences if old enough."]);
        DB::table('states')->where('state_code', 'IA')->update(['custody_of_child' => "Iowa presumes joint legal custody is in child's best interest per Iowa Code § 598.41. Courts consider parent-child relationships, ability to provide care, stability, domestic violence, child's adjustment, and child's preferences if mature."]);
        DB::table('states')->where('state_code', 'KS')->update(['custody_of_child' => "Kansas courts determine custody based on best interests per KSA 60-1604. Courts consider child's needs, parent relationships, stability, domestic violence, substance abuse, and child's preferences. Both parents encouraged to be involved."]);
        DB::table('states')->where('state_code', 'KY')->update(['custody_of_child' => "Kentucky courts consider best interests per KRS 403.270. Courts evaluate child's needs, parent relationships, ability to provide care, stability, domestic violence, substance abuse, and child's preferences if mature. Presumes both parents should be involved."]);
        DB::table('states')->where('state_code', 'LA')->update(['custody_of_child' => "Louisiana presumes both parents should be involved in child's care per La. C.C. Art. 131. Courts consider best interests, parent-child relationships, stability, domestic violence. Child over 10 can express preference."]);
        DB::table('states')->where('state_code', 'ME')->update(['custody_of_child' => "Maine presumes joint custody in best interest per 19-A M.R.S. § 1653. Courts consider parent-child relationships, ability to provide care, stability, domestic violence, cooperation, and child's preferences if appropriate."]);
        DB::table('states')->where('state_code', 'MD')->update(['custody_of_child' => "Maryland courts consider best interests per MD Code Family § 5-203. Courts evaluate parent-child relationships, ability to provide care, stability, adjustment to home/school, domestic violence, and child's preferences. Both parents' involvement encouraged."]);
    }
    public function down() { }
}
