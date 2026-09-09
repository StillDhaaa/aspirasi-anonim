# 📨 SIGMA — Platform Pesan Aspirasi Anonim

<p align="center">
  <strong>SIGMA</strong> (<i>Security • Integrity • Guard • Manage • Anonim</i>) adalah platform web modern untuk menyampaikan pesan, aspirasi, kritik, saran, apresiasi, dan curhatan secara anonim dengan sistem moderasi admin, proteksi anti-spam, dan kompresi media otomatis.
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

Aplikasi sudah dideploy dan dapat diakses secara publik di:  
🔗 **[https://sigma-aspirasi.vercel.app/](https://sigma-aspirasi.vercel.app/)**

---

## ✨ Fitur Utama

- 🕵️ **Pengiriman Pesan Anonim**: Pengguna dapat mengirimkan aspirasi tanpa rasa khawatir dengan identitas pengirim dan penerima yang fleksibel (bisa menggunakan nama alias atau `-` untuk anonim penuh).
- 🖼️ **Kompresi & Optimasi Gambar Otomatis**: Gambar lampiran diproses di server menggunakan `sharp` (resize lebar maks 600px, konversi format JPEG kualitas 75) sebelum diunggah ke Supabase Storage untuk menghemat bandwidth dan penyimpanan.
- 🛡️ **Proteksi Anti-Spam (Rate Limiting)**: Terintegrasi dengan **Upstash Redis** & `@upstash/ratelimit` berbasis fixed-window IP (1 kiriman per 24 jam per IP).
- 🔐 **Admin Dashboard & Moderasi**:
  - Autentikasi aman menggunakan **JWT (`jose`)** dan password hashing **`bcryptjs`** dengan cookie `httpOnly` secure.
  - Proxy route guard (`proxy.ts`) untuk memproteksi halaman dashboard admin.
  - Aksi moderasi lengkap: **Setujui (Accept)**, **Tolak (Reject)**, dan **Hapus Permanen (Delete pesan + storage image)**.
- 🗂️ **Filter Kategori & Pengurutan**: Filter pesan berdasarkan kategori (_Random, Saran, Keluhan, Apresiasi, Confess & Curhat_) serta urutan waktu (_Terbaru / Terlama_).
- ♾️ **Infinite Scroll & Responsive Grid**: Tampilan kartu aspirasi yang responsif dengan auto-fetch infinite scroll menggunakan `react-intersection-observer`.
- 🔗 **Direct Share & Highlight Overlay**: Mendukung deep-link URL (`/pesan?id=...`) dengan modal popup highlight dan integrasi **Native Web Share API** beserta fallback copy ke clipboard.
- 🌓 **Dark / Light Mode**: Mendukung perubahan tema tampilan dengan `next-themes`.
- 🎨 **UI Modern & Glassmorphism**: Desain antarmuka elegan memanfaatkan Tailwind CSS v4, Radix UI, Lucide Icons, dan animasi halus dari Framer Motion.

---

## 🛠️ Tech Stack

| Sektor | Teknologi |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components, Route Handlers) |
| **UI Library & Runtime** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), Shadcn UI |
| **Database & Storage** | [Supabase](https://supabase.com/) (PostgreSQL & Object Storage) |
| **Rate Limiter / Cache** | [Upstash Redis](https://upstash.com/) (`@upstash/redis` & `@upstash/ratelimit`) |
| **Image Processing** | [Sharp](https://sharp.pixelplumbing.com/) |
| **Authentication & Security** | [jose](https://github.com/panva/jose) (JWT), [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Form Management** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Animations & Icons** | [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Struktur Direktori

```text
aspirasi-anonim/
├── app/
│   ├── admin/
│   │   └── dashboard/          # Halaman dashboard & manajemen pesan admin
│   ├── api/
│   │   ├── admin/
│   │   │   └── message/        # API route get pesan & update status (admin)
│   │   ├── login/              # API route login autentikasi admin
│   │   ├── message/            # API route publik untuk membaca aspirasi yang disetujui
│   │   └── submit/             # API route pengiriman aspirasi (rate limit + sharp + upload)
│   ├── kirim/                  # Halaman form pengiriman aspirasi
│   ├── login/                  # Halaman login admin
│   ├── pesan/                  # Halaman daftar aspirasi publik & highlight
│   ├── globals.css             # Styling global Tailwind CSS
│   ├── layout.tsx              # Root layout & ThemeProvider
│   └── page.tsx                # Halaman landing page
├── components/
│   ├── ui/                     # Komponen antarmuka dasar (button, input, select, dialog, dll.)
│   ├── AlertAction.tsx         # Dialog konfirmasi aksi admin (accept, reject, delete)
│   ├── FilterCategory.tsx      # Bar filter kategori, sort, dan status
│   ├── MoreButton.tsx          # Modal detail pesan & tombol aksi cepat
│   ├── Navbar.tsx              # Navbar responsif dengan menu mobile & animasi Framer Motion
│   ├── OverlayCard.tsx         # Modal highlight pesan spesifik via deep link
│   ├── ShareComponent.tsx      # Fitur bagikan pesan (Web Share API / Copy Link)
│   ├── ThemeProvider.tsx       # Provider tema gelap/terang
│   └── ThemeToggle.tsx         # Tombol switch tema
├── lib/
│   ├── jwt.ts                  # Utilitas pembuatan & verifikasi JWT
│   ├── response.ts             # Helper format response JSON seragam
│   ├── supabase.ts             # Inisialisasi Supabase Admin Client (Service Role)
│   └── utils.ts                # Utilitas format tanggal, waktu, dan styling (cn)
├── types/
│   └── index.ts                # Deklarasi interface TypeScript (Aspirasi, dll.)
├── proxy.ts                    # Middleware route guard untuk proteksi rute admin & login
└── next.config.ts              # Konfigurasi Next.js
```

---

## 🚀 Panduan Memulai (Getting Started)

### 1. Prasyarat

Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi 18.x atau yang lebih baru)
- npm / yarn / pnpm / bun
- Akun [Supabase](https://supabase.com/) & [Upstash Redis](https://upstash.com/)

### 2. Clone Repositori

```bash
git clone https://github.com/StillDhaaa/aspirasi-anonim.git
cd aspirasi-anonim
```

### 3. Instal Dependensi

```bash
npm install
# atau
pnpm install
# atau
bun install
```

### 4. Konfigurasi Environment Variables

Salin atau buat file `.env.local` di root direktori project:

```env
# URL Basis Aplikasi
BASE_URL="http://localhost:3000"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Upstash Redis Configuration (untuk Rate Limiting)
UPSTASH_REDIS_REST_URL="https://your-redis-instance.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-rest-token"

# Keamanan JWT
JWT_SECRET="your-secure-jwt-secret-key"
```

### 5. Konfigurasi Database (Supabase)

Jalankan query SQL berikut di SQL Editor Supabase Anda:

```sql
-- 1. Buat Tabel Messages
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

-- 2. Buat Tabel Admins
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Storage Bucket
-- Buat bucket storage publik dengan nama: aspirasi_image
```

> 💡 **Tips Menambahkan Akun Admin:**  
> Password hash dapat digenerate menggunakan `bcryptjs` (salt 10) lalu dimasukkan ke kolom `password_hash` pada tabel `admins`.

### 6. Menjalankan Server Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## 📡 Dokumentasi Endpoint API

| Method | Endpoint | Deskripsi | Akses |
| --- | --- | --- | --- |
| `POST` | `/api/submit` | Mengirim aspirasi baru (dilengkapi rate limiter & kompresi gambar) | Publik |
| `GET` | `/api/message` | Mengambil daftar aspirasi yang disetujui (`status = accepted`) atau spesifik `?id=` | Publik |
| `POST` | `/api/login` | Autentikasi kredensial admin & set HTTP-only JWT cookie | Publik |
| `GET` | `/api/admin/message` | Mengambil seluruh pesan dengan filter status (`pending`, `accepted`, `rejected`) | Admin |
| `PUT` | `/api/admin/message/[id]` | Mengubah status pesan (`accepted`, `rejected`, `delete`) | Admin |

---

## 🏷️ Kategori Aspirasi

| ID | Nama Kategori | Keterangan |
| --- | --- | --- |
| `1` | Random | Pesan umum / bebas |
| `2` | Saran | Masukan dan usulan membangun |
| `3` | Keluhan | Kritik atau permasalahan yang dihadapi |
| `4` | Apresiasi | Ucapan terima kasih atau penghargaan |
| `5` | Confess & Curhat | Cerita pribadi atau ungkapan perasaan |

---

## 📦 Build & Deployment

Untuk membuat build produksi:

```bash
npm run build
npm run start
```

Aplikasi ini siap dideploy dengan sekali klik di [Vercel](https://vercel.com/) dengan mengatur Environment Variables yang sesuai di dashboard project Vercel.

---

## 📄 Lisensi

Proyek ini didistribusikan di bawah [Lisensi MIT](LICENSE).

<p align="center">
  Dibuat oleh <a href="https://github.com/StillDhaaa"><strong>StillDhaaa</strong></a>
</p>
