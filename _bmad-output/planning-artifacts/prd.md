---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - '1. Website Build Brief — Phase 1.docx'
  - '2. Website Content.docx'
  - '3. Digital Roadmap — Phase 2.docx'
  - 'QADIR_BRAND KIT Master_Submission_Package_v2_Corrected/README.txt'
  - 'QADIR_English_Seal_Motto_Corrected.svg'
  - 'QADIR_English_Seal_Minimal_Corrected.svg'
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 4
  contentDocs: 1
  roadmapDocs: 1
classification:
  projectType: web_app
  domain: luxury-retail
  complexity: medium
  projectContext: greenfield
workflowType: 'prd'
---

# Product Requirements Document — QADIR Montreal

**Author:** Mqxerrormac16
**Date:** 2026-02-12
**Version:** 1.0
**Status:** Complete

## Executive Summary

### Product Vision

QADIR Montreal is a luxury perfumery house rooted in oud tradition, interpreted through a modern Montreal lens. The website serves as the brand's digital flagship — establishing legitimacy, communicating authority, and enabling high-touch client relationships. This is not an e-commerce platform. It is a brand authority tool with selective appointment booking and qualified lead capture.

### Product Differentiator

QADIR positions itself through restraint, not excess. The website rejects mass-market patterns (Shopify templates, loud animations, gold gradients) in favor of editorial pacing, generous whitespace, and typographic confidence. Every design and content choice reinforces the principle: luxury = confidence + restraint.

### Target Users

- **Discerning retail clients** seeking considered fragrance purchases
- **VIP / private clients** expecting discretion and personalized access
- **Wholesale & strategic partners** evaluating brand credibility
- **Press / collaborators** requiring brand information and media access
- **Founder / Admin** managing content, appointments, and leads

### Core Capabilities (Phase 1)

1. Present the QADIR brand story with editorial elegance
2. Showcase four Signature Blends (ASL, NOOR, HAYBA, MIQDAR) with olfactive profiles
3. Enable appointment booking (in-store consultations, private discovery sessions)
4. Capture qualified leads (VIP, wholesale, press) through controlled forms
5. Provide founder-editable CMS for all content
6. Architect for Phase 2 expansion (e-commerce, CRM, internationalization) without replatforming

### Technology Direction

- **Frontend:** React (latest) — SPA with SSR/SSG for SEO
- **Backend:** NestJS or ExpressJS — API layer for bookings, forms, CMS integration
- **CMS:** Headless CMS (founder-editable, no developer dependency)
- **Architecture:** Modular, headless or semi-headless, e-commerce-ready for Phase 2

## Success Criteria

### User Success

- Visitors immediately perceive QADIR as a legitimate luxury perfumery house within 5 seconds of landing
- Visitors understand the four Signature Blends and their distinct roles within one browsing session
- Clients complete appointment booking end-to-end in under 3 minutes
- VIP/wholesale inquiries reach the founder's inbox within 30 seconds of form submission
- Returning visitors find consistent, updated content reflecting current brand state

### Business Success

- **3-Month:** All Phase 1 pages live, booking flow operational, first appointments scheduled through the website
- **6-Month:** Measurable inbound leads from VIP, wholesale, and press channels; founder managing content independently
- **12-Month:** Website established as primary brand touchpoint; architecture validated ready for Phase 2 e-commerce without replatforming
- Zero unilateral design or UX decisions visible on live site (founder approval required for all)

### Technical Success

- Page load under 2 seconds on 4G mobile connections
- Lighthouse performance score above 90
- All content editable by founder without developer intervention
- Booking confirmation delivered within 10 seconds of submission
- Zero single-point dependencies (founder owns domain, hosting, CMS admin, analytics)
- Architecture supports Phase 2 additions (e-commerce, CRM, localization) without structural rewrites
- SEO-ready clean URL structure with proper meta tags on all pages

### Measurable Outcomes

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to first meaningful paint | < 1.5s | Lighthouse |
| Appointment booking completion rate | > 70% of started flows | Analytics funnel |
| Lead form submission-to-inbox | < 30 seconds | Server monitoring |
| Content update turnaround | < 5 minutes for text changes | CMS audit log |
| Mobile usability score | 100/100 | Google Mobile-Friendly Test |
| Uptime | 99.5% | Hosting provider SLA |

## Product Scope

### MVP — Phase 1 (Build Now)

**Mandatory Pages:**

1. **Home** — Hero with brand positioning, visual authority, clear entry points (Discover / Book / Contact), Signature Collection preview
2. **About / Founder** — Origin of QADIR, Montreal as creative birthplace, craft and restraint philosophy
3. **Signature Blends (Collection)** — Four individual blend presentations (ASL, NOOR, HAYBA, MIQDAR) each with name, meaning, role, olfactive profile, description
4. **Discovery / Appointments** — In-store consultations, private sessions, booking flow with confirmation
5. **VIP / Private Clients** — Discretion-first language, invitation tone, lead capture form (Name, Email, Message)
6. **Contact** — Brand-appropriate form (Name, Email, Subject, Message), no clutter

**Core Capabilities:**

- CMS-driven content (founder-editable without developer)
- Appointment booking with end-to-end confirmation flow
- Lead capture routing (VIP, wholesale, press) to founder
- Mobile-first responsive design with desktop-luxury presentation
- SEO-ready structure (clean URLs, meta tags, semantic HTML)
- Privacy-respecting analytics (basic tracking, no surveillance)
- Secure hosting with SSL/TLS

**Explicit Phase 1 Deliverables:**

- All pages live and stable
- Content editable without developer intervention
- Booking flow working end-to-end
- Lead capture routing correctly
- Site documented and secure
- Brand colour system and typography implemented exactly per specification

### Growth Features — Phase 2 (Architect Now, Build Later)

Phase 1 must not block these. No rework allowed.

- **2A — CRM Deepening:** Unified client profiles, purchase/consultation history, preference tracking (oud intensity, gifting vs personal, frequency), client tagging (VIP, Private, Wholesale, Press), manual + automated follow-ups
- **2B — Selective E-Commerce:** Curated online purchasing (limited SKUs), tiered pricing (Retail/VIP/Wholesale), multi-currency (CAD primary, AED/USD future), inventory sync with POS, secure payments (Stripe-level)
- **2C — Advanced Appointments:** Private scent creation sessions, restricted booking pages, personalized confirmations, CRM-linked visit history
- **2D — Content & Brand Authority:** Editorial content (process, craft, philosophy), controlled press page, private invite-only content areas, long-form storytelling
- **2E — International Expansion:** Localization (language-ready), region-specific content, compliance-ready structure, separate pricing by region

### Vision — Phase 3+ (Not Built, Not Planned Architecturally)

- Mobile apps
- Loyalty points / gamification
- Influencer portals
- AI-powered recommendations
- Mass marketing automation

These are explicitly out of scope and would cheapen the brand if introduced prematurely.

## User Journeys

### Journey 1: Nadia — The Discerning First-Time Visitor

**Persona:** Nadia, 38, creative director in Montreal. Values understated quality. Skeptical of brands that try too hard.

**Opening Scene:** Nadia discovers QADIR through a colleague's mention. She opens the website on her phone during lunch, expecting another overwrought perfume site.

**Rising Action:** Instead she encounters stillness — warm off-white background, confident serif typography, a single headline: "Modern perfumery rooted in oud tradition. Conceived in Montreal. Manufactured in Dubai." No pop-ups. No carousel. She scrolls into the Signature Collection preview. Each blend has a clear role — Authority, Light, Presence, Depth. She taps ASL. The olfactive profile reads like considered craft, not marketing copy: refined oud, dry saffron, cedarwood, amber resin, soft leather nuance.

**Climax:** Nadia feels respected by the experience. The site treats her as someone who doesn't need to be sold to — just informed. She taps "Book a Consultation."

**Resolution:** The booking flow is clean — select appointment type (in-store consultation), choose a time, confirm. She receives a confirmation. She arrives at the store already trusting the brand.

**Requirements Revealed:** Homepage visual authority, Signature Blend detail pages, olfactive profile display, mobile-first booking flow, confirmation system

---

### Journey 2: Khalid — The VIP Private Client

**Persona:** Khalid, 52, business owner who values discretion above all. Purchases luxury goods through private channels. Does not browse websites casually.

**Opening Scene:** Khalid receives a personal recommendation from a mutual contact. He opens the QADIR website on his desktop in his office, assessing whether this house deserves his time.

**Rising Action:** He navigates directly to "Private Access." The language is measured: "Certain experiences are reserved." No flashy promises. He reads about invitation-only experiences, priority access, tailored recommendations.

**Climax:** The form asks only for Name, Email, and Message. No phone number field, no dropdown menus, no "How did you hear about us?" interrogation. The restraint signals that QADIR understands his world.

**Resolution:** He submits a brief message. The founder responds personally within hours. A private session is arranged. Khalid becomes a recurring client.

**Requirements Revealed:** VIP page with discretion-first copy, minimal lead capture form, lead routing directly to founder inbox, desktop-luxury experience

---

### Journey 3: Marie-Claire — Wholesale Partner Evaluator

**Persona:** Marie-Claire, 44, luxury retail buyer for a multi-brand boutique in Toronto. She evaluates 20+ brands per month.

**Opening Scene:** Marie-Claire opens the QADIR website to evaluate whether to carry the brand. She has 3 minutes before her next meeting.

**Rising Action:** She scans the homepage — positioning is clear, not diluted. She checks "About / Founder" — the origin story is specific (Montreal, oud tradition, restraint philosophy), not generic. She reviews the Signature Collection — four blends, each with a distinct role. The collection feels curated, not bloated.

**Climax:** She navigates to "Contact" and sees a clean form. Subject field allows her to specify "Wholesale Inquiry." The entire site signals a brand that understands luxury retail discipline.

**Resolution:** She submits an inquiry. The response includes a wholesale information package. She schedules a meeting.

**Requirements Revealed:** Fast-scanning homepage, credible About page, collection overview, Contact form with subject categorization, wholesale lead routing

---

### Journey 4: The Founder — Content Management

**Persona:** The QADIR founder. Needs full content control without developer dependency.

**Opening Scene:** A new seasonal variation of HAYBA is being considered. The founder needs to update the HAYBA description and add a note to the Discovery page about a special tasting event.

**Rising Action:** The founder logs into the CMS admin panel. Content sections are clearly labeled by page. He navigates to Signature Blends > HAYBA, updates the description text. He then navigates to Discovery / Appointments and adds an event note.

**Climax:** He hits publish. Changes are live within seconds. No ticket filed, no developer waiting, no deployment cycle.

**Resolution:** The site reflects current brand reality at all times. The founder maintains direct control over his brand's digital voice.

**Requirements Revealed:** CMS with page-level content editing, instant publish, no developer dependency, clear content structure in admin, founder admin access, analytics access

---

### Journey 5: Sarah — Press / Collaborator

**Persona:** Sarah, 31, lifestyle journalist researching emerging Montreal luxury brands for a feature piece.

**Opening Scene:** Sarah is writing a piece on Montreal's evolving luxury scene. She visits the QADIR website to gather brand information and assess editorial worthiness.

**Rising Action:** The About page gives her a clear origin narrative — Montreal, oud tradition, restraint. The Signature Collection page provides specific olfactive details she can reference. The design quality of the site itself communicates editorial credibility.

**Climax:** She contacts QADIR through the form, specifying "Press" as the subject. The measured tone of the website assures her this is a brand worth featuring, not a startup trying to go viral.

**Resolution:** The founder responds with press-appropriate information. The article features QADIR prominently.

**Requirements Revealed:** Strong About content, detailed blend information for reference, Contact form with press subject option, brand credibility through design quality

### Journey Requirements Summary

| Capability | Journeys |
|------------|----------|
| Homepage with visual authority and clear CTAs | 1, 3, 5 |
| Signature Blend detail pages with olfactive profiles | 1, 3, 5 |
| Appointment booking with confirmation flow | 1 |
| VIP lead capture with discretion-first design | 2 |
| Contact form with subject categorization | 3, 5 |
| CMS content editing with instant publish | 4 |
| Mobile-first responsive design | 1 |
| Desktop-luxury presentation | 2, 3 |
| Lead routing to founder inbox | 2, 3, 5 |
| Founder admin and analytics access | 4 |

## Domain-Specific Requirements

### Quebec Language Compliance

QADIR operates in Montreal, Quebec. The brand kit includes a Quebec Language Compliance Note confirming awareness of provincial language requirements.

- Primary website language: English (Phase 1)
- Architecture must support bilingual content (French) for Phase 2 without restructuring
- Brand motto on seal uses French: "AUTORITE EN ESSENCE"
- Product names (ASL, NOOR, HAYBA, MIQDAR) are Arabic-origin and considered proper nouns — no translation required
- Quebec consumer protection laws require French availability for commercial communications; Phase 1 website serves as brand presence (not direct commerce), reducing immediate bilingual obligation
- CMS must support multilingual content fields for Phase 2 readiness

### Brand Compliance

The QADIR Brand Standards Guide and Logo Usage Guide define strict visual rules:

- **Logo:** Two approved seal variants — Primary seal with French motto ring, Minimal seal for embossing/luxury applications
- **Colour palette:** Deep Charcoal (#111111), Warm Off-White (#F6F5F2), Muted Oud Brown (#5A4632), Soft Stone Grey (#C8C6C1). No golds, no gradients, maximum one accent colour per screen
- **Typography:** Canela (serif, headlines) with Playfair Display fallback; Inter (sans-serif, body) with Helvetica Neue fallback. No decorative or script fonts
- **Buttons:** Solid charcoal or outline charcoal, subtle hover states, 2-4px radius maximum, no pill shapes
- Any deviation from brand kit requires written founder approval

### Privacy & Data Handling

- Contact and booking forms collect personal data (name, email) — PIPEDA (Canadian privacy law) compliance required
- No surveillance-level analytics; privacy-respecting tracking only
- No third-party data sharing without explicit consent
- Form data retention policies must be defined and documented
- Secure transmission (HTTPS) for all form submissions

## Web Application Specific Requirements

### Project-Type Overview

QADIR is a single-page application (SPA) or server-rendered web application designed for brand authority and client engagement. It is NOT an e-commerce platform in Phase 1, but architecture must accommodate selective e-commerce in Phase 2.

### Technical Architecture Considerations

**Rendering Strategy:**
- SSR (Server-Side Rendering) or SSG (Static Site Generation) for SEO-critical pages (Home, About, Signature Blends)
- Client-side rendering acceptable for interactive elements (booking flow, forms)
- React (latest) for frontend component architecture
- NestJS or ExpressJS for backend API layer

**Browser Support:**
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge — latest 2 versions)
- iOS Safari 15+ and Android Chrome 100+
- Graceful degradation for older browsers (content accessible, interactive features may degrade)

**SEO Strategy:**
- Clean, semantic URL structure (`/about`, `/collection/asl`, `/appointments`, `/contact`)
- Server-rendered meta tags (title, description, Open Graph) per page
- Structured data (JSON-LD) for organization and product information
- XML sitemap and robots.txt
- Canonical URLs to prevent duplicate content

**Responsive Design:**
- Mobile-first CSS architecture
- Breakpoints: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- Touch-friendly interactions on mobile
- Desktop layout emphasizes whitespace and editorial pacing per brand guidelines

### CMS Architecture

- Headless CMS providing content via API
- Structured content types: Pages, Signature Blends, Appointments, Contact Form Config
- Rich text editing for body content
- Image management with optimization (responsive images, WebP)
- Draft/publish workflow with preview capability
- Founder-level admin access with full content control
- API-based content delivery (RESTful or GraphQL) for frontend consumption
- Content versioning for rollback capability

### Booking System Architecture

- Backend API endpoints for appointment management
- Appointment types: In-store fragrance consultation, Private discovery session
- Calendar integration for availability management
- Email confirmation (automated) on booking submission
- Founder notification on new bookings
- CRM-integration ready (Phase 2): booking data structure must support future CRM sync
- No double data entry: single submission populates all necessary systems

### Form & Lead Capture Architecture

- Backend API endpoints for form submissions
- Form types: Contact (general), VIP Access Request, Booking
- Server-side validation and sanitization
- Email routing: submissions delivered to founder inbox within 30 seconds
- Form data stored in database for future CRM integration (Phase 2)
- Spam protection (honeypot fields, rate limiting) without CAPTCHA friction
- Subject categorization for routing (General, Press, Wholesale, VIP)

### Implementation Considerations

- **E-Commerce Readiness:** Database schema and API architecture must accommodate product catalog, cart, checkout, and payment processing in Phase 2. No hard-coded templates.
- **CRM Readiness:** Client data models must support custom fields, tagging, and preference tracking. API access and exportable data required. No data lock-in.
- **Internationalization Readiness:** No hard-coded currency, geography, tax logic, or language assumptions. Content structure supports localization fields.
- **Payment Provider Agnostic:** No payment processing in Phase 1, but architecture must not constrain future provider choice (Stripe, Square, etc.)

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — the minimum that establishes QADIR as a legitimate luxury perfumery house and enables client engagement. Polish over speed; rushed luxury shows.

**Resource Requirements:**
- Frontend developer (React, responsive design, animation restraint)
- Backend developer (NestJS/Express, API design, CMS integration)
- Designer (brand implementation, not brand creation — brand kit exists)
- Founder (content approval, brand decisions)

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- First-time visitor discovering the brand (Journey 1)
- VIP client requesting private access (Journey 2)
- Wholesale partner evaluating the brand (Journey 3)
- Founder managing content (Journey 4)
- Press/collaborator gathering information (Journey 5)

**Must-Have Capabilities:**

1. Six pages live: Home, About/Founder, Signature Blends (collection + 4 individual), Discovery/Appointments, VIP/Private, Contact
2. Headless CMS with founder admin access
3. Appointment booking flow with email confirmation
4. Contact/VIP/Press form submission with email routing
5. Brand colour system (#111111, #F6F5F2, #5A4632, #C8C6C1) implemented
6. Typography system (Canela/Playfair Display + Inter) implemented
7. Mobile-first responsive design
8. SEO-ready structure (meta tags, clean URLs, sitemap)
9. Privacy-respecting analytics
10. SSL/TLS secure hosting
11. Founder owns domain, hosting, CMS admin, analytics access

### Post-MVP Features

**Phase 2A — CRM (Post-Launch Stability):**
- Unified client profiles, preference tracking, automated follow-ups

**Phase 2B — Selective E-Commerce (Brand Authority Established):**
- Limited SKU purchasing, tiered pricing, multi-currency, inventory sync

**Phase 2C — Advanced Appointments (High-Touch Demand):**
- Private scent creation, restricted booking, CRM-linked history

**Phase 2D — Content Authority (Press Interest):**
- Editorial content, controlled press page, private content areas

**Phase 2E — International (Dubai/GCC Alignment):**
- Localization, regional content, compliance structure, regional pricing

### Risk Mitigation Strategy

**Technical Risks:**
- CMS choice locks architecture → Mitigate: Select headless CMS with API access, exportable data, no vendor lock-in
- Phase 2 e-commerce requires replatforming → Mitigate: Modular architecture from day one, database schema designed for product catalog extension

**Brand Risks:**
- Website looks like a template → Mitigate: Custom design implementation following brand kit exactly, no Shopify-like patterns
- Content goes stale → Mitigate: CMS with easy editing, founder trained on content management

**Market Risks:**
- Website doesn't convert visitors to appointments → Mitigate: Clear CTAs on every page, booking flow under 3 minutes, analytics tracking conversion funnel

**Resource Risks:**
- Developer dependency for content updates → Mitigate: Headless CMS with founder admin, no developer needed for content changes
- Single-point failure → Mitigate: Founder owns all credentials, documented architecture, no proprietary black boxes

## Functional Requirements

### Brand Presentation

- FR1: Visitors can view the QADIR brand story, positioning, and origin narrative
- FR2: Visitors can view the four Signature Blends as a curated collection with distinct roles
- FR3: Visitors can view individual blend detail pages with name, meaning, role, olfactive profile, and description
- FR4: Visitors can navigate between all site sections via persistent navigation
- FR5: Visitors can access primary calls-to-action (Discover the Collection, Book a Consultation) from the homepage
- FR6: The website renders the approved QADIR seal (primary with French motto, or minimal variant) per brand usage guidelines

### Appointment Booking

- FR7: Clients can select an appointment type (in-store fragrance consultation or private discovery session)
- FR8: Clients can view available appointment times and select a preferred slot
- FR9: Clients can submit a booking request with their contact information
- FR10: Clients receive an email confirmation within 10 seconds of booking submission
- FR11: The founder receives notification of each new booking via email
- FR12: The booking system prevents double-booking of the same time slot

### Lead Capture & Contact

- FR13: Visitors can submit a contact inquiry with Name, Email, Subject, and Message
- FR14: Visitors can request VIP/Private access with Name, Email, and Message
- FR15: The system routes form submissions to the founder's inbox within 30 seconds
- FR16: The system categorizes inquiries by type (General, Press, Wholesale, VIP) based on subject selection
- FR17: The system validates form inputs server-side before processing (email format, required fields, sanitization)
- FR18: The system protects forms against spam without user-facing CAPTCHA

### Content Management

- FR19: The founder can edit all text content on any page through the CMS admin interface
- FR20: The founder can add, edit, or remove Signature Blend entries
- FR21: The founder can upload and manage images through the CMS
- FR22: The founder can publish content changes that appear on the live site within 60 seconds
- FR23: The founder can preview content changes before publishing
- FR24: The founder can revert content to a previous version
- FR25: The CMS provides structured content types for each page (not generic rich text blocks)

### Analytics & Monitoring

- FR26: The system tracks page views, unique visitors, and traffic sources
- FR27: The system tracks appointment booking conversion funnel (page view → start booking → complete booking)
- FR28: The system tracks form submission rates by type
- FR29: The founder can access analytics data through a dashboard
- FR30: Analytics collection respects user privacy (no invasive tracking, no third-party data sharing)

### SEO & Discoverability

- FR31: Each page renders with unique, descriptive meta title and description tags
- FR32: The system generates an XML sitemap automatically
- FR33: The system provides Open Graph and Twitter Card meta tags for social sharing
- FR34: The system generates semantic HTML with proper heading hierarchy
- FR35: The system supports structured data (JSON-LD) for organization and product information

### Administration & Access

- FR36: The founder can log into the CMS with secure authentication (email + password with MFA option)
- FR37: The founder has full administrative access to all CMS features
- FR38: The system provides role-based access for future team members (view, edit, publish permissions)
- FR39: The founder can access hosting control panel and domain management independently
- FR40: All system credentials and access are owned by QADIR Montreal, not by any vendor or developer

### Architecture Extensibility

- FR41: The system exposes content via API (REST or GraphQL) for frontend consumption
- FR42: The database schema supports adding product catalog fields (price, SKU, inventory) without migration breaking changes
- FR43: The system supports adding multilingual content fields to existing content types
- FR44: The booking system data model supports linking to future CRM client profiles
- FR45: The system supports adding payment processing endpoints without architectural restructuring

## Non-Functional Requirements

### Performance

- NFR1: First Contentful Paint completes within 1.5 seconds on 4G mobile connections as measured by Lighthouse
- NFR2: Largest Contentful Paint completes within 2.5 seconds on 4G mobile connections as measured by Lighthouse
- NFR3: Cumulative Layout Shift score remains below 0.1 as measured by Core Web Vitals
- NFR4: Time to Interactive is under 3 seconds on desktop as measured by Lighthouse
- NFR5: Image assets are optimized (WebP format, responsive sizes, lazy loading) to keep total page weight under 2MB
- NFR6: Lighthouse Performance score exceeds 90 on all pages

### Security

- NFR7: All data transmitted over HTTPS with TLS 1.2+ encryption
- NFR8: Form submissions sanitized server-side to prevent XSS and injection attacks
- NFR9: CMS admin access protected by secure authentication with session management
- NFR10: API endpoints implement rate limiting (100 requests/minute per IP for public endpoints)
- NFR11: No sensitive data (passwords, API keys) exposed in client-side code or network responses
- NFR12: Dependencies audited for known vulnerabilities before deployment and monthly thereafter
- NFR13: CORS configured to allow only the QADIR domain origin

### Scalability

- NFR14: System supports up to 1,000 concurrent visitors without performance degradation
- NFR15: Static assets served via CDN for global delivery performance
- NFR16: Architecture supports horizontal scaling of backend services for Phase 2 e-commerce traffic
- NFR17: Database supports 10,000+ content entries and 50,000+ form submissions without query degradation

### Accessibility

- NFR18: Website meets WCAG 2.1 Level AA compliance for all public-facing pages
- NFR19: All images include descriptive alt text
- NFR20: Navigation is fully keyboard-accessible
- NFR21: Colour contrast ratios meet AA standards (4.5:1 for normal text, 3:1 for large text) — verified against brand palette (#111111 on #F6F5F2 = 17.4:1 ratio, compliant)
- NFR22: Form fields include associated labels and error messages accessible to screen readers
- NFR23: Focus states are visible on all interactive elements

### Integration

- NFR24: CMS content available via documented API with response times under 500ms
- NFR25: Email delivery for booking confirmations and form notifications achieves 99%+ delivery rate via transactional email service (SendGrid, Postmark, or equivalent)
- NFR26: Analytics integration operates without blocking page render (async loading)
- NFR27: All third-party integrations use API keys stored in environment variables, never in source code

### Reliability

- NFR28: System maintains 99.5% uptime as measured by hosting provider SLA
- NFR29: Automated daily backups of database and CMS content with 30-day retention
- NFR30: Deployment process includes zero-downtime strategy (blue-green or rolling deployment)
- NFR31: Error monitoring captures and alerts on server errors within 5 minutes

### Maintainability

- NFR32: Codebase follows consistent coding standards enforced by linting (ESLint, Prettier)
- NFR33: Frontend components are modular and reusable with clear separation of concerns
- NFR34: API endpoints documented with OpenAPI/Swagger specification
- NFR35: Deployment automated via CI/CD pipeline (build, test, deploy)
- NFR36: Environment configuration externalized (development, staging, production) via environment variables

## Design Constraints (Non-Negotiable)

These constraints are founder-approved and immutable for Phase 1:

### Visual Principles

- Minimalist, high contrast, generous white space, strong typography, editorial pacing
- No templates that look like Shopify themes
- No over-animation, no parallax gimmicks
- No "luxury cliches" (gold gradients, fake marble, excess ornament)

### Colour System

| Role | Hex | Usage |
|------|-----|-------|
| Primary (Deep Charcoal) | #111111 | Text, headlines, navigation, logo on light bg |
| Secondary (Warm Off-White) | #F6F5F2 | Page backgrounds, content sections |
| Accent (Muted Oud Brown) | #5A4632 | Divider lines, hover states, subtle emphasis (sparingly) |
| Neutral (Soft Stone Grey) | #C8C6C1 | Secondary text, UI dividers, form borders, disabled states |

Rules: No golds. No gradients. Maximum one accent colour visible per screen.

### Typography System

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| Primary (Serif) | Canela | Playfair Display, Libre Baskerville | Headlines, section titles, fragrance names, pull quotes |
| Secondary (Sans) | Inter | Helvetica Neue, Arial | Body copy, navigation, forms, buttons, system text |

Rules: Headlines serif only. Body sans only. No mixing within paragraphs. No decorative or script fonts. No tracking-heavy all-caps except navigation.

### Button & UI

- Solid charcoal or outline charcoal buttons
- Hover: subtle opacity shift or accent brown underline
- Corners: 2-4px radius maximum
- No rounded pill buttons

### Content

All page content is founder-approved and final for Phase 1. Build to accommodate this content exactly, without rewriting or reinterpretation. Content document serves as the source of truth for all copy.

## Appendix: Asset Inventory

### Logo Assets

- `QADIR_English_Seal_Motto_Corrected.svg` — Primary seal with French motto ring ("AUTORITE EN ESSENCE")
- `QADIR_English_Seal_Minimal_Corrected.svg` — Minimal seal for embossing and luxury applications

### Photography

**Signature Blends:**
- ASL — Authority perfume with oud and saffron
- NOOR — Light perfume bottle
- HAYBA — Presence perfume with amber accents
- MIQDAR — Ambient light composition
- Additional product photograph (WhatsApp origin)

**Store / Environment:**
- Luxe perfume boutique with Middle Eastern elegance
- Luxurious VIP lounge with elegant design
- QADIR NOOR product display

### Brand Documentation (Reference)

- QADIR Brand Standards Guide (Quebec Compliant)
- QADIR Logo Usage Guide
- QADIR Quebec Language Compliance Note
- QADIR Packaging Technical Appendix (GCCM)
- QADIR Visual Signage Diagram
