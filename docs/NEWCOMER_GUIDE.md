# DOLL Website Newcomer Guide

This guide is for engineers who need to **review, understand, and ship** this app quickly.

## 1) What this repo contains

This is a two-app monorepo:

- `frontend/`: Next.js App Router app that renders the public website.
- `cms/`: Strapi headless CMS used as the data source and lead sink.

The frontend and CMS are deployed independently but are designed to run together locally (`frontend` on `:3000`, `cms` on `:1337`).

## 2) High-level runtime architecture

### Read path (content shown on website)

1. Editors create/update content in Strapi collections (`news-items`, `projects`, `solutions`).
2. Next.js server components call functions in `frontend/src/lib/strapi.ts`.
3. Those functions fetch `/api/...` endpoints from Strapi and normalize data for React components.
4. Pages render from that normalized data (`/`, `/projects`, `/projects/[slug]`, `/newsroom`, `/newsroom/[slug]`).

### Write path (contact submissions)

1. User submits form in `frontend/src/components/contact-form.tsx`.
2. Form posts to Next.js route `frontend/src/app/api/contact/route.ts`.
3. Route validates, anti-spam checks, and optional CAPTCHA verification.
4. Route writes a row to Strapi `contact-submissions` via `createContactSubmission`.
5. Route also attempts SMTP email notification.
6. API returns success or a partial-success warning (`207`) if one side failed.

## 3) Where data models live and how they are edited

### Strapi content models (source of truth)

Model schema JSON files are in `cms/src/api/**/content-types/**/schema.json`.

- News: `cms/src/api/news-item/content-types/news-item/schema.json`
- Projects: `cms/src/api/project/content-types/project/schema.json`
- Solutions: `cms/src/api/solution/content-types/solution/schema.json`
- Contact submissions: `cms/src/api/contact-submission/content-types/contact-submission/schema.json`

Project pages also use a repeatable component:

- `cms/src/components/project/section.json`

If you change these schemas, regenerate/admin rebuild steps typically include:

- restarting Strapi dev server
- rebuilding Strapi admin (`npm run build` in `cms`) for production

### Seed data (fast local bootstrap)

Seed data lives in:

- `cms/src/data/seeds/news.ts`
- `cms/src/data/seeds/projects.ts`
- `cms/src/data/seeds/solutions.ts`

Seeding entrypoint:

- `cms/scripts/seed.js`

How it works:

- loads compiled seed module from `dist/src/data/seeds`
- clears existing entries for news/projects/solutions
- upserts entries by `slug`
- ensures `publishedAt` is set

Important: the seed script runs against the current configured DB; avoid running it against production unless intentionally replacing content.

## 4) Frontend data access contract

All CMS fetching and normalization is centralized in:

- `frontend/src/lib/strapi.ts`

Key functions:

- `getNewsItems()`, `getNewsItem(slug)`
- `getProjects()`
- `getSolutions()`
- `createContactSubmission(payload)`

Notable behaviors:

- Uses `NEXT_PUBLIC_CMS_URL` and optional bearer `STRAPI_API_TOKEN`.
- Uses Next.js `fetch` with `next.revalidate` (mostly 300s; single news item 60s).
- Accepts both Strapi response shapes (`{id, attributes}` and flat object).
- Normalizes image URLs so relative CMS URLs become absolute.

If data appears wrong, debug here first before touching many page components.

## 5) Page-to-data mapping

- Home (`frontend/src/app/page.tsx`)
  - Loads all three collections in parallel and passes into home client component.
- News listing/detail
  - `frontend/src/app/newsroom/page.tsx`
  - `frontend/src/app/newsroom/[slug]/page.tsx`
- Projects listing/detail
  - `frontend/src/app/projects/page.tsx`
  - `frontend/src/app/projects/[slug]/page.tsx`

Rich text rendering for Strapi blocks goes through:

- `frontend/src/components/blocks-renderer.tsx`
- `frontend/src/lib/richtext.ts`

## 6) Contact data lifecycle details

### Client form

`frontend/src/components/contact-form.tsx` handles:

- required field collection and client-side validation
- honeypot/timing metadata submission (`honeypot`, `timeToSubmitMs`)
- optional reCAPTCHA token acquisition

### Server route

`frontend/src/app/api/contact/route.ts` handles:

- server-side required validation (trust boundary)
- honeypot and speed check
- optional reCAPTCHA/hCaptcha verification if secrets exist
- save to Strapi + send SMTP notification
- partial success semantics (`207`) when one sink fails

### Strapi persistence

`createContactSubmission` in `frontend/src/lib/strapi.ts` posts to:

- `POST {CMS_URL}/api/contact-submissions`

Payload uses Strapi REST format:

```json
{ "data": { ...fields } }
```

## 7) Environment variables you must understand before shipping

Frontend (`frontend/.env.local`):

- `NEXT_PUBLIC_CMS_URL`
- `STRAPI_API_TOKEN`
- SMTP vars for email notifications
- optional CAPTCHA keys/secrets

CMS (`cms/.env`):

- Strapi app secrets and DB configuration
- optional URL/token values used by deployment setup

If `STRAPI_API_TOKEN` lacks permissions, reads may fail and contact writes will fail.

## 8) Newcomer shipping checklist

1. Start both apps and verify homepage/news/projects render from CMS.
2. Confirm Strapi permissions for token used by frontend:
   - read for public content
   - create for `contact-submissions`
3. Submit contact form and verify:
   - Strapi row created
   - email notification path (or expected warning when SMTP disabled)
4. If schema changed, verify frontend mapper updates in `strapi.ts` and page consumers.
5. For seed changes, run `cms` build before `npm run seed`.

## 9) Common pitfalls

- Editing page components without updating `frontend/src/lib/strapi.ts` mappers.
- Assuming media relation fields are used everywhere; some views still use URL string fields (`heroImageUrl`, `imageUrl`).
- Forgetting that contact route can return `207` (partial success) and treating it as total failure in clients.
- Running seed script unintentionally on a non-local database.

## 10) Suggested first files to read (in order)

1. `README.md`
2. `frontend/src/lib/strapi.ts`
3. `frontend/src/app/page.tsx`
4. `frontend/src/app/projects/page.tsx` and `[slug]/page.tsx`
5. `frontend/src/app/newsroom/page.tsx` and `[slug]/page.tsx`
6. `frontend/src/components/contact-form.tsx`
7. `frontend/src/app/api/contact/route.ts`
8. `cms/src/api/**/content-types/**/schema.json`
9. `cms/scripts/seed.js` + `cms/src/data/seeds/*`

This sequence gives you the data contracts first, then rendering, then writing and operations.
