<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateCustodyOfChildBatch4NcThroughSc extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'NC' => "North Carolina courts determine custody based on the best interests of the child. North Carolina presumes that both parents should be involved in the child's upbringing unless it is detrimental to the child. North Carolina courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if mature, and domestic violence. The court also considers the stability each parent can provide.",

            'ND' => "North Dakota courts consider the best interests of the child when determining custody. North Dakota presumes that both parents should be significantly involved in the child's life. North Dakota courts consider the child's needs, the quality of each parent-child relationship, each parent's ability to provide care, the child's preference if old enough, the stability of each home, and the presence of domestic violence. North Dakota also considers each parent's willingness to support the other's relationship with the child.",

            'NM' => "New Mexico courts determine custody based on the best interests of the child. New Mexico presumes that both parents should be involved in the child's upbringing. New Mexico courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if mature, and domestic violence. New Mexico also considers the stability each parent can provide and each parent's willingness to facilitate the other's involvement.",

            'NY' => "New York courts determine custody based on the best interests of the child. New York presumes that both parents should be significantly involved in the child's life and care. New York courts consider the child's needs, the quality of each parent-child relationship, each parent's ability to provide care, the child's adjustment to home and school, the child's preference if the child is old enough, and the presence of domestic violence. New York also considers the stability each parent can provide.",

            'OH' => "Ohio courts determine custody based on the best interests of the child. Ohio presumes that both parents should be involved in the child's upbringing unless detrimental. Ohio courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if mature, domestic violence, and substance abuse. Ohio also considers the stability each parent can provide and the willingness to support the other's relationship.",

            'OK' => "Oklahoma courts determine custody based on the best interests of the child. Oklahoma presumes that both parents should be significantly involved in the child's life. Oklahoma courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and school, the child's preference if old enough, and the presence of domestic violence. Oklahoma also considers the stability each parent can provide and each parent's willingness to support the other's relationship.",

            'OR' => "Oregon law presumes that joint custody is in the child's best interest. Oregon courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if mature, and domestic violence. Oregon also considers the stability each parent can provide, the proximity of each parent's home, and each parent's willingness to support the other's relationship with the child.",

            'PA' => "Pennsylvania courts determine custody based on the best interests of the child. Pennsylvania presumes that both parents should be involved in the child's care and upbringing. Pennsylvania courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and school, the presence of domestic violence, substance abuse, and the child's preference if mature. Pennsylvania also considers the stability each parent can provide.",

            'RI' => "Rhode Island courts determine custody based on the best interests of the child. Rhode Island presumes that both parents should be involved in the child's upbringing. Rhode Island courts consider the child's needs, the quality of each parent-child relationship, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if old enough, and the presence of domestic violence. Rhode Island also considers the stability each parent can provide.",

            'SC' => "South Carolina courts determine custody based on the best interests of the child. South Carolina presumes that both parents should be involved in the child's life. South Carolina courts consider the child's relationship with each parent, the stability of each home, each parent's ability to provide care, the child's adjustment to home and school, the presence of domestic violence, substance abuse, and the child's preference if mature. South Carolina also considers the willingness of each parent to support the other's relationship.",
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
