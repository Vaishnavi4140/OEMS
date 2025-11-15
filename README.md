# VivekTest - Online MCQ Examination System

A modern, fast, and simple online MCQ examination platform built with **Next.js**, **React**, **TailwindCSS**, **Prisma**, and **SQLite**. Teachers can create quizzes with alphanumeric codes, and students can take quizzes by entering those codes.

## 🚀 Features

- **Role-Based Access**: Separate interfaces for teachers and students
- **Quiz Creation**: Teachers can create MCQ quizzes with multiple questions
- **Alphanumeric Codes**: Each quiz gets a unique code for secure access
- **Instant Results**: Students receive scores immediately after submission
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **Database Persistence**: SQLite database with Prisma ORM
- **RESTful API**: Backend API routes for all operations
- **Modern UI**: Clean, responsive design with TailwindCSS

## 📋 Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **Prisma** - Modern database ORM
- **SQLite** - Lightweight database
- **bcrypt** - Password hashing
- **JWT** - Token-based authentication

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Vaishnavi4140/OEMS.git
cd OEMS
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up the database:**

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed demo data (optional)
npm run db:seed
```

4. **Run the development server:**

```bash
npm run dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Accounts

After running the seed script, you can login with:

**Teacher Account:**
- Email: `teacher@demo.com`
- Password: `teacher123`

**Student Account:**
- Email: `student@demo.com`
- Password: `student123`

**Demo Quiz Code:** `DEMO01` (JavaScript Basics Quiz)

## 📖 Usage

### For Teachers

1. **Sign Up**: Create an account with role "Teacher"
2. **Login**: Sign in to access the teacher dashboard
3. **Create Quiz**: 
   - Go to "Create Quiz"
   - Add a title and questions with 4 choices each
   - Mark the correct answer for each question
   - Submit to generate a unique quiz code
4. **Share Code**: Share the generated code with your students
5. **View Results**: See all student submissions and scores

### For Students

1. **Sign Up**: Create an account with role "Student"
2. **Login**: Sign in to the platform
3. **Take Quiz**:
   - Go to "Take Quiz" or enter code in the navbar
   - Enter the quiz code provided by your teacher
   - Answer all questions
   - Submit to see your score instantly

## 📁 Project Structure

```
├── app/
│   ├── api/                    # Backend API routes
│   │   ├── auth/
│   │   │   ├── signup/route.ts
│   │   │   └── login/route.ts
│   │   └── quiz/
│   │       ├── route.ts        # Create/Get quizzes
│   │       ├── [code]/route.ts # Get quiz by code
│   │       ├── submit/route.ts # Submit answers
│   │       └── results/[quizId]/route.ts
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles with Tailwind
│   ├── login/page.tsx          # Login page
│   ├── signup/page.tsx         # Signup page
│   ├── teacher/
│   │   ├── dashboard/page.tsx  # Teacher dashboard
│   │   └── create/page.tsx     # Create quiz page
│   └── student/
│       └── take/page.tsx       # Take quiz page
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── Footer.tsx              # Footer
│   ├── HeroBanner.tsx          # Animated hero section
│   └── JoinQuizBanner.tsx      # Quiz code entry
├── lib/
│   ├── AuthContext.tsx         # Authentication context
│   ├── QuizContext.tsx         # Quiz management context
│   ├── api.ts                  # API client utilities
│   └── prisma.ts               # Prisma client singleton
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Demo data seeder
│   └── migrations/             # Database migrations
├── tailwind.config.js          # Tailwind configuration
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login and get JWT token

### Quiz Management
- `POST /api/quiz` - Create new quiz (Teacher only)
- `GET /api/quiz` - Get all quizzes for current teacher
- `GET /api/quiz/[code]` - Get quiz by code (Public)
- `POST /api/quiz/submit` - Submit quiz answers (Student only)
- `GET /api/quiz/results/[quizId]` - Get quiz results (Teacher only)

## 🎨 Features Walkthrough

### Landing Page
- Animated hero section with rotating backgrounds
- Introduction to the platform
- How-to-use guide for teachers and students
- Feature highlights
- Quick action cards
- Join quiz banner in navbar

### Authentication
- Signup with name, email, password, and role selection
- Login with email and password
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based redirects (teacher → dashboard, student → take quiz)

### Teacher Dashboard
- View all created quizzes from database
- Display quiz codes for sharing
- Create new quiz button
- Statistics overview
- Real-time quiz list updates

### Quiz Creation
- Dynamic form to add multiple questions
- 4 choices per question with radio button selection for correct answer
- Add/remove questions
- Form validation
- Code generation and display

### Take Quiz
- Enter quiz code to join
- Display all questions with multiple choice options
- Radio button selection for answers
- Submit to calculate score
- Score display with percentage
- Option to take another quiz

## 🔐 Authentication & Data Storage

**Current Implementation (Demo)**:
- Users stored in `localStorage` as JSON
- Passwords stored in plain text (for demo purposes only)
- Session data in `sessionStorage`
- Quizzes stored in `localStorage`

**Production Recommendations**:
- Implement a backend API (Node.js/Express, Django, etc.)
- Use a proper database (PostgreSQL, MongoDB, etc.)
- Hash passwords with bcrypt
- Use JWT or session-based authentication
- Add server-side validation
- Implement rate limiting

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Database persistence
- [ ] Secure authentication with JWT
- [ ] Timed quizzes
- [ ] Quiz attempt history
- [ ] Analytics and reporting
- [ ] Question bank management
- [ ] CSV/PDF export of results
- [ ] Real-time proctoring
- [ ] Mobile app

## 🌐 Inspiration

This project is inspired by popular online examination platforms:
- [SpeedExam](https://www.speedexam.net/)
- [Exam.net](https://exam.net/)

## 📝 Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This is a demo project for educational purposes.

## 📞 Contact

For questions or support:
- Email: support@vivektest.example
- Phone: +1 555 123 4567

---

**Note**: This is a front-end demo using browser storage. For production use, implement a proper backend with secure authentication and database storage.
