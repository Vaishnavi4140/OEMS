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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const code = await createQuiz(title, validQuestions)
      setCreatedCode(code)
      alert(`Quiz created successfully! Code: ${code}`)
    } catch (error) {
      alert('Failed to create quiz. Please try again.')
    }
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter question"
                required
              />

              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Options (Click the radio button to mark correct answer):
                </p>
              </div>

              <div className="space-y-3">
                {q.choices.map((choice, cIndex) => (
                  <div 
                    key={cIndex} 
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      q.answer === cIndex 
                        ? 'border-green-500 bg-green-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`answer-${qIndex}`}
                      checked={q.answer === cIndex}
                      onChange={() => updateQuestion(qIndex, 'answer', cIndex)}
                      className="w-5 h-5 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                    <span className={`font-semibold min-w-[70px] ${
                      q.answer === cIndex ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      Option {String.fromCharCode(65 + cIndex)}:
                    </span>
                    <input
                      type="text"
                      value={choice}
                      onChange={(e) => updateChoice(qIndex, cIndex, e.target.value)}
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        q.answer === cIndex 
                          ? 'border-green-400 focus:ring-green-500 bg-white font-medium' 
                          : 'border-gray-300 focus:ring-primary'
                      }`}
                      placeholder={`Enter option ${String.fromCharCode(65 + cIndex)}`}
                      required
                    />
                    {q.answer === cIndex && (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                        ✓ CORRECT
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <span className="text-lg">●</span> 
                <span className="font-medium">Click the radio button next to the correct answer</span>
              </p>
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
