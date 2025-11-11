<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulatePropertyDivisionBatch3MaThroughNj extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'MA' => "Massachusetts is an equitable distribution state. The court divides marital property fairly, which may or may not be equal. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties.",

            'MI' => "Michigan is an equitable distribution state. The court divides marital property fairly, not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and the age and health of the parties.",

            'MN' => "Minnesota is an equitable distribution state. The court divides marital property fairly, though not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers numerous factors including the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and any prior orders.",

            'MS' => "Mississippi is an equitable distribution state. The court divides marital property fairly between the parties. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and other relevant factors.",

            'MO' => "Missouri is an equitable distribution state. The court divides marital property fairly, considering the contribution of each spouse. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and the age and health of the parties.",

            'MT' => "Montana is an equitable distribution state. The court divides marital property fairly, which may be equal or unequal based on circumstances. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, and the earning capacity of each spouse.",

            'NE' => "Nebraska is an equitable distribution state. The court divides marital property fairly, not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and other relevant factors.",

            'NV' => "Nevada is a community property state. All property acquired during the marriage is considered community property and is divided equally (50/50). Separate property includes property owned before marriage, inheritances, and gifts designated as separate. Nevada strictly applies community property laws to marital dissolution.",

            'NH' => "New Hampshire is an equitable distribution state. The court divides marital property fairly, which may be equal or unequal. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties.",

            'NJ' => "New Jersey is an equitable distribution state. The court divides marital property fairly, considering numerous factors. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties.",
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
