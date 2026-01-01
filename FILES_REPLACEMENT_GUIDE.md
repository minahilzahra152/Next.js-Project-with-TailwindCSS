# Complete Files Replacement Guide

This guide tells you EXACTLY which files to check, create, or modify after downloading the project.

---

## SECTION 1: CORE AUTHENTICATION FILES (Already Implemented)

### File 1: `lib/supabase/client.ts`
**Status:** ✅ ALREADY CREATED - Verify it exists
**Location:** `/lib/supabase/client.ts`
**Purpose:** Browser client for Supabase authentication
**Do NOT modify:** Just verify it exists
**Content:** Should contain `createBrowserClient` function

### File 2: `lib/supabase/server.ts`
**Status:** ✅ ALREADY CREATED - Verify it exists
**Location:** `/lib/supabase/server.ts`
**Purpose:** Server-side client for Supabase
**Do NOT modify:** Just verify it exists
**Content:** Should contain `createServerClient` function

### File 3: `lib/supabase/middleware.ts`
**Status:** ✅ ALREADY CREATED - Verify it exists
**Location:** `/lib/supabase/middleware.ts`
**Purpose:** Session refresh in middleware
**Do NOT modify:** Just verify it exists
**Content:** Should contain `updateSession` function

### File 4: `middleware.ts`
**Status:** ✅ ALREADY CREATED - Verify it exists
**Location:** `/middleware.ts` (ROOT FOLDER, not in /app)
**Purpose:** Protects routes and manages sessions
**Do NOT modify:** Just verify it exists
**Content:** Should import from `lib/supabase/middleware`

---

## SECTION 2: AUTHENTICATION PAGES (Already Implemented)

### File 5: `app/auth/layout.tsx`
**Status:** ✅ ALREADY CREATED
**Location:** `/app/auth/layout.tsx`
**Purpose:** Layout wrapper for auth pages
**Do NOT modify:** Just verify it exists

### File 6: `app/auth/signup/page.tsx`
**Status:** ✅ ALREADY CREATED
**Location:** `/app/auth/signup/page.tsx`
**Purpose:** Registration form with validation
**Features:**
- Full name, email, password input
- Client-side validation
- Server-side validation via Supabase
- Stores profile in database
- Redirects to signup-success page

### File 7: `app/auth/login/page.tsx`
**Status:** ✅ ALREADY CREATED
**Location:** `/app/auth/login/page.tsx`
**Purpose:** Login form
**Features:**
- Email and password input
- Client-side validation
- Compares with database credentials
- Generates JWT token (via Supabase)
- Redirects to dashboard on success

### File 8: `app/auth/signup-success/page.tsx`
**Status:** ✅ ALREADY CREATED
**Location:** `/app/auth/signup-success/page.tsx`
**Purpose:** Post-signup confirmation page
**Message:** "Check your email for confirmation link"

### File 9: `app/auth/callback/route.ts`
**Status:** ✅ ALREADY CREATED
**Location:** `/app/auth/callback/route.ts`
**Purpose:** Handles email confirmation callback
**Do NOT modify:** Just verify it exists

---

## SECTION 3: PROTECTED PAGES (Already Implemented)

### File 10: `app/dashboard/page.tsx`
**Status:** ✅ ALREADY CREATED
**Location:** `/app/dashboard/page.tsx`
**Purpose:** Protected dashboard (requires login)
**Features:**
- Server-side auth check
- Charts and widgets
- Vulnerability statistics
- User can only see their data (RLS policy)
- Redirects to login if not authenticated

### File 11: `app/profile/page.tsx`
**Status:** ✅ ALREADY CREATED
**Location:** `/app/profile/page.tsx`
**Purpose:** User profile page (requires login)
**Features:**
- Shows user information
- Can update profile
- Account settings
- Logout option

---

## SECTION 4: ENVIRONMENT VARIABLES (YOU MUST CREATE)

### File 12: `.env.local`
**Status:** ❌ YOU MUST CREATE THIS
**Location:** Root folder (NOT in any subfolder)
**Important:** This file is in `.gitignore` - never commit it!

**How to create:**
1. In VS Code root folder, right-click → New File
2. Name it: `.env.local`
3. Add these lines (replace values from Supabase):

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

**Where to get values:**
- Go to Supabase Dashboard
- Click your project
- Settings → API
- Copy: Project URL, Anon Key, Service Role Key
- Paste into `.env.local`

---

## SECTION 5: DATABASE SETUP (YOU MUST RUN THIS)

### File 13: `scripts/001_auth_schema.sql`
**Status:** ✅ ALREADY CREATED
**Location:** `/scripts/001_auth_schema.sql`
**Purpose:** Creates database tables and RLS policies

**How to run this:**
1. Open your Supabase Dashboard
2. Go to SQL Editor
3. Click "New Query"
4. Open the file `/scripts/001_auth_schema.sql` in VS Code
5. Copy ALL content
6. Paste into Supabase SQL editor
7. Click "Run" button
8. Wait for success message

**What it creates:**
- `profiles` table - stores user information
- `scans` table - stores vulnerability scan history
- `scheduled_scans` table - stores scheduled scan configs
- RLS policies - ensures user data privacy

---

## SECTION 6: HEADER & NAVIGATION (Already Implemented)

### File 14: `components/site-header.tsx`
**Status:** ✅ ALREADY CREATED - Has auth logic
**Location:** `/components/site-header.tsx`
**Purpose:** Main header with navigation
**Features:**
- Shows different buttons based on auth status
- "Sign Up / Login" for guests
- "Dashboard / Profile / Logout" for logged-in users

### File 15: `components/auth-header.tsx`
**Status:** ✅ ALREADY CREATED
**Location:** `/components/auth-header.tsx`
**Purpose:** Auth-specific header for dashboard pages
**Features:**
- Shows logged-in user email
- Logout button
- User dropdown menu

---

## SECTION 7: SUPPORTING FILES (Already Implemented)

### File 16: `package.json`
**Status:** ✅ ALREADY CREATED - Has @supabase/ssr dependency
**Location:** `/package.json`
**Do NOT modify:** All dependencies already included
**Key dependency:** `"@supabase/ssr": "0.7.0"`

### File 17: `app/globals.css`
**Status:** ✅ ALREADY CREATED - Has animations
**Location:** `/app/globals.css`
**Purpose:** Global styles and animations
**Do NOT modify:** Already has all styling

### File 18: `app/layout.tsx`
**Status:** ✅ ALREADY CREATED
**Location:** `/app/layout.tsx`
**Purpose:** Root layout
**Do NOT modify:** Already configured

---

## SUMMARY: WHAT YOU NEED TO DO

### Step 1: Download Project
- Click three dots in v0 preview
- Select "Download ZIP"
- Extract folder

### Step 2: Create `.env.local`
- Create NEW file in ROOT: `.env.local`
- Add 4 environment variables from Supabase

### Step 3: Run SQL Migration
- Copy content from `scripts/001_auth_schema.sql`
- Paste into Supabase SQL Editor
- Click Run

### Step 4: Install & Run
\`\`\`bash
npm install
npm run dev
\`\`\`

### Step 5: Test
- Visit http://localhost:3000
- Click "Sign Up"
- Create test account
- Check Supabase Dashboard for new user
- Login with credentials
- Access dashboard

---

## VERIFICATION CHECKLIST

After download, verify these files exist:

- [ ] `lib/supabase/client.ts` exists
- [ ] `lib/supabase/server.ts` exists
- [ ] `lib/supabase/middleware.ts` exists
- [ ] `middleware.ts` exists in ROOT (not in /app)
- [ ] `app/auth/signup/page.tsx` exists
- [ ] `app/auth/login/page.tsx` exists
- [ ] `app/dashboard/page.tsx` exists
- [ ] `scripts/001_auth_schema.sql` exists
- [ ] `.env.local` created with values (YOU CREATE THIS)
- [ ] SQL migration ran successfully

If all items checked ✅, you're ready to go!

---

## FILE STRUCTURE REFERENCE

\`\`\`
project-root/
├── .env.local                          (CREATE THIS)
├── middleware.ts                       (VERIFY EXISTS)
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── auth/
│   │   ├── layout.tsx
│   │   ├── signup/
│   │   │   └── page.tsx               (SIGNUP FORM)
│   │   ├── login/
│   │   │   └── page.tsx               (LOGIN FORM)
│   │   ├── signup-success/
│   │   │   └── page.tsx
│   │   └── callback/
│   │       └── route.ts
│   ├── dashboard/
│   │   └── page.tsx                   (PROTECTED)
│   ├── profile/
│   │   └── page.tsx                   (PROTECTED)
│   └── ... other pages ...
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 (BROWSER CLIENT)
│   │   ├── server.ts                 (SERVER CLIENT)
│   │   └── middleware.ts             (SESSION REFRESH)
│   ├── storage.ts
│   └── ... other utils ...
├── components/
│   ├── site-header.tsx               (WITH AUTH)
│   ├── auth-header.tsx
│   └── ... UI components ...
├── scripts/
│   └── 001_auth_schema.sql           (RUN THIS)
└── package.json                       (NO CHANGES NEEDED)
\`\`\`

---

## IF SOMETHING IS MISSING

If any of these files don't exist after download:
1. Check the file paths are correct
2. Ensure you extracted the FULL ZIP folder
3. Look in subdirectories (e.g., some files might be nested)
4. If file truly missing, create it manually from content provided

All core authentication files should exist. Only `.env.local` needs to be created by you.
