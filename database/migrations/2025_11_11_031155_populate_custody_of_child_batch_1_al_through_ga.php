<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateCustodyOfChildBatch1AlThroughGa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'AL' => "Alabama courts consider the best interests of the child when determining custody arrangements. Alabama recognizes both sole and joint custody. The state presumes that joint custody is often in the child's best interest, allowing both parents meaningful time and involvement. Factors considered include the child's relationship with each parent, stability, health, education needs, and each parent's ability to provide care. Alabama courts consider which parent has been the primary caregiver and the child's preferences if the child is old enough.",

            'AK' => "Alaska law presumes that joint custody is generally in the best interests of the child. Both parents are expected to maintain significant involvement in the child's upbringing unless the court finds otherwise. Alaska courts consider the child's needs, the relationship with each parent, the parents' ability to provide care, and geographic proximity. Alaska also considers domestic violence, substance abuse, and each parent's willingness to support the other parent's relationship with the child. The state prioritizes stability and continuity in the child's life.",

            'AZ' => "Arizona law presumes that joint custody is generally in the best interests of the child. The court encourages both parents to share legal and physical custody. Arizona courts consider each parent's past involvement in the child's life, the quality of each parent-child relationship, the child's preference if the child is mature enough, and the presence of domestic violence. Arizona also considers the proximity of each parent's home and the stability each can provide. Joint decision-making authority is encouraged unless contraindicated.",

            'AR' => "Arkansas courts determine custody based on the best interests of the child, considering factors such as the parties' past conduct toward the child, the child's relationship with each parent, the child's preference if old enough, and the stability of each home. Arkansas presumes that both parents should be involved in the child's care and upbringing. Joint custody arrangements are encouraged when appropriate. The court considers domestic violence, substance abuse, and each parent's ability to meet the child's physical and emotional needs.",

            'CA' => "California law presumes that joint custody is in the child's best interest, and courts generally award joint legal and/or physical custody when feasible. California courts consider the child's needs, the parents' capacity to parent, the presence of domestic violence, and substance abuse issues. The court also considers each parent's involvement in the child's life before and after separation, and the ability of each parent to support the child's relationship with the other parent. California prioritizes frequent and continuing contact with both parents.",

            'CO' => "Colorado courts presume that joint custody is in the child's best interest, with both parents encouraged to share parental responsibilities. Colorado considers the child's needs, each parent's ability to provide care, the quality of each parent-child relationship, and the child's preference if the child is mature. Colorado also considers domestic violence, substance abuse, adjustment to home and community, and whether joint custody is feasible. The state emphasizes meaningful parental involvement.",

            'CT' => "Connecticut courts consider the best interests of the child when determining custody, including factors such as the child's relationship with each parent, the ability to provide care, the child's adjustment to home and school, domestic violence, substance abuse, and the preference of the child if mature enough. Connecticut encourages parents to agree on custody arrangements. The court considers which parent has been the primary caregiver and each parent's willingness to support the other's relationship with the child.",

            'DE' => "Delaware law presumes that joint custody may be in the child's best interest. Delaware courts consider the quality of each parent's relationship with the child, the child's adjustment to home and environment, each parent's ability to provide care, the presence of domestic violence, substance abuse, and the child's preference if old enough. Delaware courts also consider which parent has been the primary caregiver and the geographic proximity of each parent. The state encourages both parents to remain meaningfully involved.",

            'FL' => "Florida law establishes a strong presumption for 50/50 time-sharing (equal parental responsibility) as of 2023, unless it is determined not to be in the child's best interest. Florida courts consider factors such as the parent-child relationship, each parent's ability to meet the child's needs, the preference of the child if mature, domestic violence, substance abuse, and the willingness of each parent to facilitate the other's relationship with the child. Geographic proximity and stability are also considered.",

            'GA' => "Georgia courts determine custody based on the best interests of the child, considering factors such as the child's relationship with each parent, the stability of each home, the child's preference if old enough, domestic violence, substance abuse, and each parent's willingness to support the other parent's relationship with the child. Georgia allows for joint custody but also recognizes that sole custody may be appropriate in some cases. The court considers the primary caregiver's role and each parent's capacity to care for the child.",
        ];

        foreach ($states as $code => $custody) {
            DB::table('states')
                ->where('state_code', $code)
                ->update(['custody_of_child' => $custody]);
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
