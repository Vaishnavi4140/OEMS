import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create demo teacher
  const teacherPassword = await bcrypt.hash('teacher123', 10)
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@demo.com' },
    update: {},
    create: {
      email: 'teacher@demo.com',
      name: 'Demo Teacher',
      password: teacherPassword,
      role: 'teacher'
    }
  })
  console.log('Created teacher:', teacher.email)

  // Create demo student
  const studentPassword = await bcrypt.hash('student123', 10)
  const student = await prisma.user.upsert({
    where: { email: 'student@demo.com' },
    update: {},
    create: {
      email: 'student@demo.com',
      name: 'Demo Student',
      password: studentPassword,
      role: 'student'
    }
  })
  console.log('Created student:', student.email)

  // Create demo quiz
  const quiz = await prisma.quiz.create({
    data: {
      title: 'JavaScript Basics Quiz',
      code: 'DEMO01',
      teacherId: teacher.id,
      questions: {
        create: [
          {
            text: 'What does "JS" stand for?',
            option1: 'JavaScript',
            option2: 'JavaSyntax',
            option3: 'JustScript',
            option4: 'JQuery Standard',
            correct: 0
          },
          {
            text: 'Which keyword is used to declare a variable in modern JavaScript?',
            option1: 'var',
            option2: 'let',
            option3: 'const',
            option4: 'Both let and const',
            correct: 3
          },
          {
            text: 'What is the correct way to write a comment in JavaScript?',
            option1: '<!-- This is a comment -->',
            option2: '// This is a comment',
            option3: '/* This is a comment */',
            option4: 'Both // and /* */',
            correct: 3
          },
          {
            text: 'Which operator is used for strict equality in JavaScript?',
            option1: '==',
            option2: '===',
            option3: '=',
            option4: '!=',
            correct: 1
          },
          {
            text: 'What is the result of typeof null?',
            option1: 'null',
            option2: 'undefined',
            option3: 'object',
            option4: 'number',
            correct: 2
          }
        ]
      }
    }
  })
  console.log('Created quiz:', quiz.title, '- Code:', quiz.code)

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
