<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulatePropertyDivisionBatch4NcThroughSc extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'NC' => "North Carolina is an equitable distribution state. The court divides marital property fairly, not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and other relevant factors.",

            'ND' => "North Dakota is an equitable distribution state. The court divides marital property fairly between the spouses. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and the age and health of the parties.",

            'NM' => "New Mexico is a community property state. All property acquired during the marriage is considered community property and is divided equally (50/50). Separate property includes property owned before marriage, inheritances, and gifts. New Mexico applies strict community property principles to divorce proceedings.",

            'NY' => "New York is an equitable distribution state. The court divides marital property fairly, considering the contribution of each spouse. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, the age and health of the parties, and any prior court orders.",

            'OH' => "Ohio is an equitable distribution state. The court divides marital property fairly, not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and other relevant factors.",

            'OK' => "Oklahoma is an equitable distribution state. The court divides marital property fairly between the parties. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the financial condition of each spouse, the length of the marriage, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties.",

            'OR' => "Oregon is an equitable distribution state. The court divides marital property fairly, which may be equal or unequal. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and other factors.",

            'PA' => "Pennsylvania is an equitable distribution state. The court divides marital property fairly between the parties. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and other relevant factors.",

            'RI' => "Rhode Island is an equitable distribution state. The court divides marital property fairly, considering all relevant factors. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties.",

            'SC' => "South Carolina is an equitable distribution state. The court divides marital property fairly, not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and other relevant factors.",
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
