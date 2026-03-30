# 🎾 Padel Kraków - Setup & Deployment Guide

## Overview

Your Padel Kraków community site has been completely rebuilt with:
- **Modern UI/UX** with responsive design and beautiful gradients
- **CMS System** with blog management dashboard
- **Authentication** for admin users
- **SEO Optimization** with metadata, structured data, and sitemap
- **Database** for storing blog posts and users
- **API Routes** for CRUD operations

---

## 📋 System Architecture

### Tech Stack
- **Frontend**: Next.js 15 (React 18, TypeScript, Tailwind CSS)
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Icons**: Lucide React
- **Markdown**: Remark + Remark-HTML

### Key Directories
```
src/
├── app/
│   ├── (public pages)/
│   ├── admin/blog/ (protected CMS dashboard)
│   ├── api/
│   │   ├── auth/ (NextAuth routes)
│   │   └── blog/ (API endpoints)
│   ├── auth/login (login page)
│   ├── blog/ (public blog listing)
│   └── blog/[slug]/ (individual post pages)
├── auth.ts (NextAuth configuration)
├── middleware.ts (route protection)
└── lib/db.ts (Prisma client)

prisma/
├── schema.prisma (database schema)
└── seed.ts (database seeding script)
```

---

## 🚀 Local Setup

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the project root:
```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_SECRET="generate-a-random-string-here"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

### 3. Set Up Database & Create Admin Users
```bash
# Create database tables
npx prisma db push

# Seed database with default users
npx prisma db seed
```

This creates two users:
- **Admin**: `admin@padel-krakow.com` / `change-me-in-production`
- **Author**: `author@padel-krakow.com` / `change-me-in-production`

⚠️ **IMPORTANT**: Change these passwords immediately!

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

---

## 🔐 User Management

### Adding/Modifying Users
Edit `prisma/seed.ts` to add more users, then run:
```bash
npx prisma db seed
```

### Changing User Passwords
```bash
npx prisma studio
```
This opens a UI where you can manage users directly. You'll need to hash passwords with bcryptjs before saving.

To hash a password:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10))"
```

---

## 📝 CMS Features

### Accessing the Admin Dashboard
1. Go to `http://localhost:3000/auth/login`
2. Sign in with admin credentials
3. You're now in the admin dashboard at `/admin/blog`

### Creating Blog Posts
1. Click "New Post" button
2. Fill in:
   - **Title**: Post title (becomes URL slug automatically)
   - **Content**: Write in Markdown format
   - **Cover Image**: URL to image
   - **Excerpt**: Short summary (auto-generated if left empty)
   - **Publish Status**: Toggle to publish or save as draft

### SEO Settings (Per Post)
- **Meta Title**: Title for search results
- **Meta Description**: Description for search results (max 160 chars)
- **Keywords**: Comma-separated keywords
- **OG Image**: Image for social sharing

### Publishing Posts
- Toggle the "Published" checkbox to make posts visible
- Published posts appear on `/blog` and get unique URLs like `/blog/my-post-slug`
- Draft posts only visible to logged-in authors

---

## 🌐 Deployment to Vercel

### Prerequisites
- GitHub account with your repository pushed
- Vercel account (free at https://vercel.com)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Complete CMS rebuild with modern UI"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. In **Root Directory**, leave as default
5. Click "Deploy"

### Step 3: Configure Environment Variables
After deployment, set environment variables:
1. Go to Project Settings → Environment Variables
2. Add:
   - `DATABASE_URL`: See "Database Setup" below
   - `NEXTAUTH_SECRET`: Use a strong secret (different from local!)
   - `NEXTAUTH_URL`: `https://yourdomain.vercel.app`

### Database Setup for Production

#### Option A: Using Vercel Postgres (Recommended)
1. In Vercel Dashboard, go to Storage → Create Database
2. Select "Postgres"
3. Copy the connection string
4. Update `DATABASE_URL` env var
5. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
6. Push changes to GitHub

#### Option B: Using Neon DB (Free tier available)
1. Sign up at https://neon.tech
2. Create a project and copy Postgres connection string
3. Add to Vercel environment variables

### Step 4: Initialize Production Database
After database is connected:
```bash
# From local machine with production DATABASE_URL
npx prisma db push --skip-generate
npx prisma db seed
```

Or add Vercel CLI and run:
```bash
vercel env pull .env.production.local
npx prisma db push
npx prisma db seed
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Set secure `NEXTAUTH_SECRET` (32+ random characters)
- [ ] Update `NEXTAUTH_URL` to your actual domain
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Review authentication settings in `src/auth.ts`
- [ ] Set up database backups
- [ ] Add rate limiting for API routes (optional)
- [ ] Review `/admin` routes are protected in `src/middleware.ts`

---

## 📊 Custom Domain

To use a custom domain instead of `yourdomain.vercel.app`:

1. In Vercel, go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable to include your domain

---

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database (⚠️ deletes all data!)
npx prisma migrate reset

# View database GUI
npx prisma studio

# Check database connection
npx prisma db push --skip-generate
```

### Authentication Issues
- Clear browser cookies
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain
- Check middleware.ts for route protection

### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## 📈 Performance & SEO

### SEO Features Implemented
✅ Meta tags (title, description, keywords)
✅ OpenGraph tags (social sharing)
✅ Twitter tags
✅ Sitemaps (auto-generated)
✅ Robots.txt
✅ Structured data (JSON-LD)
✅ Canonical URLs
✅ Fast rendering with Next.js

### Monitoring
- Set up Google Search Console
- Use Google PageSpeed Insights
- Monitor Vercel analytics

---

## 📚 API Documentation

### Blog API

#### Create Post
```
POST /api/blog
Content-Type: application/json
Authorization: NextAuth Session

{
  "title": "Post Title",
  "content": "# Markdown content here",
  "excerpt": "Short summary",
  "coverImage": "https://...",
  "published": true,
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description"
}
```

#### Get User's Posts
```
GET /api/blog
Authorization: NextAuth Session
```

#### Update Post
```
PUT /api/blog/{id}
Content-Type: application/json
Authorization: NextAuth Session
```

#### Delete Post
```
DELETE /api/blog/{id}
Authorization: NextAuth Session
```

---

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change brand colors. Currently uses amber/orange theme.

### Logo
- Update text logo in `src/app/layout.tsx`
- Or add an image to `/public` and import it

### Content
- Static pages are in `src/app/*/page.tsx`
- Court data in `src/app/courts/page.tsx`
- Levels data in `src/app/levels/page.tsx`

---

## 📞 Support

For issues or questions:
1. Check Vercel docs: https://vercel.com/docs
2. Check Next.js docs: https://nextjs.org/docs
3. Check Prisma docs: https://www.prisma.io/docs
4. Check NextAuth docs: https://authjs.dev

---

## 🎯 Next Steps

1. ✅ Complete this setup guide
2. ✅ Test locally with `npm run dev`
3. ✅ Change default passwords
4. ✅ Deploy to Vercel
5. ✅ Configure production database
6. ✅ Set custom domain
7. ✅ Test admin dashboard in production
8. ✅ Create first blog post
9. ✅ Monitor with Google Search Console

---

**Happy blogging! 🎾📝**
