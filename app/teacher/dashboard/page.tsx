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
  const [quizzes, setQuizzes] = useState<Record<string, Quiz>>({})

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      router.push('/login')
      return
    }
    setQuizzes(getAllQuizzes())
  }, [user, router, getAllQuizzes])

  if (!user || user.role !== 'teacher') {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600">Welcome, {user.name || user.email}</p>
        </div>
        <button
          onClick={logout}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/teacher/create"
          className="bg-primary text-white p-6 rounded-lg hover:bg-blue-700 transition text-center"
        >
          <div className="text-4xl mb-2">✏️</div>
          <div className="text-xl font-semibold">Create New Quiz</div>
        </Link>
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <div className="text-4xl mb-2">📊</div>
          <div className="text-xl font-semibold">{Object.keys(quizzes).length} Quizzes Created</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Quizzes</h2>
        {Object.keys(quizzes).length === 0 ? (
          <p className="text-gray-500">No quizzes created yet. Create your first quiz!</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(quizzes).map(([code, quiz]) => (
              <div
                key={code}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{quiz.title}</h3>
                    <p className="text-sm text-gray-600">
                      {quiz.questions.length} questions • Created{' '}
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-blue-100 text-primary px-3 py-1 rounded font-mono text-sm font-semibold">
                    {code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
