'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useQuiz, type Question } from '@/lib/QuizContext'

export default function EditQuiz() {
  const router = useRouter()
  const params = useParams()
  const quizId = params.quizId as string
  const { user } = useAuth()
  const { getQuizById, updateQuiz } = useQuiz()
  
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([{
    question: '',
    choices: ['', '', '', ''],
    answer: 0
  }])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      router.push('/login')
      return
    }
    loadQuiz()
  }, [user, router, quizId])

  const loadQuiz = async () => {
    try {
      const quiz = await getQuizById(quizId)
      setTitle(quiz.title)
      setQuestions(quiz.questions)
    } catch (error) {
      console.error('Failed to load quiz:', error)
      alert('Failed to load quiz')
      router.push('/teacher/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      choices: ['', '', '', ''],
      answer: 0
    }])
  }

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    setQuestions(newQuestions)
  }

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions]
    const newChoices = [...newQuestions[qIndex].choices]
    newChoices[oIndex] = value
    newQuestions[qIndex] = { ...newQuestions[qIndex], choices: newChoices }
    setQuestions(newQuestions)
  }

  const deleteQuestion = (index: number) => {
    if (questions.length === 1) {
      alert('Quiz must have at least one question')
      return
    }
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Please enter a quiz title')
      return
    }

    const validQuestions = questions.filter(q => 
      q.question.trim() && q.choices.every((o: string) => o.trim())
    )

    if (validQuestions.length === 0) {
      alert('Please add at least one valid question with all options filled')
      return
    }

    setSaving(true)
    try {
      await updateQuiz(quizId, {
        title: title.trim(),
        questions: validQuestions
      })
      alert('Quiz updated successfully!')
      router.push('/teacher/dashboard')
    } catch (error) {
      console.error('Error updating quiz:', error)
      alert('Failed to update quiz')
    } finally {
      setSaving(false)
    }
  }

  if (!user || user.role !== 'teacher') {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading quiz...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">✏️ Edit Quiz</h1>
          <p className="text-gray-600">Update your quiz details and questions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quiz Title */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <label className="block text-lg font-bold text-gray-800 mb-3">
              📝 Quiz Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
              placeholder="Enter quiz title"
              required
            />
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Question {qIndex + 1}
                  </h3>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteQuestion(qIndex)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-semibold"
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Question Text
                    </label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="Enter your question"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Options (Select the correct answer)
                    </label>
                    <div className="space-y-3">
                      {q.choices.map((option: string, oIndex: number) => (
                        <div
                          key={oIndex}
                          className={`flex items-center gap-3 p-4 border-2 rounded-lg transition ${
                            q.answer === oIndex
                              ? 'border-green-500 bg-green-50 shadow-md'
                              : 'border-gray-300 bg-white hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={q.answer === oIndex}
                            onChange={() => updateQuestion(qIndex, 'answer', oIndex)}
                            className="w-6 h-6 cursor-pointer"
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <span className={`font-bold text-lg px-3 py-1 rounded-lg ${
                              q.answer === oIndex
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {String.fromCharCode(65 + oIndex)}
                            </span>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                              className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                              placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                              required
                            />
                          </div>
                          {q.answer === oIndex && (
                            <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                              ✓ CORRECT
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Question Button */}
          <button
            type="button"
            onClick={addQuestion}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition font-bold text-lg shadow-lg"
          >
            ➕ Add Another Question
          </button>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/teacher/dashboard')}
              className="flex-1 bg-gray-400 text-white p-4 rounded-lg hover:bg-gray-500 transition font-bold text-lg shadow-lg"
              disabled={saving}
            >
              ← Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '💾 Saving...' : '💾 Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
