'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useQuiz, type Question } from '@/lib/QuizContext'

export default function CreateQuizPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { createQuiz } = useQuiz()
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', choices: ['', '', '', ''], answer: 0 }
  ])
  const [createdCode, setCreatedCode] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      router.push('/login')
    }
  }, [user, router])

  const addQuestion = () => {
    setQuestions([...questions, { question: '', choices: ['', '', '', ''], answer: 0 }])
  }

  const updateQuestion = (index: number, field: 'question' | 'answer', value: string | number) => {
    const updated = [...questions]
    if (field === 'answer') {
      updated[index].answer = value as number
    } else {
      updated[index].question = value as string
    }
    setQuestions(updated)
  }

  const updateChoice = (qIndex: number, cIndex: number, value: string) => {
    const updated = [...questions]
    updated[qIndex].choices[cIndex] = value
    setQuestions(updated)
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Please enter a quiz title')
      return
    }

    const validQuestions = questions.filter(q => 
      q.question.trim() && q.choices.every(c => c.trim())
    )

    if (validQuestions.length === 0) {
      alert('Please add at least one valid question')
      return
    }

    const code = createQuiz(title, validQuestions)
    setCreatedCode(code)
    alert(`Quiz created successfully! Code: ${code}`)
  }

  if (!user || user.role !== 'teacher') {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Quiz</h1>

      {createdCode && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-semibold">
            Quiz created successfully! Share this code with students:
          </p>
          <p className="text-2xl font-mono font-bold text-green-900 mt-2">{createdCode}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter quiz title"
            required
          />
        </div>

        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">Question {qIndex + 1}</h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                type="text"
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter question"
                required
              />

              <div className="space-y-2">
                {q.choices.map((choice, cIndex) => (
                  <div key={cIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`answer-${qIndex}`}
                      checked={q.answer === cIndex}
                      onChange={() => updateQuestion(qIndex, 'answer', cIndex)}
                      className="w-4 h-4"
                    />
                    <input
                      type="text"
                      value={choice}
                      onChange={(e) => updateChoice(qIndex, cIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={`Choice ${cIndex + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Select the correct answer by clicking the radio button</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            + Add Question
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  )
}
