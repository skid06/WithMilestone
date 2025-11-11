<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateCustodyOfChildBatch2HiThroughMd extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'HI' => "Hawaii courts determine custody based on the best interests of the child. Hawaii presumes that it is in the child's best interest for both parents to have significant roles in the child's upbringing. Hawaii considers the child's needs, each parent's relationship with the child, the ability to provide care, stability, the child's preference if mature, and domestic violence. Hawaii also considers the geographic proximity of each parent and each parent's willingness to support the other's relationship with the child.",

            'ID' => "Idaho courts consider the best interests of the child when determining custody. Idaho recognizes both sole and joint custody arrangements. Idaho courts consider the child's needs, the quality of each parent-child relationship, each parent's ability to provide care, the child's adjustment to home and community, and the child's preference if old enough. Idaho also considers domestic violence, substance abuse, and each parent's willingness to support the other parent's involvement in the child's life.",

            'IL' => "Illinois law presumes that joint custody is in the child's best interest. Illinois courts consider the needs of the child, the ability of each parent to provide care, the parents' willingness to cooperate, the preference of the child if mature, the proximity of each parent's home, and the stability each can provide. Illinois also considers the presence of domestic violence, substance abuse, and each parent's willingness to support the other's relationship with the child. Illinois emphasizes meaningful parental involvement.",

            'IN' => "Indiana courts determine custody based on the best interests of the child. Indiana presumes that both parents should be involved in the child's life and upbringing. Indiana considers factors such as the child's needs, the quality of each parent-child relationship, each parent's ability to provide care, the child's preference if old enough, and the stability of each home. Indiana also considers the presence of domestic violence, substance abuse, and each parent's willingness to support the other parent's relationship with the child.",

            'IA' => "Iowa law presumes that joint legal custody is in the child's best interest unless proven otherwise. Iowa courts consider the child's needs, each parent's ability to provide care, the child's relationship with each parent, the presence of domestic violence, substance abuse, the child's adjustment to home and community, and the preference of the child if mature. Iowa courts also consider which parent has been the primary caregiver and whether the parents can cooperate.",

            'KS' => "Kansas courts determine custody based on the best interests of the child. Kansas recognizes both sole and joint custody. Kansas courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and school, the presence of domestic violence, substance abuse, and the child's preference if old enough. Kansas also considers the stability each parent can provide and each parent's willingness to support the other's relationship with the child.",

            'KY' => "Kentucky courts consider the best interests of the child when determining custody. Kentucky recognizes that both parents should be involved in the child's life unless it is detrimental to the child. Kentucky courts consider the child's needs, the quality of each parent-child relationship, each parent's ability to provide care, the child's adjustment to home and community, and the presence of domestic violence or substance abuse. Kentucky also considers the child's preference if the child is mature.",

            'LA' => "Louisiana courts determine custody based on the best interests of the child. Louisiana presumes that both parents should be involved in the child's upbringing. Louisiana considers the child's needs, the quality of each parent-child relationship, each parent's ability to provide care, the stability of each home, the presence of domestic violence, substance abuse, and the child's preference if old enough. Louisiana courts also consider the moral fitness of each parent and each parent's willingness to support the other's relationship.",

            'ME' => "Maine law presumes that joint custody is in the child's best interest unless proven otherwise. Maine courts consider the child's relationship with each parent, the stability of each home, the child's preference if mature, the ability of each parent to meet the child's needs, the presence of domestic violence, substance abuse, and the adjustment to home and community. Maine also considers which parent has been the primary caregiver and each parent's willingness to support the other parent's relationship with the child.",

            'MD' => "Maryland courts determine custody based on the best interests of the child. Maryland recognizes both sole and joint custody arrangements. Maryland courts consider the child's relationship with each parent, the ability of each parent to provide care, the child's adjustment to home and school, the preference of the child if the child is old enough, and the stability each parent can provide. Maryland also considers domestic violence, substance abuse, and each parent's willingness to support the other's relationship with the child.",
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
