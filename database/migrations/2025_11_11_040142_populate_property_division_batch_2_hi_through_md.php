<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulatePropertyDivisionBatch2HiThroughMd extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'HI' => "Hawaii is an equitable distribution state. The court divides marital property fairly, not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and the age and health of the parties.",

            'ID' => "Idaho is an equitable distribution state. The court divides marital property fairly between the spouses. Separate property includes property owned before marriage, inheritances, and gifts specifically designated as separate. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and any prior court orders.",

            'IL' => "Illinois is an equitable distribution state. The court divides marital property fairly, though not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to acquisition and preservation of property, the length of the marriage, the financial condition of each spouse, and the earning capacity of each spouse.",

            'IN' => "Indiana is an equitable distribution state. The court divides marital property in a manner that is just and reasonable. Separate property includes property owned before marriage and inheritances. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and the age and health of the parties.",

            'IA' => "Iowa is an equitable distribution state. The court divides marital property fairly, which may be equal or unequal depending on circumstances. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and any prior obligations.",

            'KS' => "Kansas is an equitable distribution state. The court divides marital property fairly between the spouses. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties.",

            'KY' => "Kentucky is an equitable distribution state. The court divides marital property fairly, though not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and any other factors that may be relevant.",

            'LA' => "Louisiana is a community property state. Property acquired during the marriage is considered community property and is divided equally (50/50). Separate property includes property owned before marriage, inheritances, and gifts. Louisiana has detailed community property laws that differ from equitable distribution states. Debts incurred during the marriage are also community property and are divided accordingly.",

            'ME' => "Maine is an equitable distribution state. The court divides marital property fairly between the spouses. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the contribution of each spouse to the acquisition of property, the financial condition of each spouse, the earning capacity of each spouse, and the age and health of the parties.",

            'MD' => "Maryland is an equitable distribution state. The court divides marital property fairly, considering the contribution of each spouse. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, the age and health of the parties, and any prior court orders.",
        ];

        foreach ($states as $code => $division) {
            DB::table('states')
                ->where('state_code', $code)
                ->update(['property_division' => $division]);
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
