# AI Resume Builder — Frontend

A React + Vite web app that lets users create, edit, preview, and share AI-powered resumes. Authentication is handled by Clerk and AI suggestions are powered by Google Gemini.

---

## Tech Stack & APIs Used

| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| React Router DOM v6 | Client-side routing |
| Tailwind CSS + shadcn/ui | Styling & UI components |
| **Clerk** | Authentication (sign-in/sign-up/user management) |
| **Google Gemini 1.5 Flash** | AI-generated resume summaries & experience bullets |
| Axios | HTTP client to communicate with Strapi backend |
| react-simple-wysiwyg | Rich text editor for experience descriptions |
| react-to-pdf | Download resume as PDF |
| react-web-share | Share resume link |
| Sonner | Toast notifications |
| UUID | Generate unique resume IDs |

### AI Model Used
- **Model:** `gemini-1.5-flash` via `@google/generative-ai` SDK
- **Used for:** Generating resume summaries (Fresher / Mid / Senior level) and experience bullet points based on job title

### External APIs
1. **Clerk API** — User authentication (`VITE_CLERK_PUBLISHABLE_KEY`)
2. **Google Generative AI API** — Gemini prompts (`VITE_GOOGLE_AI_API_KEY`)
3. **Strapi REST API** — Resume CRUD (`VITE_API_BASE_URL`)

---

## Folder Structure

```
AI-Resume-Builder-main/
├── public/                  # Static assets
├── service/
│   ├── AIModal.js           # Gemini AI session setup
│   └── GlobalApi.js         # Axios calls to Strapi backend
├── src/
│   ├── auth/sign-in/        # Clerk sign-in page
│   ├── components/
│   │   ├── custom/Header    # Nav with user avatar
│   │   └── ui/              # shadcn components
│   ├── context/
│   │   └── ResumeInfoContext # Global resume state
│   ├── dashboard/
│   │   ├── index.jsx        # Resume list dashboard
│   │   ├── components/      # AddResume, ResumeCardItem
│   │   └── resume/
│   │       └── [resumeId]/edit/   # Resume editor
│   │           └── components/
│   │               ├── forms/     # PersonalDetail, Experience, Education, Skills, Summary
│   │               └── preview/   # Live preview panels
│   ├── home/                # Landing page
│   ├── my-resume/[resumeId]/view/ # Public resume view + share/download
│   └── data/dummy.jsx       # Default resume data
├── .env                     # Environment variables
├── vite.config.js
└── package.json
```

---

## Features

- **Authentication** — Clerk-protected routes; auto-redirect to sign-in if unauthenticated
- **Dashboard** — View, create, and delete resumes per logged-in user email
- **Resume Editor** — Multi-step form: Personal Info → Summary → Experience → Education → Skills
- **AI Summary Generator** — One-click Gemini AI generates 3 summary levels from job title
- **AI Experience Bullets** — AI generates bullet points for each work experience
- **Live Preview** — Real-time resume preview with theme color picker
- **Rich Text Editor** — WYSIWYG editor for experience descriptions
- **PDF Download** — Export resume as PDF with `react-to-pdf`
- **Share Resume** — Public share link via Web Share API
- **Theme Color** — Pick accent color applied across the entire resume preview

---

## Local Setup

### Prerequisites
- Node.js >= 18
- npm or yarn

### Steps

```bash
# 1. Navigate to frontend folder
cd AI-Resume-Builder-main

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env   # or create manually (see below)

# 4. Start dev server
npm run dev
```

### Environment Variables (`.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
VITE_GOOGLE_AI_API_KEY=AIzaxxxxxxxxxxxxxxxx
VITE_API_BASE_URL=http://localhost:1337
```

| Variable | Where to Get |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | [clerk.com](https://clerk.com) → Your App → API Keys |
| `VITE_GOOGLE_AI_API_KEY` | [aistudio.google.com](https://aistudio.google.com) → Get API Key |
| `VITE_API_BASE_URL` | Your Strapi backend URL (local or deployed) |

---

## Deployment on Vercel (Step-by-Step)

> Your portfolio is already on Vercel at `www.aakashchaurasiya.com.np`. Deploy the frontend as a **separate Vercel project**.

### Step 1 — Push to GitHub
```bash
# From the AI-Resume-Builder-main folder
git init
git add .
git commit -m "Initial frontend commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-resume-builder-frontend.git
git push -u origin main
```

### Step 2 — Create Vercel Project
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo (`ai-resume-builder-frontend`)
3. Set **Framework Preset** → `Vite`
4. Set **Root Directory** → `AI-Resume-Builder-main` (if monorepo) or leave blank
5. Set **Build Command** → `npm run build`
6. Set **Output Directory** → `dist`

### Step 3 — Add Environment Variables in Vercel
In Vercel project → **Settings → Environment Variables**, add:
```
VITE_CLERK_PUBLISHABLE_KEY  = pk_live_xxxx
VITE_GOOGLE_AI_API_KEY      = AIzaxxxx
VITE_API_BASE_URL           = https://your-strapi-backend.com
```

### Step 4 — Update Clerk Allowed Origins
In your Clerk dashboard → **Domains** → add your Vercel URL (e.g., `https://ai-resume-builder.vercel.app`)

### Step 5 — Deploy
Click **Deploy**. Vercel will build and give you a live URL.

### Optional — Custom Subdomain
Since you own `aakashchaurasiya.com.np`, you can add a subdomain like `resume.aakashchaurasiya.com.np`:
1. Vercel Project → **Settings → Domains** → Add `resume.aakashchaurasiya.com.np`
2. In your domain registrar DNS, add a `CNAME` record:
   - Name: `resume`
   - Value: `cname.vercel-dns.com`

---

## Build for Production

```bash
npm run build
# Output in /dist folder
```

---

## Notes

- The app has **no Strapi API token** — Strapi must be configured to allow public access to `user-resumes` collection (see Backend README).
- CORS in Strapi must include your deployed frontend URL.
- Clerk redirects after sign-in go to `/dashboard` by default.
