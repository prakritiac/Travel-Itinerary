import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import NewTripForm from './new-trip-form'

export default async function TripsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: trips, error } = await supabase
    .from('trips')
    .select('id, title, destination, start_date, end_date, is_public')
    .order('start_date', { ascending: true })

  return (
    <div>
      <div className="page-header">
        <h1>My Trips</h1>
        <form action="/auth/signout" method="post">
          <button className="btn btn-secondary" type="submit">Log out</button>
        </form>
      </div>

      <NewTripForm />

      {error && <div className="error">{error.message}</div>}

      {trips && trips.length === 0 && (
        <div className="empty">No trips yet. Create your first one above.</div>
      )}

      {trips?.map((trip) => (
        <Link key={trip.id} href={`/trips/${trip.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card">
            <h3>{trip.title} {trip.is_public && <span className="badge">Public</span>}</h3>
            <div className="meta">
              {trip.destination || 'No destination set'}
              {trip.start_date && ` · ${trip.start_date} → ${trip.end_date}`}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
