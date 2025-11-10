import Link from 'next/link'
import JoinQuizBanner from '@/components/JoinQuizBanner'
import HeroBanner from '@/components/HeroBanner'

export default function Home() {
  return (
    <div>
      <JoinQuizBanner />
      <HeroBanner />
      
      {/* Intro Section */}
      <section id="intro" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <p className="text-gray-700 text-lg leading-relaxed">
                VivekTest is a lightweight MCQ-based online examination system. It supports two user roles: 
                teacher and student. Teachers can create quizzes and share an alphanumeric access code. 
                Students join a quiz using that code and receive a score at completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">How to Use</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-xl transition border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                  <span className="text-2xl">👨‍🏫</span> For Teachers
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                    <span>Sign up and login as a teacher</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                    <span>Create a quiz by adding MCQ questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                    <span>Get an alphanumeric quiz code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                    <span>Share the code with your students</span>
                  </li>
                </ol>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-md hover:shadow-xl transition border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                  <span className="text-2xl">👨‍🎓</span> For Students
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                    <span>Sign up or login as a student</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                    <span>Go to "Take Quiz" section</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                    <span>Enter the quiz code you received</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                    <span>Complete the test and view your score</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Features</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-blue-500">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Create MCQ Quizzes</h3>
                <p className="text-gray-600">Easily create multiple choice questions with customizable options.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-green-500">
                <div className="text-4xl mb-3">🔑</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Alphanumeric Codes</h3>
                <p className="text-gray-600">Each quiz gets a unique code for secure student access.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-purple-500">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Instant Results</h3>
                <p className="text-gray-600">Students receive their scores immediately after submission.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-yellow-500">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Role-Based Access</h3>
                <p className="text-gray-600">Separate interfaces for teachers and students.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-red-500">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Fast & Simple</h3>
                <p className="text-gray-600">No complex setup required. Start testing in minutes.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-indigo-500">
                <div className="text-4xl mb-3">💾</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Local Storage</h3>
                <p className="text-gray-600">Demo uses browser storage for quick testing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section id="quick-actions" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/teacher/create" 
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md hover:shadow-2xl transition text-center border-2 border-blue-200 hover:border-blue-400 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition">✏️</div>
                <div className="font-bold text-xl text-gray-900 mb-2">Create Quiz</div>
                <div className="text-sm text-blue-600 font-medium">For Teachers</div>
              </Link>
              <Link 
                href="/student/take" 
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl shadow-md hover:shadow-2xl transition text-center border-2 border-green-200 hover:border-green-400 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition">📝</div>
                <div className="font-bold text-xl text-gray-900 mb-2">Take Quiz</div>
                <div className="text-sm text-green-600 font-medium">For Students</div>
              </Link>
              <Link 
                href="/teacher/dashboard" 
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-md hover:shadow-2xl transition text-center border-2 border-purple-200 hover:border-purple-400 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition">📊</div>
                <div className="font-bold text-xl text-gray-900 mb-2">Dashboard</div>
                <div className="text-sm text-purple-600 font-medium">For Teachers</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
