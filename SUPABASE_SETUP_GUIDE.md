# Supabase Authentication Setup Guide

This document lists ALL files needed for the vulnerability scanner app with Supabase authentication. Follow the instructions below.

## FILES TO CREATE (NEW FILES)

### 1. Create `.env.local` file in ROOT folder
**Path:** `.env.local`
**Status:** NEW - Create this file
**What to put:** Copy the environment variables from your Supabase dashboard
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### 2. Create `lib/supabase/client.ts`
**Path:** `lib/supabase/client.ts`
**Status:** ALREADY EXISTS (verify it exists)
**Content:** Browser-side Supabase client for authentication

### 3. Create `lib/supabase/server.ts`
**Path:** `lib/supabase/server.ts`
**Status:** ALREADY EXISTS (verify it exists)
**Content:** Server-side Supabase client with cookie handling

### 4. Create `lib/supabase/middleware.ts`
**Path:** `lib/supabase/middleware.ts`
**Status:** ALREADY EXISTS (verify it exists)
**Content:** Session refresh logic for middleware

### 5. Create `middleware.ts` in ROOT folder
**Path:** `middleware.ts`
**Status:** ALREADY EXISTS (verify it exists)
**Content:** Next.js middleware for protecting routes

### 6. Create `app/auth/layout.tsx`
**Path:** `app/auth/layout.tsx`
**Status:** ALREADY EXISTS (check if complete)
**Purpose:** Layout wrapper for auth pages

### 7. Create `app/auth/signup/page.tsx`
**Path:** `app/auth/signup/page.tsx`
**Status:** ALREADY EXISTS (verify content)
**Content:** Registration form with client-side validation

### 8. Create `app/auth/login/page.tsx`
**Path:** `app/auth/login/page.tsx`
**Status:** ALREADY EXISTS (verify content)
**Content:** Login form with client-side validation

### 9. Create `app/auth/signup-success/page.tsx`
**Path:** `app/auth/signup-success/page.tsx`
**Status:** ALREADY EXISTS (check if complete)
**Content:** Post-signup confirmation page

### 10. Create `app/auth/callback/route.ts`
**Path:** `app/auth/callback/route.ts`
**Status:** ALREADY EXISTS (check if complete)
**Content:** Email confirmation callback handler

---

## DATABASE SETUP

### Step 1: Run Migration Script

**File:** `scripts/001_auth_schema.sql`
**Status:** ALREADY EXISTS

**How to run:**
1. Go to Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor → New Query**
4. Open the file `scripts/001_auth_schema.sql` from your project
5. Copy ALL content and paste it into Supabase SQL editor
6. Click **Run** button
7. Wait for success message

This creates:
- `profiles` table (user data storage)
- `scans` table (scan history)
- `scheduled_scans` table (scheduled scan configs)
- Row Level Security (RLS) policies for data protection

---

## FILES ALREADY IMPLEMENTED

These files are already in your project and working:

✅ `app/page.tsx` - Home page with animations
✅ `app/scanner/page.tsx` - Vulnerability scanner
✅ `app/dashboard/page.tsx` - Protected dashboard
✅ `app/reports/page.tsx` - Report generation
✅ `app/services/page.tsx` - Services page
✅ `app/about/page.tsx` - About page
✅ `app/contact/page.tsx` - Contact page
✅ `app/profile/page.tsx` - User profile page
✅ `components/site-header.tsx` - Header with auth
✅ `components/site-footer.tsx` - Footer
✅ `components/auth-header.tsx` - Auth-aware header
✅ `components/dashboard-client.tsx` - Dashboard logic
✅ `app/globals.css` - Styling with animations
✅ `package.json` - Dependencies installed
✅ `lib/storage.ts` - LocalStorage utilities
✅ `lib/scheduler.ts` - Scan scheduling logic

---

## STEP-BY-STEP LOCAL SETUP

### Step 1: Download Project
1. Click **three dots (...)** in v0 preview → Download ZIP
2. Extract the ZIP folder
3. Open in VS Code

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Create `.env.local`
Create new file in root: `.env.local`
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### Step 4: Run SQL Migration
1. Copy content from `scripts/001_auth_schema.sql`
2. Paste into Supabase SQL Editor
3. Click Run

### Step 5: Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit: http://localhost:3000

---

## WHAT EACH FEATURE DOES

### Registration Flow
1. User fills form: Name, Email, Password
2. **Client-side validation:**
   - Email format check
   - Password strength (8+ chars, uppercase, lowercase, number)
   - Password confirmation match
3. **Server-side validation:**
   - Supabase Auth validates email uniqueness
   - Password security enforced by Supabase
4. **Database storage:**
   - User created in `auth.users` table (Supabase Auth)
   - Profile created in `profiles` table
5. **Redirect:**
   - Redirects to signup-success page
   - User receives confirmation email

### Login Flow
1. User enters Email & Password
2. **Client-side validation:**
   - Email format check
   - Password required
3. **Server-side validation:**
   - Supabase Auth checks credentials
   - Database query confirms user exists
4. **Token Generation:**
   - Supabase creates JWT session token
   - Token stored in secure HTTP-only cookie
5. **Redirect:**
   - Redirects to `/dashboard`

### Protected Routes
- **Middleware:** `middleware.ts` checks auth session
- **Protected pages:**
  - `/dashboard` - Requires login
  - `/profile` - Requires login
  - `/scanner` - Requires login (if enabled)
- **Unprotected pages:**
  - `/` - Home (public)
  - `/auth/login` - Public
  - `/auth/signup` - Public

### Database Security
- **Row Level Security (RLS):** 
  - Users can only see/edit THEIR OWN data
  - profiles - users see only their profile
  - scans - users see only their scans
  - scheduled_scans - users see only their scheduled scans

---

## TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "Cannot find module @supabase/ssr" | Run `npm install` again in terminal |
| "NEXT_PUBLIC_SUPABASE_URL is undefined" | Check `.env.local` exists in ROOT folder and restart dev server |
| "Can't sign up (email exists)" | Delete user from Supabase Dashboard → Auth → Users |
| "Middleware not protecting routes" | Verify `middleware.ts` is in ROOT (not in /app) |
| "CORS errors on signup" | Make sure SUPABASE_URL doesn't have trailing slash |
| "Email confirmation link not working" | Expected in development - manually confirm in Supabase Dashboard |

---

## NEXT STEPS

After setup:
1. Create a test account: admin@test.com / TestPassword123
2. Check Supabase Dashboard → Authentication → Users (verify user created)
3. Login with test account
4. Access protected pages (Dashboard, Profile, Scanner)
5. Test creating scans and reports
6. Try scheduling scans

---

## SUPPORT

If you need help:
1. Check Supabase Dashboard for error logs
2. Check browser DevTools → Console for errors
3. Verify all environment variables are correct
4. Make sure SQL migration ran successfully

Happy scanning!
