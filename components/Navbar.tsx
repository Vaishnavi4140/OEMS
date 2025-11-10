'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-white p-2 rounded-lg shadow-md group-hover:shadow-xl transition-shadow">
              <svg 
                className="w-8 h-8 text-blue-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">
              Vivek<span className="text-yellow-300">Test</span>
            </span>
          </Link>
          
          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              href="/#intro" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
            >
              Intro
            </Link>
            <Link 
              href="/#how" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
            >
              How to Use
            </Link>
            <Link 
              href="/#features" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
            >
              Features
            </Link>
            <Link 
              href="/#quick-actions" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
            >
              Quick Actions
            </Link>
          </div>

          {/* Right Side - Sign Up & Login */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/signup" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all font-medium"
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              className="bg-yellow-400 text-blue-900 px-5 py-2 rounded-lg hover:bg-yellow-300 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
