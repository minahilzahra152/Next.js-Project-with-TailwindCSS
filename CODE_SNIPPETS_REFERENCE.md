# Code Snippets Reference

Use this file if you need to manually create or verify code content.

---

## 1. lib/supabase/client.ts

\`\`\`typescript
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
\`\`\`

---

## 2. lib/supabase/server.ts

\`\`\`typescript
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignored
          }
        },
      },
    }
  )
}
\`\`\`

---

## 3. lib/supabase/middleware.ts

\`\`\`typescript
import { createServerClient } from "@supabase/ssr"
import { NextRequest, NextResponse } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  await supabase.auth.getSession()

  return supabaseResponse
}
\`\`\`

---

## 4. middleware.ts (ROOT)

\`\`\`typescript
import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes - require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/scanner"]
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const response = await updateSession(request)
    
    // If user tries to access protected route without auth, redirect to login
    if (!response.cookies.get("sb-auth-token")) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    
    return response
  }

  return await updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
\`\`\`

---

## 5. .env.local (ROOT)

**Create new file: `.env.local` in root folder**

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

**How to get values:**
1. Login to https://app.supabase.com
2. Click your project
3. Go to Settings → API
4. Copy these values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon (public) key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service role (secret) key → `SUPABASE_SERVICE_ROLE_KEY`

---

## 6. scripts/001_auth_schema.sql

\`\`\`sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  company TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create scans table
CREATE TABLE IF NOT EXISTS public.scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_url TEXT NOT NULL,
  scan_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  results JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scans" ON public.scans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scans" ON public.scans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scans" ON public.scans
  FOR UPDATE USING (auth.uid() = user_id);

-- Create scheduled_scans table
CREATE TABLE IF NOT EXISTS public.scheduled_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_url TEXT NOT NULL,
  scan_type TEXT NOT NULL,
  frequency TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  next_run_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.scheduled_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scheduled scans" ON public.scheduled_scans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scheduled scans" ON public.scheduled_scans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scheduled scans" ON public.scheduled_scans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scheduled scans" ON public.scheduled_scans
  FOR DELETE USING (auth.uid() = user_id);
\`\`\`

---

## 7. package.json (Relevant Dependencies)

**No need to modify - already included!**

\`\`\`json
{
  "dependencies": {
    "@supabase/ssr": "0.7.0",
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.60.0",
    "zod": "3.25.76"
  }
}
\`\`\`

All dependencies are already in package.json. Just run `npm install`.

---

## Testing the Setup

### Test 1: Check Environment Variables
In any page component, add temporarily:
\`\`\`typescript
console.log("[v0] SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("[v0] ANON_KEY loaded:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
\`\`\`

### Test 2: Test Signup
1. Go to http://localhost:3000/auth/signup
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPassword123
3. Should see: "Check your email" message

### Test 3: Check Database
1. Supabase Dashboard → Auth → Users
2. Should see: test@example.com listed

### Test 4: Confirm Email (Dev Only)
1. In Supabase Dashboard → Auth → Users
2. Click the user
3. Click "Confirm email"

### Test 5: Test Login
1. Go to http://localhost:3000/auth/login
2. Enter: test@example.com / TestPassword123
3. Should redirect to /dashboard

---

## Quick Troubleshooting

**Error: "NEXT_PUBLIC_SUPABASE_URL is undefined"**
- Fix: Create `.env.local` in ROOT folder (not in /app)
- Restart dev server: npm run dev

**Error: "Cannot find module @supabase/ssr"**
- Fix: Run `npm install` in terminal

**Sign up fails with "Email already exists"**
- Fix: Delete user from Supabase Dashboard → Auth → Users

**Can't login after signup**
- Fix: Confirm email manually in Supabase Dashboard

---
