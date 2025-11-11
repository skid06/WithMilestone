<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulatePropertyDivisionBatch1AlThroughGa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'AL' => "Alabama is an equitable distribution state. The court divides marital property in a manner that is fair and equitable, though not necessarily 50/50. Separate property (property owned before marriage or inherited) is not divided. The court considers the length of the marriage, the financial condition of each spouse, the earning capacity of each spouse, and the contributions of each spouse to the marriage. Marital property includes real estate, vehicles, retirement accounts, bank accounts, and personal property acquired during the marriage.",

            'AK' => "Alaska is an equitable distribution state. The court divides marital property fairly between the spouses based on numerous factors. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to acquisition of property, the length of the marriage, the income and earning capacity of the spouses, and the age and health of the parties. Retirement accounts and pensions accumulated during the marriage are generally considered marital property.",

            'AZ' => "Arizona is a community property state. All property acquired during the marriage is considered community property and is divided equally (50/50) unless the parties agree otherwise. Separate property includes property owned before marriage, inheritances, gifts, and property designated as separate by agreement. The court has broad discretion to divide community property equitably if equal division is impractical. Debts incurred during the marriage are also considered community property.",

            'AR' => "Arkansas is an equitable distribution state. The court divides marital property fairly between the parties, considering factors such as the length of the marriage, the financial condition of each spouse, the contribution of each spouse to acquisition of property, and the earning capacity of each spouse. Separate property (owned before marriage or inherited) is not divided. Property acquired during the marriage is generally considered marital property unless it can be traced to a separate property source.",

            'CA' => "California is a community property state. All property acquired during the marriage (with limited exceptions) is considered community property and is divided equally (50/50). Separate property includes property owned before marriage, inheritances, and gifts. Each spouse retains their separate property. California strictly adheres to the 50/50 division rule for community property, though the court may award a different percentage in unusual circumstances.",

            'CO' => "Colorado is an equitable distribution state. The court divides marital property in a manner that is fair and equitable. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the contribution of each spouse to the acquisition of property, the length of the marriage, the earning capacity of each spouse, the age and health of the parties, and any prior obligations from other relationships.",

            'CT' => "Connecticut is an equitable distribution state. The court divides marital property fairly based on numerous factors. Separate property includes property owned before marriage and inheritances. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to acquisition and preservation of property, and the earning capacity of each spouse. Property accumulated during the marriage is generally considered marital property.",

            'DE' => "Delaware is an equitable distribution state. The court divides marital property fairly between the spouses. Separate property includes property owned before marriage, inheritances, and gifts. The court considers the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties.",

            'FL' => "Florida is an equitable distribution state. The court divides marital property fairly, though not necessarily equally. Separate property includes property owned before marriage, inheritances, and gifts. The court considers numerous factors including the length of the marriage, the financial condition of each spouse, the contribution of each spouse to the acquisition of property, and the earning capacity of each spouse. Alimony may also be awarded in appropriate cases.",

            'GA' => "Georgia is an equitable distribution state. The court divides marital property fairly between the parties. Separate property (owned before marriage or inherited) is not divided. The court considers the financial condition of each spouse, the length of the marriage, the contribution of each spouse to the acquisition of property, the earning capacity of each spouse, and the age and health of the parties. Property acquired during the marriage is generally considered marital property.",
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
