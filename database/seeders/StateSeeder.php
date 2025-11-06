<?php

namespace Database\Seeders;

use App\Models\State;
use Illuminate\Database\Seeder;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $states = [
            ['state_code' => 'AL', 'state_name' => 'Alabama', 'residency_requirement_days' => 180, 'min_filing_fee' => 300, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'AK', 'state_name' => 'Alaska', 'residency_requirement_days' => 30, 'min_filing_fee' => 350, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'AZ', 'state_name' => 'Arizona', 'residency_requirement_days' => 90, 'min_filing_fee' => 350, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'AR', 'state_name' => 'Arkansas', 'residency_requirement_days' => 60, 'min_filing_fee' => 225, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'CA', 'state_name' => 'California', 'residency_requirement_days' => 180, 'min_filing_fee' => 435, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'CO', 'state_name' => 'Colorado', 'residency_requirement_days' => 90, 'min_filing_fee' => 300, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'CT', 'state_name' => 'Connecticut', 'residency_requirement_days' => 365, 'min_filing_fee' => 330, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'DE', 'state_name' => 'Delaware', 'residency_requirement_days' => 6, 'min_filing_fee' => 273, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'FL', 'state_name' => 'Florida', 'residency_requirement_days' => 180, 'min_filing_fee' => 408, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'GA', 'state_name' => 'Georgia', 'residency_requirement_days' => 180, 'min_filing_fee' => 315, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'HI', 'state_name' => 'Hawaii', 'residency_requirement_days' => 180, 'min_filing_fee' => 215, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'ID', 'state_name' => 'Idaho', 'residency_requirement_days' => 180, 'min_filing_fee' => 188, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'IL', 'state_name' => 'Illinois', 'residency_requirement_days' => 90, 'min_filing_fee' => 319, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'IN', 'state_name' => 'Indiana', 'residency_requirement_days' => 180, 'min_filing_fee' => 202, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'IA', 'state_name' => 'Iowa', 'residency_requirement_days' => 365, 'min_filing_fee' => 315, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'KS', 'state_name' => 'Kansas', 'residency_requirement_days' => 60, 'min_filing_fee' => 315, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'KY', 'state_name' => 'Kentucky', 'residency_requirement_days' => 180, 'min_filing_fee' => 149, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'LA', 'state_name' => 'Louisiana', 'residency_requirement_days' => 180, 'min_filing_fee' => 262, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'ME', 'state_name' => 'Maine', 'residency_requirement_days' => 180, 'min_filing_fee' => 120, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'MD', 'state_name' => 'Maryland', 'residency_requirement_days' => 180, 'min_filing_fee' => 266, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'MA', 'state_name' => 'Massachusetts', 'residency_requirement_days' => 180, 'min_filing_fee' => 299, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'MI', 'state_name' => 'Michigan', 'residency_requirement_days' => 180, 'min_filing_fee' => 225, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'MN', 'state_name' => 'Minnesota', 'residency_requirement_days' => 180, 'min_filing_fee' => 335, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'MS', 'state_name' => 'Mississippi', 'residency_requirement_days' => 180, 'min_filing_fee' => 282, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'MO', 'state_name' => 'Missouri', 'residency_requirement_days' => 30, 'min_filing_fee' => 275, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'MT', 'state_name' => 'Montana', 'residency_requirement_days' => 180, 'min_filing_fee' => 335, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'NE', 'state_name' => 'Nebraska', 'residency_requirement_days' => 365, 'min_filing_fee' => 306, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'NV', 'state_name' => 'Nevada', 'residency_requirement_days' => 180, 'min_filing_fee' => 286, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'NH', 'state_name' => 'New Hampshire', 'residency_requirement_days' => 180, 'min_filing_fee' => 407, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'NJ', 'state_name' => 'New Jersey', 'residency_requirement_days' => 365, 'min_filing_fee' => 300, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'NM', 'state_name' => 'New Mexico', 'residency_requirement_days' => 180, 'min_filing_fee' => 319, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'NY', 'state_name' => 'New York', 'residency_requirement_days' => 180, 'min_filing_fee' => 337, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'NC', 'state_name' => 'North Carolina', 'residency_requirement_days' => 180, 'min_filing_fee' => 245, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'ND', 'state_name' => 'North Dakota', 'residency_requirement_days' => 180, 'min_filing_fee' => 308, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'OH', 'state_name' => 'Ohio', 'residency_requirement_days' => 180, 'min_filing_fee' => 275, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'OK', 'state_name' => 'Oklahoma', 'residency_requirement_days' => 180, 'min_filing_fee' => 251, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'OR', 'state_name' => 'Oregon', 'residency_requirement_days' => 180, 'min_filing_fee' => 307, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'PA', 'state_name' => 'Pennsylvania', 'residency_requirement_days' => 180, 'min_filing_fee' => 301, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'RI', 'state_name' => 'Rhode Island', 'residency_requirement_days' => 180, 'min_filing_fee' => 200, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'SC', 'state_name' => 'South Carolina', 'residency_requirement_days' => 180, 'min_filing_fee' => 311, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'SD', 'state_name' => 'South Dakota', 'residency_requirement_days' => 60, 'min_filing_fee' => 303, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'TN', 'state_name' => 'Tennessee', 'residency_requirement_days' => 180, 'min_filing_fee' => 293, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'TX', 'state_name' => 'Texas', 'residency_requirement_days' => 180, 'min_filing_fee' => 315, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'UT', 'state_name' => 'Utah', 'residency_requirement_days' => 180, 'min_filing_fee' => 300, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'VT', 'state_name' => 'Vermont', 'residency_requirement_days' => 180, 'min_filing_fee' => 366, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'VA', 'state_name' => 'Virginia', 'residency_requirement_days' => 180, 'min_filing_fee' => 260, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'WA', 'state_name' => 'Washington', 'residency_requirement_days' => 90, 'min_filing_fee' => 324, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'WV', 'state_name' => 'West Virginia', 'residency_requirement_days' => 180, 'min_filing_fee' => 195, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'WI', 'state_name' => 'Wisconsin', 'residency_requirement_days' => 180, 'min_filing_fee' => 315, 'supports_uncontested' => true, 'supports_contested' => true],
            ['state_code' => 'WY', 'state_name' => 'Wyoming', 'residency_requirement_days' => 180, 'min_filing_fee' => 380, 'supports_uncontested' => true, 'supports_contested' => true],
        ];

        foreach ($states as $state) {
            State::create($state);
        }

        $this->command->info('States seeded successfully!');
    }
}
