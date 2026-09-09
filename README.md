# 📨 SIGMA — Anonymous Aspirations & Feedback Platform

<p align="center">
  <strong>SIGMA</strong> (<i>Security • Integrity • Guard • Manage • Anonim</i>) is a modern web platform designed to collect and share anonymous messages, suggestions, complaints, appreciations, and confessions with built-in admin moderation, anti-spam rate limiting, and automated media compression.
</p>

<p align="center">
  <a href="https://sigma-aspirasi.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-sigma--aspirasi.vercel.app-0070F3?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <a href="README.md"><strong>English</strong></a> •
  <a href="README.id.md"><strong>Bahasa Indonesia</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Upstash_Redis-00E599?style=flat-square&logo=redis&logoColor=white" alt="Upstash" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## 🌐 Live Website

The application is deployed and live at:  
🔗 **[https://sigma-aspirasi.vercel.app/](https://sigma-aspirasi.vercel.app/)**

---

## ✨ Key Features

- 🕵️ **Anonymous Submissions**: Users can post freely with customizable sender and recipient aliases, or use `-` for full anonymity.
- 🖼️ **Automated Image Optimization**: Uploaded images are resized (max width 600px) and converted to JPEG format (75 quality) on the server using `sharp` before being saved to Supabase Storage.
- 🛡️ **Anti-Spam & Rate Limiting**: Powered by **Upstash Redis** (`@upstash/ratelimit`) using a fixed-window IP limiter (1 submission per 24 hours per IP).
- 🔐 **Admin Dashboard & Moderation**:
  - Secure authentication with **JWT (`jose`)** and **`bcryptjs`** stored in `httpOnly` secure cookies.
  - Route proxy guard (`proxy.ts`) protecting `/admin` and handling `/login` redirects.
  - Full moderation actions: **Accept**, **Reject**, and **Permanent Delete** (removes record & storage image).
- 🗂️ **Category Filtering & Sorting**: Filter by category (*Random, Suggestion, Complaint, Appreciation, Confess & Vent*) and sort by time (*Newest / Oldest*).
- ♾️ **Infinite Scroll & Responsive Grid**: Dynamic masonry-style grid with auto-fetching via `react-intersection-observer`.
- 🔗 **Direct Share & Highlight Overlay**: Deep-link support (`/pesan?id=...`) with modal highlight overlay and native **Web Share API** integration (with clipboard copy fallback).
- 🌓 **Dark / Light Theme**: Seamless theme toggling powered by `next-themes`.
- 🎨 **Modern Glassmorphic UI**: Clean interface built with Tailwind CSS v4, Radix UI, Lucide Icons, and fluid animations via Framer Motion.

---

## 🛠️ Tech Stack

| Sector | Technology |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components, Route Handlers) |
| **UI Library & Language** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), Shadcn UI |
| **Database & Storage** | [Supabase](https://supabase.com/) (PostgreSQL & Object Storage) |
| **Rate Limiting & Cache** | [Upstash Redis](https://upstash.com/) (`@upstash/redis` & `@upstash/ratelimit`) |
| **Image Processing** | [Sharp](https://sharp.pixelplumbing.com/) |
| **Authentication & Security** | [jose](https://github.com/panva/jose) (JWT), [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Form Management** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Animations & Icons** | [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Directory Structure

```text
aspirasi-anonim/
├── app/
│   ├── admin/
│   │   └── dashboard/          # Admin dashboard & message management
│   ├── api/
│   │   ├── admin/
│   │   │   └── message/        # Admin message queries & status update endpoints
│   │   ├── login/              # Admin login authentication endpoint
│   │   ├── message/            # Public approved message queries endpoint
│   │   └── submit/             # Public message submission (rate limit + sharp + storage)
│   ├── kirim/                  # Message submission form page
│   ├── login/                  # Admin login page
│   ├── pesan/                  # Public message feed & highlight modal page
│   ├── globals.css             # Global Tailwind CSS styles
│   ├── layout.tsx              # Root layout & ThemeProvider
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # Reusable UI primitives (Button, Input, Select, Dialog, etc.)
│   ├── AlertAction.tsx         # Admin action confirmation dialogs (accept, reject, delete)
│   ├── FilterCategory.tsx      # Category, sort, and status filter bar
│   ├── MoreButton.tsx          # Card detail modal & quick action menu
│   ├── Navbar.tsx              # Responsive navbar with mobile drawer & Framer Motion
│   ├── OverlayCard.tsx         # Deep-link message highlight modal
│   ├── ShareComponent.tsx      # Web Share API & Copy Link component
│   ├── ThemeProvider.tsx       # Theme context provider (Dark/Light)
│   └── ThemeToggle.tsx         # Theme toggle button
├── lib/
│   ├── jwt.ts                  # JWT signing and verification helpers
│   ├── response.ts             # Standardized JSON response utilities
│   ├── supabase.ts             # Supabase Admin Service Role client initialization
│   └── utils.ts                # Date/time formatters and Tailwind merge helper (cn)
├── types/
│   └── index.ts                # TypeScript interface definitions (Aspirasi, etc.)
├── proxy.ts                    # Edge route proxy & auth protection for /admin and /login
└── next.config.ts              # Next.js configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or later)
- npm / yarn / pnpm / bun
- A [Supabase](https://supabase.com/) account & [Upstash Redis](https://upstash.com/) database

### 2. Clone Repository
```bash
git clone https://github.com/StillDhaaa/aspirasi-anonim.git
cd aspirasi-anonim
```

### 3. Install Dependencies
```bash
npm install
# or
pnpm install
# or
bun install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Application Base URL
BASE_URL="http://localhost:3000"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Upstash Redis Configuration (for Rate Limiting)
UPSTASH_REDIS_REST_URL="https://your-redis-instance.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-rest-token"

# JWT Secret
JWT_SECRET="your-secure-jwt-secret-key"
```

### 5. Database Setup (Supabase)

Run the following SQL in your Supabase SQL Editor:

```sql
-- 1. Create Messages Table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    content TEXT NOT NULL,
    category_id INT NOT NULL,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create Admins Table
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Storage Bucket
-- Create a public storage bucket named: aspirasi_image
```

> 💡 **Tip for Admin Accounts:**  
> Generate a password hash with `bcryptjs` (salt rounds: 10) and insert the record into the `admins` table.

### 6. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/api/submit` | Submit a new aspiration (with rate limit & image compression) | Public |
| `GET` | `/api/message` | Retrieve approved messages (`status = accepted`) or single message by `?id=` | Public |
| `POST` | `/api/login` | Authenticate admin credentials and set HTTP-only JWT cookie | Public |
| `GET` | `/api/admin/message` | Retrieve all messages with status filter (`pending`, `accepted`, `rejected`) | Admin |
| `PUT` | `/api/admin/message/[id]` | Update message status (`accepted`, `rejected`, `delete`) | Admin |

---

## 🏷️ Aspiration Categories

| ID | Category | Description |
| --- | --- | --- |
| `1` | Random | General / open messages |
| `2` | Saran (Suggestion) | Constructive advice and proposals |
| `3` | Keluhan (Complaint) | Issues, obstacles, and criticisms |
| `4` | Apresiasi (Appreciation) | Gratitude, compliments, and thank-you notes |
| `5` | Confess & Curhat | Personal stories, vents, or confessions |

---

## 📦 Build & Deployment

To build for production:

```bash
npm run build
npm run start
```

This project is optimized for deployment on [Vercel](https://vercel.com/) — remember to configure the required Environment Variables in your Vercel project settings.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<p align="center">
  Created by <a href="https://github.com/StillDhaaa"><strong>StillDhaaa</strong></a>
</p>
