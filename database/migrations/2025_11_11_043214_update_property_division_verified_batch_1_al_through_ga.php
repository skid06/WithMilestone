<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdatePropertyDivisionVerifiedBatch1AlThroughGa extends Migration
{
    public function up()
    {
        $states = [
            'AL' => "Alabama is an equitable distribution state. Marital property is divided fairly but not necessarily equally. Separate property includes assets owned before marriage, inherited property, and gifts to one spouse. The court considers the length of the marriage, financial condition of each spouse, contributions to acquisition and preservation of property, and earning capacity. Alabama courts aim for a just division under AL Code § 30-2-51. Source: AL Code § 30-2-51.",

            'AK' => "Alaska is an equitable distribution state. The court divides marital property fairly between spouses. Separate property includes property owned before marriage, inheritances, and gifts. Alaska courts consider length of marriage, financial condition, contributions to property, earning capacity, and age/health under AS 25.24.160. Retirement accounts earned during marriage are typically marital property. Source: AS 25.24.160.",

            'AZ' => "Arizona is a community property state. Property acquired during marriage is community property and divided 50/50 unless spouses agree otherwise (AZ Rev Stat § 25-211). Separate property includes property owned before marriage, inheritances, gifts, and property designated as separate. Debts incurred during marriage are also community property. The equal division presumption is strong under Arizona law. Source: AZ Rev Stat § 25-211.",

            'AR' => "Arkansas is an equitable distribution state. Marital property is divided fairly considering the length of the marriage, financial condition of each spouse, contributions to acquisition of property, earning capacity, and other relevant factors (AR Code § 9-12-315). Separate property includes assets owned before marriage and inherited property. Arkansas does not mandate equal division but aims for fairness. Source: AR Code § 9-12-315.",

            'CA' => "California is a community property state. Property acquired during marriage is community property and divided equally 50/50 (Family Code § 2550). Separate property includes property owned before marriage, inheritances, and gifts. Community property includes wages, retirement plans, and assets acquired with community funds. California applies strict community property division principles. Source: Family Code § 2550.",

            'CO' => "Colorado is an equitable distribution state. Marital property is divided fairly but not necessarily equally (CRS 14-10-113). Separate property includes property owned before marriage, inheritances, and gifts. Colorado courts consider length of marriage, financial condition, contributions to property acquisition, earning capacity, and other relevant factors. Division aims for substantial fairness under the statute. Source: CRS 14-10-113.",

            'CT' => "Connecticut is an equitable distribution state. The court divides marital property fairly considering all relevant factors (CT Gen Stat § 46b-81). Separate property includes property owned before marriage and inheritances. Connecticut courts consider length of marriage, financial condition of each spouse, contributions to acquisition of property, and earning capacity. Equitable means fair but not necessarily equal. Source: CT Gen Stat § 46b-81.",

            'DE' => "Delaware is an equitable distribution state. Marital property is divided fairly between spouses (DCA Title 13 § 1513). Separate property includes property owned before marriage, inheritances, and gifts. Delaware courts consider length of marriage, financial condition of each spouse, contributions to property, earning capacity, and age/health. Property acquired during marriage is presumed marital property. Source: DCA Title 13 § 1513.",

            'FL' => "Florida is an equitable distribution state. The court divides marital property fairly, though not necessarily equally (FL Stat § 61.075). Separate property includes property owned before marriage, inheritances, and gifts. Florida courts consider the contribution of each spouse to acquisition and preservation of property, the length of marriage, the financial condition of each spouse, and earning capacity. Source: FL Stat § 61.075.",

            'GA' => "Georgia is an equitable distribution state. Marital property is divided fairly considering the financial condition of each spouse, length of marriage, contribution to acquisition of property, earning capacity, and other relevant factors (GA Code § 34-6-7). Separate property includes property owned before marriage and inherited property. Georgia does not mandate equal division but aims for equitable/fair division. Source: GA Code § 34-6-7.",
        ];

        foreach ($states as $code => $division) {
            DB::table('states')
                ->where('state_code', $code)
                ->update(['property_division' => $division]);
        }
    }

    public function down()
    {
        // Not reverting to maintain data integrity
    }
}
