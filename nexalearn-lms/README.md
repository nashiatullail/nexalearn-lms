# Nexalearn University — AI Campus LMS

A full-featured Learning Management System demo for a distance-learning
university, with real student sign-up/sign-in, a public programs catalogue,
a full admin panel, and a live Gemini-powered AI study assistant. Built with
Next.js, TypeScript and Tailwind CSS.

## What's real vs. what's a placeholder

| Feature | Status |
|---|---|
| Sign up / Sign in | **Real** — stored in the browser (localStorage). Each new student gets their own account and dashboard. |
| AI Study Assistant | **Real** — calls Google Gemini once you add your API key (see below). |
| Video lectures | **Placeholder** — plays a public sample video. Admin can add real YouTube/Vimeo links or upload a file (upload is simulated; see "Going further" below). |
| Document upload for AI context | **Simulated** — files "index" visually, but the AI is given the file/lecture *titles* as context, not the actual file text (see "Going further"). |
| Quiz generator, results, fees | **Sample data** — from `lib/data.ts`, not a live database. |

## Getting started

```bash
npm install
```

### 1. Add your free Gemini API key
Open `.env.local` (already included in this project) and paste your key:

```
GEMINI_API_KEY=your-key-here
```

Get a free key at **https://aistudio.google.com/app/apikey** — no credit card
needed for the free tier. Without a key, the AI assistant still runs and
tells the user honestly that it isn't connected yet.

### 2. Run it

```bash
npm run dev
```

Open **http://localhost:3000**

## How the site is organised

### Public pages (no login needed)
- `/` — Nexalearn University landing page
- `/programs` — About the university + all degree programs offered (BS CS,
  BBA, B.Ed, BS English), with fee and duration
- `/signup` — student registration (name, email, password, program)
- `/signin` — student login

### Student side (`/dashboard`, login required)
Signing up automatically logs you in and takes you straight to your own
dashboard — no other student's data is shown. Includes:
- Overview, My Courses (filtered to your program), Assignments, Results
- AI Study Assistant, AI Quiz Generator, AI Study Planner
- Discussion Forum, Leaderboard/badges
- Each course page has Lectures (video), Handouts, Discussion, and an
  AI Assistant tab

### Admin side (`/admin`, no login wall in this demo)
- Analytics dashboard, Course Builder (+ video & document upload),
  Student management, Result upload, Announcements, Fee tracker

## Going further (for a real client deployment)

1. **Real authentication & database** — replace `lib/auth.ts` (currently
   browser-only) with NextAuth.js + a database (Prisma + NeonDB/Supabase).
   This also unlocks real per-student progress, assignments and results
   instead of shared sample data.
2. **Real document RAG** — when a PDF is uploaded in Course Builder or the
   AI Assistant, extract its text (e.g. `pdf-parse`) and store chunks in a
   vector database (pgvector, Pinecone). Pass the retrieved chunks into
   `app/api/chat/route.ts`'s `contextDocs` instead of just file names —
   the Gemini call is already wired to accept richer context here.
3. **Real video hosting** — Course Builder's "Upload video file" currently
   simulates the upload. Wire it to Cloudinary or Bunny.net: upload the
   file from the browser directly to their API, then store the returned
   URL as the lecture's video source (same YouTube/Vimeo iframe pattern
   already works for any HLS/MP4 URL too).
4. **Admin authentication** — add a separate login/role check for `/admin`
   so only institution staff can reach it.
5. Deploy for free on Vercel: `vercel deploy` (remember to add
   `GEMINI_API_KEY` in the Vercel project's Environment Variables).
