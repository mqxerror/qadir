---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - prd.md
  - prd-validation-report.md
  - ux-design-specification.md
workflowType: 'architecture'
project_name: 'qadir'
user_name: 'Mqxerrormac16'
date: '2026-02-12'
lastStep: 8
status: 'complete'
completedAt: '2026-02-12'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (45 FRs):**

| Capability Area | FRs | Architectural Impact |
|---|---|---|
| Brand Presentation | FR1-FR6 | Static/SSG pages, content delivery, SVG seal rendering |
| Appointment Booking | FR7-FR12 | Backend state management, calendar logic, email integration, double-booking prevention |
| Lead Capture & Contact | FR13-FR18 | Form API endpoints, server-side validation, email routing, spam protection |
| Content Management | FR19-FR25 | **Deferred to CMS Phase** — Strapi integration scoped separately |
| Analytics & Monitoring | FR26-FR30 | Privacy-respecting analytics, conversion funnel tracking, dashboard access |
| SEO & Discoverability | FR31-FR35 | SSR/SSG rendering, meta tag generation, structured data, sitemap |
| Administration & Access | FR36-FR40 | Auth system, role-based access, credential ownership |
| Architecture Extensibility | FR41-FR45 | API-first design, extensible data models, payment/CRM/i18n hooks |

**Non-Functional Requirements (36 NFRs):**

| Category | Key Constraints | Architecture Driver |
|---|---|---|
| Performance (NFR1-6) | FCP < 1.5s, LCP < 2.5s, CLS < 0.1, Lighthouse > 90 | SSR/SSG mandatory, image optimization pipeline, CDN delivery |
| Security (NFR7-13) | HTTPS/TLS 1.2+, XSS/injection prevention, rate limiting, CORS | API gateway layer, input sanitization middleware, auth sessions |
| Scalability (NFR14-17) | 1,000 concurrent users, CDN, horizontal scaling ready | Stateless backend services, CDN for static assets, DB indexing strategy |
| Accessibility (NFR18-23) | WCAG 2.1 AA, keyboard nav, screen readers, contrast ratios | Radix UI primitives, semantic HTML, focus management |
| Integration (NFR24-27) | CMS API < 500ms, 99%+ email delivery, async analytics | Content abstraction layer, transactional email service, non-blocking scripts |
| Reliability (NFR28-31) | 99.5% uptime, daily backups, zero-downtime deploy, error monitoring | Hosting SLA, backup automation, blue-green/rolling deploys |
| Maintainability (NFR32-36) | Linting, modular components, API docs, CI/CD, env config | Code standards enforcement, component architecture, automated pipeline |

**Scale & Complexity:**

- Primary domain: Full-stack web (React + Node.js + static content layer)
- Complexity level: Medium
- Estimated architectural components: 7 (Frontend app, Backend API, Static content layer, Email service, Analytics, CDN, Hosting/CI)

### CMS Phasing Decision

**Key Decision: CMS implementation is a separate, billable phase.**

| Aspect | Phase 1 (Build) | CMS Phase (Separate Scope) |
|---|---|---|
| Content source | Static data (JSON files / constants in codebase) | Strapi headless CMS |
| Content editing | Developer-assisted | Founder-independent via Strapi admin |
| PRD requirements | FR19-FR25 deferred | FR19-FR25 fulfilled |
| Vendor | N/A | **Strapi** (confirmed) |
| Architecture constraint | Content abstraction layer — components consume content via service interface, agnostic to source | Strapi API replaces static data source behind same interface |

**Rationale:** Client requires full CMS for content independence. This represents additional scope and cost that must be approved separately. Phase 1 delivers the complete website with static content. CMS Phase delivers content editing capability. The abstraction layer ensures zero frontend rewrite when Strapi is integrated.

### Technical Constraints & Dependencies

| Constraint | Source | Impact |
|---|---|---|
| React (latest) frontend | PRD Technology Direction | Framework selection locked |
| NestJS or ExpressJS backend | PRD Technology Direction | Backend framework decision needed |
| Strapi CMS (future phase) | Architecture Decision | CMS vendor locked, integration deferred |
| shadcn/ui + Radix UI + Tailwind | UX Design Spec | Component library locked |
| Motion Primitives + Framer Motion | UX Design Spec | Animation approach locked |
| SSR/SSG for SEO-critical pages | PRD + UX Spec (NFR1-6) | Rendering strategy decision needed |
| 4-color brand palette + Canela/Inter | PRD Design Constraints | Design tokens locked |
| PIPEDA compliance | PRD Domain Requirements | Privacy-by-design required |
| Quebec bilingual readiness (Phase 2) | PRD Domain Requirements | i18n architecture from day one |
| E-commerce extensibility (Phase 2) | PRD FR41-FR45 | Data model must accommodate products/cart/payments |
| No vendor lock-in | PRD Success Criteria | Portable data, API-first, owned credentials |

### Cross-Cutting Concerns Identified

1. **Content Abstraction Layer** — The most critical architectural pattern. All components consume content through a service interface. Phase 1: backed by static JSON. CMS Phase: backed by Strapi API. Frontend never knows the difference.

2. **Authentication & Authorization** — Backend API access control, future CMS admin (Strapi handles its own auth). Spans backend API and future Phase 2 client accounts.

3. **Email Delivery** — Booking confirmation (FR10-FR11), form routing (FR15), all within 10-30 second SLAs. Transactional email service shared across booking and form subsystems.

4. **Internationalization Readiness** — Quebec bilingual obligation for Phase 2 (FR43). Content model, URL structure, and UI components must support multilingual from day one without restructuring.

5. **Image Optimization** — WebP, responsive sizes, lazy loading (NFR5). Page weight under 2MB. Spans all pages with product photography and brand assets.

6. **SEO & Rendering** — SSR/SSG for all public pages (FR31-FR35, NFR1-6). Meta tags, structured data, sitemap. Affects frontend architecture choice (Next.js implied).

7. **Error Handling & Monitoring** — Server error capture within 5 minutes (NFR31). Consistent error UX across booking, forms, and content. Muted burgundy (#8B3A3A) error styling per UX spec.

8. **Phase 2 Extensibility** — Database schema, API design, routing, and component architecture must all accommodate e-commerce, CRM, Strapi CMS, advanced booking, and i18n without replatforming.

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web application based on project requirements analysis. React (Next.js) frontend with NestJS backend, PostgreSQL database via self-hosted Supabase, deployed to self-managed VPS.

### Technology Versions (Verified Feb 2026)

| Package | Version |
|---|---|
| Next.js | 16.1 (Turbopack stable) |
| NestJS | 11.1.13 |
| Turborepo | 2.8.6 |
| Tailwind CSS | 4.1.18 (v4 — CSS-first config) |
| shadcn/ui | CLI 3.0+ |
| TypeScript | 5.9.x |
| @supabase/supabase-js | 2.95.3 |

### Starter Options Considered

| Starter | Pros | Cons | Verdict |
|---|---|---|---|
| create-turbo (Vercel) | Official, minimal overhead, Next.js-native | No NestJS, no Docker, no CI | **Selected** — cleanest foundation |
| vndevteam/nestjs-turbo | NestJS + Docker + CI included | Uses TypeORM (not Supabase), no Tailwind | Rejected — wrong ORM layer |
| ejazahm3d/fullstack-turborepo | Docker + Nginx + Prisma | Yarn-based, stale dependencies | Rejected — package manager mismatch |
| Nx workspace | Advanced generators, dependency graph | Overkill for 2-app monorepo | Rejected — unnecessary complexity |
| Plain pnpm workspaces | Zero tooling overhead | No caching, no task orchestration | Rejected — missing build optimization |

### Selected Starter: Turborepo + pnpm (manual assembly)

**Rationale:** Turborepo provides task orchestration and caching with minimal config overhead. Built by the Next.js team (Vercel) — first-class support. NestJS added via its native CLI, preserving full framework capabilities. Right-sized for a 2-app monorepo without Nx's enterprise overhead.

**Initialization Command:**

```bash
npx create-turbo@latest qadir --package-manager pnpm
cd qadir && rm -rf apps/docs
cd apps/web && pnpm add next@latest react@latest react-dom@latest && cd ../..
cd apps/web && pnpm add tailwindcss @tailwindcss/postcss postcss && cd ../..
cd apps/web && npx shadcn@latest init && cd ../..
cd apps && npx @nestjs/cli new api --package-manager pnpm --skip-git && cd ..
pnpm --filter web add @supabase/supabase-js @supabase/ssr
pnpm --filter api add @supabase/supabase-js
pnpm install && pnpm dev
```

### Architectural Decisions Provided by Starter

**Language & Runtime:** TypeScript 5.9.x across all packages. Shared tsconfig in `packages/typescript-config`.

**Styling:** Tailwind CSS v4 (CSS-first @theme config) + shadcn/ui CLI 3.0 components.

**Build Tooling:** Turbopack (Next.js 16.1 default), NestJS native compiler, Turborepo task orchestration with caching.

**Code Organization:**

```
qadir/
├── apps/
│   ├── web/               # Next.js 16.1 (frontend)
│   └── api/               # NestJS 11.x (backend)
├── packages/
│   ├── ui/                # Shared React components
│   ├── shared-types/      # TypeScript interfaces shared across apps
│   ├── eslint-config/     # Shared ESLint rules
│   └── typescript-config/ # Shared tsconfig
├── turbo.json             # Task pipeline config
├── pnpm-workspace.yaml
└── package.json
```

**Development Experience:** Hot reload via Turbopack (web) + NestJS watch mode (api). Parallel dev servers orchestrated by `turbo dev`.

**Still needed:** Docker/docker-compose, GitHub Actions CI/CD, Playwright E2E tests, Prettier, Husky + commitlint, Nginx reverse proxy config for VPS deployment.

**Note:** Project initialization using this scaffold should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1A | Data access layer | Prisma (data) + Supabase (auth/storage) | Typed, portable ORM for DB queries; Supabase handles auth and file storage without reinventing |
| 1B | Content abstraction | Backend-side — NestJS serves static JSON via REST | Clean contract: frontend always calls API. Strapi swaps in behind same endpoints. Zero frontend rewrite. |
| 3A | API design | REST | Simple data shapes (6 pages, 4 blends, booking, forms). GraphQL adds complexity with zero benefit. Strapi speaks REST natively. |
| 4B | Rendering strategy | SSG (content pages) + SSR (appointments) + CSR (interactive) | SSG for performance (FCP < 1.5s), SSR for live availability data, CSR for booking flow and forms |
| 5A | Containerization | Docker + docker-compose | Reproducible deployments on self-managed VPS. Compose orchestrates web, api, nginx. |
| 5C | Reverse proxy | Nginx + Let's Encrypt SSL | Routes qadir.com → Next.js, qadir.com/api/* → NestJS. Handles TLS termination. |

**Important Decisions (Shape Architecture):**

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1D | Validation | Zod — shared schemas in `packages/shared-types` | Single source of truth for validation rules. Works in NestJS (pipes) and Next.js (form validation). |
| 2A | Authentication | Supabase Auth | Already on VPS. Handles sessions, JWT, MFA. Phase 1: admin only. Phase 2: client accounts. |
| 2B | API security | NestJS Guards + @nestjs/throttler + Helmet + CORS | Rate limiting (100 req/min/IP), HTTP security headers, origin lock to QADIR domain, route-level auth. |
| 3B | API documentation | Swagger/OpenAPI via @nestjs/swagger | Auto-generated from decorators. Satisfies NFR34. Living documentation. |
| 3C | Email service | Emailit.com API | Transactional email for booking confirmations and form routing. 99%+ delivery (NFR25). |
| 3D | Webhooks | NestJS outbound webhooks — configurable URLs per event type | Fires HTTP POST on key events (booking.created, form.submitted, lead.received). n8n-ready for future automation. |
| 4A | State management | None — React Server Components + local state | No complex client-side state. RSC handles data. useState/useContext for UI state (booking steps, forms). |
| 4C | Testing | Vitest (unit) + Playwright (E2E) | Vitest: faster than Jest, native ESM. Playwright: cross-browser E2E for booking flow and forms. |
| 5B | CI/CD | GitHub Actions → SSH deploy to VPS | On push to main: lint → test → build → deploy. Simple pipeline, no external CI service. |
| 5D | Monitoring | Sentry (error tracking) + health endpoint | Free tier covers Phase 1. GET /api/health for uptime checks. Error capture within 5 minutes (NFR31). |
| 5E | Backups | Daily pg_dump via cron (30-day retention) | Automated PostgreSQL dumps stored securely. Satisfies NFR29. |

**Deferred Decisions (Post-MVP):**

| Decision | Deferred To | Rationale |
|---|---|---|
| CMS integration | CMS Phase | Strapi confirmed. Separate scope and cost. Content abstraction layer ready. |
| Caching layer | Phase 2 | SSG + Supabase pooling sufficient for Phase 1 traffic. Add Redis if e-commerce demands it. |
| Payment processing | Phase 2B | No payments in Phase 1. API architecture supports adding payment endpoints. |
| CRM integration | Phase 2A | Data model supports client profiles. Webhook system enables n8n-based CRM flows. |
| i18n implementation | Phase 2E | Architecture supports multilingual from day one (URL structure, content model). Build when needed. |

### Data Architecture

**Database:** PostgreSQL via self-hosted Supabase on VPS.

**ORM:** Prisma — TypeScript-native, type-safe database access with migration system.

**Auth & Storage:** Supabase client — handles authentication (JWT sessions, MFA option) and file storage (product images, brand assets).

**Validation:** Zod schemas in `packages/shared-types` — shared between frontend and backend for consistent validation.

**Content Layer:** NestJS ContentModule serves static JSON files via REST endpoints. Interface-based design allows Strapi to replace JSON source without changing API contracts.

```
Content Flow (Phase 1):
  JSON files → NestJS ContentService → REST API → Next.js SSG build

Content Flow (CMS Phase):
  Strapi API → NestJS ContentService → REST API → Next.js SSG/ISR build
```

**Data Model (Prisma schema — Phase 1):**

Core entities:
- `Blend` — id, name, slug, role, meaning, description, olfactiveProfile (JSON), imageUrl, sortOrder
- `Appointment` — id, type (consultation/discovery), date, time, name, email, message, status, createdAt
- `FormSubmission` — id, type (contact/vip/press/wholesale), name, email, subject, message, createdAt
- `WebhookConfig` — id, event, url, active, createdAt

Extensibility fields (empty in Phase 1, ready for Phase 2):
- `Blend`: price, sku, inventory, currency (nullable — Phase 2B e-commerce)
- `Appointment`: clientId (nullable — Phase 2A CRM link)
- `FormSubmission`: clientId (nullable — Phase 2A CRM link)

### Authentication & Security

**Authentication:** Supabase Auth (self-hosted).
- Phase 1: Single founder admin account for backend access
- Phase 2: Client accounts for VIP portal, order history
- JWT-based sessions, refresh token rotation
- MFA option available (FR36)

**API Security Stack:**
- `@nestjs/throttler` — 100 requests/minute per IP (NFR10)
- `helmet` — HTTP security headers (X-Frame-Options, CSP, etc.)
- CORS — locked to QADIR domain only (NFR13)
- NestJS Guards — route-level authentication checks
- Zod — input validation and sanitization (NFR8)
- Honeypot fields on public forms — spam protection without CAPTCHA (FR18)

### API & Communication Patterns

**API Style:** RESTful JSON API.

**Base URL:** `https://qadir.com/api/v1/`

**Endpoint Structure:**

| Endpoint | Method | Purpose | Auth |
|---|---|---|---|
| `/api/v1/content/:page` | GET | Page content (static JSON) | Public |
| `/api/v1/blends` | GET | All blends | Public |
| `/api/v1/blends/:slug` | GET | Single blend detail | Public |
| `/api/v1/appointments/availability` | GET | Available time slots | Public |
| `/api/v1/appointments` | POST | Create booking | Public (rate-limited) |
| `/api/v1/forms/contact` | POST | Contact form submission | Public (rate-limited) |
| `/api/v1/forms/vip` | POST | VIP access request | Public (rate-limited) |
| `/api/v1/health` | GET | Health check | Public |
| `/api/v1/admin/appointments` | GET | List all appointments | Admin |
| `/api/v1/admin/submissions` | GET | List all form submissions | Admin |
| `/api/v1/admin/webhooks` | GET/POST/PUT | Manage webhook configs | Admin |

**API Documentation:** Swagger/OpenAPI auto-generated via `@nestjs/swagger` decorators.

**Email Integration:** Emailit.com API for transactional email.
- Booking confirmation → client (within 10 seconds of submission)
- Booking notification → founder inbox
- Form submission routing → founder inbox (within 30 seconds)
- Subject-based categorization tags (General, Press, Wholesale, VIP)

**Webhook System:**

Events emitted as outbound HTTP POST to configurable URLs:

| Event | Trigger | Payload |
|---|---|---|
| `booking.created` | New appointment submitted | Appointment details + client info |
| `booking.confirmed` | Appointment status updated | Appointment details + confirmation |
| `form.submitted` | Any form submission | Form type + submission data |
| `lead.received` | VIP or wholesale inquiry | Lead type + contact info |

Webhook URLs stored in database (`WebhookConfig` table). Admin API for managing webhook subscriptions. n8n connects by registering its webhook URL per event type.

### Frontend Architecture

**Framework:** Next.js 16.1 with App Router.

**Rendering Strategy:**

| Page | Strategy | Rationale |
|---|---|---|
| Home | SSG | Static content, maximum performance |
| About / Founder | SSG | Static content |
| Signature Blends (collection) | SSG | Static blend data |
| Blend Detail (x4) | SSG | Individual blend pages, static |
| Discovery / Appointments | SSR | Live availability from NestJS API |
| VIP / Private | SSG | Static content + client-side form |
| Contact | SSG | Static content + client-side form |

**State Management:** No external library. React Server Components for data fetching. `useState`/`useContext` for local UI state (BookingFlow wizard steps, form inputs, submission states).

**Component Architecture:**
- shadcn/ui foundation components (Button, Input, Select, Dialog, etc.)
- 5 custom components: HeroSection, BlendCard, OlfactiveProfile, BookingFlow, SealMark
- All components in `apps/web/src/components/`
- Shared UI primitives in `packages/ui/`

**Testing:** Vitest for component unit tests. Playwright for E2E (booking flow completion, form submissions, navigation).

### Infrastructure & Deployment

**Hosting:** Self-managed VPS (SolidSeoVPS).

**Architecture on VPS:**

```
Internet → Nginx (port 80/443, SSL termination)
              ├── qadir.com/* → Next.js container (port 3000)
              └── qadir.com/api/* → NestJS container (port 3001)
           Supabase (already running on VPS)
              ├── PostgreSQL (port 5432)
              ├── Auth service
              └── Storage service
```

**Docker Compose Services:**
- `web` — Next.js 16.1 production build (standalone output)
- `api` — NestJS 11.x production build
- `nginx` — Reverse proxy + SSL (Let's Encrypt via certbot)

Supabase runs independently on the VPS (already installed).

**CI/CD Pipeline (GitHub Actions):**

```
Push to main → Lint (ESLint) → Test (Vitest + Playwright) → Build (turbo build) → Deploy (SSH + docker-compose up)
```

**Environment Configuration:**
- `.env.development` — local dev values
- `.env.production` — production values (secrets via GitHub Actions secrets)
- All config via environment variables (NFR36)
- No secrets in source code (NFR11)

**Monitoring:**
- Sentry — error tracking with source maps (NFR31: capture within 5 minutes)
- `GET /api/v1/health` — uptime monitoring endpoint
- Nginx access/error logs for request monitoring

**Backups:**
- Daily automated `pg_dump` via cron on VPS
- 30-day retention (NFR29)
- Backup verification script (monthly restore test)

### Decision Impact Analysis

**Implementation Sequence:**

1. **Monorepo scaffold** — Turborepo + Next.js + NestJS + shared packages
2. **Database schema** — Prisma schema + initial migration + Supabase connection
3. **Content abstraction** — NestJS ContentModule + static JSON + REST endpoints
4. **Frontend foundation** — shadcn/ui + design tokens + layout components
5. **Brand pages** — Home, About, Collection, Blend detail (SSG)
6. **Booking system** — NestJS BookingModule + appointments API + BookingFlow component
7. **Form system** — NestJS FormModule + contact/VIP endpoints + form components
8. **Email integration** — Emailit.com API service + booking confirmations + form routing
9. **Webhook system** — NestJS WebhookModule + event emission + admin config
10. **Infrastructure** — Docker + Nginx + GitHub Actions + deployment pipeline
11. **SEO & analytics** — Meta tags, sitemap, structured data, privacy-respecting analytics
12. **Testing** — Vitest unit tests + Playwright E2E suite

**Cross-Component Dependencies:**

| Component | Depends On |
|---|---|
| Frontend pages | Content abstraction layer (NestJS API) |
| Booking flow (frontend) | Appointments API (NestJS) + Email service |
| Form submissions (frontend) | Forms API (NestJS) + Email service |
| Webhook system | Booking + Form modules (event sources) |
| Email notifications | Emailit.com API + Booking/Form modules |
| CI/CD pipeline | Docker configs + test suite |
| SSG build | NestJS API running (content fetch at build time) |

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 5 categories where AI agents could make incompatible choices — naming, structure, format, communication, and process patterns.

### Naming Patterns

**Database Naming Conventions (Prisma):**

| Element | Convention | Example |
|---|---|---|
| Model name | PascalCase singular | `Blend`, `Appointment`, `FormSubmission` |
| DB table (@@map) | snake_case plural | `blends`, `appointments`, `form_submissions` |
| Column name | camelCase | `createdAt`, `appointmentType`, `olfactiveProfile` |
| Foreign key | camelCase + Id | `clientId`, `blendId` |
| Enum | PascalCase | `AppointmentType`, `FormType`, `AppointmentStatus` |
| Enum value | UPPER_SNAKE_CASE | `IN_STORE_CONSULTATION`, `PRIVATE_DISCOVERY` |

**API Naming Conventions:**

| Element | Convention | Example |
|---|---|---|
| Endpoint path | plural, kebab-case | `/api/v1/blends`, `/api/v1/form-submissions` |
| Route parameter | :camelCase | `:slug`, `:id` |
| Query parameter | camelCase | `?appointmentType=consultation` |
| JSON response field | camelCase | `createdAt`, `appointmentType` |
| Header (custom) | X-Qadir-* | `X-Qadir-Request-Id` |

**Code Naming Conventions:**

| Element | Convention | Example |
|---|---|---|
| File name | kebab-case | `blend-card.tsx`, `booking.service.ts` |
| React component | PascalCase | `BlendCard`, `BookingFlow` |
| Function/method | camelCase | `getBlendBySlug`, `createAppointment` |
| Constant | UPPER_SNAKE_CASE | `MAX_BOOKING_SLOTS`, `API_BASE_URL` |
| Type/interface | PascalCase | `Blend`, `AppointmentInput`, `ApiResponse<T>` |
| NestJS class | PascalCase + suffix | `BookingModule`, `ContentService`, `AppointmentController` |
| CSS variable | --kebab-case | `--color-primary`, `--font-serif`, `--space-4` |
| Environment variable | UPPER_SNAKE_CASE | `DATABASE_URL`, `EMAILIT_API_KEY` |

### Structure Patterns

**Project Organization:**

```
qadir/
├── apps/
│   ├── web/                          # Next.js 16.1 frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (marketing)/      # SSG brand pages
│   │   │   │   │   ├── page.tsx          # Home
│   │   │   │   │   ├── about/page.tsx
│   │   │   │   │   ├── collection/page.tsx
│   │   │   │   │   └── collection/[slug]/page.tsx
│   │   │   │   ├── (engagement)/     # Interactive pages
│   │   │   │   │   ├── appointments/page.tsx
│   │   │   │   │   ├── private/page.tsx
│   │   │   │   │   └── contact/page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── error.tsx
│   │   │   ├── components/
│   │   │   │   ├── ui/               # shadcn/ui (auto-generated)
│   │   │   │   ├── brand/            # BlendCard, SealMark, HeroSection, OlfactiveProfile
│   │   │   │   ├── booking/          # BookingFlow, availability picker
│   │   │   │   ├── forms/            # ContactForm, VipForm
│   │   │   │   └── layout/           # Header, Footer, Navigation
│   │   │   ├── lib/
│   │   │   │   ├── api.ts            # API client (typed fetch wrapper)
│   │   │   │   ├── content.ts        # Content fetching helpers
│   │   │   │   └── utils.ts          # Shared frontend utilities
│   │   │   └── styles/
│   │   │       └── globals.css       # Tailwind v4 @theme tokens
│   │   ├── public/                   # Static assets (images, SVGs, fonts)
│   │   └── e2e/                      # Playwright E2E tests
│   │
│   └── api/                          # NestJS 11.x backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── content/          # ContentModule (static JSON → Strapi-ready)
│       │   │   │   ├── content.module.ts
│       │   │   │   ├── content.controller.ts
│       │   │   │   ├── content.service.ts
│       │   │   │   ├── content.interface.ts
│       │   │   │   ├── dto/
│       │   │   │   └── data/         # Static JSON files (Phase 1)
│       │   │   ├── booking/          # BookingModule
│       │   │   ├── forms/            # FormsModule
│       │   │   ├── webhook/          # WebhookModule
│       │   │   └── email/            # EmailModule (Emailit.com)
│       │   ├── common/
│       │   │   ├── guards/           # Auth guards
│       │   │   ├── filters/          # Exception filters
│       │   │   ├── pipes/            # Zod validation pipes
│       │   │   ├── decorators/       # Custom decorators
│       │   │   └── interceptors/     # Logging, transform interceptors
│       │   ├── prisma/
│       │   │   ├── prisma.module.ts
│       │   │   ├── prisma.service.ts
│       │   │   └── schema.prisma
│       │   └── main.ts
│       └── test/                     # E2E API tests
│
├── packages/
│   ├── ui/                           # Shared React components
│   ├── shared-types/                 # Zod schemas + TypeScript types
│   │   └── src/
│   │       ├── blend.ts              # Blend schemas + types
│   │       ├── appointment.ts        # Appointment schemas + types
│   │       ├── form.ts               # Form submission schemas + types
│   │       ├── api.ts                # API response wrapper types
│   │       └── index.ts
│   ├── eslint-config/                # Shared ESLint rules
│   └── typescript-config/            # Shared tsconfig
│
├── docker-compose.yml                # web + api + nginx services
├── docker-compose.dev.yml            # Development overrides
├── .github/workflows/deploy.yml      # CI/CD pipeline
├── turbo.json                        # Turborepo pipeline config
├── pnpm-workspace.yaml
└── package.json
```

**Test Location Rules:**
- Unit tests: co-located with source (`booking.service.spec.ts` next to `booking.service.ts`)
- E2E tests (frontend): `apps/web/e2e/`
- E2E tests (API): `apps/api/test/`
- Shared test utilities: `packages/shared-types/src/__tests__/`

### Format Patterns

**API Response Wrapper:**

```typescript
// Success (single item)
{ "data": T }

// Success (list)
{ "data": T[], "meta": { "total": number } }

// Error
{ "error": { "code": "VALIDATION_ERROR", "message": "Human-readable message", "details": [...] } }

// No envelope for health check
{ "status": "ok", "timestamp": "..." }
```

**HTTP Status Code Usage:**

| Code | Meaning | When Used |
|---|---|---|
| 200 | Success | GET, PUT responses |
| 201 | Created | POST that creates a resource (booking, form submission) |
| 400 | Bad Request | Zod validation failure |
| 401 | Unauthorized | Missing or invalid auth token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unhandled exception (logged to Sentry) |

**Date/Time Format:** ISO 8601 strings in all API communication (`"2026-02-12T14:30:00Z"`). Display formatting is frontend-only responsibility using `Intl.DateTimeFormat`.

**Null Handling:** Explicit `null` in JSON for absent optional fields. Never `undefined` in API responses. Never omit fields — include them as `null` for consistent shape.

### Communication Patterns

**Webhook Event Naming:** `resource.action` — lowercase, dot-separated.

| Event | Description |
|---|---|
| `booking.created` | New appointment submitted |
| `booking.confirmed` | Appointment confirmed by founder |
| `booking.cancelled` | Appointment cancelled |
| `form.submitted` | Contact/VIP/press/wholesale form submitted |
| `lead.received` | VIP or wholesale inquiry (subset of form.submitted) |

**Webhook Payload Structure:**

```json
{
  "event": "booking.created",
  "timestamp": "2026-02-12T14:30:00Z",
  "data": { }
}
```

**NestJS Internal Events:** Same naming convention, emitted via `EventEmitter2`. Webhook module listens and dispatches outbound HTTP POST.

### Process Patterns

**Error Handling:**

| Layer | Pattern |
|---|---|
| NestJS | Global `AllExceptionsFilter` catches unhandled errors → standard error response → Sentry log |
| Zod validation | `ZodValidationPipe` transforms Zod errors into 400 responses with field-level details |
| Next.js | `error.tsx` per route group → UX-spec error styling (muted burgundy #8B3A3A) |
| User language | "We couldn't process that" — never blame the user. Never expose stack traces. |

**Loading State Patterns:**

| State | Frontend Treatment |
|---|---|
| Form submitting | Button text changes: "Submit" → "Sending..." Button disabled. No spinner. |
| Booking submitting | Button text changes: "Confirm Booking" → "Booking..." Button disabled. |
| Page loading (SSR) | Minimal skeleton (content block placeholders) only if > 200ms |
| API error | Inline message below form in muted burgundy. Form remains editable. |
| Success | Inline confirmation on same page. No redirect. Green checkmark + message. |

**Validation Flow:**
1. **Client-side (instant):** Zod validates on field blur and form submit. Error appears inline below field.
2. **Server-side (authoritative):** Same Zod schema validates in NestJS pipe. Server is source of truth.
3. **Error display:** Standard format — muted burgundy text, immediately below the errored field, associated via `aria-describedby`.

### Enforcement Guidelines

**All AI Agents MUST:**

1. Follow the naming conventions defined above — no exceptions without a documented Architecture Decision Record (ADR)
2. Use the standard API response wrapper (`{ data }` / `{ error }`) for all endpoints
3. Place files in the correct directory per the structure patterns above
4. Use Zod schemas from `packages/shared-types` for all input validation — both frontend and backend
5. Emit webhook events for all user-facing state changes (bookings, form submissions)
6. Handle errors through the global exception filter — never swallow errors with ad-hoc try/catch
7. Write co-located unit tests for every service and utility function
8. Use environment variables for all configuration — never hardcode secrets, URLs, or API keys
9. Return `null` (not `undefined`, not omitted) for absent optional fields in API responses
10. Use ISO 8601 date strings in all API communication — formatting is frontend-only

**Pattern Verification:**
- ESLint enforces code naming conventions (camelCase functions, PascalCase components)
- Prisma schema enforces database naming
- CI pipeline runs lint + tests before any deploy
- API response structure validated by shared TypeScript types

**Anti-Patterns (FORBIDDEN):**

| Anti-Pattern | Correct Pattern |
|---|---|
| `getUserData()` returning `undefined` for missing fields | Return `null` explicitly |
| `catch(e) { console.log(e) }` | Let global exception filter handle it |
| Hardcoded `"http://localhost:3001"` in frontend | Use `API_BASE_URL` environment variable |
| `user_name` in TypeScript code | `userName` (camelCase in code, snake_case only in DB) |
| `UserCard.tsx` in `/components/ui/` | `/components/brand/user-card.tsx` (kebab-case file, correct directory) |
| Date formatting in API response | Return ISO string, format in frontend with `Intl.DateTimeFormat` |
| Inline validation without Zod | Import shared schema from `packages/shared-types` |

## Project Structure & Boundaries

### Requirements to Structure Mapping

| FR Category | Backend Location | Frontend Location |
|---|---|---|
| Brand Presentation (FR1-FR6) | `api/src/modules/content/` | `web/src/app/(marketing)/`, `web/src/components/brand/` |
| Appointment Booking (FR7-FR12) | `api/src/modules/booking/` | `web/src/app/(engagement)/appointments/`, `web/src/components/booking/` |
| Lead Capture (FR13-FR18) | `api/src/modules/forms/` | `web/src/app/(engagement)/contact/`, `web/src/app/(engagement)/private/`, `web/src/components/forms/` |
| Analytics (FR26-FR30) | N/A (third-party script) | `web/src/lib/analytics.ts` |
| SEO (FR31-FR35) | `api/src/modules/content/` (structured data) | `web/src/app/*/layout.tsx` (meta), `web/src/app/sitemap.ts` |
| Admin (FR36-FR40) | `api/src/common/guards/`, admin endpoints per module | N/A (Phase 1 — admin via Supabase dashboard) |
| Extensibility (FR41-FR45) | `api/prisma/schema.prisma` (nullable Phase 2 fields) | `web/src/lib/content.ts` (content abstraction) |
| Email (FR10-11, FR15) | `api/src/modules/email/` | N/A (backend-only) |
| Webhooks (n8n-ready) | `api/src/modules/webhook/` | N/A (backend-only) |

### Architectural Boundaries

**Request Routing (Nginx):**

```
Internet → Nginx (port 80/443, SSL termination)
  ├── qadir.com/*           → Next.js container (port 3000) — SSG/SSR pages
  ├── qadir.com/api/v1/*    → NestJS container (port 3001) — Public API (rate-limited)
  └── qadir.com/api/v1/admin/* → NestJS container (port 3001) — Admin API (auth required)
```

**NestJS Module Boundaries:**

Each module owns its controller, service, and DTOs. No module imports another module's service directly. Cross-module communication uses NestJS `EventEmitter2`.

```
ContentModule  [reads static JSON / future Strapi]
  └── No dependencies on other modules

BookingModule  [Prisma: appointments table]
  ├── emits: booking.created, booking.confirmed, booking.cancelled
  └── consumed by: EmailModule, WebhookModule (via EventEmitter2)

FormsModule    [Prisma: form_submissions table]
  ├── emits: form.submitted, lead.received
  └── consumed by: EmailModule, WebhookModule (via EventEmitter2)

EmailModule    [Emailit.com external API]
  ├── listens: booking.created, form.submitted
  └── No database access — pure email dispatch

WebhookModule  [Prisma: webhook_configs table]
  ├── listens: booking.created, booking.confirmed, form.submitted, lead.received
  └── Dispatches outbound HTTP POST to configured URLs

PrismaModule   [PostgreSQL via Supabase]
  └── Shared across BookingModule, FormsModule, WebhookModule
```

**Data Boundaries:**

| Data Store | Access Pattern | Modules |
|---|---|---|
| PostgreSQL (Prisma) | ORM queries via PrismaService | Booking, Forms, Webhook |
| Supabase Auth | JS client (JWT validation) | Common/Guards |
| Supabase Storage | JS client (file upload/serve) | Content (images) |
| Static JSON | File system read | Content (Phase 1) |
| Emailit.com API | HTTP client (outbound) | Email |
| Sentry | SDK (outbound) | Common/Filters |

### Data Flow Diagrams

**SSG Build Flow (Content Pages):**

```
Next.js build process
  → fetch GET /api/v1/content/home
  → fetch GET /api/v1/content/about
  → fetch GET /api/v1/blends
  → fetch GET /api/v1/blends/:slug (x4)
  → NestJS ContentService reads static JSON files
  → Returns structured content
  → Next.js generates static HTML pages
  → Deployed to Nginx as static files
```

**Booking Submission Flow:**

```
Browser (BookingFlow component)
  → POST /api/v1/appointments { type, date, time, name, email, message }
  → Nginx proxy → NestJS BookingController
  → ZodValidationPipe validates input
  → BookingService.create()
    → Prisma: check slot availability (prevent double-booking)
    → Prisma: INSERT into appointments table
    → EventEmitter2: emit('booking.created', appointment)
  → EmailModule (listener):
    → Emailit.com API: send confirmation to client
    → Emailit.com API: send notification to founder
  → WebhookModule (listener):
    → HTTP POST to each active webhook URL for 'booking.created'
  → Response: 201 { data: { id, type, date, time, status: 'pending' } }
  → Frontend: show inline confirmation
```

**Form Submission Flow:**

```
Browser (ContactForm / VipForm component)
  → POST /api/v1/forms/contact { name, email, subject, message }
  → Nginx proxy → NestJS FormsController
  → ZodValidationPipe validates input + honeypot check
  → FormsService.create()
    → Prisma: INSERT into form_submissions table
    → EventEmitter2: emit('form.submitted', submission)
    → If type is VIP or Wholesale: emit('lead.received', submission)
  → EmailModule (listener):
    → Emailit.com API: route to founder inbox with category tag
  → WebhookModule (listener):
    → HTTP POST to active webhook URLs
  → Response: 201 { data: { id, type, status: 'received' } }
  → Frontend: show inline confirmation ("We've received your message")
```

### External Integration Points

| Service | Protocol | Location | Env Variable |
|---|---|---|---|
| Emailit.com | REST API (HTTPS) | `api/src/modules/email/emailit.service.ts` | `EMAILIT_API_KEY` |
| Supabase Auth | JS client | `api/src/common/guards/auth.guard.ts` | `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` |
| Supabase Storage | JS client | `api/src/modules/content/storage.service.ts` | `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` |
| Sentry | SDK | `api/src/main.ts`, `web/src/app/layout.tsx` | `SENTRY_DSN` |
| Analytics | Script tag | `web/src/lib/analytics.ts` | `ANALYTICS_ID` |
| n8n (future) | Webhook (HTTPS) | Configured via WebhookModule | Stored in DB |
| Strapi (CMS Phase) | REST API | `api/src/modules/content/strapi.service.ts` | `STRAPI_URL`, `STRAPI_API_KEY` |

### Environment Variables

**Shared:**

```env
NODE_ENV=production
```

**Backend (apps/api):**

```env
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_SERVICE_KEY=...
EMAILIT_API_KEY=...
SENTRY_DSN=...
CORS_ORIGIN=https://qadir.com
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
PORT=3001
```

**Frontend (apps/web):**

```env
NEXT_PUBLIC_API_URL=https://qadir.com/api/v1
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SENTRY_DSN=...
NEXT_PUBLIC_ANALYTICS_ID=...
```

### Development Workflow

**Local Development:**

```bash
pnpm dev                    # Starts both web (3000) + api (3001) via Turborepo
pnpm --filter web dev       # Frontend only
pnpm --filter api dev       # Backend only
pnpm test                   # Run all tests
pnpm lint                   # Lint all packages
pnpm build                  # Production build (cached by Turborepo)
```

**Build Process:**

```
turbo build
  ├── packages/shared-types → compiles Zod schemas + types
  ├── packages/ui → compiles shared components
  ├── apps/api → NestJS production build
  └── apps/web → Next.js standalone build (fetches content from API at build time)
```

**Deployment:**

```
GitHub Actions (on push to main)
  → pnpm install (cached)
  → turbo lint
  → turbo test
  → turbo build
  → SSH to VPS
  → docker-compose build
  → docker-compose up -d (zero-downtime: new containers start before old ones stop)
```

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:** All 17 architectural decisions verified compatible. No contradictory choices found. Key validations:
- Next.js 16.1 + shadcn/ui CLI 3.0 + Tailwind CSS 4.x — first-class mutual support
- NestJS 11.x + Prisma + Supabase PostgreSQL — well-established integration
- Turborepo + pnpm workspaces — default combination, zero config conflicts
- Zod shared validation + NestJS pipes + Next.js forms — works in both runtimes

**Pattern Consistency:** Naming conventions (camelCase/PascalCase/kebab-case) applied consistently across DB, API, code, and CSS layers. API response wrapper (`{ data }` / `{ error }`) used uniformly. Zod as single validation approach — no competing libraries.

**Structure Alignment:** Monorepo structure follows Turborepo conventions. NestJS modules follow official best practices. Next.js App Router route groups align with rendering strategy (marketing = SSG, engagement = SSR/CSR). Shared packages enable cross-app type safety.

### Requirements Coverage Validation

**Functional Requirements:**

| FR Range | Coverage | Notes |
|---|---|---|
| FR1-FR6 (Brand) | Covered | ContentModule → SSG pages |
| FR7-FR12 (Booking) | Covered | BookingModule + EmailModule + BookingFlow |
| FR13-FR18 (Lead Capture) | Covered | FormsModule + EmailModule + honeypot |
| FR19-FR25 (CMS) | **Deferred** | Content abstraction layer ready for Strapi |
| FR26-FR30 (Analytics) | Covered | Privacy-respecting script + conversion tracking |
| FR31-FR35 (SEO) | Covered | SSG/SSR + meta + sitemap + JSON-LD |
| FR36-FR40 (Admin) | Covered | Supabase Auth + Guards + admin endpoints |
| FR41-FR45 (Extensibility) | Covered | Nullable Prisma fields + API-first design |

**Result: 40/45 FRs covered. 5 FRs intentionally deferred to CMS Phase.**

**Non-Functional Requirements:** 36/36 NFRs covered across Performance, Security, Scalability, Accessibility, Integration, Reliability, and Maintainability categories. Each NFR maps to specific architectural decisions and patterns.

### Implementation Readiness Validation

| Check | Status |
|---|---|
| Technology versions specified and verified (Feb 2026) | Pass |
| Critical decisions documented with rationale | Pass (6 critical, 11 important) |
| Naming conventions cover all layers | Pass (DB, API, code, CSS, env) |
| Project structure complete and specific | Pass (not generic placeholders) |
| API endpoints defined with methods and auth levels | Pass (11 endpoints) |
| Data model entities defined with extensibility fields | Pass (4 entities) |
| Integration points mapped with env variables | Pass (7 services) |
| Error handling defined for all layers | Pass (NestJS filter, Zod pipe, Next.js boundary) |
| Data flow diagrams for key scenarios | Pass (SSG build, booking, form) |
| Anti-patterns documented | Pass (7 anti-patterns with corrections) |
| Enforcement guidelines clear | Pass (10 mandatory rules) |

### Gap Analysis Results

**Critical Gaps:** 0

**Important Gaps (non-blocking, resolved during implementation):**

| Gap | Impact | Resolution |
|---|---|---|
| Full Prisma schema not written | Low — entity descriptions sufficient for architecture | First implementation story writes schema.prisma |
| Analytics vendor not selected | Low — script tag integration, no architectural impact | Decide during implementation (Plausible/Umami/Fathom) |
| Image optimization pipeline | Low — Next.js Image component handles automatically | Supabase Storage serves originals, Next.js optimizes |

**Nice-to-Have Gaps:**

| Gap | Impact | Resolution |
|---|---|---|
| ADR template | Minimal — needed only if decisions change | Add if revision needed |
| docker-compose.dev.yml details | Minimal — standard pattern | Specify during infra story |
| Load testing config | Minimal — NFR14 validation | Add after deployment |

### Architecture Completeness Checklist

**Requirements Analysis:**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (medium)
- [x] Technical constraints identified (11 constraints)
- [x] Cross-cutting concerns mapped (8 concerns)
- [x] CMS phasing decision documented

**Architectural Decisions:**
- [x] Critical decisions documented with versions (6 critical)
- [x] Important decisions documented with rationale (11 important)
- [x] Deferred decisions documented with rationale (5 deferred)
- [x] Technology stack fully specified and version-verified
- [x] Integration patterns defined (Emailit, Supabase, Sentry, webhooks)

**Implementation Patterns:**
- [x] Database naming conventions established
- [x] API naming and response format standardized
- [x] Code naming conventions established
- [x] Error handling patterns defined for all layers
- [x] Loading state and validation flow patterns defined
- [x] Event/webhook communication patterns specified
- [x] Anti-patterns documented with corrections
- [x] Enforcement guidelines with 10 mandatory rules

**Project Structure:**
- [x] Complete directory structure defined (monorepo with all files)
- [x] Component boundaries established (module isolation via EventEmitter2)
- [x] Integration points mapped with env variables
- [x] Requirements to structure mapping complete (all FR categories)
- [x] Data flow diagrams for key scenarios
- [x] Development, build, and deployment workflows defined

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
1. Clear module isolation — NestJS modules communicate via events, not direct imports
2. Content abstraction layer — seamless Strapi migration path with zero frontend rewrite
3. Shared Zod validation — prevents frontend/backend schema divergence
4. Webhook system — n8n automation ready without code changes
5. Phase 2 extensibility — nullable fields in data model from day one
6. Full traceability — every decision maps to PRD requirements
7. Self-managed infrastructure — complete ownership, no vendor lock-in

**Areas for Future Enhancement:**
1. Analytics vendor selection (implementation-time decision)
2. Full Prisma schema with indexes and relations (first implementation story)
3. ADR template for architectural change management
4. Load testing configuration for NFR14 validation
5. Strapi content type definitions (CMS Phase planning)
