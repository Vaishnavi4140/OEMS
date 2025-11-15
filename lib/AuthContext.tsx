'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi, ApiError } from './api'

export interface User {
  id: string
  name: string | null
  email: string
  role: 'teacher' | 'student'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, role: 'teacher' | 'student') => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const stored = localStorage.getItem('vtest_current')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse user', e)
      }
    }
    setLoading(false)
  }, [])

  const signup = async (name: string, email: string, password: string, role: 'teacher' | 'student'): Promise<boolean> => {
    try {
      await authApi.signup(name, email, password, role)
      return true
    } catch (error) {
      if (error instanceof ApiError) {
        alert(error.message)
      } else {
        alert('Signup failed. Please try again.')
      }
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login(email, password)
      setUser(response.user)
      return true
    } catch (error) {
      if (error instanceof ApiError) {
        alert(error.message)
      } else {
        alert('Login failed. Please try again.')
      }
      return false
    }
  }

  const logout = () => {
    authApi.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
