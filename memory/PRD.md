# Delta Roofing Inc. — Commercial Roofing Website

**Project:** Delta Roofing Inc. (pivoted from Blue Haven exterior cleaning clone)
**Status:** Production-ready commercial roofing landing page
**Last updated:** January 2026

---

## Original Problem Statement

Clone the Blue Haven repo from GitHub, then transform it into a modern, unique website for **Delta Roofing Inc.** — a commercial roofing company serving the Greater Toronto Area. Theme: navy + white with black accents.

---

## Business Information

- **Company:** Delta Roofing Inc.
- **Address:** 1000 Martin Grove Rd, Etobicoke, ON M9W 4V8
- **Phone:** 416-798-0977
- **Email:** admin@deltaroofing.ca
- **Hours:** 7 AM – 7 PM, 7 days a week (24/7 emergency dispatch)
- **Service Area:** Greater Toronto Area
- **Focus:** Commercial roofing — TPO, EPDM, modified bitumen, PVC, metal, coatings

---

## User Personas

1. **Property / Facility Manager** — Multi-building portfolio, needs preventative maintenance + reliable emergency response.
2. **Building Owner / REIT Asset Manager** — Capital-planning roof replacements, looking for warranties + ROI.
3. **General Contractor** — Subcontracts roofing on commercial retrofits, needs WSIB / insurance / on-time delivery.

---

## Core Services (6)

1. Estimates & Inspections (drone surveys, moisture scans, itemized quotes)
2. Maintenance & Repair (preventative programs, leak / flashing / seam work)
3. Emergency Repair Service (24/7 dispatch, same-day tarp, insurance billed direct)
4. Alterations & Retrofits (HVAC curbs, skylights, hatches, drains)
5. Coating Systems (silicone, acrylic, SPF)
6. Roof Replacements (TPO, EPDM, mod-bit, PVC, metal)

---

## What's Implemented

### Frontend (`/app/frontend/src/pages/Home.jsx`)
- **Header** — White-cased Delta logo + scroll-aware transparency, dropdown nav, "Free Quote" CTA
- **Hero** — Toronto skyline bg with navy gradient, big editorial type ("Commercial roofing for serious buildings."), 4-stat card (15+ yrs / 5M+ sq ft / 24/7 / 100% WSIB)
- **Trust marquee** — Black band scrolling Licensed/WSIB/GAF/IKO/Carlisle/Firestone/BBB/$5M Liability
- **Services grid** — 6 cards (3×2), white→navy hover transition, lucide icons
- **Why Delta** — Full navy section, numbered (01–04) editorial layout for property-manager focus, certifications, insurance, emergency dispatch
- **Our Work** — Swipeable carousel (mobile + desktop) with project labels
- **Reviews** — 5 B2B testimonials in a swipeable carousel with avatars + 4.9★ aggregate
- **Service Areas** — Leaflet map (CartoDB Voyager tiles, no Ukraine flag) centered on Etobicoke HQ with custom navy pin + popup, 10 city pills with fly-to animation, "Open in Google Maps" pill
- **Contact** — Navy section, 4 info cards (phone / email / hours / address), big quote-form card (name, phone, service-select, message)
- **Footer** — Black, full address + email + phone + "Licensed · Insured · WSIB Covered"

### Backend (`/app/backend/server.py`)
- `POST /api/quote-request` — saves to MongoDB `quote_requests` collection, prepares HTML email (currently MOCKED — logs only) to admin@deltaroofing.ca
- Email template restyled with Delta navy branding

### Tech Stack
- React 19 + CRA + Tailwind + Shadcn UI + Lucide icons + Sonner toasts
- React Leaflet + Leaflet for the map (no API key required)
- FastAPI + Motor (async MongoDB)
- Fonts: Bricolage Grotesque (display) + Plus Jakarta Sans (body)

---

## What's Mocked / Not Yet Real

- **Email delivery is MOCKED** — `send_quote_email` logs to console only. SMTP credentials must be configured (Gmail App Password / SendGrid / AWS SES) to actually send emails to `admin@deltaroofing.ca`.

---

## Prioritized Backlog

### P1
- Wire real SMTP / SendGrid for the quote-request email
- Add an admin "Lead Inbox" page (password-protected) to view/manage submissions stored in MongoDB

### P2
- Project case-study pages (per-gallery-item detail with scope, sq ft, materials)
- Online maintenance-program signup flow with subscription pricing
- Google Analytics + GTM
- Schema.org `LocalBusiness` + `Service` markup for SEO
- Blog / resource section (TPO vs EPDM, when to coat vs replace, etc.)

---

## Next Tasks

- Configure SendGrid (or chosen SMTP) and switch the email function from mock to live
- Build admin lead inbox

---

## Update Log

- **Jan 2026** — Forked Blue Haven repo, rebuilt as Delta Roofing
- **Jan 2026** — Migrated map from OpenStreetMap embed → Google Maps embed → React Leaflet (final, fully mobile-touch responsive, no API key, no flag)
- **Jan 2026** — Updated services to commercial scope (6 services), swapped all imagery to commercial-roofing stock photos, rewrote all copy for B2B audience
- **Jan 2026** — Wired real contact info: 1000 Martin Grove Rd Etobicoke / 416-798-0977 / admin@deltaroofing.ca
