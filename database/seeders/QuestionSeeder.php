<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questions = [
            // Question 1: Divorce Status
            [
                'question_text' => 'Where are you in the divorce process?',
                'question_type' => 'radio',
                'section' => 'divorce_status',
                'order_index' => 1,
                'is_disqualifier' => false,
                'options' => [
                    ['text' => 'Ready to file', 'value' => 'ready_to_file', 'exit' => false],
                    ['text' => 'Exploring my options', 'value' => 'exploring', 'exit' => false],
                    ['text' => 'Already started the process', 'value' => 'started', 'exit' => false],
                ]
            ],
            // Question 2: Primary Concerns
            [
                'question_text' => 'What are your main concerns about this divorce?',
                'question_type' => 'checkbox',
                'section' => 'concerns',
                'order_index' => 2,
                'is_disqualifier' => false,
                'options' => [
                    ['text' => 'Asset division', 'value' => 'assets', 'exit' => false],
                    ['text' => 'Child custody', 'value' => 'custody', 'exit' => false],
                    ['text' => 'Spousal support', 'value' => 'support', 'exit' => false],
                    ['text' => 'Other', 'value' => 'other', 'exit' => false],
                ]
            ],
            // Question 3: Research Level
            [
                'question_text' => 'How much have you already researched your state\'s divorce requirements?',
                'question_type' => 'radio',
                'section' => 'research_level',
                'order_index' => 3,
                'is_disqualifier' => false,
                'options' => [
                    ['text' => 'Not at all', 'value' => 'none', 'exit' => false],
                    ['text' => 'A little', 'value' => 'little', 'exit' => false],
                    ['text' => 'Quite a bit', 'value' => 'quite_a_bit', 'exit' => false],
                ]
            ],
            // Question 4: Timeline
            [
                'question_text' => 'When do you plan to begin/start the divorce process?',
                'question_type' => 'radio',
                'section' => 'timeline',
                'order_index' => 4,
                'is_disqualifier' => false,
                'options' => [
                    ['text' => 'Within the next month', 'value' => 'month', 'exit' => false],
                    ['text' => 'Within 2-3 months', 'value' => '2_3_months', 'exit' => false],
                    ['text' => 'Within 6 months', 'value' => '6_months', 'exit' => false],
                    ['text' => 'More than 6 months away', 'value' => 'more_than_6', 'exit' => false],
                ]
            ],
            // Question 5: Location
            [
                'question_text' => 'Where do you and your spouse reside?',
                'question_type' => 'select',
                'section' => 'location',
                'order_index' => 5,
                'is_disqualifier' => false,
                'options' => [
                    ['text' => 'Minnesota', 'value' => 'MN', 'exit' => false],
                    ['text' => 'California', 'value' => 'CA', 'exit' => false],
                    ['text' => 'Texas', 'value' => 'TX', 'exit' => false],
                    ['text' => 'New York', 'value' => 'NY', 'exit' => false],
                    ['text' => 'Other US State', 'value' => 'other_us', 'exit' => false],
                    ['text' => 'Canada', 'value' => 'CA_country', 'exit' => false],
                    ['text' => 'Outside US/Canada', 'value' => 'outside', 'exit' => true],
                ]
            ],
            // Question 6: Family Status
            [
                'question_text' => 'Do you have minor children?',
                'question_type' => 'radio',
                'section' => 'family_status',
                'order_index' => 6,
                'is_disqualifier' => false,
                'options' => [
                    ['text' => 'No', 'value' => 'no_children', 'exit' => false],
                    ['text' => 'Yes, 1 child', 'value' => 'one_child', 'exit' => false],
                    ['text' => 'Yes, 2+ children', 'value' => 'multiple_children', 'exit' => false],
                ]
            ],
            // Question 7: Assets
            [
                'question_text' => 'Which of the following apply to your situation?',
                'question_type' => 'checkbox',
                'section' => 'assets',
                'order_index' => 7,
                'is_disqualifier' => false,
                'options' => [
                    ['text' => 'We own a home together', 'value' => 'home', 'exit' => false],
                    ['text' => 'We have retirement accounts', 'value' => 'retirement', 'exit' => false],
                    ['text' => 'We own a business', 'value' => 'business', 'exit' => false],
                    ['text' => 'None of the above', 'value' => 'none', 'exit' => false],
                ]
            ],
            // Question 8: Communication
            [
                'question_text' => 'Is your spouse open to discussing the divorce terms?',
                'question_type' => 'radio',
                'section' => 'communication',
                'order_index' => 8,
                'is_disqualifier' => false,
                'options' => [
                    ['text' => 'Yes, we agree on most things', 'value' => 'agree', 'exit' => false],
                    ['text' => 'Somewhat, but there are disagreements', 'value' => 'disagree_some', 'exit' => false],
                    ['text' => 'No, we strongly disagree', 'value' => 'strongly_disagree', 'exit' => false],
                ]
            ],
            // Question 9: Filing Status
            [
                'question_text' => 'Has either you or your spouse filed any divorce paperwork yet?',
                'question_type' => 'radio',
                'section' => 'filing_status',
                'order_index' => 9,
                'is_disqualifier' => true,
                'options' => [
                    ['text' => 'No', 'value' => 'no_filing', 'exit' => false],
                    ['text' => 'One of us has filed', 'value' => 'one_filed', 'exit' => true],
                    ['text' => 'We\'re not sure', 'value' => 'unsure', 'exit' => false],
                ]
            ],
            // Question 10: Residency Confirmation
            [
                'question_text' => 'Do both you and your spouse live in the United States or Canada?',
                'question_type' => 'radio',
                'section' => 'residency',
                'order_index' => 10,
                'is_disqualifier' => true,
                'options' => [
                    ['text' => 'Yes, both in US/Canada', 'value' => 'yes_us_ca', 'exit' => false],
                    ['text' => 'No, at least one outside', 'value' => 'no_outside', 'exit' => true],
                ]
            ],
        ];

        foreach ($questions as $q) {
            $options = $q['options'];
            unset($q['options']);

            $question = \App\Models\Question::create($q);

            foreach ($options as $idx => $option) {
                \App\Models\QuestionOption::create([
                    'question_id' => $question->id,
                    'option_text' => $option['text'],
                    'option_value' => $option['value'],
                    'order_index' => $idx + 1,
                    'is_exit_condition' => $option['exit'],
                ]);
            }
        }
    }
}
