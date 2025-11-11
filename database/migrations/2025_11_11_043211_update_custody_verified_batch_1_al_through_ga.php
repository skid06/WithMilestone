<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateCustodyVerifiedBatch1AlThroughGa extends Migration
{
    public function up()
    {
        $states = [
            'AL' => "Alabama courts determine custody based on the best interests of the child under AL Code § 30-3-163. The courts may award sole custody to one parent or joint custody to both parents. Alabama factors include the relationship between child and each parent, the mental and physical health of the parties, the home environment, the stability offered, presence of domestic violence, and the child's preferences if mature enough. Alabama recognizes that both parents should remain involved in the child's life. Source: AL Code § 30-3-163.",

            'AK' => "Alaska courts presume joint custody is in the child's best interest under AS 25.24.150. Alaska considers the child's needs, each parent's relationship with the child, the ability to provide care, stability, domestic violence, substance abuse, and the child's preferences if mature. Alaska encourages parental involvement and awards joint custody frequently. Courts adjust custody based on specific circumstances of each case. Source: AS 25.24.150.",

            'AZ' => "Arizona law presumes joint custody is in the child's best interest under AZ Rev Stat § 25-403. Arizona courts consider the child's needs, parent-child relationships, ability to provide care, domestic violence, substance abuse, and the child's preferences. The court determines both legal custody (decision-making) and physical custody (parenting time). Arizona presumptively awards joint decision-making authority unless inappropriate. Source: AZ Rev Stat § 25-403.",

            'AR' => "Arkansas courts determine custody based on the best interests of the child under AR Code § 9-13-101. Arkansas recognizes both sole and joint custody. Courts consider the relationship between child and each parent, home stability, economic circumstances, domestic violence, substance abuse, and the child's preferences if old enough. Arkansas presumes both parents should be involved. The court may order joint custody or sole custody depending on circumstances. Source: AR Code § 9-13-101.",

            'CA' => "California law presumes joint custody is in the child's best interest under Family Code § 3080. California courts consider the child's needs, each parent's ability to provide care, the parent-child relationship, the child's stability, exposure to domestic violence, and the child's preferences if mature. California courts are encouraged to award joint legal and physical custody unless one parent is unfit. The statute strongly favors ongoing involvement of both parents. Source: Family Code § 3080.",

            'CO' => "Colorado courts determine custody based on the best interests of the child under CRS 14-10-124. Colorado presumes joint custody is appropriate and encourages it unless contraindicated. Courts consider the child's needs, quality of parent-child relationships, ability to provide care, stability of each home, domestic violence, substance abuse, and the child's preferences. Colorado emphasizes frequent and continuing contact with both parents. Source: CRS 14-10-124.",

            'CT' => "Connecticut courts determine custody based on the best interests of the child under CT Gen Stat § 46b-56. Connecticut considers factors including the parents' ability to provide care, the child's emotional ties, the child's adjustment to home and school, the length of time in current living situation, and the child's preferences if mature. The court considers domestic violence and may award sole or joint custody. Source: CT Gen Stat § 46b-56.",

            'DE' => "Delaware courts determine custody based on the best interests of the child under DCA Title 13 § 722. Delaware recognizes both sole and joint custody arrangements. Courts consider each parent's involvement in the child's life, the child's relationship with each parent, the ability to meet the child's needs, stability, domestic violence, substance abuse, and the child's preferences. Delaware presumes both parents should be involved unless inappropriate. Source: DCA Title 13 § 722.",

            'FL' => "Florida law presumes a 50/50 parental responsibility and time-sharing arrangement is in the child's best interest under FL Stat § 61.13(2)(a) (as amended in 2023). Florida courts consider factors including the child's needs, each parent's ability to meet them, the parent-child relationship, the child's ties to the community, and domestic violence history. Joint parental responsibility is presumed unless shown not to be in the child's best interests. Source: FL Stat § 61.13.",

            'GA' => "Georgia courts determine custody based on the best interests of the child under GA Code § 19-9-3. Georgia considers factors such as the child's relationship with each parent, the stability of each home, the ability to meet the child's needs, the adjustment to home and school, domestic violence, substance abuse, and the child's preferences if mature. Georgia recognizes both sole and joint custody. Courts encourage parental involvement unless contraindicated. Source: GA Code § 19-9-3.",
        ];

        foreach ($states as $code => $custody) {
            DB::table('states')
                ->where('state_code', $code)
                ->update(['custody_of_child' => $custody]);
        }
    }

    public function down()
    {
        // Not reverting to maintain data integrity
    }
}
