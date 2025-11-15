'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import { useQuiz, type Quiz } from '@/lib/QuizContext'

export default function TeacherDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { getAllQuizzes } = useQuiz()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      router.push('/login')
      return
    }
    loadQuizzes()
  }, [user, router])

  const loadQuizzes = async () => {
    try {
      const data = await getAllQuizzes()
      setQuizzes(data)
    } catch (error) {
      console.error('Failed to load quizzes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== 'teacher') {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">👋 Welcome, {user.name || user.email}</h1>
          <p className="text-lg text-gray-600">Manage your quizzes and track student performance</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold shadow-md"
        >
          🚪 Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/teacher/create"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition text-center shadow-lg transform hover:scale-105"
        >
          <div className="text-6xl mb-3">✏️</div>
          <div className="text-2xl font-bold mb-1">Create New Quiz</div>
          <div className="text-sm opacity-90">Build your next assessment</div>
        </Link>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-8 rounded-xl text-center shadow-lg">
          <div className="text-6xl mb-3">📊</div>
          <div className="text-4xl font-bold mb-1">{quizzes.length}</div>
          <div className="text-lg font-semibold">Total Quizzes</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-xl text-center shadow-lg">
          <div className="text-6xl mb-3">❓</div>
          <div className="text-4xl font-bold mb-1">
            {quizzes.reduce((sum, q) => sum + q.questions.length, 0)}
          </div>
          <div className="text-lg font-semibold">Total Questions</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Your Quizzes</h2>
          {quizzes.length > 0 && (
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              {quizzes.length} {quizzes.length === 1 ? 'Quiz' : 'Quizzes'}
            </span>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-4">Loading your quizzes...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Quizzes Yet</h3>
            <p className="text-gray-500 text-lg mb-6">Start creating engaging quizzes for your students!</p>
            <Link 
              href="/teacher/create"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-bold shadow-lg"
            >
              ✏️ Create Your First Quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.code}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-xl transition-all bg-gradient-to-r from-white to-gray-50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl text-gray-900 mb-2">{quiz.title}</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                        <span className="text-xl">❓</span>
                        <span className="font-semibold">{quiz.questions.length} Questions</span>
                      </span>
                      <span className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                        <span className="text-xl">📅</span>
                        <span className="font-semibold">
                          {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          }) : 'Recently'}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="text-center ml-4 flex flex-col gap-3">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg">
                      <div className="text-xs font-semibold mb-1 opacity-90">QUIZ CODE</div>
                      <div className="font-mono text-3xl font-bold tracking-wider">{quiz.code}</div>
                    </div>
                    <Link
                      href={`/teacher/edit/${quiz.id}`}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition font-semibold shadow-md text-sm flex items-center justify-center gap-2"
                    >
                      ✏️ Edit Quiz
                    </Link>
                  </div>
                </div>
                
                {/* Show question preview */}
                {quiz.questions.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-gray-700">📋 Questions Preview:</span>
                    </div>
                    <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                      {quiz.questions.slice(0, 3).map((q, idx) => (
                        <div key={idx} className="text-sm text-gray-700 flex gap-3 items-start">
                          <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="flex-1 font-medium">{q.question}</span>
                        </div>
                      ))}
                      {quiz.questions.length > 3 && (
                        <p className="text-xs text-gray-500 italic pl-9">
                          +{quiz.questions.length - 3} more {quiz.questions.length - 3 === 1 ? 'question' : 'questions'}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
