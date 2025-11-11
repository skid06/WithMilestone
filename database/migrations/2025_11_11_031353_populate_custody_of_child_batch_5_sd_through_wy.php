<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateCustodyOfChildBatch5SdThroughWy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $states = [
            'SD' => "South Dakota courts determine custody based on the best interests of the child. South Dakota presumes that both parents should be involved in the child's upbringing. South Dakota courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if mature, and domestic violence. South Dakota also considers the stability each parent can provide and each parent's willingness to support the other's relationship with the child.",

            'TN' => "Tennessee courts determine custody based on the best interests of the child. Tennessee presumes that both parents should be involved in the child's care and upbringing. Tennessee courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and school, the child's preference if the child is old enough, and the presence of domestic violence. Tennessee also considers the stability each parent can provide.",

            'TX' => "Texas law uses the term 'conservatorship' rather than custody. Texas presumes that a parent is fit to be a managing conservator (primary caregiver) unless proven otherwise. Texas courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, and the presence of domestic violence or substance abuse. Texas also considers the stability each parent can provide and whether parental involvement is in the child's best interest.",

            'UT' => "Utah courts determine custody based on the best interests of the child. Utah presumes that both parents should be involved in the child's upbringing. Utah courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and school, the child's preference if mature, and domestic violence. Utah also considers the stability each parent can provide and the length of time each parent has been the primary caregiver.",

            'VT' => "Vermont courts determine custody based on the best interests of the child. Vermont presumes that both parents should be involved in the child's life and care. Vermont courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if the child is old enough, and domestic violence. Vermont also considers the stability each parent can provide.",

            'VA' => "Virginia courts determine custody based on the best interests of the child. Virginia presumes that both parents should be involved in the child's upbringing unless detrimental. Virginia courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the presence of domestic violence, substance abuse, the child's preference if mature, and which parent has been the primary caregiver. Virginia also considers the stability each parent can provide.",

            'WA' => "Washington courts determine custody based on the best interests of the child. Washington presumes that both parents should be significantly involved in the child's life and care. Washington courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, the presence of domestic violence, substance abuse, and the child's preference if mature. Washington also considers the stability each parent can provide.",

            'WV' => "West Virginia courts determine custody based on the best interests of the child. As of HB 4648, West Virginia presumes that equal parenting time is in the child's best interest unless shown otherwise. West Virginia courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and school, the presence of domestic violence, and the child's preference if mature. West Virginia also considers the stability each parent can provide.",

            'WI' => "Wisconsin courts determine custody based on the best interests of the child. Wisconsin presumes that both parents should be significantly involved in the child's life. Wisconsin courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and school, the child's preference if mature, and the presence of domestic violence. Wisconsin also considers the stability each parent can provide and each parent's willingness to support the other's relationship.",

            'WY' => "Wyoming courts determine custody based on the best interests of the child. Wyoming presumes that both parents should be involved in the child's upbringing. Wyoming courts consider the child's needs, the relationship with each parent, each parent's ability to provide care, the child's adjustment to home and community, the child's preference if mature, and domestic violence. Wyoming also considers the stability each parent can provide and each parent's willingness to facilitate the other's involvement in the child's life.",
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
