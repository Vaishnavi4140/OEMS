'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: number
  name: string
  email: string
  role: 'teacher' | 'student'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, password: string, role: 'teacher' | 'student') => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load user from sessionStorage on mount
    const stored = sessionStorage.getItem('vtest_current')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse user', e)
      }
    }
  }, [])

  const signup = (name: string, email: string, password: string, role: 'teacher' | 'student'): boolean => {
    const users = JSON.parse(localStorage.getItem('vtest_users') || '[]')
    
    if (users.find((u: any) => u.email === email.toLowerCase())) {
      alert('Email already exists')
      return false
    }

    const newUser = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      password,
      role
    }

    users.push(newUser)
    localStorage.setItem('vtest_users', JSON.stringify(users))
    return true
  }

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('vtest_users') || '[]')
    const foundUser = users.find((u: any) => u.email === email.toLowerCase() && u.password === password)

    if (!foundUser) {
      alert('Invalid credentials')
      return false
    }

    const userSession: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role
    }

    setUser(userSession)
    sessionStorage.setItem('vtest_current', JSON.stringify(userSession))
    return true
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('vtest_current')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
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
