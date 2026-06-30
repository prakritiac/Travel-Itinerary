# Travel Itinerary (Next.js + Supabase)

Starter app wired up to your Supabase project (`tlfieygtsfrvhmuelkag`).

## Setup

```bash
npm install
npm run dev
```

`.env.local` is already filled in with your project URL and publishable key.

## What's included

- **Auth**: `/signup` and `/login` using Supabase Auth (email/password). `middleware.ts` keeps sessions fresh across requests.
- **My Trips** (`/trips`): protected page, lists trips you own, lets you create a new trip (with a "make public" toggle).
- **Explore** (`/explore`): public page, no login required, shows every trip marked public.
- **Trip detail** (`/trips/[id]`): shows itinerary days and items. Works whether you're the owner or just viewing a public trip — Row Level Security on the database handles access automatically.

## What's not included (next steps)

- Adding days/items to a trip via the UI (currently you'd insert via Supabase Studio or SQL — happy to add this form next).
- Inviting collaborators to a trip (the `trip_collaborators` table and RLS policies already support it).
- Email confirmation redirect URL — set this in Supabase Auth settings to point at your deployed domain.
- Password reset flow.

## Database

Tables: `trips`, `trip_collaborators`, `itinerary_days`, `itinerary_items`. All have Row Level Security enabled:
- Owners see/edit their own trips.
- Collaborators (role: `editor`/`viewer`) get scoped access.
- Anyone (including logged-out users) can view trips where `is_public = true`.

## Deploying

Push to GitHub and deploy on Vercel (or similar). Add the same two env vars in your hosting provider's dashboard, and add your production URL to Supabase Auth → URL Configuration → Redirect URLs.
