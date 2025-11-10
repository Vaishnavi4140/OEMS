'use client'

import { createContext, useContext, ReactNode } from 'react'

export interface Question {
  question: string
  choices: string[]
  answer: number
}

export interface Quiz {
  title: string
  questions: Question[]
  createdAt: number
}

interface QuizContextType {
  createQuiz: (title: string, questions: Question[]) => string
  getQuiz: (code: string) => Quiz | null
  getAllQuizzes: () => Record<string, Quiz>
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

function generateCode(length: number = 6): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const createQuiz = (title: string, questions: Question[]): string => {
    const quizzes = JSON.parse(localStorage.getItem('vtest_quizzes') || '{}')
    
    let code = generateCode()
    while (quizzes[code]) {
      code = generateCode()
    }

    quizzes[code] = {
      title,
      questions,
      createdAt: Date.now()
    }

    localStorage.setItem('vtest_quizzes', JSON.stringify(quizzes))
    return code
  }

  const getQuiz = (code: string): Quiz | null => {
    const quizzes = JSON.parse(localStorage.getItem('vtest_quizzes') || '{}')
    return quizzes[code] || null
  }

  const getAllQuizzes = (): Record<string, Quiz> => {
    return JSON.parse(localStorage.getItem('vtest_quizzes') || '{}')
  }

  return (
    <QuizContext.Provider value={{ createQuiz, getQuiz, getAllQuizzes }}>
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
