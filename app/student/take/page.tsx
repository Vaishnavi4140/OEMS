'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuiz, type Quiz, type Question } from '@/lib/QuizContext'

export default function TakeQuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getQuiz } = useQuiz()
  const [code, setCode] = useState('')
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    const urlCode = searchParams.get('code')
    if (urlCode) {
      setCode(urlCode)
      loadQuiz(urlCode)
    }
  }, [searchParams])

  const loadQuiz = (quizCode: string) => {
    const foundQuiz = getQuiz(quizCode)
    if (foundQuiz) {
      setQuiz(foundQuiz)
      setAnswers(new Array(foundQuiz.questions.length).fill(-1))
      setScore(null)
    } else {
      alert('Quiz not found with this code')
    }
  }

  const handleJoinQuiz = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) {
      alert('Please enter a quiz code')
      return
    }
    loadQuiz(code.toUpperCase())
  }

  const handleAnswerChange = (questionIndex: number, choiceIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = choiceIndex
    setAnswers(newAnswers)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!quiz) return

    let correct = 0
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.answer) {
        correct++
      }
    })

    setScore(correct)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Take Quiz</h1>

      {!quiz && (
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleJoinQuiz}>
            <label className="block text-gray-700 font-semibold mb-2">
              Enter Quiz Code
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="ABC123"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Join Quiz
              </button>
            </div>
          </form>
        </div>
      )}

      {quiz && score === null && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{quiz.title}</h2>
          <p className="text-gray-600 mb-6">{quiz.questions.length} questions</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {quiz.questions.map((q, qIndex) => (
              <div key={qIndex} className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-lg mb-3">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.choices.map((choice, cIndex) => (
                    <label
                      key={cIndex}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={answers[qIndex] === cIndex}
                        onChange={() => handleAnswerChange(qIndex, cIndex)}
                        className="w-4 h-4"
                        required
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Submit Quiz
            </button>
          </form>
        </div>
      )}

      {score !== null && quiz && (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
          <div className="text-6xl font-bold text-primary mb-4">
            {score} / {quiz.questions.length}
          </div>
          <p className="text-gray-600 mb-6">
            You scored {Math.round((score / quiz.questions.length) * 100)}%
          </p>
          <button
            onClick={() => {
              setQuiz(null)
              setCode('')
              setScore(null)
              setAnswers([])
            }}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Take Another Quiz
          </button>
        </div>
      )}
    </div>
  )
}
