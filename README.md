# AgriLink

A frontend prototype for AgriLink, an agricultural marketplace connecting farmers with restaurants, hotels, grocery stores and markets. Built with React, TypeScript, Tailwind CSS and React Router, using mock data (no backend yet).

The app deliberately ships **two separate experiences** that share only design tokens and data:

- **Farmer experience** (`/farmer`) — mobile-first, bottom navigation, big tap targets, a 5-step "Sell Products" flow. Optimized for people with limited technical experience.
- **Buyer experience** (`/buyer`) — desktop-first, left sidebar navigation, search/filters, comparison-friendly product cards, a 7-step "Buy Request" flow, quality verification and complaint/refund pages.
- **Admin console** (`/admin`) — a lightweight overview stub for the sections described in the spec (user, farmer, product, order, complaint, inspector management, reports).

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to http://localhost:5173). Open `/` to switch between the Farmer and Buyer views.

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/       Shared UI: layouts, cards, badges, ratings, step wizard
  features/
    farmer/         Farmer dashboard, sell flow, orders, sales, profile
    buyer/          Buyer dashboard, marketplace, buy requests, orders, quality, complaints
    admin/          Admin console stub
  data/             Mock data (farmers, products, orders, buy requests, reviews, complaints)
  lib/store.tsx     App-wide mock state (React context) so actions like posting a
                    buy request or listing a product are reflected across pages
  types/            Shared TypeScript interfaces (User, Farmer, Buyer, Product,
                    BuyRequest, Order, QualityVerification, Review, Complaint, Notification...)
```

## Notes on the mock backend

- All data lives in `src/data/mockData.ts` and is loaded into a React context (`src/lib/store.tsx`) at startup, so actions taken in one screen (e.g. posting a buy request) are visible elsewhere in the session.
- Nothing is persisted — refreshing the page resets to the seed data.
- Product photos are placeholder stock photography from Unsplash; swap in real photo upload/storage when a backend is available.
- The frontend is structured to be easy to wire up to a REST API: replace the functions in `src/lib/store.tsx` with real fetch/mutate calls and keep the same shapes from `src/types`.

## Design system

- Colors: soil, leaf, harvest and clay tones on a warm neutral canvas — a natural agricultural palette rather than a generic SaaS one (see `tailwind.config.js`).
- Type: "Fraunces" for headings, "Work Sans" for UI text and body copy.
- The farmer UI uses larger radii (`rounded-farmer`, 22px) and big buttons; the buyer UI uses tighter radii (`rounded-buyer`, 10px) suited to denser information.
