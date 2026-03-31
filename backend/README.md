# AI Resume Builder — Backend

A **Strapi v5** headless CMS that serves as the REST API backend for the AI Resume Builder. It manages resume data per user and exposes CRUD endpoints consumed by the React frontend.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Strapi v5** | Headless CMS / REST API framework |
| **SQLite** (default) | Local database (file-based, zero-config) |
| **PostgreSQL** (production) | Recommended database for deployment |
| **MySQL** | Also supported |
| TypeScript | Strapi config and type definitions |
| Node.js 18–22 | Runtime |

### Plugins Used
- `@strapi/plugin-users-permissions` — JWT-based user auth (built-in)
- `@strapi/plugin-cloud` — Strapi Cloud deployment support

### No external AI/third-party APIs — the backend is purely a data layer.

---

##  Folder Structure

```
backend/
├── config/
│   ├── database.ts       # DB config: SQLite / PostgreSQL / MySQL
│   ├── middlewares.ts    # CORS setup — must whitelist frontend URL
│   ├── server.ts         # Host & port config
│   ├── admin.ts          # Admin panel config
│   └── plugins.ts        # Plugin registration
├── src/
│   ├── api/
│   │   └── user-resume/
│   │       ├── content-types/user-resume/schema.json   # Data model
│   │       ├── controllers/user-resume.ts
│   │       ├── routes/user-resume.ts
│   │       └── services/user-resume.ts
│   └── index.ts          # Strapi bootstrap entry
├── database/migrations/  # DB migrations (empty by default)
├── public/uploads/       # Uploaded file storage
├── .env.example          # Environment variable template
├── package.json
└── tsconfig.json
```

---

## Data Model — `user-resume` Collection

| Field | Type | Description |
|---|---|---|
| `title` | String | Resume title (e.g. "My Dev Resume") |
| `userEmail` | Email | Owner's email (from Clerk) |
| `resumeId` | String | UUID generated on frontend |
| `userName` | String | User's display name |

All resume content (experience, education, skills, summary) is stored as a JSON field in `resumeId` — the actual rich data is managed on the frontend and sent via PUT requests.

---

## 🔌 API Endpoints

Strapi auto-generates REST endpoints for the `user-resume` collection:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/user-resumes` | Create new resume |
| `GET` | `/api/user-resumes?filters[userEmail][$eq]=x` | Get resumes by email |
| `GET` | `/api/user-resumes/:id?populate=*` | Get single resume by ID |
| `PUT` | `/api/user-resumes/:id` | Update resume details |
| `DELETE` | `/api/user-resumes/:id` | Delete resume |

> No API token is used on the frontend — the collection must be set to **Public** access in Strapi admin.

---

##  Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="key1,key2"          # Random strings, comma-separated
API_TOKEN_SALT=randomstring
ADMIN_JWT_SECRET=randomstring
TRANSFER_TOKEN_SALT=randomstring
JWT_SECRET=randomstring
ENCRYPTION_KEY=randomstring

# For PostgreSQL (production)
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://user:password@host:5432/dbname
DATABASE_SSL=true
```

Generate secret values with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Local Setup

### Prerequisites
- Node.js 18–22
- npm >= 6

### Steps

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Fill in APP_KEYS and other secrets

# 4. Start development server
npm run dev
# Strapi admin: http://localhost:1337/admin
```

### First-Time Admin Setup
1. Open `http://localhost:1337/admin`
2. Create an admin account
3. Go to **Settings → Roles → Public**
4. Enable `find`, `findOne`, `create`, `update`, `delete` for `user-resume`
5. Save — now the frontend can call the API without a token

---

## Deployment (Step-by-Step)

### Recommended: Deploy on Render (Free Tier Available)

#### Step 1 — Push to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-resume-builder-backend.git
git push -u origin main
```

#### Step 2 — Create PostgreSQL Database on Render
1. [render.com](https://render.com) → **New → PostgreSQL**
2. Name it `resume-builder-db`
3. Copy the **Internal Database URL**

#### Step 3 — Create a Web Service on Render
1. **New → Web Service** → Connect your backend GitHub repo
2. Settings:
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Node Version:** 18

#### Step 4 — Add Environment Variables in Render
In your Render service → **Environment**:
```
HOST                  = 0.0.0.0
PORT                  = 1337
NODE_ENV              = production
APP_KEYS              = key1,key2,key3,key4
API_TOKEN_SALT        = <random>
ADMIN_JWT_SECRET      = <random>
TRANSFER_TOKEN_SALT   = <random>
JWT_SECRET            = <random>
ENCRYPTION_KEY        = <random>
DATABASE_CLIENT       = postgres
DATABASE_URL          = <your Render PostgreSQL internal URL>
DATABASE_SSL          = true
```

#### Step 5 — Update CORS for Your Frontend
In `backend/config/middlewares.ts`, update the CORS origin to your deployed frontend URL before pushing:

```ts
origin: [
  'http://localhost:5173',
  'https://your-frontend.vercel.app',
  'https://resume.aakashchaurasiya.com.np'
],
```

Commit and push — Render auto-deploys.

#### Step 6 — Set Up Admin & Public Permissions
1. Visit `https://your-render-app.onrender.com/admin`
2. Create admin account
3. **Settings → Roles → Public** → Enable all `user-resume` permissions
4. Save

#### Step 7 — Update Frontend ENV
In your Vercel frontend project, update:
```
VITE_API_BASE_URL = https://your-render-app.onrender.com
```

---

## Database Options

| Database | When to Use | Config Key |
|---|---|---|
| SQLite | Local dev only | `DATABASE_CLIENT=sqlite` (default) |
| PostgreSQL | Production (recommended) | `DATABASE_CLIENT=postgres` |
| MySQL | Alternative production | `DATABASE_CLIENT=mysql` |

SQLite stores data in `.tmp/data.db` — not suitable for production as it resets on server restarts (on most cloud platforms).

---

## Build for Production

```bash
npm run build   # Compiles TypeScript admin panel
npm run start   # Starts production server
```

---

## Security Notes

- Never commit `.env` to Git (it is already in `.gitignore`)
- Use strong random values for all `_SECRET` and `_SALT` fields
- Set `DATABASE_SSL=true` when connecting to cloud PostgreSQL
- In production, restrict Strapi admin panel access by IP if possible
