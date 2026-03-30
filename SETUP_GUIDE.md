# 🎾 Padel Kraków - Setup & Deployment Guide

## Overview

Padel Kraków is a modern community portal built with Next.js featuring:
- **Interactive Court Locator** - Find padel courts on an interactive map
- **Blog System** - Publish news and community updates
- **Skill Levels** - Community skill rating system  
- **Community Groups** - Links to WhatsApp and Facebook communities
- **SEO Optimized** - Automatic sitemaps, meta tags, structured data
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

---

## 📋 Technology Stack

- **Framework**: Next.js 15 with React 18 and TypeScript
- **Styling**: Tailwind CSS with responsive design
- **Database**: SQLite (development) / PostgreSQL (production)
- **Content Management**: Built-in blog CMS with Markdown support
- **Maps**: Leaflet + React-Leaflet for interactive court locations
- **SEO**: Automatic sitemaps, robots.txt, structured data (JSON-LD)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- Git for version control

### 1. Clone the Repository
```bash
git clone https://github.com/Gitperez288/padel-krakow.git
cd padel-krakow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the project root:
```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-random-secret-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a random secret:
```bash
openssl rand -base64 32
```

### 4. Initialize Database
```bash
# Create database schema
npx prisma db push

# Seed with initial data
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📝 Blog Management

The site includes a protected admin dashboard for managing blog content.

**⚠️ For admin credentials and detailed setup instructions, see ADMIN_SETUP.md (kept locally, not in version control)**

### Blog Features
- Create and edit posts in Markdown format
- Add cover images, excerpts, and publish status control
- SEO customization per post (meta titles, descriptions, keywords)
- Social sharing optimization (OG images, Twitter cards)
- Automatic URL slug generation

---

## 🌐 Deployment to Vercel

### Prerequisites
- GitHub repository with pushes enabled
- Vercel account (free tier supported)

### Deployment Steps

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add the following variables:
     ```
     DATABASE_URL=your-production-database-url
     NEXTAUTH_SECRET=your-production-secret
     NEXTAUTH_URL=https://your-domain.com
     ```
   - For databases: PostgreSQL recommended for production

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

### Automatic Deployments
Any push to the `main` branch will trigger an automatic deployment on Vercel.

### Production Database Setup

**Option A: Using Vercel Postgres (Recommended)**
1. In Vercel Dashboard, go to Storage → Create Database
2. Select "Postgres"
3. Copy the connection string
4. Update `DATABASE_URL` environment variable
5. Update `prisma/schema.prisma` to use PostgreSQL:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Option B: Using Neon DB (Free tier available)**
1. Sign up at https://neon.tech
2. Create a project and copy Postgres connection string
3. Add to Vercel environment variables

### Initialize Production Database
After connecting your production database:
```bash
npx prisma db push
npx prisma db seed
```

---

## 📁 Project Structure

```
padel-krakow/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── blog/                       # Blog pages (public)
│   │   │   ├── page.tsx                # Blog listing
│   │   │   └── [slug]/page.tsx         # Individual post
│   │   ├── courts/page.tsx             # Court locator with map
│   │   ├── levels/page.tsx             # Skill levels
│   │   ├── groups/page.tsx             # Community groups
│   │   ├── admin/                      # Admin dashboard (protected)
│   │   ├── auth/                       # Authentication pages
│   │   ├── api/                        # API routes
│   │   ├── robots.ts                   # Robots.txt generator
│   │   └── sitemap.ts                  # Sitemap generator
│   ├── auth.ts                         # NextAuth configuration
│   ├── middleware.ts                   # Route protection
│   └── lib/db.ts                       # Prisma client
├── prisma/
│   ├── schema.prisma                   # Database schema
│   └── seed.ts                         # Database seeding
├── public/                             # Static assets
├── package.json                        # Dependencies
└── README.md
```

---

## 🔒 Security Best Practices

### For Development
1. Use `.env.local` for local secrets (added to `.gitignore`)
2. Never commit passwords or API keys
3. Use strong `NEXTAUTH_SECRET` values
4. Regularly update dependencies: `npm update`

### For Production
1. Use environment variables for all secrets (never hardcode)
2. Enable HTTPS (automatic with Vercel)
3. Set secure, random `NEXTAUTH_SECRET`
4. Use PostgreSQL instead of SQLite
5. Enable database backups
6. Keep dependencies updated
7. Review security settings regularly

---

## 🐛 Troubleshooting

### Database Issues
```bash
# View database with GUI
npx prisma studio

# Reset database (⚠️ deletes all data!)
npx prisma migrate reset

# Seed database
npx prisma db seed
```

### Build Issues on Vercel
- Ensure `prisma generate` runs before build
- Clear Vercel cache: Deployments → Click menu → Redeploy
- Check all environment variables are set correctly

### Development Server Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Restart development server
npm run dev
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Last Updated**: March 2026
