# Deployment Guide - VivekTest OEMS

## 🚨 **Issue: Website Shows README Instead of App**

### **Root Cause:**
Your deployment platform is either:
1. Not recognizing this as a Next.js application
2. Missing proper build configuration
3. Using GitHub Pages (which doesn't support Next.js server features)

---

## ✅ **Recommended Deployment Platforms**

Your app uses **server-side features** (API routes, database), so you need a platform that supports Next.js:

### **1. Vercel (BEST for Next.js)** ⭐⭐⭐⭐⭐

**Why Vercel:**
- Made by Next.js creators
- Zero configuration needed
- Free tier available
- Automatic HTTPS
- Best performance

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel auto-detects Next.js
6. Click "Deploy"
7. Done! ✅

**Environment Variables to Add:**
```
DATABASE_URL=file:./prisma/dev.db
JWT_SECRET=your-secure-secret-key-min-32-chars
```

**Note:** For production, use PostgreSQL instead of SQLite:
```
DATABASE_URL=postgresql://user:password@host:5432/database
```

---

### **2. Netlify** ⭐⭐⭐⭐

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. Install Next.js plugin (Netlify will prompt)
5. Add environment variables
6. Deploy

**Configuration file created:** `netlify.toml` ✅

---

### **3. Railway** ⭐⭐⭐⭐

**Steps:**
1. Go to [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. Select repository
4. Railway auto-detects Next.js
5. Add PostgreSQL database (recommended)
6. Set environment variables
7. Deploy

---

### **4. Render** ⭐⭐⭐

**Steps:**
1. Go to [render.com](https://render.com)
2. "New Web Service"
3. Connect GitHub repository
4. Settings:
   - **Build Command:** `npm install && npm run build && npx prisma generate`
   - **Start Command:** `npm start`
5. Add environment variables
6. Deploy

---

## ❌ **GitHub Pages - NOT RECOMMENDED**

**Why it won't work:**
- ❌ No server-side rendering support
- ❌ No API routes support
- ❌ No database support
- ❌ Static files only

Your app needs:
- ✅ Server-side API routes (`/api/*`)
- ✅ Database connection (SQLite/PostgreSQL)
- ✅ JWT authentication
- ✅ Dynamic server rendering

**GitHub Pages is for static HTML/CSS/JS only.**

---

## 🔧 **Configuration Files Created**

### 1. `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

### 2. `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 3. `public/.nojekyll`
Empty file to prevent Jekyll processing (for GitHub Pages attempt)

---

## 🗄️ **Database Configuration**

### **Current (Development):**
```
DATABASE_URL=file:./prisma/dev.db
```
Uses SQLite - works locally

### **Production (Recommended):**

Switch to PostgreSQL for production deployments:

1. **Get PostgreSQL Database:**
   - Vercel Postgres (free tier)
   - Railway PostgreSQL (included)
   - Supabase (free tier)
   - Neon (free tier)

2. **Update `.env`:**
```
DATABASE_URL=postgresql://username:password@host:5432/database?schema=public
```

3. **Run migrations:**
```bash
npx prisma migrate deploy
npx prisma generate
```

4. **Seed data (optional):**
```bash
npm run db:seed
```

---

## 🔐 **Environment Variables Required**

Add these to your deployment platform:

```env
# Database
DATABASE_URL=your_database_url_here

# JWT Secret (min 32 characters)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Node Environment
NODE_ENV=production
```

**⚠️ Important:** Never commit `.env` file to Git (it's in `.gitignore`)

---

## 📝 **Deployment Checklist**

Before deploying:

- [ ] Choose deployment platform (Vercel recommended)
- [ ] Set up database (PostgreSQL for production)
- [ ] Update `DATABASE_URL` environment variable
- [ ] Set `JWT_SECRET` environment variable
- [ ] Push latest code to GitHub
- [ ] Connect repository to deployment platform
- [ ] Run database migrations
- [ ] Seed initial data (optional)
- [ ] Test authentication
- [ ] Test quiz creation and taking
- [ ] Verify all features work

---

## 🚀 **Quick Deploy - Vercel (Recommended)**

1. **Push to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy to Vercel:**
   - Visit: https://vercel.com/new
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Add environment variables
   - Click "Deploy"
   - Done! 🎉

3. **After Deployment:**
   - Get PostgreSQL from Vercel dashboard
   - Update DATABASE_URL
   - Run migrations via Vercel terminal
   - Seed data if needed

---

## 🔍 **Troubleshooting**

### **Issue: Build fails**
**Solution:** Check build logs for missing dependencies or environment variables

### **Issue: Database connection fails**
**Solution:** 
- Verify DATABASE_URL is correct
- Ensure Prisma is generated: `npx prisma generate`
- Run migrations: `npx prisma migrate deploy`

### **Issue: Authentication fails**
**Solution:** 
- Check JWT_SECRET is set
- Ensure it's at least 32 characters
- Clear browser localStorage and try again

### **Issue: API routes return 404**
**Solution:** 
- Ensure platform supports Next.js API routes
- Don't use GitHub Pages
- Use Vercel, Netlify, Railway, or Render

---

## 📊 **Cost Comparison**

| Platform | Free Tier | Best For | Database |
|----------|-----------|----------|----------|
| **Vercel** | ✅ Yes | Next.js apps | PostgreSQL (paid) |
| **Netlify** | ✅ Yes | Static + Serverless | External |
| **Railway** | ✅ $5 credit | Full-stack | Included |
| **Render** | ✅ Yes | Web services | PostgreSQL (free) |
| **GitHub Pages** | ✅ Yes | Static only | ❌ None |

---

## 🎯 **Final Recommendation**

**Use Vercel** for the easiest deployment:
1. No configuration needed
2. Automatic builds
3. Built for Next.js
4. Free tier generous
5. Best performance

**Alternative: Render** if you want free PostgreSQL included.

---

*Last Updated: November 16, 2025*
*Project: VivekTest - Online MCQ Examination System*
