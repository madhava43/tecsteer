# Tecsteer — Corporate Website

A modern, production-grade IT services company website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + CSS Modules |
| Components | shadcn/ui |
| Animation | Framer Motion |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `EMAIL_USER` | Gmail address used to send emails |
| `EMAIL_PASS` | Gmail app password (not your account password) |
| `CONTACT_RECIPIENT_EMAIL` | Email address that receives contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Full site URL (e.g. `https://tecsteer.com`) |
| `UPSTASH_REDIS_REST_URL` | *(Optional)* Upstash Redis URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | *(Optional)* Upstash Redis token |

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords. Generate a 16-character password for "Mail".

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/                # API route handlers
│   │   ├── contact/        # Contact form endpoint
│   │   └── apply/          # Job application endpoint
│   ├── blog/               # Blog listing + [slug] detail pages
│   ├── careers/            # Careers/jobs page
│   ├── contact/            # Contact form page
│   ├── services/           # Service pages (8 services)
│   ├── training/           # Training programs
│   ├── consulting/         # Consulting services
│   ├── about/              # About Us page
│   └── slides/             # Slide detail pages
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # ServiceCard, ApplyModal
│   └── ui/                 # shadcn/ui components
└── lib/
    ├── data/               # Shared data (services, blog, careers)
    └── utils.ts            # Utility functions
```

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables on Vercel

Set all variables from `.env.example` in **Settings → Environment Variables** in the Vercel dashboard.

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and test: `npm run build`
3. Submit a pull request

## License

© 2025 Tecsteer. All rights reserved.
