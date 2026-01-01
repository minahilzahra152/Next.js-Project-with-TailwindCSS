# VulnScan - Complete Deployment Guide to Vercel

This is a complete guide to deploy VulnScan to Vercel with full Supabase integration, authentication, and database setup.

## Prerequisites

- GitHub account with your repository
- Supabase account (free at https://supabase.com)
- Vercel account (free at https://vercel.com)

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: `vulnscan` (or your choice)
   - **Password**: Create a secure password
   - **Region**: Choose closest to you
4. Click "Create new project" and wait (2-3 minutes)

### 1.2 Get Your API Keys

1. Once project is created, go to **Settings → API**
2. Copy these values and save them safely:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **Anon Key** (public key)
   - **Service Role Key** (secret key)

### 1.3 Disable Email Confirmation (Optional but Recommended for Testing)

1. Go to **Authentication → Providers → Email**
2. Toggle **"Confirm email"** to **OFF**
3. Click **"Save"**

This allows users to login immediately after signup. For production, you may want to enable it.

### 1.4 Run Database Migration

1. Go to **SQL Editor** in Supabase Dashboard
2. Click **"New Query"**
3. Copy entire content from `scripts/001_init_supabase.sql`
4. Paste into the SQL editor
5. Click **"Run"**
6. Wait for success message

✅ Your database is now set up with all tables and security policies.

## Step 2: Local Testing (Optional)

Test locally before deploying:

```bash
# Install dependencies
npm install

# Create .env.local with your Supabase keys
cp .env.local.example .env.local

# Edit .env.local and fill in:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
# NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Run development server
npm run dev

# Visit http://localhost:3000 and test signup/login
```

## Step 3: Deploy to Vercel

### 3.1 Push to GitHub

```bash
git add .
git commit -m "Production ready for Vercel deployment"
git push origin main
```

### 3.2 Import to Vercel

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Find your repository and click "Import"
4. Click **"Import"** (keep default Next.js settings)

### 3.3 Add Environment Variables

1. In Vercel project settings, go to **Settings → Environment Variables**
2. Add these variables (from Supabase):
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL = https://your-vercel-url.vercel.app
   ```

   ⚠️ **IMPORTANT**: For `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`, use your actual Vercel domain (shown after deployment)

3. Click **"Save"**

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (3-5 minutes)
3. Your site is now live! 🎉

## Step 4: Post-Deployment Setup

### 4.1 Configure Email Redirects (Important)

If you enabled email confirmation:

1. In Supabase, go to **Authentication → Providers → Email**
2. Set **"Site URL"** to your Vercel domain
3. Set **"Redirect URLs"** to:
   - `https://your-vercel-url.vercel.app/auth/callback`
   - `https://your-vercel-url.vercel.app`

### 4.2 Test Your Deployment

1. Visit your Vercel URL
2. Test all pages:
   - ✅ Home page loads
   - ✅ Navigation works
   - ✅ Create account
   - ✅ Login with new account
   - ✅ Access dashboard
   - ✅ Run scanner
   - ✅ View reports

## Troubleshooting

### Error: "Missing environment variables"

**Solution**: Check Vercel Settings → Environment Variables. All 4 variables must be set.

### Error: "Row Level Security policy violation"

**Solution**: 
1. Verify SQL migration was run in Supabase
2. Check that RLS is enabled on all tables
3. Try creating a new user

### Error: "Invalid email or password"

**Solution**:
- If email confirmation is enabled: Check your email for confirmation link
- If disabled: Clear cookies and try again
- Verify user exists in Supabase → Authentication → Users

### Page shows blank or 404

**Solution**:
1. Check browser console (F12) for errors
2. Check Vercel deployment logs
3. Verify Supabase URL is correct

## Performance Tips

1. **Enable Vercel Analytics**: Already included in code
2. **Image Optimization**: Next.js handles automatically
3. **Database Indexing**: Already added in SQL migration
4. **Caching**: Configure in `next.config.mjs`

## Security Checklist

- ✅ Supabase Row Level Security enabled
- ✅ JWT token management
- ✅ HTTPS enforced by Vercel
- ✅ Environment variables protected
- ✅ Service Role Key never exposed
- ✅ Email validation on signup

## Next Steps

1. **Customize**: Update branding, colors, content
2. **Add Features**: Extend scanner capabilities
3. **Monitor**: Set up error tracking (Sentry)
4. **Backup**: Configure Supabase backups
5. **Analytics**: Monitor in Vercel Dashboard

## Support

For issues:
1. Check this guide first
2. Check browser console (F12) for errors
3. Check Vercel logs: Project → Deployments → View Details
4. Check Supabase dashboard for database issues
5. Read `.env.local.example` for required variables

## Deployment Checklist

- ✅ Supabase project created
- ✅ Database migration run
- ✅ GitHub repository updated
- ✅ Vercel project created
- ✅ Environment variables set
- ✅ Build successful
- ✅ Signup/login working
- ✅ Dashboard functional
- ✅ All pages accessible

Your VulnScan is now live on Vercel! 🚀
