import './globals.css'
import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Travel Itinerary',
  description: 'Plan and share your trips',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <Link href="/trips" className="brand">✈️ Itinerary</Link>
          <div className="nav-links">
            <Link href="/trips">My Trips</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/login">Login</Link>
          </div>
        </nav>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
