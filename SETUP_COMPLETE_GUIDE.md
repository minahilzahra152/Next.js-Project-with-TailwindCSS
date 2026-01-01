# Complete Setup Guide for Next.js Vulnerability Scanner

## What You Have
Your project is already a **full Next.js application** with:
- ✅ Next.js App Router (already configured)
- ✅ Supabase authentication
- ✅ TypeScript/JavaScript support
- ✅ All pages and components
- ✅ CRUD operations for scans and reports
- ✅ Beautiful UI with Tailwind CSS and animations

## The Problem
Users cannot login because Supabase requires **email confirmation** by default. This is a security feature but prevents testing easily.

## The Solution - Steps to Follow

### Step 1: Disable Email Confirmation in Supabase
1. Go to **https://supabase.com** and log in to your project
2. Navigate to **Authentication > Providers > Email**
3. Find the toggle for **"Confirm email"** and turn it **OFF**
4. Click **Save**

### Step 2: Run SQL Migration
1. Go to **Supabase > SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `scripts/002_disable_email_confirmation.sql`
4. Click **Run**
5. This confirms all existing users

### Step 3: Install Dependencies
Open your terminal and run:
\`\`\`bash
npm install
\`\`\`

### Step 4: Start the Development Server
\`\`\`bash
npm run dev
\`\`\`

The app should now be available at `http://localhost:3000`

## Testing the App

### Test Signup
1. Go to `http://localhost:3000/auth/signup`
2. Create an account with:
   - Full Name: Test User
   - Email: test@example.com
   - Password: TestPassword123
3. Click "Sign Up"
4. You should see success message and redirect to login

### Test Login
1. Go to `http://localhost:3000/auth/login`
2. Enter the email and password from signup
3. Click "Sign In"
4. You should be redirected to `/dashboard`

### Test Protected Route
1. Go to `http://localhost:3000/profile`
2. You will only access this if logged in
3. If not logged in, you'll be redirected to `/auth/login`

### Test Public Routes
All these routes work without login:
- `http://localhost:3000` - Home
- `http://localhost:3000/dashboard` - Dashboard (guest view)
- `http://localhost:3000/scanner` - Scanner
- `http://localhost:3000/reports` - Reports
- `http://localhost:3000/services` - Services
- `http://localhost:3000/about` - About
- `http://localhost:3000/contact` - Contact

## File Structure

\`\`\`
project/
├── app/
│   ├── layout.jsx              # Root layout
│   ├── page.jsx                # Home page
│   ├── globals.css             # Styling and animations
│   ├── auth/
│   │   ├── login/page.jsx      # Login page
│   │   ├── signup/page.jsx     # Signup page
│   │   └── callback/route.js   # Email confirmation
│   ├── dashboard/page.jsx      # Dashboard
│   ├── scanner/page.jsx        # Scanner tool
│   ├── reports/page.jsx        # Reports page
│   ├── services/page.jsx       # Services page
│   ├── about/page.jsx          # About page
│   ├── contact/page.jsx        # Contact page
│   └── profile/page.jsx        # Profile (protected)
├── components/
│   ├── site-header.jsx         # Navigation header
│   ├── site-footer.jsx         # Footer
│   ├── dashboard-client.jsx    # Dashboard logic
│   └── ui/                     # UI components
├── lib/
│   ├── supabase/
│   │   ├── client.js           # Browser Supabase client
│   │   ├── server.js           # Server Supabase client
│   │   └── middleware.js       # Auth middleware
│   └── storage.js              # Local storage utilities
├── middleware.js               # Next.js middleware
├── package.json                # Dependencies
└── scripts/
    ├── 001_auth_schema.sql     # Database schema
    └── 002_disable_email_confirmation.sql
\`\`\`

## Environment Variables

Your `.env.local` file should have:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

Replace with your actual keys from Supabase project settings.

## Key Features

✅ **Authentication System**
- User signup with validation
- User login with token generation
- Password strength checker
- Email/password validation
- Logout functionality

✅ **Database**
- Profiles table (user info)
- Scans table (scan history)
- Scheduled scans table
- Row Level Security (RLS) policies

✅ **CRUD Operations**
- Create: New scans
- Read: View all scans/reports
- Update: Edit scan URL
- Delete: Remove scans/reports

✅ **UI Features**
- Dark/light theme toggle
- Real-time terminal output
- Animations and transitions
- Responsive design
- Modal dialogs for actions

## Troubleshooting

### Error: "Your project's URL and Key are required"
- Make sure `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart the development server: `npm run dev`

### Cannot login after signup
- Go to Supabase Dashboard > Authentication > Users
- Find your user and check if email is confirmed
- If not, click the user and manually confirm

### "New row violates row-level security policy"
- Make sure you ran the SQL migration script
- Check that RLS policies are created correctly in Supabase

### PORT 3000 already in use
Run with a different port:
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

## Next Steps

After everything is working:
1. Deploy to Vercel for production
2. Set up a custom domain
3. Configure production Supabase project
4. Enable email confirmation for security
5. Add SSL certificates

## Support

If you encounter issues:
1. Check Supabase status at https://status.supabase.com
2. Review Supabase logs in the dashboard
3. Check Next.js console for errors
4. Verify all environment variables are set
