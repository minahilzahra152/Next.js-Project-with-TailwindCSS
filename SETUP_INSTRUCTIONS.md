# Vulnerability Scanner - Local Setup Guide

## Step 1: Download & Extract
1. Download the ZIP file from v0
2. Extract to any folder on your computer
3. Open the folder in VS Code

## Step 2: Install Dependencies
Open terminal in VS Code (Ctrl + `) and run:
\`\`\`bash
npm install
\`\`\`

## Step 3: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project" (sign up if needed)
3. Click "New Project"
4. Fill in:
   - Project name: vulnerability-scanner
   - Database password: (create a strong password - save it!)
   - Region: Choose closest to you
5. Click "Create new project" and wait 2-3 minutes

## Step 4: Get Your Supabase Keys
1. In Supabase dashboard, click "Settings" (gear icon) in left sidebar
2. Click "API" under Configuration
3. You will see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`
   - **service_role secret key**: Long string starting with `eyJ...`

## Step 5: Create .env.local File
1. In your project root folder, find `.env.local.example`
2. Copy it and rename the copy to `.env.local`
3. Open `.env.local` and replace the placeholder values:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-SECRET-KEY
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

**IMPORTANT**: 
- Replace `YOUR-PROJECT-ID` with your actual project ID from the URL
- Replace `YOUR-ANON-PUBLIC-KEY` with the "anon public" key
- Replace `YOUR-SERVICE-ROLE-SECRET-KEY` with the "service_role" key

## Step 6: Run Database Migration
1. In Supabase dashboard, click "SQL Editor" in left sidebar
2. Click "New query"
3. Open the file `scripts/001_auth_schema.sql` from your project
4. Copy ALL the content and paste it into the SQL Editor
5. Click "Run" button (or press Ctrl+Enter)
6. You should see "Success. No rows returned" - this is correct!

## Step 7: Start the Development Server
In VS Code terminal, run:
\`\`\`bash
npm run dev
\`\`\`

You should see:
\`\`\`
▲ Next.js 15.x.x
- Local: http://localhost:3000
\`\`\`

## Step 8: Test the Application
1. Open http://localhost:3000 in your browser
2. Click "Sign Up" in the header
3. Fill in the registration form and submit
4. Check Supabase dashboard -> Authentication -> Users
5. Click on your user and click "Confirm email" button
6. Now go back and click "Login"
7. Enter your credentials - you should be redirected to Dashboard!

---

## Troubleshooting

### Error: "Missing environment variables"
- Make sure you created `.env.local` file (not `.env.local.example`)
- Make sure the file is in the ROOT folder of your project
- Restart the dev server after creating the file

### Error: "Invalid API key"
- Double-check you copied the keys correctly from Supabase
- Make sure there are no extra spaces or line breaks in the keys

### Login doesn't work
- Confirm the user's email in Supabase dashboard first
- Go to Authentication -> Users -> Click user -> Confirm email

### Tables not found
- Make sure you ran the SQL migration in Step 6
- Go to Table Editor in Supabase to verify tables exist

---

## File Structure Summary

\`\`\`
your-project/
├── .env.local              <-- YOU CREATE THIS
├── .env.local.example      <-- Template for .env.local
├── app/
│   ├── auth/               <-- Login, Signup pages
│   ├── dashboard/          <-- Protected dashboard
│   ├── scanner/            <-- Vulnerability scanner
│   ├── reports/            <-- Scan reports
│   └── ...
├── components/             <-- React components
├── lib/
│   └── supabase/           <-- Supabase client files
├── scripts/
│   └── 001_auth_schema.sql <-- Run this in Supabase SQL Editor
└── middleware.js           <-- Route protection
