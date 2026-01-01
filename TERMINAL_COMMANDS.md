# Terminal Commands for Running the Project

## STEP 1: Install Dependencies (Run Once)

Open terminal in your project folder and run:

\`\`\`bash
# Delete old node_modules and lock file first
rm -rf node_modules package-lock.json

# Install all dependencies
npm install --legacy-peer-deps
\`\`\`

If you still get errors, try:
\`\`\`bash
npm install next@latest react@latest react-dom@latest --legacy-peer-deps
npm install react-is --legacy-peer-deps
\`\`\`

## STEP 2: Setup Environment File

Create `.env.local` file in root folder with:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

## STEP 3: Setup Database

Go to Supabase Dashboard > SQL Editor and run these scripts IN ORDER:

1. First run: `scripts/001_auth_schema.sql` (creates tables)
2. Then run: `scripts/002_disable_email_confirmation.sql` (allows immediate login)

## STEP 4: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000 in your browser.

## STEP 5: Push to GitHub (Without node_modules)

\`\`\`bash
# Remove node_modules from git tracking
rm -rf node_modules

# Add gitignore
git add .gitignore

# Commit changes
git add .
git commit -m "Add project files"

# Push to GitHub
git push -u origin main
\`\`\`

## Common Errors & Fixes

### Error: "Module not found: react-is"
\`\`\`bash
npm install react-is --legacy-peer-deps
\`\`\`

### Error: "Supabase URL and Key required"
Make sure `.env.local` file exists with correct values

### Error: "Incorrect email and password"
Run `scripts/002_disable_email_confirmation.sql` in Supabase SQL Editor

### Error: "node_modules too large for GitHub"
Delete node_modules before pushing:
\`\`\`bash
rm -rf node_modules
git add .
git commit -m "Remove node_modules"
git push
