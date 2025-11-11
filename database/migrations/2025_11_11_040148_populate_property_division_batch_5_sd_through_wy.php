<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulatePropertyDivisionBatch5SdThroughWy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'SD' => "South Dakota is an equitable distribution state. The court divides marital property fairly, not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and other relevant factors.",

            'TN' => "Tennessee is an equitable distribution state. The court divides marital property fairly between the spouses. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties.",

            'TX' => "Texas is a community property state. All property acquired during the marriage is considered community property and is divided equally (50/50). Separate property includes property owned before marriage, inheritances, gifts, and recovery for personal injury. Texas strictly applies community property principles.",

            'UT' => "Utah is an equitable distribution state. The court divides marital property fairly, considering all relevant factors. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and other factors.",

            'VT' => "Vermont is an equitable distribution state. The court divides marital property fairly, which may be equal or unequal. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties.",

            'VA' => "Virginia is an equitable distribution state. The court divides marital property fairly, not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and other relevant factors.",

            'WA' => "Washington is a community property state. All property acquired during the marriage is considered community property and is divided equally (50/50). Separate property includes property owned before marriage, inheritances, and gifts. Washington applies strict community property law to marital dissolution.",

            'WV' => "West Virginia is an equitable distribution state. The court divides marital property fairly between the parties. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties.",

            'WI' => "Wisconsin is a community property state. All property acquired during the marriage is considered community property and is divided equally (50/50). Separate property includes property owned before marriage, inheritances, and gifts. Wisconsin applies strict community property principles to divorce proceedings.",

            'WY' => "Wyoming is an equitable distribution state. The court divides marital property fairly, not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and other relevant factors.",
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
