# Complete Next.js Setup Guide

## Project Status
✅ Your project is **already built with Next.js**
✅ All components are **fully functional**
✅ Authentication is **configured with Supabase**

## Step 1: Disable Email Confirmation (Development Only)

Go to your Supabase Dashboard:
1. Click **Authentication > Providers > Email**
2. Toggle **"Confirm email"** to **OFF**
3. Click **Save**

## Step 2: Run SQL Migration

In Supabase **SQL Editor**, run:
\`\`\`sql
UPDATE auth.users SET email_confirmed_at = NOW(), confirmed_at = NOW() WHERE email_confirmed_at IS NULL;
\`\`\`

## Step 3: Setup Locally

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit: `http://localhost:3000`

## Step 4: Test Auth Flow

**Sign Up:**
- Go to `/auth/signup`
- Email: `test@example.com`
- Password: `Test1234`
- Click Sign Up

**Log In:**
- Go to `/auth/login`
- Use same email/password
- You should reach dashboard

## File Structure

\`\`\`
app/
├── page.jsx              # Home
├── layout.jsx            # Root layout
├── globals.css           # Styles
├── auth/
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── callback/         # Email confirmation
├── dashboard/            # Dashboard
├── scanner/              # Scanner tool
├── reports/              # Reports
├── services/             # Services
├── about/                # About
├── contact/              # Contact
└── profile/              # Profile (protected)

components/
├── dashboard-client.jsx  # Dashboard logic
├── site-header.jsx       # Header nav
├── site-footer.jsx       # Footer
└── ui/                   # UI components

lib/
├── supabase/
│   ├── client.js        # Browser client
│   ├── server.js        # Server client
│   └── middleware.js    # Auth middleware
└── storage.js           # LocalStorage utils
\`\`\`

## Features

✅ **Auth System**
- User signup/login
- Password validation
- JWT tokens
- Protected routes

✅ **Database**
- Profiles table
- Scans table
- Scheduled scans
- Row Level Security

✅ **CRUD Operations**
- Create scans
- Read reports
- Update URLs
- Delete reports

✅ **UI**
- Dark/light theme
- Real-time charts
- Animations
- Responsive design

## Troubleshooting

### "Cannot find module @supabase/ssr"
\`\`\`bash
npm install
\`\`\`

### "Your project's URL and Key are required"
- Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart: `npm run dev`

### Cannot login after signup
- Go to Supabase > Authentication > Users
- Check if user email is confirmed
- Manually confirm if needed

### PORT 3000 in use
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

## Environment Variables

Create `.env.local`:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

Get these from Supabase > Project Settings > API

## Commands

\`\`\`bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run linting
\`\`\`

Done! Your Next.js app is ready to use.
