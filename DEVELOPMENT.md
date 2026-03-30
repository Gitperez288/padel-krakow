# 🔧 Development Guide

This document outlines the technical architecture and key features of the Padel Kraków application.

---

## Architecture Overview

The Padel Kraków application is built on Next.js 15 with TypeScript, featuring:

### Core Features
1. **Authentication System** - Secure user authentication with session management
2. **Content Management** - Blog editor with markdown support and metadata tools
3. **Data Persistence** - Prisma ORM with SQLite (dev) and PostgreSQL (production)
4. **API Layer** - RESTful endpoints for content management
5. **SEO Optimization** - Automatic sitemaps, meta tags, and structured data
6. **Interactive Maps** - Court locator with Leaflet integration
7. **Responsive Design** - Mobile-first design with Tailwind CSS

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js, React, TypeScript | 15.1.0, 18.2.0 |
| Styling | Tailwind CSS | 3.4.4 |
| Database ORM | Prisma | 5.7.1 |
| Authentication | NextAuth.js | 4.24.0 |
| Database (Dev) | SQLite | File-based |
| Database (Prod) | PostgreSQL | Recommended |
| Password Hashing | bcryptjs | 2.4.3 |
| Form Validation | React Hook Form + Zod | 7.48.0, 3.22.4 |
| Markdown | Remark | 15.0.1 |
| Maps | Leaflet + React-Leaflet | 1.9.4, 4.2.1 |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                      # Home page
│   ├── layout.tsx                    # Root layout with SEO
│   ├── providers.tsx                 # App context providers
│   ├── api/                          # API routes (protected)
│   ├── auth/                         # Authentication pages
│   ├── admin/                        # Admin dashboard (protected)
│   ├── blog/                         # Blog pages (public)
│   ├── courts/                       # Court locator
│   ├── levels/                       # Skill levels
│   ├── groups/                       # Community groups
│   ├── community/                    # Community page
│   ├── about/                        # About page
│   ├── robots.ts                     # SEO: robots.txt
│   └── sitemap.ts                    # SEO: sitemap.xml
├── auth.ts                           # NextAuth configuration
├── middleware.ts                     # Route protection logic
├── lib/
│   ├── db.ts                         # Prisma client singleton
│   ├── api.ts                        # API utilities
│   ├── constants.ts                  # Application constants
│   └── markdownToHtml.ts             # Markdown processing
└── interfaces/
    ├── author.ts                     # Author type definition
    └── post.ts                       # Post type definition

prisma/
├── schema.prisma                     # Database schema
└── seed.ts                           # Database initialization script
```

---

## Key Features

### 1. Authentication
- Credentials-based authentication using NextAuth.js
- Password hashing with bcryptjs (10 salt rounds)
- JWT session tokens with secure cookies
- Role-based access control (admin, author)
- Protected routes via middleware

**Files**: `src/auth.ts`, `src/middleware.ts`, `src/app/auth/login/`

### 2. Blog Management System
- Admin dashboard for creating/editing blog posts
- Markdown editor for content
- Per-post SEO settings (meta tags, keywords, social images)
- Draft/publish workflow
- Automatic URL slug generation
- Cover image support

**Files**: `src/app/admin/blog/`, `src/app/api/blog/`

### 3. Database Layer
- Type-safe database access with Prisma ORM
- Automated migrations with `npx prisma migrate`
- Database seeding for initial setup
- Support for SQLite (development) and PostgreSQL (production)

**Files**: `prisma/schema.prisma`, `prisma/seed.ts`, `src/lib/db.ts`

### 4. SEO Optimization
- Dynamic meta tags and OpenGraph tags
- JSON-LD structured data for rich snippets
- Automatic sitemaps and robots.txt
- Canonical URL management
- Per-page customization

**Files**: `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/layout.tsx`

### 5. Public Pages
- **Home**: Hero section with features and CTAs
- **Blog**: Article listing and individual post views
- **Courts**: Interactive map with court locations
- **Levels**: Community skill level system
- **Community**: Links to social groups
- **About**: Mission and information

---

## Development Workflow

### Local Development
```bash
npm run dev
```
Starts Next.js development server with hot-reload on port 3000.

### Database Management
```bash
npx prisma db push       # Sync schema to database
npx prisma db seed      # Run seed script
npx prisma studio      # Open GUI database editor
npx prisma migrate dev  # Create and apply migrations
```

### Building for Production
```bash
npm run build
npm run start
```

---

## Environment Variables

Required for local development:

```env
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

See `.env.local.example` for a template.

---

## Security Considerations

### ✅ Implemented
- Password hashing (bcryptjs with 10 salt rounds)
- HTTPS-ready (automatic on cloud platforms)
- CSRF protection via NextAuth.js
- Secure HTTP-only cookies
- Route-level access control via middleware
- Environment variable-based secrets
- Type-safe code with TypeScript
- No sensitive data in version control

### 📋 Best Practices
- Never commit `.env.local` or production secrets
- Use strong `NEXTAUTH_SECRET` (32+ random characters)
- Keep Node.js and dependencies updated
- Enable database backups for production
- Monitor authentication logs
- Use PostgreSQL in production (not SQLite)
- Rotate passwords and secrets regularly

---

## Performance Optimizations

- **Image Optimization**: Next.js built-in image optimization
- **Static Generation**: Pre-render public pages at build time
- **Code Splitting**: Automatic with Next.js dynamic imports
- **Database Optimization**: Efficient Prisma queries
- **CSS Minification**: Automatic with Tailwind CSS
- **Markdown Caching**: Cached during build process

---

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository on Vercel
3. Set environment variables
4. Deploy (automatic on push to main)

### Environment Variables for Production
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
```

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed deployment instructions.

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npx prisma db push     # Sync schema to DB
npx prisma db seed     # Run seed script
npx prisma studio     # Open database GUI
npx prisma migrate dev # Create migration

# Code Quality
npm run lint           # Run linter (if configured)
npm run format         # Format code (if configured)
```

---

## Troubleshooting

### Database Connection Error
1. Verify `DATABASE_URL` in `.env.local`
2. Check database file exists (SQLite)
3. Run `npx prisma db push`

### Build Fails on Vercel
- Ensure `prisma generate` runs before Next.js build
- Check all environment variables are set
- Review Vercel deployment logs

### Authentication Issues
- Clear browser cookies
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

**Last Updated**: March 2026
