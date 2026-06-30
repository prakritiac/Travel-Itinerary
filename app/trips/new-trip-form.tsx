'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function NewTripForm() {
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('You must be logged in.')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('trips').insert({
      owner_id: user.id,
      title,
      destination,
      start_date: startDate || null,
      end_date: endDate || null,
      is_public: isPublic,
    })

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setTitle('')
    setDestination('')
    setStartDate('')
    setEndDate('')
    setIsPublic(false)
    setOpen(false)
    router.refresh()
  }

  if (!open) {
    return (
      <button className="btn" onClick={() => setOpen(true)} style={{ marginBottom: 20 }}>
        + New Trip
      </button>
    )
  }

  return (
    <form onSubmit={handleCreate} className="card">
      {error && <div className="error">{error}</div>}
      <label htmlFor="title">Trip title</label>
      <input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Japan 2026" />
      <label htmlFor="destination">Destination</label>
      <input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Tokyo" />
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="start">Start date</label>
          <input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="end">End date</label>
          <input id="end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          style={{ width: 'auto', marginBottom: 0 }}
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Make this trip public (visible on Explore)
      </label>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create trip'}</button>
        <button className="btn btn-secondary" type="button" onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </form>
  )
}
