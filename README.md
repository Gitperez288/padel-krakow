# 🎾 Padel Kraków Community Portal

A modern, SEO-optimized web application for the Padel Kraków community featuring an interactive CMS for blog management, court locator, skill levels, and community groups.

## ✨ Features

### 🌟 For Community Members
- **Court Locator** - Interactive map showing all padel courts in Kraków & Małopolska
- **Skill Levels** - Comprehensive 7-level skill rating system with detailed descriptions
- **Community Groups** - Links to WhatsApp and Facebook groups for finding matches
- **Blog Feed** - Read the latest news and stories from the community

### 🔧 For Admins
- **Secure Admin Dashboard** - Password-protected blog management interface
- **Blog Editor** - Create, edit, and publish posts with markdown support
- **SEO Tools** - Built-in meta titles, descriptions, keywords, and social sharing images
- **Post Management** - Organize posts, set publish dates, manage drafts
- **User Management** - Support for multiple admin users with role-based access

### 🚀 Tech Features
- **Next.js 15** - Latest React framework with Turbopack
- **Responsive Design** - Beautiful UI that works on all devices
- **Modern UX** - Smooth animations and intuitive navigation
- **SEO Optimized** - Automatic sitemaps, meta tags, structured data
- **Type-Safe** - Full TypeScript support throughout
- **Fast** - Static generation, image optimization, code splitting

---

## 🎯 Quick Start

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your own NEXTAUTH_SECRET

# 3. Create database
npx prisma db push

# 4. Seed with sample data
npx prisma db seed

# 5. Start development server
npm run dev
```

Visit http://localhost:3000

⚠️ **For admin credentials and setup instructions, see [ADMIN_SETUP.md](./ADMIN_SETUP.md) (kept locally only)**

---

## 📚 Documentation

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Technical architecture and features
- **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** - Admin setup guide (local use only, not in public repo)

---

## 🗂️ Project Structure

```
padel-krakow/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page (modern redesign)
│   │   ├── layout.tsx                  # Root layout with SEO & footer
│   │   ├── auth/login/                 # Login page
│   │   ├── admin/blog/                 # Admin dashboard
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/    # Authentication API
│   │   │   └── blog/                   # Blog CRUD API
│   │   ├── blog/                       # Public blog pages
│   │   ├── courts/                     # Court locator
│   │   ├── levels/                     # Skill levels
│   │   ├── groups/                     # Community groups
│   │   ├── robots.ts                   # robots.txt generator
│   │   └── sitemap.ts                  # Sitemap generator
│   ├── auth.ts                         # NextAuth configuration
│   └── middleware.ts                   # Route protection
├── prisma/
│   ├── schema.prisma                   # Database schema
│   └── seed.ts                         # Database seeding
├── public/                             # Static assets
├── SETUP_GUIDE.md                      # Setup instructions
├── DEVELOPMENT.md                      # Technical details
└── package.json                        # Dependencies
```

---

## 🔐 Security

- ✅ Password authentication with bcrypt hashing
- ✅ Protected admin routes with middleware
- ✅ Environment variables for secrets
- ✅ HTTPS on Vercel (automatic)
- ✅ CORS protection
- ✅ Input validation

---

## 📊 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 15, React 18, TypeScript |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Backend** | Next.js API Routes |
| **Database** | Prisma ORM, SQLite (dev), PostgreSQL (prod) |
| **Auth** | NextAuth.js v5 |
| **Content** | Markdown, Remark |
| **Deployment** | Vercel |

---

## 🚀 Deployment

### Deploy to Vercel (5 minutes)
1. Push code to GitHub
2. Visit https://vercel.com → Import project
3. Set environment variables
4. Deploy!

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#-deployment-to-vercel) for detailed instructions.

---

## 📝 Creating Blog Posts

1. Go to `https://yoursite.com/admin/blog`
2. Log in with admin credentials
3. Click "New Post"
4. Write your post in Markdown
5. Fill in SEO details
6. Click "Save"
7. Post appears at `https://yoursite.com/blog/post-title`

---

## 🎨 Customization

### Change Brand Colors
Edit `tailwind.config.ts` - currently using amber/orange theme

### Update Navigation
Edit links in `src/app/layout.tsx`

### Modify Court Data
Edit `src/app/courts/page.tsx`

### Update Skill Levels
Edit `src/app/levels/page.tsx`

---

## 📈 SEO Features

✅ Automatic sitemaps at `/sitemap.xml`
✅ robots.txt at `/robots.xml`
✅ OpenGraph tags for social sharing
✅ JSON-LD structured data
✅ Meta descriptions and keywords
✅ Canonical URLs
✅ Mobile-optimized
✅ Fast page speed

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📞 Support

- **Docs**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md) and [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **NextAuth**: https://authjs.dev
- **Tailwind**: https://tailwindcss.com/docs

---

## 📄 License

This project is open source. Feel free to use and modify for the Padel Kraków community.

---

## 🙏 Credits

Built with Next.js, Prisma, and Tailwind CSS for the amazing Padel Kraków community.

**Last Updated**: March 29, 2024
**Version**: 2.0 (Complete CMS Rebuild)
