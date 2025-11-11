<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateSpousalSupportVerifiedBatch3MaThroughNj extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('states')->where('state_code', 'MA')->update(['spousal_support_rules' => "Massachusetts awards alimony under MGL c.208 § 49. Judges have discretion; no formula. Factors: length of marriage, conduct of parties, age/health, earning capacity, financial resources, standard of living, ability to become self-supporting. Alimony may be general term or rehabilitative. Terminates upon remarriage or cohabitation unless otherwise agreed. Source: Massachusetts General Laws Chapter 208."]);
        DB::table('states')->where('state_code', 'MI')->update(['spousal_support_rules' => "Michigan awards spousal support (alimony) under MCL 552.23. Court may award based on need and ability to pay. No formula; factors: length of marriage, earning capacity, ability to be self-supporting, distribution of property, standard of living, and other statutory factors. Support may be temporary, rehabilitative, or permanent. Terminates upon remarriage or substantial change. Source: Michigan Compiled Laws § 552.23."]);
        DB::table('states')->where('state_code', 'MN')->update(['spousal_support_rules' => "Minnesota awards maintenance under Minnesota Statutes § 518.552. Court may award indefinite or term maintenance. No formula; factors include earning capacity, earning history, education, contributions to education/career, ability to be self-supporting, length of marriage, standard of living. Guideline recommendations available. Terminates upon remarriage or substantial change in circumstances. Source: Minnesota Statutes § 518.552."]);
        DB::table('states')->where('state_code', 'MS')->update(['spousal_support_rules' => "Mississippi awards alimony under Mississippi Code § 93-5-23. Court may award lump sum, periodic, or rehabilitative alimony. No formula; judges have broad discretion. Factors: earning capacity, ability to be self-supporting, contributions to marriage, standard of living, length of marriage, and other relevant factors. Terminates upon remarriage or cohabitation. Source: Mississippi Code § 93-5-23."]);
        DB::table('states')->where('state_code', 'MO')->update(['spousal_support_rules' => "Missouri awards spousal maintenance under Missouri Revised Statutes § 452.335. Court may award based on need and ability to pay. No formula. Factors: earning capacity, financial resources, standard of living during marriage, length of marriage, ability to become self-supporting, and other factors. Maintenance may be indefinite or for specified term. Modifiable upon substantial change in circumstances. Source: Missouri Revised Statutes § 452.335."]);
        DB::table('states')->where('state_code', 'MT')->update(['spousal_support_rules' => "Montana awards maintenance under Montana Code Annotated § 40-4-203. Court may award based on need and ability to pay. No formula; discretion. Factors: earning capacity, financial resources, length of marriage, standard of living, and other factors. Maintenance may be indefinite or term. Terminates upon remarriage or cohabitation. Modifiable for substantial change in circumstances. Source: Montana Code Annotated § 40-4-203."]);
        DB::table('states')->where('state_code', 'NE')->update(['spousal_support_rules' => "Nebraska awards spousal maintenance under Nebraska Revised Statutes § 42-365. Court may award based on need and ability to pay. No formula; judges have discretion. Factors: earning capacity, education/training, age/health, standard of living during marriage, and contributions to property/career. Maintenance may be term or indefinite. Terminates upon remarriage or death. Source: Nebraska Revised Statutes § 42-365."]);
        DB::table('states')->where('state_code', 'NV')->update(['spousal_support_rules' => "Nevada awards spousal support under Nevada Revised Statutes § 125.150. Court may award temporary, rehabilitative, or permanent support. Guidelines available but not automatic. Factors: earning capacity, ability to be self-supporting, length of marriage, standard of living, and other statutory factors. Terminates upon remarriage, cohabitation, or death. Modifiable for substantial change. Source: Nevada Revised Statutes § 125.150."]);
        DB::table('states')->where('state_code', 'NH')->update(['spousal_support_rules' => "New Hampshire awards alimony under New Hampshire RSA 458:19. Court may award based on need and ability to pay. No formula; judges have broad discretion. Factors: length of marriage, age/health, earning capacity, contributions, standard of living, and ability to be self-supporting. Alimony may be temporary or permanent. Terminates upon remarriage unless otherwise ordered. Source: New Hampshire RSA 458:19."]);
        DB::table('states')->where('state_code', 'NJ')->update(['spousal_support_rules' => "New Jersey awards alimony under New Jersey Statutes § 2A:34-23. Calculation: gross income up to $187,200 cap; percentages 28-30% for marriages 0-20 years. Factors: standard of living, earning capacity, age/health, contributions, length of marriage, and statutory considerations. Alimony may be indefinite or limited term. Terminates upon remarriage or cohabitation. Source: New Jersey Revised Statutes § 2A:34-23."]);
    }

    public function down() { }
}
