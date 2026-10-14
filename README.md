# LearnHub – Course Catalogue

A full-stack course catalogue.

| Part | Folder | Stack |
|------|--------|-------|
| Frontend | `course-frontend/` | Next.js 15 (App Router) · React 19 · Tailwind CSS 3 · Redux Toolkit |
| Backend | `course-backend/` | Strapi 5 CMS (REST API, Users & Permissions) |

## Features

- Course catalogue: hero, skills ticker, search, category filter, sorting, skeleton loading
- Course page: modules with a progress bar under each module, overall progress bar, Enroll button
- Register, Login and Logout (users are stored in Strapi); the profile icon shows only when logged in
- My courses dashboard with progress on every card
- Footer with categories, newsletter (saved in Strapi) and LinkedIn, YouTube, Facebook, Instagram and X links
- Animations: scroll reveal, count-up numbers, floating hero shapes, card shine, confetti, scroll progress bar

## Run it (2 terminals)

**1. Backend**

```bash
cd course-backend
cp .env.example .env
npm install
npm run develop
```

- API: http://localhost:1337/api
- Admin panel: http://localhost:1337/admin (create your admin account on first visit)
- On the first start it creates 4 categories and 9 sample courses (including NestJS) and sets the API permissions automatically. You do not need to click anything in the admin panel.

**2. Frontend**

```bash
cd course-frontend
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

### Already ran the backend before?

Just restart it (`npm run develop`). The sample-data step is now additive: it adds any sample course that is missing (for example NestJS) to your existing database and never creates the same course twice.

## How the frontend is organised

```
course-frontend/
├── app/                    routes (App Router)
│   ├── layout.js           providers, header, footer, toast
│   ├── page.js             home
│   ├── courses/[slug]/     course page (title comes from Strapi)
│   ├── login/ register/ dashboard/
│   └── globals.css         Tailwind + animations
├── components/             UI (Header, Hero, CourseCard, Footer, ...)
├── store/                  Redux Toolkit
│   ├── index.js            configureStore
│   ├── StoreProvider.jsx   loads session, courses, enrollments
│   └── slices/             auth, courses, filters, enrollments, ui
├── hooks/useReveal.js
└── lib/                    api.js (Strapi fetch), theme.js, progress.js, confetti.js
```

Redux slices:

| Slice | Holds | Strapi endpoints |
|-------|-------|------------------|
| `auth` | user, token, loading/error | `/auth/local`, `/auth/local/register`, `/users/me` |
| `courses` | courses, categories, status | `/courses`, `/categories` |
| `filters` | search, category, sort | none (client state) |
| `enrollments` | enrolled courses + ticked lessons (optimistic updates) | `/enrollments` |
| `ui` | toast, newsletter | `/subscribers` |

## Strapi content

| Content type | Fields |
|--------------|--------|
| Category | name, slug |
| Course | title, slug, description, price, duration, level, rating, learners, instructor, emoji, theme, modules (JSON list), thumbnail, category |
| Enrollment | courseSlug, userId, completed (JSON list) |
| Subscriber | email |
| User | built in (username, email, password) |

Add or edit courses in the admin panel (Content Manager → Course) and click **Publish**.
`theme` picks the card colour (indigo, cyan, violet, emerald, pink, amber, sky, slate). `modules` is a JSON list such as `["Intro", "Routing", "Deploy"]`.

Enrollments are protected by custom code in `course-backend/src/api/enrollment/controllers/enrollment.js`: a user can only read and change their own rows.

## Deploy

1. **Backend** (Strapi Cloud, Render or Railway): set the variables from `.env.example`, use Postgres (`DATABASE_CLIENT=postgres`, `DATABASE_URL=...`), and set `CLIENT_URL` to your frontend URL. Generate new random values for every secret.
2. Push the repo to GitHub.
3. **Frontend** (Netlify or Vercel): set `NEXT_PUBLIC_STRAPI_URL` to your Strapi URL. Build command `npm run build`.
4. Add the frontend URL to `CLIENT_URL` in Strapi, then redeploy Strapi.

## Notes

- Login uses a JWT kept in `localStorage` (simple and fully client-side with Redux). For stricter security, move the token to an httpOnly cookie with Next.js Server Actions.
- Email confirmation and forgot-password need an email provider configured in Strapi.
- Social links in `course-frontend/components/SocialLinks.jsx` point to each platform's home page. Put your own profile URLs there.
