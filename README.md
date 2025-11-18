# DOLL Website Monorepo

Next.js powers the web frontend while Strapi serves as the headless CMS. Each app lives in its own directory so they can be developed and deployed independently.

## Prerequisites
- Node.js 18+ (Strapi supports up to 22.x)
- npm 9+

## Project layout
- `frontend/` – Next.js 16 + React 19 (App Router, TypeScript, Tailwind CSS, ESLint).
- `cms/` – Strapi 5 (TypeScript) using SQLite by default (`cms/.tmp/data.db`).

## First-time setup
1. Install deps  
   - `cd frontend && npm install`  
   - `cd cms && npm install`
2. Configure env files  
   - `cp frontend/.env.example frontend/.env.local`  
   - `cp cms/.env.example cms/.env`  
   - Fill in real secrets (do not commit them).
3. Seed CMS content (optional, uses SQLite)  
   - `cd cms && npm run build && node scripts/seed.js`

## Running locally
Open two terminals:
1. CMS: `cd cms && npm run develop` (http://localhost:1337)  
2. Frontend: `cd frontend && npm run dev` (http://localhost:3000)

## Environment variables
- Frontend (`frontend/.env.local`):
  - `NEXT_PUBLIC_CMS_URL` – Strapi base URL (e.g., http://localhost:1337)
  - `STRAPI_API_TOKEN` – token with create on `contact-submissions` and read on content
  - Email: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`
  - Captcha (optional): `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET`, `HCAPTCHA_SECRET`
- CMS (`cms/.env`):
  - Server/DB: `HOST`, `PORT`, Strapi secrets (`APP_KEYS`, salts, JWTs), `DATABASE_*`
  - `NEXT_PUBLIC_CMS_URL` for published asset URLs
  - `CMS_API_TOKEN` (if you need a separate token for internal use)

## Useful scripts
- Frontend: `npm run lint`, `npm run build`, `npm run start`
- CMS: `npm run develop`, `npm run build`, `npm run start`, `npm run console`, `node scripts/seed.js`

## Notes
- Contact form writes to Strapi `contact-submissions`; ensure the API token allows `create`.
- Content models include News, Projects (blocks), Solutions, and Contact submissions.
- Secrets should live only in `.env` files (see `.gitignore`).
