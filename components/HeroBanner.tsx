'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HeroBanner() {
  const [currentImage, setCurrentImage] = useState(0)
  
  // Array of background patterns/images
  const backgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ]

  // Floating icons for animation
  const floatingElements = [
    { icon: '📝', delay: 0, duration: 3 },
    { icon: '✅', delay: 0.5, duration: 4 },
    { icon: '📊', delay: 1, duration: 3.5 },
    { icon: '🎯', delay: 1.5, duration: 4.5 },
    { icon: '⭐', delay: 2, duration: 3 },
    { icon: '📚', delay: 2.5, duration: 4 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgrounds.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden" style={{ 
      background: backgrounds[currentImage],
      transition: 'background 1s ease-in-out'
    }}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating animated elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((elem, idx) => (
          <div
            key={idx}
            className="absolute text-4xl animate-float"
            style={{
              left: `${15 + (idx * 15)}%`,
              top: `${20 + (idx % 3) * 20}%`,
              animationDelay: `${elem.delay}s`,
              animationDuration: `${elem.duration}s`,
            }}
          >
            {elem.icon}
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Vivek<span className="text-yellow-300">Test</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/95 mb-4 font-medium drop-shadow">
            Online MCQ Examination System
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
            Create quizzes, share codes, and assess knowledge instantly. Fast, simple, and effective learning platform.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link 
              href="/signup" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              🚀 Get Started Free
            </Link>
            <Link 
              href="/student/take" 
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              📝 Join Quiz Now
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-semibold">Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔐</span>
              <span className="font-semibold">Secure Access</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              <span className="font-semibold">Mobile Friendly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="white"/>
        </svg>
      </div>
    </div>
  )
}
