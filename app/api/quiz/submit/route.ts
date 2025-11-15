import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-vivektest-2024'

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user || user.role !== 'student') {
      return NextResponse.json(
        { error: 'Unauthorized - Student access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { quizId, answers } = body

    if (!quizId || !answers) {
      return NextResponse.json(
        { error: 'Quiz ID and answers are required' },
        { status: 400 }
      )
    }

    // Get quiz with correct answers
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true }
    })

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      )
    }

    // Calculate score
    let score = 0
    const totalQuestions = quiz.questions.length

    quiz.questions.forEach((question: any) => {
      if (answers[question.id] === question.correct) {
        score++
      }
    })

    // Check if student already submitted
    const existingResult = await prisma.result.findUnique({
      where: {
        quizId_studentId: {
          quizId,
          studentId: user.userId
        }
      }
    })

    if (existingResult) {
      return NextResponse.json(
        { error: 'You have already submitted this quiz' },
        { status: 409 }
      )
    }

    // Save result
    const result = await prisma.result.create({
      data: {
        quizId,
        studentId: user.userId,
        score,
        totalQuestions,
        answers
      }
    })

    return NextResponse.json({
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      result
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
