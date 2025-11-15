// API Client utilities for making authenticated requests

const API_BASE = '/api'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

function getAuthHeader(): HeadersInit {
  const token = localStorage.getItem('vtest_token')
  if (token) {
    return { 'Authorization': `Bearer ${token}` }
  }
  return {}
}

async function handleResponse(response: Response) {
  const data = await response.json()
  
  if (!response.ok) {
    throw new ApiError(response.status, data.error || 'An error occurred')
  }
  
  return data
}

// Auth APIs
export const authApi = {
  signup: async (name: string, email: string, password: string, role: string) => {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    })
    return handleResponse(response)
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await handleResponse(response)
    
    // Store token and user in localStorage
    if (data.token) {
      localStorage.setItem('vtest_token', data.token)
      localStorage.setItem('vtest_current', JSON.stringify(data.user))
    }
    
    return data
  },

  logout: () => {
    localStorage.removeItem('vtest_token')
    localStorage.removeItem('vtest_current')
  }
}

// Quiz APIs
export const quizApi = {
  create: async (title: string, questions: any[]) => {
    const response = await fetch(`${API_BASE}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ title, questions })
    })
    return handleResponse(response)
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE}/quiz`, {
      headers: getAuthHeader()
    })
    return handleResponse(response)
  },

  getByCode: async (code: string) => {
    const response = await fetch(`${API_BASE}/quiz/${code}`)
    return handleResponse(response)
  },

  submit: async (quizId: string, answers: Record<string, number>) => {
    const response = await fetch(`${API_BASE}/quiz/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ quizId, answers })
    })
    return handleResponse(response)
  },

  getResults: async (quizId: string) => {
    const response = await fetch(`${API_BASE}/quiz/results/${quizId}`, {
      headers: getAuthHeader()
    })
    return handleResponse(response)
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE}/quiz/edit/${id}`, {
      headers: getAuthHeader()
    })
    return handleResponse(response)
  },

  update: async (id: string, data: { title: string; questions: any[] }) => {
    const response = await fetch(`${API_BASE}/quiz/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  }
}
