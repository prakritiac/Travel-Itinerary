import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'

export default async function ExplorePage() {
  const supabase = createClient()

  const { data: trips, error } = await supabase
    .from('trips')
    .select('id, title, destination, start_date, end_date')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="page-header">
        <h1>Explore Trips</h1>
      </div>

      {error && <div className="error">{error.message}</div>}

      {trips && trips.length === 0 && (
        <div className="empty">No public trips yet. Be the first to share one!</div>
      )}

      {trips?.map((trip) => (
        <Link key={trip.id} href={`/trips/${trip.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card">
            <h3>{trip.title}</h3>
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
