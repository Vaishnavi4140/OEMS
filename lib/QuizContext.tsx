'use client'

import { createContext, useContext, ReactNode } from 'react'
import { quizApi } from './api'

export interface Question {
  question: string
  choices: string[]
  answer: number
}

export interface Quiz {
  id?: string
  title: string
  code?: string
  questions: Question[]
  createdAt?: number
}

interface QuizContextType {
  createQuiz: (title: string, questions: Question[]) => Promise<string>
  getQuiz: (code: string) => Promise<Quiz | null>
  getAllQuizzes: () => Promise<Quiz[]>
  getQuizById: (id: string) => Promise<Quiz>
  updateQuiz: (id: string, data: { title: string; questions: Question[] }) => Promise<void>
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const createQuiz = async (title: string, questions: Question[]): Promise<string> => {
    try {
      // Transform questions to match API format
      const apiQuestions = questions.map(q => ({
        text: q.question,
        options: q.choices,
        correct: q.answer
      }))

      const quiz = await quizApi.create(title, apiQuestions)
      return quiz.code
    } catch (error) {
      console.error('Create quiz error:', error)
      throw error
    }
  }

  const getQuiz = async (code: string): Promise<Quiz | null> => {
    try {
      const quiz = await quizApi.getByCode(code)
      
      // Transform from API format to app format
      return {
        id: quiz.id,
        title: quiz.title,
        code: quiz.code,
        questions: quiz.questions.map((q: any) => ({
          question: q.text,
          choices: [q.option1, q.option2, q.option3, q.option4],
          answer: 0 // Don't expose correct answer
        })),
        createdAt: new Date(quiz.createdAt).getTime()
      }
    } catch (error) {
      console.error('Get quiz error:', error)
      return null
    }
  }

  const getAllQuizzes = async (): Promise<Quiz[]> => {
    try {
      const quizzes = await quizApi.getAll()
      
      // Transform from API format to app format
      return quizzes.map((quiz: any) => ({
        id: quiz.id,
        title: quiz.title,
        code: quiz.code,
        questions: quiz.questions.map((q: any) => ({
          question: q.text,
          choices: [q.option1, q.option2, q.option3, q.option4],
          answer: q.correct
        })),
        createdAt: new Date(quiz.createdAt).getTime()
      }))
    } catch (error) {
      console.error('Get all quizzes error:', error)
      return []
    }
  }

  const getQuizById = async (id: string): Promise<Quiz> => {
    try {
      const quiz = await quizApi.getById(id)
      
      // Transform from API format to app format
      return {
        id: quiz.id,
        title: quiz.title,
        code: quiz.code,
        questions: quiz.questions.map((q: any) => ({
          question: q.question,
          choices: [q.option1, q.option2, q.option3, q.option4],
          answer: q.correctAnswer
        })),
        createdAt: new Date(quiz.createdAt).getTime()
      }
    } catch (error) {
      console.error('Get quiz by ID error:', error)
      throw error
    }
  }

  const updateQuiz = async (id: string, data: { title: string; questions: Question[] }): Promise<void> => {
    try {
      // Transform questions to match API format
      const apiQuestions = data.questions.map(q => ({
        question: q.question,
        option1: q.choices[0],
        option2: q.choices[1],
        option3: q.choices[2],
        option4: q.choices[3],
        correctAnswer: q.answer
      }))

      await quizApi.update(id, {
        title: data.title,
        questions: apiQuestions
      })
    } catch (error) {
      console.error('Update quiz error:', error)
      throw error
    }
  }

  return (
    <QuizContext.Provider value={{ createQuiz, getQuiz, getAllQuizzes, getQuizById, updateQuiz }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
