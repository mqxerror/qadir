---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
workflowType: 'epics'
project_name: 'qadir'
user_name: 'Mqxerrormac16'
date: '2026-02-12'
status: 'complete'
completedAt: '2026-02-12'
---

# QADIR Montreal - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for QADIR Montreal, decomposing the requirements from the PRD, Architecture Decision Document, and UX Design Specification into implementable stories organized by user value.

**Phase 1 Scope:** 38 Functional Requirements (FR1-FR18, FR26-FR45) across 9 epics.
**Deferred to CMS Phase:** FR19-FR25 (Content Management via Strapi — separate billable phase).

## Requirements Inventory

### Functional Requirements

**Brand Presentation:**
- FR1: Visitors can view the QADIR brand story, positioning, and origin narrative
- FR2: Visitors can view the four Signature Blends as a curated collection with distinct roles
- FR3: Visitors can view individual blend detail pages with name, meaning, role, olfactive profile, and description
- FR4: Visitors can navigate between all site sections via persistent navigation
- FR5: Visitors can access primary calls-to-action (Discover the Collection, Book a Consultation) from the homepage
- FR6: The website renders the approved QADIR seal (primary with French motto, or minimal variant) per brand usage guidelines

**Appointment Booking:**
- FR7: Clients can select an appointment type (in-store fragrance consultation or private discovery session)
- FR8: Clients can view available appointment times and select a preferred slot
- FR9: Clients can submit a booking request with their contact information
- FR10: Clients receive an email confirmation within 10 seconds of booking submission
- FR11: The founder receives notification of each new booking via email
- FR12: The booking system prevents double-booking of the same time slot

**Lead Capture & Contact:**
- FR13: Visitors can submit a contact inquiry with Name, Email, Subject, and Message
- FR14: Visitors can request VIP/Private access with Name, Email, and Message
- FR15: The system routes form submissions to the founder's inbox within 30 seconds
- FR16: The system categorizes inquiries by type (General, Press, Wholesale, VIP) based on subject selection
- FR17: The system validates form inputs server-side before processing (email format, required fields, sanitization)
- FR18: The system protects forms against spam without user-facing CAPTCHA

**Content Management (DEFERRED — CMS Phase):**
- FR19: ~~The founder can edit all text content on any page through the CMS admin interface~~ — Deferred
- FR20: ~~The founder can add, edit, or remove Signature Blend entries~~ — Deferred
- FR21: ~~The founder can upload and manage images through the CMS~~ — Deferred
- FR22: ~~The founder can publish content changes that appear on the live site within 60 seconds~~ — Deferred
- FR23: ~~The founder can preview content changes before publishing~~ — Deferred
- FR24: ~~The founder can revert content to a previous version~~ — Deferred
- FR25: ~~The CMS provides structured content types for each page~~ — Deferred

**Analytics & Monitoring:**
- FR26: The system tracks page views, unique visitors, and traffic sources
- FR27: The system tracks appointment booking conversion funnel (page view → start booking → complete booking)
- FR28: The system tracks form submission rates by type
- FR29: The founder can access analytics data through a dashboard
- FR30: Analytics collection respects user privacy (no invasive tracking, no third-party data sharing)

**SEO & Discoverability:**
- FR31: Each page renders with unique, descriptive meta title and description tags
- FR32: The system generates an XML sitemap automatically
- FR33: The system provides Open Graph and Twitter Card meta tags for social sharing
- FR34: The system generates semantic HTML with proper heading hierarchy
- FR35: The system supports structured data (JSON-LD) for organization and product information

**Administration & Access:**
- FR36: The founder can log into the CMS with secure authentication (email + password with MFA option)
- FR37: The founder has full administrative access to all CMS features
- FR38: The system provides role-based access for future team members (view, edit, publish permissions)
- FR39: The founder can access hosting control panel and domain management independently
- FR40: All system credentials and access are owned by QADIR Montreal, not by any vendor or developer

**Architecture Extensibility:**
- FR41: The system exposes content via API (REST or GraphQL) for frontend consumption
- FR42: The database schema supports adding product catalog fields (price, SKU, inventory) without migration breaking changes
- FR43: The system supports adding multilingual content fields to existing content types
- FR44: The booking system data model supports linking to future CRM client profiles
- FR45: The system supports adding payment processing endpoints without architectural restructuring

### Non-Functional Requirements

**Performance:**
- NFR1: First Contentful Paint completes within 1.5 seconds on 4G mobile connections
- NFR2: Largest Contentful Paint completes within 2.5 seconds on 4G mobile connections
- NFR3: Cumulative Layout Shift score remains below 0.1
- NFR4: Time to Interactive is under 3 seconds on desktop
- NFR5: Image assets optimized (WebP, responsive sizes, lazy loading) — total page weight under 2MB
- NFR6: Lighthouse Performance score exceeds 90 on all pages

**Security:**
- NFR7: All data transmitted over HTTPS with TLS 1.2+ encryption
- NFR8: Form submissions sanitized server-side to prevent XSS and injection attacks
- NFR9: CMS admin access protected by secure authentication with session management
- NFR10: API endpoints implement rate limiting (100 requests/minute per IP for public endpoints)
- NFR11: No sensitive data exposed in client-side code or network responses
- NFR12: Dependencies audited for known vulnerabilities before deployment and monthly thereafter
- NFR13: CORS configured to allow only the QADIR domain origin

**Scalability:**
- NFR14: System supports up to 1,000 concurrent visitors without performance degradation
- NFR15: Static assets served via CDN for global delivery performance
- NFR16: Architecture supports horizontal scaling of backend services
- NFR17: Database supports 10,000+ content entries and 50,000+ form submissions

**Accessibility:**
- NFR18: Website meets WCAG 2.1 Level AA compliance for all public-facing pages
- NFR19: All images include descriptive alt text
- NFR20: Navigation is fully keyboard-accessible
- NFR21: Colour contrast ratios meet AA standards (4.5:1 for normal text, 3:1 for large text)
- NFR22: Form fields include associated labels and error messages accessible to screen readers
- NFR23: Focus states are visible on all interactive elements

**Integration:**
- NFR24: CMS content available via documented API with response times under 500ms
- NFR25: Email delivery achieves 99%+ delivery rate via Emailit.com API
- NFR26: Analytics integration operates without blocking page render (async loading)
- NFR27: All third-party integrations use API keys stored in environment variables

**Reliability:**
- NFR28: System maintains 99.5% uptime
- NFR29: Automated daily backups of database with 30-day retention
- NFR30: Deployment process includes zero-downtime strategy
- NFR31: Error monitoring captures and alerts on server errors within 5 minutes

**Maintainability:**
- NFR32: Codebase follows consistent coding standards enforced by linting (ESLint, Prettier)
- NFR33: Frontend components are modular and reusable with clear separation of concerns
- NFR34: API endpoints documented with OpenAPI/Swagger specification
- NFR35: Deployment automated via CI/CD pipeline
- NFR36: Environment configuration externalized via environment variables

### Additional Requirements

**From Architecture Document:**
- Starter template: Turborepo + pnpm (manual assembly) — Epic 1 Story 1
- Monorepo structure: `apps/web` (Next.js 16.1), `apps/api` (NestJS 11.x), `packages/shared-types`, `packages/ui`, `packages/eslint-config`, `packages/typescript-config`
- Hybrid data access: Prisma (database queries) + Supabase (auth/storage)
- Content abstraction layer: NestJS ContentModule serves static JSON via REST — Strapi swaps in behind same interface in CMS Phase
- Zod shared schemas in `packages/shared-types` for frontend + backend validation
- Emailit.com API for transactional email (booking confirmations, form routing)
- Webhook system: NestJS EventEmitter2 → outbound HTTP POST per event type (n8n-ready)
- Docker + docker-compose deployment (web, api, nginx services)
- Nginx reverse proxy with Let's Encrypt SSL termination
- GitHub Actions CI/CD: lint → test → build → SSH deploy
- Sentry error tracking with source maps
- Daily pg_dump backups via cron (30-day retention)
- API documentation: Swagger/OpenAPI via @nestjs/swagger
- Data model entities: Blend, Appointment, FormSubmission, WebhookConfig
- Phase 2 extensibility: nullable fields (price, sku, clientId) in Prisma schema from day one

**From UX Design Specification:**
- "Editorial Stillness" design direction — typography-dominant, maximum whitespace
- shadcn/ui + Radix UI Primitives + Motion Primitives (layered architecture)
- 5 custom components: HeroSection, BlendCard, OlfactiveProfile, BookingFlow, SealMark
- Design tokens: 4-color palette (#111111, #F6F5F2, #5A4632, #C8C6C1), semantic colors (success #2D5A3D, error #8B3A3A)
- Typography: Canela (serif headlines), Inter (sans body), type scale defined for desktop + mobile
- Spacing system: 8px base unit, 10-step scale (4px to 128px)
- Layout grid: 4-col mobile, 8-col tablet, 12-col desktop, max-width 1200px
- Mobile-first responsive design with 3 breakpoints (768px, 1024px, 1440px)
- WCAG 2.1 AA accessibility compliance
- `prefers-reduced-motion` disables all animations
- Skip-to-content link as first focusable element
- Honeypot spam protection (no CAPTCHA)
- Inline form validation with Zod (error below field, muted burgundy)
- Button hierarchy: Primary (solid charcoal), Secondary (outline), Tertiary (text link), Disabled (stone grey)
- Form fields: 44px minimum height, stone grey border, labels above inputs
- Navigation: horizontal desktop (Inter 14px uppercase), hamburger mobile (full-screen overlay)
- Image treatment: sharp rectangles, lazy loading, WebP, responsive srcset
- Scroll behavior: InView reveal animation (translateY 12px, 300ms), TextEffect on hero (400ms)

### FR Coverage Map

| FR | Epic | Coverage |
|---|---|---|
| FR1 | Epic 2 | Homepage brand story + About page |
| FR2 | Epic 2 | Signature Blends collection page |
| FR3 | Epic 2 | Individual blend detail pages with OlfactiveProfile |
| FR4 | Epic 1 | Persistent navigation (header, footer, routing) |
| FR5 | Epic 2 | Homepage CTAs (Discover + Book) |
| FR6 | Epic 1 | SealMark component renders approved seal variants |
| FR7 | Epic 3 | Appointment type selection in BookingFlow |
| FR8 | Epic 3 | Availability API + time slot picker |
| FR9 | Epic 3 | Booking submission with contact info |
| FR10 | Epic 3 | Email confirmation via Emailit.com (within 10s) |
| FR11 | Epic 3 | Founder notification via Emailit.com |
| FR12 | Epic 3 | Double-booking prevention in BookingService |
| FR13 | Epic 4 | Contact form (Name, Email, Subject, Message) |
| FR14 | Epic 4 | VIP form (Name, Email, Message) |
| FR15 | Epic 4 | Email routing to founder inbox (within 30s) |
| FR16 | Epic 4 | Subject-based categorization routing |
| FR17 | Epic 4 | Server-side Zod validation + sanitization |
| FR18 | Epic 4 | Honeypot spam protection |
| FR19-FR25 | Deferred | CMS Phase (Strapi — separate billable scope) |
| FR26 | Epic 6 | Privacy-respecting analytics (page views, visitors, sources) |
| FR27 | Epic 6 | Booking conversion funnel tracking |
| FR28 | Epic 6 | Form submission rate tracking by type |
| FR29 | Epic 6 | Founder analytics dashboard access |
| FR30 | Epic 6 | Privacy-first analytics (no invasive tracking) |
| FR31 | Epic 5 | Unique meta title + description per page |
| FR32 | Epic 5 | XML sitemap generation |
| FR33 | Epic 5 | Open Graph + Twitter Card meta tags |
| FR34 | Epic 5 | Semantic HTML + heading hierarchy |
| FR35 | Epic 5 | Structured data (JSON-LD) |
| FR36 | Epic 7 | Supabase Auth admin login (email + password + MFA) |
| FR37 | Epic 7 | Full admin access to backend features |
| FR38 | Epic 7 | Role-based access foundation |
| FR39 | Epic 7 | Hosting panel + domain access documentation |
| FR40 | Epic 7 | QADIR owns all credentials (no vendor lock-in) |
| FR41 | Epic 2 | Content exposed via REST API (content abstraction layer) |
| FR42 | Epic 7 | Prisma schema with nullable Phase 2 fields (price, sku, inventory) |
| FR43 | Epic 7 | Content model supports multilingual fields |
| FR44 | Epic 3 | Appointment model with nullable clientId for CRM |
| FR45 | Epic 7 | API-first architecture supports payment endpoint addition |

## Epic List

### Epic 1: Project Foundation & Brand Identity
Visitors experience a professional luxury website shell with QADIR's brand identity — navigation, typography, seal, and the "Editorial Stillness" design direction. This epic establishes the monorepo, design system, and site structure that all subsequent epics build upon.
**FRs covered:** FR4, FR6

### Epic 2: Brand Story & Collection Experience
Visitors can discover the QADIR brand story, explore the four Signature Blends as a curated collection, and view individual blend detail pages with olfactive profiles presented as editorial prose. Content is served via the NestJS content abstraction layer.
**FRs covered:** FR1, FR2, FR3, FR5, FR41

### Epic 3: Appointment Booking Experience
Clients can book in-store consultations and private discovery sessions through a 3-step booking wizard, with availability checking, double-booking prevention, and email confirmations delivered to both client and founder.
**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR12, FR44

### Epic 4: Contact & Lead Capture
Visitors can submit contact inquiries and VIP access requests through brand-appropriate forms. Submissions are categorized, validated, routed to the founder's inbox, and protected against spam.
**FRs covered:** FR13, FR14, FR15, FR16, FR17, FR18

### Epic 5: SEO & Discoverability
QADIR is discoverable through search engines and social sharing via unique meta tags, sitemap, structured data, semantic HTML, and Open Graph tags on every page.
**FRs covered:** FR31, FR32, FR33, FR34, FR35

### Epic 6: Analytics & Business Insights
The founder has privacy-respecting visibility into website traffic, booking conversion funnels, and form submission rates — enabling data-driven decisions without compromising visitor privacy.
**FRs covered:** FR26, FR27, FR28, FR29, FR30

### Epic 7: Administration & Platform Security
The founder can securely manage the platform with authenticated admin access, view appointments and submissions, and has documented ownership of all credentials. The data model is extensible for Phase 2.
**FRs covered:** FR36, FR37, FR38, FR39, FR40, FR42, FR43, FR45

### Epic 8: Webhook & Automation System
Business events (bookings, form submissions, leads) trigger configurable outbound webhooks, enabling n8n integration and future automation workflows without code changes.
**FRs covered:** Architecture requirement (supports extensibility goals)

### Epic 9: Production Infrastructure & Deployment
The platform is containerized, deployed to VPS with Nginx reverse proxy and SSL, monitored with Sentry, backed up daily, and continuously deployed via GitHub Actions.
**FRs covered:** Infrastructure NFRs (NFR7, NFR10, NFR11, NFR12, NFR13, NFR15, NFR28-NFR31, NFR35, NFR36)

---

## Epic 1: Project Foundation & Brand Identity

Visitors experience a professional luxury website shell with QADIR's brand identity — persistent navigation, "Editorial Stillness" typography, brand seal, and responsive layout. This epic establishes the Turborepo monorepo, design tokens, and site structure that all subsequent epics build upon.

### Story 1.1: Scaffold Monorepo with Turborepo

As a developer,
I want the QADIR monorepo initialized with Turborepo, Next.js, NestJS, and shared packages,
So that all subsequent development has a consistent, well-structured foundation.

**Acceptance Criteria:**

**Given** a clean repository at github.com/mqxerror/qadir
**When** the scaffold script is executed
**Then** the following structure exists:
- `apps/web/` — Next.js 16.1 application with App Router
- `apps/api/` — NestJS 11.x application
- `packages/shared-types/` — Zod schemas + TypeScript types
- `packages/ui/` — Shared React components
- `packages/eslint-config/` — Shared ESLint rules
- `packages/typescript-config/` — Shared tsconfig
- `turbo.json` — Task pipeline configuration
- `pnpm-workspace.yaml` — Workspace definition
**And** `pnpm dev` starts both web (port 3000) and api (port 3001) simultaneously
**And** `pnpm lint` runs ESLint across all packages
**And** `pnpm build` produces production builds with Turborepo caching
**And** TypeScript 5.9.x is configured across all packages
**And** Prettier is configured with consistent formatting rules
**And** `.gitignore` excludes `node_modules`, `.env*`, `dist`, `.turbo`

### Story 1.2: Implement Design Tokens & Typography System

As a visitor,
I want to see QADIR's brand identity (typography, colors, spacing) consistently applied across the website,
So that the site projects luxury authority from the first pixel.

**Acceptance Criteria:**

**Given** the monorepo is scaffolded
**When** design tokens are implemented in `apps/web/src/styles/globals.css`
**Then** the following CSS custom properties are defined:
- Colors: `--color-primary` (#111111), `--color-background` (#F6F5F2), `--color-accent` (#5A4632), `--color-muted` (#C8C6C1), `--color-success` (#2D5A3D), `--color-error` (#8B3A3A), `--color-focus` (#5A4632)
- Fonts: `--font-serif` (Canela, Playfair Display, Libre Baskerville, serif), `--font-sans` (Inter, Helvetica Neue, Arial, sans-serif)
- Spacing: `--space-1` through `--space-10` (4px to 128px, 8px base unit)
- Border radius: `--radius` (3px)
**And** Tailwind CSS v4 @theme configuration maps brand tokens to Tailwind utilities
**And** Canela font files are loaded (or Playfair Display fallback if Canela license not yet acquired)
**And** Inter font is loaded via Google Fonts or self-hosted
**And** shadcn/ui is initialized with QADIR theme overrides (3px radius, charcoal buttons, no pill shapes)
**And** the type scale matches UX spec (H1: 48px/32px mobile, H2: 36px/26px, H3: 28px/22px, Body: 16px)
**And** `@media (prefers-reduced-motion: reduce)` disables all CSS transitions longer than 150ms

### Story 1.3: Build Site Layout Shell (Header, Footer, Navigation)

As a visitor,
I want persistent navigation and consistent page structure across all site sections,
So that I can move between pages effortlessly and always know where I am.

**Acceptance Criteria:**

**Given** design tokens are implemented
**When** the layout shell is built in `apps/web/src/app/layout.tsx`
**Then** every page includes:
- `<header>` with QADIR seal (left) and horizontal navigation (right) on desktop
- `<nav aria-label="Main navigation">` with items: Home, About, Collection, Discovery, Private, Contact
- Navigation font: Inter 14px, 500 weight, uppercase, 0.08em letter-spacing
- Active page indicated by accent brown underline (2px)
- `<main>` content area centered, max-width 1200px
- `<footer>` with QADIR seal (minimal variant, 40px), copyright, and essential links
- Skip-to-content link as first focusable element
**And** on mobile (< 768px):
- Minimal top bar with QADIR seal (left) and hamburger icon (right)
- Hamburger opens full-screen overlay (#F6F5F2 background)
- Menu items in Canela serif, 28px, centered, generous spacing
- Close button (X icon) at top-right, 44x44px tap target
- Focus is trapped within overlay when open
**And** navigation is fully keyboard-accessible (Tab, Enter, Escape for mobile menu)
**And** header background transitions from transparent to #F6F5F2 after scroll
**And** Next.js App Router route groups are configured: `(marketing)` for SSG pages, `(engagement)` for interactive pages
**And** a global `error.tsx` boundary displays errors in muted burgundy (#8B3A3A) with user-friendly language

### Story 1.4: Create SealMark Component

As a visitor,
I want to see the official QADIR seal rendered consistently across the site,
So that the brand's visual authority is reinforced at every touchpoint.

**Acceptance Criteria:**

**Given** the site layout shell exists
**When** the SealMark component is created in `apps/web/src/components/brand/seal-mark.tsx`
**Then** the component:
- Accepts a `variant` prop: "primary" (French motto ring) or "minimal" (embossing variant)
- Accepts a `size` prop with defaults: Desktop 80px, Mobile 48px, Footer 40px
- Renders the approved SVG files from `public/` directory
- Includes `aria-label="QADIR Montreal"` and `role="img"`
- Renders at the correct size per context (header, hero, footer)
**And** the SVG files `QADIR_English_Seal_Motto_Corrected.svg` and `QADIR_English_Seal_Minimal_Corrected.svg` are placed in `apps/web/public/`
**And** the component has no hover states or animations (static only per UX spec)

---

## Epic 2: Brand Story & Collection Experience

Visitors can discover the QADIR brand story, explore the four Signature Blends (ASL, NOOR, HAYBA, MIQDAR) as a curated collection, and view individual blend detail pages with olfactive profiles presented as editorial prose. Content is served via the NestJS content abstraction layer, ensuring zero frontend rewrite when Strapi replaces static JSON in the CMS Phase.

### Story 2.1: Build Content Abstraction Layer (NestJS ContentModule)

As a developer,
I want a NestJS ContentModule that serves static JSON content via REST endpoints,
So that the frontend consumes content through a stable API contract that can be swapped to Strapi without frontend changes.

**Acceptance Criteria:**

**Given** the NestJS application exists in `apps/api/`
**When** the ContentModule is implemented
**Then** the following exists:
- `api/src/modules/content/content.module.ts` — NestJS module definition
- `api/src/modules/content/content.controller.ts` — REST endpoints
- `api/src/modules/content/content.service.ts` — content retrieval logic
- `api/src/modules/content/content.interface.ts` — TypeScript interfaces defining the content contract
- `api/src/modules/content/data/` — static JSON files for each page and blend
**And** the following endpoints return structured content:
- `GET /api/v1/content/home` — homepage content (hero headline, subtitle, brand story sections)
- `GET /api/v1/content/about` — about page content (founder story, philosophy)
- `GET /api/v1/blends` — all four blends with name, slug, role, imageUrl, sortOrder
- `GET /api/v1/blends/:slug` — single blend detail with name, meaning, role, olfactiveProfile, description
**And** all endpoints return responses in the standard wrapper: `{ "data": T }` or `{ "data": T[], "meta": { "total": number } }`
**And** ContentService uses an interface-based design so the data source (static JSON or future Strapi) is swappable
**And** response times are under 500ms (NFR24)
**And** Zod schemas for content types are defined in `packages/shared-types/`

### Story 2.2: Build Homepage with HeroSection

As a first-time visitor (Nadia),
I want to land on a homepage that communicates luxury authority within 5 seconds through typography, whitespace, and restraint,
So that I immediately perceive QADIR as a legitimate luxury perfumery house.

**Acceptance Criteria:**

**Given** the content abstraction layer serves homepage content
**When** I visit the homepage at `/`
**Then** I see:
- Full-viewport hero section (100vh desktop, 90vh mobile) with warm off-white (#F6F5F2) background
- QADIR seal (SealMark, primary variant) centered or positioned per editorial layout
- Single Canela H1 headline (e.g., "Modern perfumery rooted in oud tradition. Conceived in Montreal.")
- Subtitle in Inter body text
- Two CTAs: "Discover the Collection" (filled button) + "Book a Consultation" (outline button)
- Text fade-in via Motion Primitives TextEffect (400ms, ease-out)
**And** scrolling below the hero reveals:
- Brand story section with editorial pacing (one idea per viewport section)
- Signature Collection preview showing 4 BlendCard tiles with names and roles
- CTA section at bottom
**And** scroll-reveal uses InView animation (translateY 12px → 0, opacity 0 → 1, 300ms ease-out)
**And** `prefers-reduced-motion` disables all animations; content visible immediately
**And** the page is statically generated (SSG) for maximum performance
**And** homepage data is fetched from NestJS API at build time
**And** no pop-ups, no carousels, no parallax effects

### Story 2.3: Build About / Founder Page

As a wholesale evaluator (Marie-Claire) or press contact (Sarah),
I want to read QADIR's origin narrative, craft philosophy, and founder story,
So that I can assess brand credibility within 3 minutes.

**Acceptance Criteria:**

**Given** the content abstraction layer serves about page content
**When** I visit `/about`
**Then** I see:
- Editorial long-form layout with asymmetric text/image splits (60/40 or 70/30)
- Canela H1 page title
- Origin narrative: Montreal, oud tradition, restraint philosophy
- Founder story section
- Craft and philosophy section
- Body text in Inter, max reading width 680px
**And** the page uses SSG (static generation) with content from NestJS API
**And** scroll-reveal animations follow the established InView pattern
**And** images are sharp rectangles (no rounded corners), lazy loaded, WebP format
**And** semantic HTML is used throughout (`<article>`, `<section>` with headings)

### Story 2.4: Build Signature Blends Collection Page

As a visitor,
I want to view all four Signature Blends as a curated collection with distinct roles,
So that I understand QADIR's fragrance offering as a narrative arc, not a product grid.

**Acceptance Criteria:**

**Given** the content abstraction layer serves blend data
**When** I visit `/collection`
**Then** I see:
- Canela H1 page title introducing the Signature Collection
- 4 BlendCard components displaying: ASL (Authority), NOOR (Light), HAYBA (Presence), MIQDAR (Depth)
- Each BlendCard shows: blend image (if available), blend name (Canela), role subtitle (Inter), "Explore" link
- Desktop layout: 2x2 grid (280px wide cards) or horizontal 4-across
- Mobile layout: full-width vertical stack, one card per row
- Tablet: 2-per-row grid
**And** BlendCard component is created in `apps/web/src/components/brand/blend-card.tsx`
**And** hovering a BlendCard on desktop shows opacity 0.85 on image + accent underline on "Explore"
**And** entire card is a clickable link to `/collection/[slug]`
**And** each card has `aria-label="Explore [Blend Name] - [Role]"`
**And** page is SSG with blend data fetched from `GET /api/v1/blends` at build time
**And** the collection reads as a curated journey (Authority → Light → Presence → Depth), ordered by sortOrder

### Story 2.5: Build Blend Detail Pages with Olfactive Profile

As a visitor (Nadia),
I want to view each blend's full detail — name, meaning, role, olfactive profile, and description — presented as editorial prose,
So that I can experience the fragrance as considered craft, not marketing copy.

**Acceptance Criteria:**

**Given** the content abstraction layer serves individual blend data
**When** I visit `/collection/asl` (or `/collection/noor`, `/collection/hayba`, `/collection/miqdar`)
**Then** I see:
- Canela H1 with blend name (e.g., "ASL")
- Blend role subtitle (e.g., "Authority")
- Blend meaning description
- Full-width or editorial-width imagery (if available), sharp rectangles
- OlfactiveProfile component displaying fragrance notes in editorial format
**And** OlfactiveProfile component is created in `apps/web/src/components/brand/olfactive-profile.tsx`
**And** OlfactiveProfile uses semantic HTML: `<dl>` with `<dt>` for note categories (Top/Heart/Base) and `<dd>` for note descriptions
**And** olfactive profile text max-width is 680px (reading measure)
**And** scroll-reveal via InView (translateY 12px, 300ms)
**And** navigation between blends is available (e.g., "Next: NOOR" / "Previous: ASL")
**And** page is SSG — generated at build time from `GET /api/v1/blends/:slug`
**And** `generateStaticParams` generates paths for all 4 blends
**And** the Prisma `Blend` model is created with fields: id, name, slug, role, meaning, description, olfactiveProfile (JSON), imageUrl, sortOrder
**And** the Blend model includes nullable extensibility fields: price, sku, inventory, currency (for Phase 2B e-commerce)

---

## Epic 3: Appointment Booking Experience

Clients can book in-store fragrance consultations and private discovery sessions through a clean 3-step wizard. The system checks availability, prevents double-booking, and delivers email confirmations to both the client and founder within 10 seconds.

### Story 3.1: Build Booking API (NestJS BookingModule)

As a developer,
I want a NestJS BookingModule with Prisma database integration for appointment management,
So that the booking flow has a reliable backend with validation and double-booking prevention.

**Acceptance Criteria:**

**Given** the NestJS application and Prisma are configured
**When** the BookingModule is implemented
**Then** the following exists:
- `api/src/modules/booking/booking.module.ts`
- `api/src/modules/booking/booking.controller.ts`
- `api/src/modules/booking/booking.service.ts`
- `api/src/modules/booking/dto/` — CreateAppointmentDto with Zod validation
- Prisma migration creates the `appointments` table
**And** the `Appointment` model includes: id (UUID), type (enum: IN_STORE_CONSULTATION, PRIVATE_DISCOVERY), date, time, name, email, message (optional), status (enum: PENDING, CONFIRMED, CANCELLED), createdAt
**And** the model includes nullable extensibility field: clientId (for Phase 2A CRM link, FR44)
**And** the following endpoints exist:
- `GET /api/v1/appointments/availability` — returns available time slots for a given date
- `POST /api/v1/appointments` — creates a new booking (rate-limited, public)
**And** POST validates input using Zod via ZodValidationPipe (FR17)
**And** BookingService checks slot availability before INSERT (FR12 — no double-booking)
**And** on successful creation, EventEmitter2 emits `booking.created` event with appointment data
**And** POST returns 201 with `{ "data": { id, type, date, time, status: "pending" } }`
**And** Zod schemas for appointment types are defined in `packages/shared-types/src/appointment.ts`

### Story 3.2: Build Availability Checking & Double-Booking Prevention

As a client,
I want to see only available appointment times when booking,
So that I never select a time slot that is already taken.

**Acceptance Criteria:**

**Given** the BookingModule exists with the appointments table
**When** I request `GET /api/v1/appointments/availability?date=2026-03-15`
**Then** the response includes available time slots for that date
**And** slots already booked (status PENDING or CONFIRMED) are excluded from the response
**And** if no date is provided, availability defaults to the next 14 days

**Given** a slot is available for "2026-03-15 at 14:00"
**When** two concurrent booking requests arrive for the same slot
**Then** only one booking succeeds (201 Created)
**And** the second request returns 409 Conflict with error: "This time slot is no longer available"
**And** the availability check and INSERT use a database transaction for atomicity

### Story 3.3: Build BookingFlow Component (3-Step Wizard)

As a client (Nadia),
I want to complete my appointment booking in 3 simple steps without creating an account,
So that I feel invited, not processed, and finish in under 3 minutes.

**Acceptance Criteria:**

**Given** I am on the appointments page at `/appointments`
**When** I interact with the BookingFlow component
**Then** the flow has exactly 3 steps:
- **Step 1:** Select appointment type (radio: "In-store Fragrance Consultation" / "Private Discovery Session")
- **Step 2:** Select date from calendar picker + select time from available slots
- **Step 3:** Enter Name, Email, optional Message. Submit button: "Confirm Booking"
**And** a step indicator shows progress (1/3, 2/3, 3/3) with completed steps showing a checkmark
**And** `aria-current="step"` is set on the active step
**And** focus is managed: on step change, focus moves to the first interactive element of the new step
**And** Back button returns to previous step without data loss
**And** Step 2 fetches availability from `GET /api/v1/appointments/availability` based on selected date
**And** Step 3 validates inputs with Zod (client-side on blur + server-side on submit)
**And** validation errors appear inline below the errored field in muted burgundy (#8B3A3A)
**And** Submit button text changes: "Confirm Booking" → "Booking..." while submitting (button disabled, no spinner)
**And** on success: inline confirmation displays appointment summary (date, time, type) with green checkmark (#2D5A3D)
**And** on error: inline error message below form in muted burgundy, form remains editable
**And** the appointments page uses SSR (not SSG) for live availability data
**And** no account creation required
**And** mobile: each step occupies full viewport height

### Story 3.4: Integrate Email Confirmations (Emailit.com)

As a client,
I want to receive an email confirmation within 10 seconds of submitting my booking,
So that I have assurance my appointment is registered.

**Acceptance Criteria:**

**Given** a booking has been successfully created and `booking.created` event is emitted
**When** the EmailModule processes the event
**Then** the following emails are sent via Emailit.com API:
- **To client:** Booking confirmation with appointment type, date, time, and a professional QADIR-branded message
- **To founder:** Notification with full booking details (name, email, message, appointment type, date, time)
**And** the EmailModule is created at `api/src/modules/email/`
**And** the Emailit.com API key is stored in `EMAILIT_API_KEY` environment variable (never hardcoded)
**And** emails are sent within 10 seconds of booking submission (FR10)
**And** email failures are logged to Sentry but do not fail the booking response
**And** the EmailModule listens to events via EventEmitter2 (no direct module import from BookingModule)

---

## Epic 4: Contact & Lead Capture

Visitors can submit contact inquiries and VIP access requests through brand-appropriate, restraint-first forms. Submissions are validated, categorized, protected against spam, and routed to the founder's inbox within 30 seconds.

### Story 4.1: Build Forms API (NestJS FormsModule)

As a developer,
I want a NestJS FormsModule with Prisma database integration for form submission management,
So that contact and VIP inquiries are persisted, validated, and event-driven.

**Acceptance Criteria:**

**Given** the NestJS application and Prisma are configured
**When** the FormsModule is implemented
**Then** the following exists:
- `api/src/modules/forms/forms.module.ts`
- `api/src/modules/forms/forms.controller.ts`
- `api/src/modules/forms/forms.service.ts`
- `api/src/modules/forms/dto/` — CreateContactDto, CreateVipDto with Zod validation
- Prisma migration creates the `form_submissions` table
**And** the `FormSubmission` model includes: id (UUID), type (enum: CONTACT, VIP, PRESS, WHOLESALE), name, email, subject (nullable), message, createdAt
**And** the model includes nullable extensibility field: clientId (for Phase 2A CRM link)
**And** the following endpoints exist:
- `POST /api/v1/forms/contact` — contact form submission (rate-limited, public)
- `POST /api/v1/forms/vip` — VIP access request (rate-limited, public)
**And** both endpoints validate input using Zod via ZodValidationPipe (FR17)
**And** on successful creation, EventEmitter2 emits `form.submitted` event
**And** for VIP or Wholesale submissions, also emits `lead.received` event
**And** endpoints return 201 with `{ "data": { id, type, status: "received" } }`
**And** Zod schemas for form types are defined in `packages/shared-types/src/form.ts`

### Story 4.2: Build Contact Page & Form

As a wholesale evaluator (Marie-Claire) or press contact (Sarah),
I want to submit a contact inquiry with subject categorization,
So that my message reaches the right person at QADIR.

**Acceptance Criteria:**

**Given** the FormsModule API is available
**When** I visit `/contact`
**Then** I see:
- Canela H1 page title
- Contact form with fields: Name (required), Email (required), Subject (dropdown: General, Press, Wholesale), Message (required)
- Subject dropdown uses shadcn/ui Select component with custom QADIR styling
- Labels above inputs (never floating labels)
- Input height: 44px minimum
- Field borders: 1px solid #C8C6C1
- Focus style: 2px solid #5A4632
- Submit button: "Submit" (primary, solid charcoal)
**And** client-side Zod validation runs on field blur and form submit
**And** error messages appear inline below the errored field in muted burgundy
**And** error language: "Please provide a valid [field name]" — never blames the user
**And** a hidden honeypot field is included for spam protection (FR18)
**And** on submit, button text changes: "Submit" → "Sending..." (disabled)
**And** on success, inline confirmation appears: "Thank you. We've received your message and will respond personally." with green checkmark
**And** no redirect — confirmation on same page
**And** mobile: fields stack vertically, submit button full-width
**And** desktop: Name and Email side-by-side, Subject and Message full-width
**And** the page is SSG with client-side form interaction

### Story 4.3: Build VIP / Private Page & Form

As a VIP client (Khalid),
I want to request private access through a minimal, restraint-first form,
So that I feel recognized and understood, not interrogated.

**Acceptance Criteria:**

**Given** the FormsModule API is available
**When** I visit `/private`
**Then** I see:
- Sparse page layout — 50% of viewport is whitespace
- Canela H1 with measured, invitational copy (e.g., "Certain experiences are reserved")
- VIP form with exactly 3 fields: Name, Email, Message
- No phone field, no dropdown, no "How did you hear about us?"
- Same field styling as Contact form (44px height, stone grey border)
- Submit button: "Submit" (primary, solid charcoal)
**And** client-side Zod validation on blur and submit
**And** honeypot field included
**And** on submit, button text changes: "Submit" → "Sending..." (disabled)
**And** on success, confirmation: "Your inquiry has been noted. Expect a personal response." — measured, not effusive
**And** form submits to `POST /api/v1/forms/vip` with type VIP
**And** page is SSG with client-side form interaction
**And** `aria-required="true"` on required fields, `aria-describedby` on error messages

### Story 4.4: Integrate Email Routing for Form Submissions

As the founder,
I want to receive form submissions in my inbox within 30 seconds, categorized by type,
So that I can respond to inquiries promptly and with proper context.

**Acceptance Criteria:**

**Given** a form submission has been created and `form.submitted` event is emitted
**When** the EmailModule processes the event
**Then** an email is sent to the founder's inbox via Emailit.com API containing:
- Submission type (Contact / VIP / Press / Wholesale) as subject tag
- Submitter's name and email
- Subject (if contact form) and message body
- Timestamp of submission
**And** email is delivered within 30 seconds of form submission (FR15)
**And** VIP and Wholesale submissions are tagged as high-priority in the email subject
**And** email failures are logged to Sentry but do not fail the form response
**And** the EmailModule reuses the same Emailit.com service created in Epic 3

### Story 4.5: Implement Spam Protection

As the system,
I want to protect all public forms against spam without user-facing CAPTCHA,
So that the founder's inbox remains clean and users experience zero friction.

**Acceptance Criteria:**

**Given** the contact and VIP forms exist
**When** a bot submits a form filling the hidden honeypot field
**Then** the submission is silently rejected (200 response but not processed or stored)
**And** no error message is shown (bots don't see rejection)

**Given** a legitimate user submits a form
**When** the honeypot field is empty (as expected)
**Then** the submission is processed normally

**Given** rate limiting is configured
**When** a single IP exceeds 100 requests/minute to form endpoints
**Then** subsequent requests receive 429 Too Many Requests
**And** rate limiting uses `@nestjs/throttler` (NFR10)
**And** server-side input sanitization prevents XSS and injection (NFR8)

---

## Epic 5: SEO & Discoverability

QADIR is discoverable through search engines and social media via unique meta tags, XML sitemap, structured data, semantic HTML, and Open Graph tags on every page.

### Story 5.1: Implement Per-Page Meta Tags

As a search engine crawler,
I want each page to have unique, descriptive meta title and description tags,
So that QADIR pages appear with compelling snippets in search results.

**Acceptance Criteria:**

**Given** all public pages exist (Home, About, Collection, Blend details, Appointments, Private, Contact)
**When** a page is rendered
**Then** the `<head>` includes:
- `<title>` with page-specific title (e.g., "QADIR Montreal — Modern Perfumery Rooted in Oud Tradition")
- `<meta name="description">` with unique, compelling description per page
- Canonical URL: `<link rel="canonical" href="https://qadir.com/[path]">`
**And** meta tags are rendered server-side (SSR/SSG) — visible before JavaScript loads
**And** Next.js `metadata` export or `generateMetadata` is used per route
**And** blend detail pages dynamically generate titles: "[Blend Name] — QADIR Montreal"

### Story 5.2: Generate XML Sitemap & Robots.txt

As a search engine crawler,
I want an XML sitemap listing all public pages,
So that all QADIR content is indexed efficiently.

**Acceptance Criteria:**

**Given** all public pages exist
**When** `/sitemap.xml` is requested
**Then** the response contains a valid XML sitemap with:
- All public page URLs (home, about, collection, 4 blend pages, appointments, private, contact)
- Last modified dates
- Priority values (home: 1.0, collection: 0.9, blends: 0.8, others: 0.7)
**And** the sitemap is generated by `apps/web/src/app/sitemap.ts` (Next.js convention)

**Given** `/robots.txt` is requested
**When** crawlers access it
**Then** it allows all crawlers access to public pages
**And** blocks crawling of `/api/*` endpoints
**And** references the sitemap URL

### Story 5.3: Add Open Graph & Social Sharing Tags

As a visitor sharing a QADIR page on social media,
I want rich previews with brand imagery and descriptions,
So that shared links represent the brand's authority.

**Acceptance Criteria:**

**Given** any public page is rendered
**When** the page HTML is inspected
**Then** the following Open Graph meta tags are present:
- `og:title` — page-specific title
- `og:description` — page-specific description
- `og:image` — QADIR brand image or blend-specific image
- `og:url` — canonical page URL
- `og:type` — "website" (home) or "product" (blend pages)
- `og:site_name` — "QADIR Montreal"
**And** Twitter Card meta tags are present:
- `twitter:card` — "summary_large_image"
- `twitter:title`, `twitter:description`, `twitter:image`
**And** tags are rendered server-side

### Story 5.4: Ensure Semantic HTML & Heading Hierarchy

As a screen reader user or search engine,
I want proper semantic HTML and heading hierarchy on every page,
So that content structure is clear and accessible.

**Acceptance Criteria:**

**Given** any public page is rendered
**When** the HTML is inspected
**Then** the page uses semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
**And** each page has exactly one `<h1>`
**And** heading levels never skip (H1 → H2 → H3, never H1 → H3)
**And** `<nav>` has `aria-label="Main navigation"`
**And** sections use `<section>` with heading or `aria-label`
**And** lists use `<ul>`/`<ol>`, never `<div>` for list-like content
**And** links use `<a>`, buttons use `<button>`, never `<div onClick>`

### Story 5.5: Implement Structured Data (JSON-LD)

As a search engine,
I want structured data describing QADIR as an organization and its products,
So that rich results (knowledge panel, product info) can be displayed.

**Acceptance Criteria:**

**Given** the homepage is rendered
**When** the HTML is inspected
**Then** a JSON-LD script contains Organization structured data:
- name: "QADIR Montreal"
- type: "Organization" / "PerfumeStore"
- url, logo, address (Montreal)

**Given** a blend detail page is rendered
**When** the HTML is inspected
**Then** a JSON-LD script contains Product structured data:
- name: blend name
- description: blend description
- brand: "QADIR Montreal"
- category: "Perfume"

**And** all JSON-LD is valid per schema.org specifications
**And** structured data is rendered server-side in `<script type="application/ld+json">`

---

## Epic 6: Analytics & Business Insights

The founder has privacy-respecting visibility into website traffic, booking conversion funnels, and form submission rates — enabling data-driven decisions without compromising visitor privacy.

### Story 6.1: Integrate Privacy-Respecting Analytics

As the founder,
I want to track page views, unique visitors, and traffic sources without invasive tracking,
So that I understand how visitors discover and use the QADIR website.

**Acceptance Criteria:**

**Given** a privacy-respecting analytics solution is selected (Plausible, Umami, or Fathom)
**When** the analytics script is integrated into `apps/web/src/app/layout.tsx`
**Then** the script loads asynchronously (does not block page render — NFR26)
**And** page views are tracked on all public pages
**And** unique visitors are counted
**And** traffic sources (referrer, UTM parameters) are captured
**And** no cookies are set for analytics (privacy-first — FR30)
**And** no third-party data sharing occurs
**And** the analytics ID is stored in `NEXT_PUBLIC_ANALYTICS_ID` environment variable
**And** analytics works with SSG and SSR pages

### Story 6.2: Track Booking Conversion Funnel

As the founder,
I want to see the booking conversion funnel (page view → start booking → complete booking),
So that I can identify where potential clients drop off.

**Acceptance Criteria:**

**Given** analytics is integrated
**When** a visitor interacts with the booking flow
**Then** the following events are tracked:
- "appointments_page_view" — visitor lands on /appointments
- "booking_started" — visitor begins Step 1 of BookingFlow
- "booking_step_2" — visitor reaches Step 2 (date/time selection)
- "booking_completed" — visitor successfully submits booking
**And** event tracking uses the analytics solution's custom events API
**And** the funnel can be visualized in the analytics dashboard
**And** tracking does not affect booking flow performance or user experience

### Story 6.3: Track Form Submission Rates

As the founder,
I want to see form submission rates broken down by type (Contact, VIP, Press, Wholesale),
So that I understand which inquiry channels generate the most interest.

**Acceptance Criteria:**

**Given** analytics is integrated
**When** a visitor submits any form
**Then** a custom event is tracked: "form_submitted" with property "type" (contact/vip)
**And** submission rates are viewable by type in the analytics dashboard
**And** tracking is triggered on successful API response (not on button click)

### Story 6.4: Provide Founder Analytics Dashboard Access

As the founder,
I want to access an analytics dashboard independently,
So that I can review website performance without developer assistance.

**Acceptance Criteria:**

**Given** the analytics solution has a dashboard
**When** the founder navigates to the analytics dashboard URL
**Then** the founder can view:
- Page views and unique visitors (daily, weekly, monthly)
- Traffic sources and referrers
- Most visited pages
- Booking conversion funnel (from Story 6.2)
- Form submission events (from Story 6.3)
**And** the founder has their own login credentials for the analytics dashboard
**And** dashboard access documentation is provided to the founder
**And** no developer intervention is needed to view or filter analytics data

---

## Epic 7: Administration & Platform Security

The founder can securely manage the platform with authenticated admin access, view and manage appointments and form submissions, and has documented ownership of all system credentials. The data model includes extensibility fields for Phase 2.

### Story 7.1: Set Up Supabase Auth for Admin Access

As the founder,
I want to log into the admin area with secure authentication,
So that only authorized users can access administrative features.

**Acceptance Criteria:**

**Given** Supabase Auth is available on the VPS
**When** the auth integration is implemented
**Then** the following exists:
- `api/src/common/guards/auth.guard.ts` — NestJS guard that validates Supabase JWT tokens
- Founder admin account created in Supabase Auth (email + password)
- MFA option available for the admin account (FR36)
**And** Supabase connection uses `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` environment variables
**And** JWT validation checks token signature, expiry, and role claims
**And** auth guard can be applied to any NestJS route via `@UseGuards(AuthGuard)`
**And** API security middleware is configured:
- `@nestjs/throttler` — 100 requests/minute per IP for public endpoints (NFR10)
- `helmet` — HTTP security headers (NFR7)
- CORS — locked to QADIR domain origin only (NFR13)

### Story 7.2: Build Admin API Endpoints

As the founder,
I want to view all appointments and form submissions through admin API endpoints,
So that I have complete visibility into client interactions.

**Acceptance Criteria:**

**Given** the AuthGuard is implemented and admin account exists
**When** admin endpoints are created
**Then** the following protected endpoints exist:
- `GET /api/v1/admin/appointments` — list all appointments (filterable by status, date range)
- `GET /api/v1/admin/appointments/:id` — single appointment detail
- `PUT /api/v1/admin/appointments/:id` — update appointment status (confirm/cancel)
- `GET /api/v1/admin/submissions` — list all form submissions (filterable by type)
- `GET /api/v1/admin/submissions/:id` — single submission detail
**And** all admin endpoints require valid admin JWT (AuthGuard applied)
**And** unauthorized requests return 401 Unauthorized
**And** responses use the standard wrapper: `{ "data": T }` or `{ "data": T[], "meta": { "total": number } }`
**And** when an appointment status changes, EventEmitter2 emits `booking.confirmed` or `booking.cancelled`
**And** endpoints are documented with Swagger/OpenAPI decorators (@nestjs/swagger — NFR34)

### Story 7.3: Implement Role-Based Access Foundation

As the system,
I want a role-based access control foundation,
So that future team members can be given appropriate permissions.

**Acceptance Criteria:**

**Given** the AuthGuard exists
**When** role-based access is implemented
**Then** the auth system supports the following roles:
- `admin` — full access to all endpoints and features
- `editor` — future CMS Phase role (can edit content but not manage system)
- `viewer` — read-only access to admin endpoints
**And** a `@Roles('admin')` decorator can be applied to NestJS controllers/routes
**And** the RolesGuard checks JWT role claims against required roles
**And** Phase 1 only creates the `admin` role — `editor` and `viewer` are defined but not used
**And** role definitions are stored in `packages/shared-types/src/auth.ts`

### Story 7.4: Ensure Extensibility & Credential Ownership

As the founder,
I want to own all system credentials and have a platform architecture that supports Phase 2 additions,
So that I am never dependent on any vendor or developer and can expand capabilities without replatforming.

**Acceptance Criteria:**

**Given** the complete Phase 1 system is built
**When** extensibility is validated
**Then** the Prisma schema includes nullable Phase 2 fields:
- `Blend` model: `price Decimal?`, `sku String?`, `inventory Int?`, `currency String?` (FR42)
- `Appointment` model: `clientId String?` (FR44 — CRM link)
- `FormSubmission` model: `clientId String?` (CRM link)
**And** content model structure supports adding multilingual fields (FR43) — JSON fields can accommodate locale-keyed content
**And** API route structure (`/api/v1/`) supports adding new endpoint groups (payments, products) without restructuring (FR45)
**And** the following credential ownership is documented:
- Domain registrar access
- VPS hosting panel access
- Supabase admin access
- GitHub repository access
- Analytics dashboard access
- Emailit.com account access
**And** all credentials are owned by QADIR Montreal, not by any developer (FR40)
**And** no vendor lock-in: all data is exportable, API-first design, open-source stack

---

## Epic 8: Webhook & Automation System

Business events (bookings, form submissions, leads) trigger configurable outbound webhooks, enabling n8n integration and future automation workflows without code changes.

### Story 8.1: Build WebhookModule with Event Subscription

As a developer,
I want a NestJS WebhookModule that dispatches outbound HTTP POST requests on business events,
So that external systems (n8n) can react to QADIR events without code changes.

**Acceptance Criteria:**

**Given** the NestJS application has BookingModule and FormsModule emitting events
**When** the WebhookModule is implemented
**Then** the following exists:
- `api/src/modules/webhook/webhook.module.ts`
- `api/src/modules/webhook/webhook.controller.ts`
- `api/src/modules/webhook/webhook.service.ts`
- Prisma migration creates the `webhook_configs` table
**And** the `WebhookConfig` model includes: id (UUID), event (string), url (string), active (boolean), createdAt
**And** WebhookService listens via EventEmitter2 for these events:
- `booking.created` — new appointment submitted
- `booking.confirmed` — appointment confirmed
- `booking.cancelled` — appointment cancelled
- `form.submitted` — any form submission
- `lead.received` — VIP or wholesale inquiry
**And** for each matching active webhook, an HTTP POST is dispatched with payload:
```json
{ "event": "booking.created", "timestamp": "ISO8601", "data": { ... } }
```
**And** webhook dispatch failures are logged to Sentry but do not affect the original operation
**And** dispatch includes a 5-second timeout per webhook call

### Story 8.2: Build Admin Webhook Configuration

As the founder,
I want to manage webhook URLs through admin API endpoints,
So that I can connect n8n or other automation tools to QADIR events.

**Acceptance Criteria:**

**Given** the WebhookModule exists and AuthGuard is implemented
**When** admin webhook endpoints are created
**Then** the following protected endpoints exist:
- `GET /api/v1/admin/webhooks` — list all webhook configurations
- `POST /api/v1/admin/webhooks` — create a new webhook (event, url, active)
- `PUT /api/v1/admin/webhooks/:id` — update webhook (change URL, toggle active)
- `DELETE /api/v1/admin/webhooks/:id` — remove a webhook configuration
**And** all endpoints require admin JWT authentication
**And** webhook URLs are validated (must be valid HTTPS URLs)
**And** the admin can register multiple URLs for the same event type
**And** webhooks can be toggled active/inactive without deletion
**And** endpoints are documented with Swagger/OpenAPI decorators

---

## Epic 9: Production Infrastructure & Deployment

The QADIR platform is containerized with Docker, deployed to the self-managed VPS behind Nginx with SSL, monitored with Sentry, backed up daily, and continuously deployed via GitHub Actions.

### Story 9.1: Containerize Applications with Docker

As a developer,
I want the web and API applications containerized with Docker,
So that deployments are reproducible and isolated.

**Acceptance Criteria:**

**Given** both apps/web and apps/api produce production builds
**When** Docker configuration is added
**Then** the following files exist:
- `apps/web/Dockerfile` — multi-stage build producing Next.js standalone output
- `apps/api/Dockerfile` — multi-stage build producing NestJS production bundle
- `docker-compose.yml` — defines services: web (port 3000), api (port 3001), nginx (ports 80/443)
- `docker-compose.dev.yml` — development overrides with volume mounts for hot reload
**And** `docker-compose up` starts all services
**And** images are optimized for size (node:alpine base, multi-stage builds)
**And** environment variables are passed via `.env` file (not baked into images)
**And** Supabase is NOT in docker-compose (already running independently on VPS)
**And** containers restart automatically on failure (`restart: unless-stopped`)

### Story 9.2: Configure Nginx Reverse Proxy with SSL

As a visitor,
I want to access QADIR over HTTPS with a trusted SSL certificate,
So that my data is transmitted securely.

**Acceptance Criteria:**

**Given** Docker containers are running
**When** Nginx is configured
**Then** Nginx handles:
- `qadir.com/*` → proxy to Next.js container (port 3000)
- `qadir.com/api/*` → proxy to NestJS container (port 3001)
- HTTP (port 80) → redirect to HTTPS (port 443)
- SSL termination with Let's Encrypt certificate via certbot
**And** Nginx configuration is in `docker/nginx/` directory
**And** certbot auto-renews certificates
**And** security headers are set (X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security)
**And** static assets have cache headers (1 year for hashed assets)
**And** gzip compression is enabled for text-based responses

### Story 9.3: Set Up GitHub Actions CI/CD Pipeline

As a developer,
I want automated linting, testing, building, and deployment on push to main,
So that code quality is enforced and deployments are consistent.

**Acceptance Criteria:**

**Given** the GitHub repository exists at github.com/mqxerror/qadir
**When** the CI/CD pipeline is configured
**Then** `.github/workflows/deploy.yml` defines:
1. **Trigger:** push to `main` branch
2. **Lint:** `pnpm lint` across all packages
3. **Test:** `pnpm test` (Vitest unit tests)
4. **Build:** `turbo build` (production builds with caching)
5. **Deploy:** SSH to VPS → `docker-compose build && docker-compose up -d`
**And** secrets are stored in GitHub Actions secrets (SSH key, VPS host, env variables)
**And** no secrets appear in logs or source code
**And** deployment uses zero-downtime strategy: new containers start before old ones stop (NFR30)
**And** pipeline fails fast on lint or test errors
**And** Turborepo remote caching is configured for faster CI builds (if applicable)

### Story 9.4: Configure Database Backups

As the founder,
I want daily automated database backups with 30-day retention,
So that data can be recovered in case of failure.

**Acceptance Criteria:**

**Given** PostgreSQL is running via Supabase on the VPS
**When** backup automation is configured
**Then** a cron job runs daily `pg_dump` of the QADIR database
**And** backups are stored in a secure directory on the VPS
**And** backups older than 30 days are automatically deleted (NFR29)
**And** backup file names include date: `qadir_backup_2026-02-12.sql.gz`
**And** backups are compressed with gzip
**And** a monthly backup verification script exists (restore test to verify integrity)
**And** backup cron schedule and location are documented

### Story 9.5: Integrate Error Monitoring (Sentry)

As a developer and the founder,
I want server errors captured and alerted within 5 minutes,
So that issues are detected and resolved before they impact users.

**Acceptance Criteria:**

**Given** the Sentry project is created
**When** Sentry is integrated
**Then** the following integrations exist:
- NestJS: Sentry SDK in `api/src/main.ts` — captures unhandled exceptions from global AllExceptionsFilter
- Next.js: Sentry SDK in `apps/web/src/app/layout.tsx` — captures client-side errors
- Source maps uploaded during build for readable stack traces
**And** `SENTRY_DSN` is stored as environment variable (NFR11, NFR27)
**And** Sentry alerts are configured to notify within 5 minutes of new errors (NFR31)
**And** sensitive data (emails, names) is scrubbed from Sentry reports
**And** Sentry free tier is sufficient for Phase 1 traffic

### Story 9.6: Implement Health Endpoint & Uptime Monitoring

As the system,
I want a health check endpoint for uptime monitoring,
So that downtime is detected promptly.

**Acceptance Criteria:**

**Given** the NestJS application is running
**When** `GET /api/v1/health` is requested
**Then** the response is:
```json
{ "status": "ok", "timestamp": "2026-02-12T14:30:00Z" }
```
**And** the health endpoint does NOT use the standard API response wrapper (per architecture spec)
**And** the endpoint checks database connectivity (Prisma can reach PostgreSQL)
**And** if the database is unreachable, response status is 503 Service Unavailable
**And** the health endpoint is public (no auth required)
**And** an external uptime monitoring service (UptimeRobot or similar) is configured to ping `/api/v1/health` every 5 minutes
**And** uptime monitoring documentation is provided to the founder

---

## Validation Summary

### FR Coverage Validation

**Phase 1 FRs (38 total):** All 38 covered across 9 epics.

| Range | Count | Status |
|---|---|---|
| FR1-FR6 (Brand Presentation) | 6 | Covered (Epic 1, Epic 2) |
| FR7-FR12 (Appointment Booking) | 6 | Covered (Epic 3) |
| FR13-FR18 (Lead Capture) | 6 | Covered (Epic 4) |
| FR19-FR25 (Content Management) | 7 | **Deferred to CMS Phase** |
| FR26-FR30 (Analytics) | 5 | Covered (Epic 6) |
| FR31-FR35 (SEO) | 5 | Covered (Epic 5) |
| FR36-FR40 (Administration) | 5 | Covered (Epic 7) |
| FR41-FR45 (Extensibility) | 5 | Covered (Epic 2, 3, 7) |

### Architecture Compliance

- Epic 1 Story 1 = project scaffold from architecture starter template spec
- Database tables created only when needed by stories (Blend in 2.5, Appointment in 3.1, FormSubmission in 4.1, WebhookConfig in 8.1)
- NestJS modules communicate via EventEmitter2 — no direct cross-module imports
- Content abstraction layer ensures zero frontend rewrite for CMS Phase
- Zod shared schemas used for all validation (frontend + backend)
- All API responses use standard wrapper pattern
- Naming conventions followed per architecture spec

### Story Quality

- All stories sized for single dev agent completion
- All stories use As a / I want / So that format
- All acceptance criteria use Given / When / Then format
- No forward dependencies within any epic
- Each epic delivers complete, standalone functionality

### Epic Dependency Flow

```
Epic 1 (Foundation) → enables all subsequent epics
  ├── Epic 2 (Content) → builds on Epic 1 shell
  ├── Epic 3 (Booking) → builds on Epic 1 shell + creates EmailModule
  ├── Epic 4 (Forms) → builds on Epic 1 shell + reuses EmailModule from Epic 3
  ├── Epic 5 (SEO) → enhances pages from Epics 1-4
  ├── Epic 6 (Analytics) → integrates with pages from Epics 1-4
  ├── Epic 7 (Admin) → uses data from Epics 3-4 + creates AuthGuard
  ├── Epic 8 (Webhooks) → uses events from Epics 3-4 + AuthGuard from Epic 7
  └── Epic 9 (Infrastructure) → deploys the complete application
```

Each epic is standalone after its predecessors are complete. No epic requires a future epic to function.
