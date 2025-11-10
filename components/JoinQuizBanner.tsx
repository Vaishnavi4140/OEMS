'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function JoinQuizBanner() {
  const [code, setCode] = useState('')
  const router = useRouter()

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim()) {
      router.push(`/student/take?code=${code.toUpperCase()}`)
    }
  }

  return (
    <div className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <form onSubmit={handleJoin} className="flex items-center justify-end gap-3">
          <label className="text-gray-700 font-medium text-sm">
            Join with code:
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center font-mono text-sm uppercase w-32"
            maxLength={8}
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition-all font-semibold text-sm flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Join
          </button>
        </form>
      </div>
    </div>
  )
}
