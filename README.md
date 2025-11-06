# WithMilestone - Divorce Eligibility Assessment Platform

A modern, fully-functional web application for assessing divorce eligibility using Laravel, ReactJS, and Tailwind CSS.

## 🚀 Quick Start

```bash
cd /Users/melchorvalencia/Documents/WithMilestone

# Start Laravel server (Terminal 1)
php artisan serve

# Start frontend watcher (Terminal 2)
npm run watch
```

Visit: **http://localhost:8000**

## 📋 What's Included

### Backend (Laravel)
- ✅ 9 database tables with relationships
- ✅ RESTful API with 4 core endpoints
- ✅ Multi-step assessment logic
- ✅ Exit condition handling (filing status, residency)
- ✅ Eligibility determination engine
- ✅ SQLite database (pre-configured)

### Frontend (React)
- ✅ 4 reusable React components
- ✅ Beautiful Tailwind CSS styling
- ✅ Progress tracking (visual bar)
- ✅ Multiple question types (radio, checkbox, select, text)
- ✅ Real-time validation
- ✅ Mobile-responsive design

### Questions (10 Total)
1. Divorce process status
2. Primary concerns
3. Research level
4. Timeline
5. Location/State
6. Family status
7. Asset complexity
8. Spousal communication
9. Filing status (EXIT CONDITION)
10. Residency confirmation (EXIT CONDITION)

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Installation & running instructions
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Complete DB documentation
- **[API_GUIDE.md](./API_GUIDE.md)** - API endpoint reference
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project overview

## 🏗️ Architecture

```
Browser (React App)
    ↓
Frontend Components
    ├─ App.jsx (Router)
    ├─ EligibilityAssessment.jsx (Logic)
    ├─ QuestionCard.jsx (Display)
    └─ ResultsCard.jsx (Results)
    ↓
Axios HTTP Client
    ↓
Laravel API Routes (/api/assessment/*)
    ↓
AssessmentController
    ├─ startSession()
    ├─ getQuestion()
    ├─ submitAnswer()
    └─ getResults()
    ↓
Eloquent Models
    ├─ AssessmentSession
    ├─ Question
    ├─ UserResponse
    └─ AssessmentResult
    ↓
SQLite Database
```

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/assessment/start` | Create new session |
| POST | `/api/assessment/question` | Get current question |
| POST | `/api/assessment/answer` | Submit answer |
| POST | `/api/assessment/results` | Get final results |

**Example:**
```bash
# Start assessment
curl -X POST http://localhost:8000/api/assessment/start

# Get question
curl -X POST http://localhost:8000/api/assessment/question \
  -H "Content-Type: application/json" \
  -d '{"session_id": 1}'
```

## 🎨 Features

- ✨ Multi-step guided assessment
- 📊 Real-time progress tracking
- ⚡ Instant eligibility determination
- 🔴 Smart exit conditions
- 📱 Mobile responsive
- 💾 Session persistence
- 🎯 Clear result explanations
- 🌐 SEO-friendly URLs

## 📊 Assessment Flow

```
User Starts Assessment
         ↓
Question 1 Displayed
         ↓
User Answers → Check Exit Condition?
         ↓ (No)
Question 2 Displayed
         ↓
... (repeat for questions 3-10) ...
         ↓
Question 10 Answered
         ↓
Calculate Eligibility
         ↓
Display Results
         ↓
Option to Start New Assessment
```

## 🗄️ Database

SQLite database with proper schema:
- assessment_sessions
- questions
- question_options
- user_responses
- assessment_results
- eligibility_criteria
- eligibility_rules
- states
- concerns

**Status:** ✅ Migrated & Seeded

## 🔧 Configuration

### Environment Variables (.env)
```
APP_URL=http://localhost
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database.sqlite
```

### Build Configuration
- **webpack.mix.js** - Laravel Mix build config
- **tailwind.config.js** - Tailwind CSS config
- **postcss.config.js** - PostCSS config

## 🚦 Exit Conditions

Assessment terminates (ineligible) if:
1. ❌ One spouse has already filed paperwork
2. ❌ At least one spouse lives outside US/Canada

## ✅ Testing

### Manual Testing
All core functionality has been tested:
- ✅ Database migrations
- ✅ Seeding questions
- ✅ API endpoints responding
- ✅ Assessment flow working
- ✅ Results generation
- ✅ React components rendering

### To Run Tests (Future)
```bash
# PHPUnit
php artisan test

# Jest (React)
npm test

# E2E Tests (Cypress)
npm run cypress
```

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Production
```bash
npm run prod
php artisan config:cache
php artisan route:cache
```

## 🛠️ Troubleshooting

### Assets not loading?
```bash
npm run dev
```

### Database issues?
```bash
php artisan migrate:fresh --seed
```

### Port 8000 in use?
```bash
php artisan serve --port=8001
```

## 🚀 Next Steps

1. **Setup & Run** - Follow [SETUP.md](./SETUP.md)
2. **Test API** - Use [API_GUIDE.md](./API_GUIDE.md)
3. **Customize** - Modify questions in seeder
4. **Deploy** - Push to production server
5. **Extend** - Add authentication, payments, etc.

## 🎯 Future Enhancements

Phase 2:
- User authentication
- Assessment history
- Admin dashboard
- Question management UI

Phase 3:
- Payment processing
- Document generation
- Mobile app (React Native)
- Multi-language support
- Live chat support

## 📄 License

Educational & demonstration purposes.

## 👤 Author Notes

This project demonstrates:
- Modern Laravel architecture
- React component design
- RESTful API development
- Database design & relationships
- Frontend-backend integration
- Responsive UI/UX design

**Status:** ✅ MVP Complete - Ready for Production

---

**Quick Links:**
- 🏠 [Home](http://localhost:8000)
- 📖 [Documentation](./SETUP.md)
- 🔌 [API Docs](./API_GUIDE.md)
- 🗄️ [Database Schema](./DATABASE_SCHEMA.md)
- 📊 [Project Summary](./PROJECT_SUMMARY.md)

