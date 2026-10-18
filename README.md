# KitHomes

KitHomes is a T3kit rental marketplace for Nigeria, focused on verified homes, transparent renting, direct landlord-to-tenant communication, student accommodation, and roommate matching.

## Stack

- Next.js App Router
- React 19 and TypeScript
- Responsive mobile-first CSS
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What works in this prototype

- Search rental listings by keyword and university.
- Filter by home type, maximum yearly rent, and verification status.
- Browse properties, save favourites, and view property details.
- Compare illustrative full-payment and installment plans.
- Browse sample roommate profiles by campus.
- Explore demo inbox, profile, notifications, and property-posting form.
- Responsive mobile and desktop layouts.

## Important prototype limitations

This is a frontend migration from the supplied HTML prototype. Listings, roommate profiles, conversations, payment calculations, and forms use illustrative local demo data. It does **not** yet process payments, verify identity or property ownership, upload photos, send real messages, or persist user accounts. The verification badges are sample UI states and must not be treated as real-world verification.

## Production roadmap

1. Authentication and renter/landlord roles.
2. Managed database and image storage.
3. Admin workflow for property and landlord verification.
4. Real-time chat and notifications.
5. Licensed Nigerian payment gateway integration with legal/compliance review.
6. Server-side validation, reporting/moderation, rate limits, and privacy controls.
7. Tests and CI checks for builds, type safety, and key user flows.
