# WithMilestone - Divorce Eligibility Assessment Platform

A modern web application for assessing divorce eligibility with a Laravel backend and React frontend with Tailwind CSS styling.

## Project Structure

```
WithMilestone/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/
│   │           └── AssessmentController.php    # Main API controller
│   └── Models/
│       ├── AssessmentSession.php
│       ├── Question.php
│       ├── QuestionOption.php
│       ├── UserResponse.php
│       ├── AssessmentResult.php
│       ├── EligibilityCriteria.php
│       ├── EligibilityRule.php
│       ├── State.php
│       └── Concern.php
├── database/
│   ├── migrations/                             # Database schema
│   └── seeders/
│       └── QuestionSeeder.php                  # Sample questions
├── resources/
│   ├── js/
│   │   ├── app.jsx                             # React entry point
│   │   └── components/
│   │       ├── App.jsx                         # Main app component
│   │       ├── EligibilityAssessment.jsx       # Assessment orchestrator
│   │       ├── QuestionCard.jsx                # Question display
│   │       └── ResultsCard.jsx                 # Results display
│   ├── css/
│   │   └── app.css                             # Tailwind CSS
│   └── views/
│       └── app.blade.php                       # Main Blade template
├── routes/
│   ├── api.php                                 # API routes
│   └── web.php                                 # Web routes
├── .env                                        # Environment configuration
├── webpack.mix.js                              # Laravel Mix config
└── tailwind.config.js                          # Tailwind config
```

## Database Schema

### Core Tables

1. **assessment_sessions** - Tracks user assessment progress
   - session_token, current_step, eligibility_status, is_completed

2. **questions** - Assessment questions
   - question_text, question_type (radio/checkbox/select/text), section, is_disqualifier

3. **question_options** - Answer options for questions
   - option_text, option_value, is_exit_condition

4. **user_responses** - Records user answers
   - assessment_session_id, question_id, selected_option_id, text_response

5. **assessment_results** - Final assessment outcomes
   - is_eligible, ineligibility_reasons (JSON), recommended_package, estimated_cost

6. **eligibility_criteria** - Eligibility rules configuration
7. **eligibility_rules** - Maps answers to eligibility
8. **states** - Jurisdiction information
9. **concerns** - Divorce concern categories

## Assessment Questions (10 Total)

The seeded questions cover:

1. **Divorce Process Status** - Where user is in the process
2. **Primary Concerns** - Key issues (assets, custody, support)
3. **Research Level** - How much user has researched
4. **Timeline** - When they plan to start
5. **Location** - State/country residence (US/Canada qualifier)
6. **Family Status** - Whether they have minor children
7. **Assets** - Home, retirement, business ownership
8. **Communication** - Spouse agreement level
9. **Filing Status** - Whether paperwork already filed (EXIT CONDITION)
10. **Residency Confirmation** - Both spouses in US/Canada (EXIT CONDITION)

### Exit Conditions

The assessment terminates with ineligibility if:
- One spouse has already filed divorce paperwork
- At least one spouse is outside US/Canada

## API Endpoints

All endpoints under `/api/assessment/`

### POST `/api/assessment/start`
Initiates a new assessment session.

**Response:**
```json
{
  "success": true,
  "session_id": 1,
  "session_token": "random_32_char_token",
  "current_step": 1
}
```

### POST `/api/assessment/question`
Retrieves the current question for the session.

**Request:**
```json
{
  "session_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "question": {
    "id": 1,
    "text": "Where are you in the divorce process?",
    "type": "radio",
    "section": "divorce_status",
    "options": [
      {
        "id": 1,
        "text": "Ready to file",
        "value": "ready_to_file",
        "is_exit_condition": false
      }
    ]
  },
  "current_step": 1
}
```

### POST `/api/assessment/answer`
Submits an answer to the current question.

**Request:**
```json
{
  "session_id": 1,
  "question_id": 1,
  "selected_option_id": 1,
  "text_response": null
}
```

**Response (if incomplete):**
```json
{
  "success": true,
  "current_step": 2
}
```

**Response (if complete):**
```json
{
  "success": true,
  "is_complete": true,
  "is_eligible": true,
  "reasons": []
}
```

### POST `/api/assessment/results`
Retrieves the final assessment results.

**Request:**
```json
{
  "session_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "is_eligible": true,
    "ineligibility_reasons": null,
    "recommended_package": "standard_divorce",
    "estimated_cost": 299.00,
    "completed_at": "2025-10-29T15:30:00"
  }
}
```

## Setup Instructions

### Prerequisites
- PHP 8.0+
- Node.js 14+
- npm or yarn
- Composer

### Initial Setup

1. **Navigate to project directory:**
```bash
cd /Users/melchorvalencia/Documents/WithMilestone
```

2. **Install Laravel dependencies (already done):**
```bash
composer install
```

3. **Install npm dependencies (already done):**
```bash
npm install
```

4. **Database already configured with SQLite**

5. **Build assets:**
```bash
npm run dev
```

For production:
```bash
npm run prod
```

### Running the Application

1. **Start Laravel development server:**
```bash
php artisan serve
```

The application will be available at `http://localhost:8000`

2. **In another terminal, watch for frontend changes (optional):**
```bash
npm run watch
```

## Component Architecture

### App.jsx (Main Component)
- Handles page routing between home and assessment
- Manages overall application state

### EligibilityAssessment.jsx (Assessment Orchestrator)
- Manages assessment session lifecycle
- Handles API communication
- Tracks progress and completion
- Displays progress bar

### QuestionCard.jsx (Question Display)
- Renders different question types (radio, checkbox, select, text)
- Handles user input validation
- Submits answers to API

### ResultsCard.jsx (Results Display)
- Shows eligibility results
- Displays ineligibility reasons if applicable
- Recommends next steps
- Links to attorney finder for ineligible users

## Styling

Uses Tailwind CSS with utilities for:
- Responsive design (mobile-first)
- Color scheme (blue primary, red for warnings)
- Typography and spacing
- Interactive states (hover, focus, disabled)

## Customization

### Adding More Questions

Edit `database/seeders/QuestionSeeder.php` and add new question entries, then run:
```bash
php artisan db:seed --class=QuestionSeeder
```

### Modifying Eligibility Rules

Edit the eligibility logic in `app/Http/Controllers/Api/AssessmentController.php`:
- `completeAssessment()` method contains the eligibility determination logic
- Add exit conditions as needed

### Changing the Theme

Update `tailwind.config.js` to modify colors, typography, and other design tokens.

### Adding User Authentication

1. Configure Sanctum authentication in `routes/api.php`
2. Update `startSession()` to require authentication: `auth()->user()`
3. Add user tracking to assessments

## Testing the API

Using curl:

```bash
# Start assessment
curl -X POST http://localhost:8000/api/assessment/start

# Get question (replace session_id)
curl -X POST http://localhost:8000/api/assessment/question \
  -H "Content-Type: application/json" \
  -d '{"session_id":1}'

# Submit answer
curl -X POST http://localhost:8000/api/assessment/answer \
  -H "Content-Type: application/json" \
  -d '{"session_id":1,"question_id":1,"selected_option_id":1}'

# Get results
curl -X POST http://localhost:8000/api/assessment/results \
  -H "Content-Type: application/json" \
  -d '{"session_id":1}'
```

## Environment Variables

Key configurations in `.env`:
- `APP_URL` - Application URL
- `DB_CONNECTION=sqlite` - Database (SQLite for development)
- `DB_DATABASE` - Path to SQLite database file

## Future Enhancements

1. **User Accounts** - Save assessment history
2. **Admin Dashboard** - Manage questions and settings
3. **Analytics** - Track eligibility rates by demographics
4. **Multi-language Support** - Support other languages
5. **Payment Integration** - Process payments for eligible users
6. **Document Generation** - Create divorce documents for eligible users
7. **Email Notifications** - Notify users of results
8. **Mobile App** - React Native version

## Troubleshooting

### Assets not loading
```bash
npm run dev
```

### Database errors
```bash
php artisan migrate:fresh --seed
```

### Port 8000 already in use
```bash
php artisan serve --port=8001
```

## License

This project is created for educational and demonstration purposes.
