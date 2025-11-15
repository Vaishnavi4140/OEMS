'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuiz, type Quiz, type Question } from '@/lib/QuizContext'

function TakeQuizContent() {
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

  const loadQuiz = async (quizCode: string) => {
    const foundQuiz = await getQuiz(quizCode)
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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">📝 Take Quiz</h1>
        <p className="text-gray-600 text-lg">Enter a quiz code to start your assessment</p>
      </div>

      {!quiz && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl rounded-2xl p-8 border-2 border-blue-200">
          <div className="text-center mb-6">
            <div className="text-7xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Test Your Knowledge?</h2>
            <p className="text-gray-600">Enter the quiz code provided by your teacher</p>
          </div>
          
          <form onSubmit={handleJoinQuiz} className="max-w-lg mx-auto">
            <label className="block text-gray-800 font-bold mb-3 text-lg">
              Quiz Code
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-2xl font-mono font-bold tracking-widest text-center"
                placeholder="ABC123"
                required
                maxLength={6}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-bold text-lg shadow-lg"
              >
                Join Quiz →
              </button>
            </div>
          </form>
        </div>
      )}

      {quiz && score === null && (
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <div className="border-b-2 border-gray-200 pb-6 mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">{quiz.title}</h2>
            <div className="flex items-center gap-6 text-gray-600">
              <span className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                <span className="text-2xl">📝</span>
                <span className="font-bold text-lg">{quiz.questions.length} Questions</span>
              </span>
              <span className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                <span className="text-2xl">⏱️</span>
                <span className="font-bold text-lg">Untimed</span>
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {quiz.questions.map((q, qIndex) => (
              <div key={qIndex} className="border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-white hover:border-blue-300 transition">
                <div className="mb-4">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Question {qIndex + 1} of {quiz.questions.length}
                  </span>
                </div>
                <p className="font-bold text-2xl mb-6 text-gray-900">
                  {q.question}
                </p>
                <div className="space-y-3">
                  {q.choices.map((choice, cIndex) => (
                    <label
                      key={cIndex}
                      className={`flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all border-2 ${
                        answers[qIndex] === cIndex
                          ? 'bg-blue-100 border-blue-500 shadow-lg scale-[1.02]'
                          : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={answers[qIndex] === cIndex}
                        onChange={() => handleAnswerChange(qIndex, cIndex)}
                        className="w-6 h-6 text-blue-600"
                        required
                      />
                      <span className={`font-bold text-lg min-w-[40px] ${
                        answers[qIndex] === cIndex ? 'text-blue-700' : 'text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + cIndex)}.
                      </span>
                      <span className={`flex-1 text-lg ${
                        answers[qIndex] === cIndex ? 'font-bold text-blue-900' : 'text-gray-700'
                      }`}>
                        {choice}
                      </span>
                      {answers[qIndex] === cIndex && (
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          ✓ Selected
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-bold text-xl shadow-lg flex items-center justify-center gap-2"
              >
                <span>Submit Quiz</span>
                <span className="text-2xl">✓</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {score !== null && quiz && (
        <div className="bg-white shadow-2xl rounded-3xl p-10 text-center">
          <div className="mb-6">
            {Math.round((score / quiz.questions.length) * 100) >= 80 ? (
              <div>
                <div className="text-9xl mb-4">🏆</div>
                <div className="text-2xl font-bold text-green-600">Excellent Work!</div>
              </div>
            ) : Math.round((score / quiz.questions.length) * 100) >= 60 ? (
              <div>
                <div className="text-9xl mb-4">🎉</div>
                <div className="text-2xl font-bold text-blue-600">Great Job!</div>
              </div>
            ) : Math.round((score / quiz.questions.length) * 100) >= 40 ? (
              <div>
                <div className="text-9xl mb-4">👍</div>
                <div className="text-2xl font-bold text-yellow-600">Good Effort!</div>
              </div>
            ) : (
              <div>
                <div className="text-9xl mb-4">📚</div>
                <div className="text-2xl font-bold text-orange-600">Keep Practicing!</div>
              </div>
            )}
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Quiz Completed!</h2>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <div className="mb-4">
              <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {score} / {quiz.questions.length}
              </div>
            </div>
            <div className="text-4xl font-bold mb-3">
              <span className={`${
                Math.round((score / quiz.questions.length) * 100) >= 60 
                  ? 'text-green-600' 
                  : 'text-orange-600'
              }`}>
                {Math.round((score / quiz.questions.length) * 100)}%
              </span>
            </div>
            <div className="text-gray-600 text-lg font-semibold">
              {Math.round((score / quiz.questions.length) * 100) >= 80 && "Outstanding performance! You've mastered this topic! 🌟"}
              {Math.round((score / quiz.questions.length) * 100) >= 60 && Math.round((score / quiz.questions.length) * 100) < 80 && "Well done! You have a good understanding! 👏"}
              {Math.round((score / quiz.questions.length) * 100) >= 40 && Math.round((score / quiz.questions.length) * 100) < 60 && "Good try! Review the material and improve! 💪"}
              {Math.round((score / quiz.questions.length) * 100) < 40 && "Don't give up! Practice makes perfect! 📖"}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setQuiz(null)
                setCode('')
                setScore(null)
                setAnswers([])
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-bold text-lg shadow-lg"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TakeQuizPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <TakeQuizContent />
    </Suspense>
  )
}
