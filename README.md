# VivekTest - Online MCQ Examination System

A modern, fast, and simple online MCQ examination platform built with **Next.js**, **React**, and **TailwindCSS**. Teachers can create quizzes with alphanumeric codes, and students can take quizzes by entering those codes.

## 🚀 Features

- **Role-Based Access**: Separate interfaces for teachers and students
- **Quiz Creation**: Teachers can create MCQ quizzes with multiple questions
- **Alphanumeric Codes**: Each quiz gets a unique code for secure access
- **Instant Results**: Students receive scores immediately after submission
- **Modern UI**: Clean, responsive design with TailwindCSS
- **Client-Side Storage**: Demo uses localStorage/sessionStorage (can be extended with a backend)

## 📋 Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **localStorage/sessionStorage** - Client-side data persistence

## 🛠️ Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

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

### For Students

1. **Sign Up**: Create an account with role "Student"
2. **Login**: Sign in to the platform
3. **Take Quiz**:
   - Go to "Take Quiz"
   - Enter the quiz code provided by your teacher
   - Answer all questions
   - Submit to see your score

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles with Tailwind
│   ├── login/page.tsx       # Login page
│   ├── signup/page.tsx      # Signup page
│   ├── teacher/
│   │   ├── dashboard/page.tsx  # Teacher dashboard
│   │   └── create/page.tsx     # Create quiz page
│   └── student/
│       └── take/page.tsx    # Take quiz page
├── components/
│   ├── Navbar.tsx           # Navigation bar
│   └── Footer.tsx           # Footer with contact info
├── lib/
│   ├── AuthContext.tsx      # Authentication context
│   └── QuizContext.tsx      # Quiz management context
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🎨 Features Walkthrough

### Landing Page
- Hero section with call-to-action buttons
- Introduction to the platform
- How-to-use guide for teachers and students
- Feature highlights
- Quick action cards

### Authentication
- Signup with name, email, password, and role selection
- Login with email and password
- Session management using sessionStorage
- Role-based redirects (teacher → dashboard, student → take quiz)

### Teacher Dashboard
- View all created quizzes
- Display quiz codes
- Create new quiz button
- Statistics overview

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
