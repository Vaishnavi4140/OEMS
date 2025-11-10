import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/lib/AuthContext'
import { QuizProvider } from '@/lib/QuizContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VivekTest - Online MCQ Examination',
  description: 'Fast, simple online MCQ exams with code-based access',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QuizProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </QuizProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
