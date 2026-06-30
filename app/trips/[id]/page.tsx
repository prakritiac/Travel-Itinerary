import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export default async function TripDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: trip } = await supabase
    .from('trips')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!trip) {
    notFound()
  }

  const { data: days } = await supabase
    .from('itinerary_days')
    .select('*, itinerary_items(*)')
    .eq('trip_id', params.id)
    .order('day_date', { ascending: true })

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{trip.title}</h1>
          <div className="meta">
            {trip.destination} {trip.start_date && `· ${trip.start_date} → ${trip.end_date}`}
            {trip.is_public && <span className="badge" style={{ marginLeft: 8 }}>Public</span>}
          </div>
        </div>
      </div>

      {(!days || days.length === 0) && (
        <div className="empty">No days added yet for this trip.</div>
      )}

      {days?.map((day) => (
        <div key={day.id} className="day-block">
          <h3>{day.day_date}</h3>
          {day.notes && <p className="meta">{day.notes}</p>}
          {day.itinerary_items
            ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
            .map((item: any) => (
              <div key={item.id} className="item-row">
                <div>
                  <span className="badge">{item.item_type}</span>{' '}
                  <strong>{item.title}</strong>
                  {item.location && <div className="meta">{item.location}</div>}
                  {item.notes && <div className="meta">{item.notes}</div>}
                </div>
                <div className="meta">
                  {item.start_time?.slice(0, 5)}
                  {item.cost ? ` · ${item.currency} ${item.cost}` : ''}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
