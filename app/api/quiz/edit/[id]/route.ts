import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only teachers can fetch quiz details for editing
    if (decoded.role !== 'teacher') {
      return NextResponse.json({ error: 'Teacher access required' }, { status: 401 })
    }

    const quizId = params.id

    // Fetch quiz with questions
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    // Verify the quiz belongs to the teacher
    if (quiz.teacherId !== decoded.id) {
      return NextResponse.json({ error: 'You can only edit your own quizzes' }, { status: 403 })
    }

    // Transform questions to frontend format
    const transformedQuiz = {
      id: quiz.id,
      title: quiz.title,
      code: quiz.code,
      createdAt: quiz.createdAt,
      questions: quiz.questions.map((q: any) => ({
        question: q.text,
        option1: q.option1,
        option2: q.option2,
        option3: q.option3,
        option4: q.option4,
        correctAnswer: q.correct
      }))
    }

    return NextResponse.json(transformedQuiz)
  } catch (error) {
    console.error('Error fetching quiz:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only teachers can update quizzes
    if (decoded.role !== 'teacher') {
      return NextResponse.json({ error: 'Teacher access required' }, { status: 401 })
    }

    const quizId = params.id
    const { title, questions } = await request.json()

    if (!title || !questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'Title and at least one question are required' },
        { status: 400 }
      )
    }

    // Verify the quiz belongs to the teacher
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: quizId }
    })

    if (!existingQuiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    if (existingQuiz.teacherId !== decoded.id) {
      return NextResponse.json({ error: 'You can only edit your own quizzes' }, { status: 403 })
    }

    // Update quiz in a transaction
    const updatedQuiz = await prisma.$transaction(async (tx: any) => {
      // Update quiz title
      const quiz = await tx.quiz.update({
        where: { id: quizId },
        data: { title }
      })

      // Delete existing questions
      await tx.question.deleteMany({
        where: { quizId: quizId }
      })

      // Create new questions
      const newQuestions = await Promise.all(
        questions.map((q: any) => 
          tx.question.create({
            data: {
              quizId: quizId,
              text: q.question,
              option1: q.option1,
              option2: q.option2,
              option3: q.option3,
              option4: q.option4,
              correct: q.correctAnswer
            }
          })
        )
      )

      return {
        ...quiz,
        questions: newQuestions.map(q => ({
          question: q.text,
          option1: q.option1,
          option2: q.option2,
          option3: q.option3,
          option4: q.option4,
          correctAnswer: q.correct
        }))
      }
    })

    return NextResponse.json(updatedQuiz)
  } catch (error) {
    console.error('Error updating quiz:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
