<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateCustodyOfChildBatch3MaThroughNj extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'MA' => "Massachusetts law presumes that joint custody is in the child's best interest unless proven otherwise. Massachusetts courts consider the child's needs, the quality of each parent-child relationship, each parent's ability to provide care, the child's adjustment to home and community, and the preference of the child if old enough. Massachusetts also considers domestic violence, substance abuse, and each parent's willingness to support the other's relationship with the child. The court also considers the stability each parent can provide.",

            'MI' => "Michigan law presumes that the best interests of the child are served by the child having a strong relationship with both parents. Michigan courts consider the child's relationship with each parent, the ability of each parent to provide care, the child's adjustment to home and school, the willingness of each parent to cooperate, and the presence of domestic violence. Michigan also considers the child's preference if mature, the stability each parent can provide, and any other relevant factors.",

            'MN' => "Minnesota law presumes that joint custody is in the child's best interest unless proven otherwise. Minnesota courts consider the child's needs, each parent's ability to provide care, the child's relationship with each parent, the child's preference if mature, domestic violence, substance abuse, and the adjustment to home and community. Minnesota also considers the willingness of each parent to support the other's relationship with the child and the ability of the parents to cooperate.",

            'MS' => "Mississippi law presumes that it is in the best interest of the child for both parents to have equal parenting time and decision-making authority, absent a showing that such arrangement is not in the child's best interest. Mississippi courts consider the child's needs, the quality of each parent-child relationship, each parent's ability to provide care, the stability of each home, and the presence of domestic violence. The court also considers the child's preference if the child is mature.",

            'MO' => "Missouri courts determine custody based on the best interests of the child. Missouri presumes that both parents should be significantly involved in the child's life and upbringing. Missouri courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and school, and the preference of the child if old enough. Missouri also considers domestic violence, substance abuse, and each parent's willingness to support the other's relationship.",

            'MT' => "Montana courts consider the best interests of the child when determining custody. Montana presumes that both parents should be involved in the child's upbringing. Montana courts consider the child's needs, the quality of each parent-child relationship, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if mature, and the presence of domestic violence. Montana also considers the stability each parent can provide and the willingness to support the other parent's relationship.",

            'NE' => "Nebraska courts determine custody based on the best interests of the child. Nebraska presumes that both parents should have significant involvement in the child's life. Nebraska courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and school, the presence of domestic violence, substance abuse, and the child's preference if old enough. Nebraska also considers the stability each parent can provide.",

            'NV' => "Nevada law presumes that joint custody is in the child's best interest. Nevada courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if mature, and domestic violence. Nevada also considers the stability each parent can provide, the proximity of each parent's home, and each parent's willingness to support the other's relationship with the child.",

            'NH' => "New Hampshire law presumes that joint custody is in the child's best interest unless proven otherwise. New Hampshire courts consider the child's relationship with each parent, the ability of each parent to provide care, the child's adjustment to home and school, the willingness of each parent to cooperate, and the presence of domestic violence. New Hampshire also considers the child's preference if mature, the stability each parent can provide, and each parent's willingness to support the other's relationship.",

            'NJ' => "New Jersey law presumes that both parents are fit and that shared parenting is in the child's best interest. New Jersey courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if mature, and the presence of domestic violence. New Jersey also considers the stability each parent can provide and each parent's willingness to facilitate the other's relationship with the child.",
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
