import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code.toUpperCase()

    const quiz = await prisma.quiz.findUnique({
      where: { code },
      include: {
        questions: {
          select: {
            id: true,
            text: true,
            option1: true,
            option2: true,
            option3: true,
            option4: true,
            // Don't include correct answer
          }
        },
        teacher: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(quiz)
  } catch (error) {
    console.error('Get quiz by code error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
