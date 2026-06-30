'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-browser'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({ email, password })

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="form-box">
        <h2>Check your email</h2>
        <p>We sent a confirmation link to {email}. Confirm it, then log in.</p>
        <Link href="/login" className="btn" style={{ display: 'inline-block', textDecoration: 'none', marginTop: 12 }}>
          Go to login
        </Link>
      </div>
    )
  }

  return (
    <div className="form-box">
      <h2>Create account</h2>
      <form onSubmit={handleSignup}>
        {error && <div className="error">{error}</div>}
        <label htmlFor="email">Email</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn" type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p style={{ fontSize: 13, marginTop: 16 }}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  )
}
