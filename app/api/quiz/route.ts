import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-vivektest-2024'

function generateQuizCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

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

// CREATE Quiz
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user || user.role !== 'teacher') {
      return NextResponse.json(
        { error: 'Unauthorized - Teacher access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, questions } = body

    if (!title || !questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'Title and questions are required' },
        { status: 400 }
      )
    }

    // Generate unique code
    let code = generateQuizCode()
    let existing = await prisma.quiz.findUnique({ where: { code } })
    while (existing) {
      code = generateQuizCode()
      existing = await prisma.quiz.findUnique({ where: { code } })
    }

    // Create quiz with questions
    const quiz = await prisma.quiz.create({
      data: {
        title,
        code,
        teacherId: user.userId,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            option1: q.options[0],
            option2: q.options[1],
            option3: q.options[2],
            option4: q.options[3],
            correct: q.correct
          }))
        }
      },
      include: {
        questions: true
      }
    })

    return NextResponse.json(quiz, { status: 201 })
  } catch (error) {
    console.error('Create quiz error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET All quizzes (for teacher dashboard)
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (user.role === 'teacher') {
      // Get quizzes created by this teacher
      const quizzes = await prisma.quiz.findMany({
        where: { teacherId: user.userId },
        include: {
          questions: true,
          _count: {
            select: { results: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json(quizzes)
    } else {
      // Students shouldn't access this endpoint
      return NextResponse.json(
        { error: 'Forbidden - Teacher access required' },
        { status: 403 }
      )
    }
  } catch (error) {
    console.error('Get quizzes error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
