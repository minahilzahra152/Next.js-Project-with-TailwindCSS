# VulnScan - Professional Vulnerability Scanner

A production-ready vulnerability scanner built with Next.js 15, React 19, Tailwind CSS 4, and Supabase.

## 🌟 Features

### Core Features
- **Real-time Scanning**: Terminal-style live scanning with instant feedback
- **Comprehensive Reports**: Export as JSON, PDF, or print
- **Scheduled Scans**: Automate recurring security checks
- **Dashboard**: Real-time analytics and CRUD operations
- **User Authentication**: Secure login/signup with Supabase
- **Dark/Light Theme**: Toggle between themes
- **Mobile Responsive**: Works on all devices

### Pages & Routes
- **Home** (`/`): Hero, features, services, stats, CTA
- **Scanner** (`/scanner`): Real-time vulnerability scanning
- **Dashboard** (`/dashboard`): Analytics, scan history, CRUD ops
- **Reports** (`/reports`): View all scans, export data
- **Services** (`/services`): Detailed service offerings
- **About** (`/about`): Team, mission, values, FAQ
- **Contact** (`/contact`): Contact form and support
- **Auth** (`/auth/login`, `/auth/signup`): User authentication
- **Profile** (`/profile`): User settings (protected)

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local
# Fill in your Supabase credentials

# Run development server
npm run dev

# Visit http://localhost:3000
```

### Deploy to Vercel

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions.

## 📋 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15.5.9 |
| **Language** | React 19, JavaScript/JSX |
| **Styling** | Tailwind CSS 4 |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth with JWT |
| **UI Components** | Shadcn/ui |
| **Icons** | Lucide React |
| **Hosting** | Vercel |
| **Analytics** | Vercel Analytics |

## 🏗️ Project Structure

```
app/
├── layout.jsx                 # Root layout with theme
├── page.jsx                   # Home page
├── globals.css                # Global styles & animations
├── auth/
│   ├── layout.jsx            # Auth page wrapper
│   ├── login/page.jsx        # Login page
│   ├── signup/page.jsx       # Signup page
│   ├── signup-success/page.jsx
│   ├── callback/route.js     # Auth callback
│   └── error/page.jsx
├── dashboard/page.jsx         # User dashboard
├── scanner/page.jsx           # Vulnerability scanner
├── reports/page.jsx           # Scan reports
├── services/page.jsx          # Services page
├── about/page.jsx             # About page
├── contact/page.jsx           # Contact page
└── profile/page.jsx           # User profile (protected)

components/
├── site-header.jsx            # Navigation header
├── site-footer.jsx            # Footer
├── auth-header.jsx            # Auth-aware header
├── dashboard-client.jsx       # Dashboard component
├── theme-provider.jsx         # Dark/light theme
├── mode-toggle.jsx            # Theme toggle
└── ui/                        # Shadcn UI components

lib/
├── supabase/
│   ├── client.js             # Browser client
│   ├── server.js             # Server client
│   └── middleware.js         # Auth middleware
├── storage.js                # LocalStorage utilities
├── scan.js                   # Scanning logic
└── scheduler.js              # Scheduled scans

scripts/
└── 001_init_supabase.sql     # Database migration
```

## 🔐 Authentication

### Signup
- Email validation
- Password strength checker (8+ chars, uppercase, lowercase, numbers)
- Automatic profile creation
- Confirmation required (configurable)

### Login
- Email/password authentication
- JWT token management
- Session persistence
- Auto-redirect to dashboard

### Protected Routes
- `/dashboard` - Requires authentication
- `/profile` - Requires authentication
- Automatic redirect to login for unauthenticated users

## 📊 Database Schema

### profiles
User information and settings
- `id` (UUID, PK)
- `email` (unique)
- `full_name`
- `company`, `phone`, `role`
- `created_at`, `updated_at`

### scans
Vulnerability scan results
- `id` (UUID, PK)
- `user_id` (FK)
- `target_url`
- `status` (pending, running, completed, failed)
- `findings` (JSONB array)
- `severity_distribution` (JSONB)
- `scan_duration_seconds`

### scheduled_scans
Recurring scan configurations
- `id` (UUID, PK)
- `user_id` (FK)
- `target_url`
- `frequency` (daily, weekly, monthly)
- `next_run_at`, `last_run_at`
- `enabled` (boolean)

## 🔒 Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Handled by Supabase
- **HTTPS Enforced**: Vercel handles SSL/TLS
- **Input Validation**: Client and server-side
- **CSRF Protection**: Built-in with Next.js

## ⚙️ Environment Variables

Required variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

## 📱 Features in Detail

### Scanner
- Real-time progress
- Terminal-style logs
- Simulate vulnerability detection
- Export results
- Schedule scans

### Dashboard
- Real-time statistics
- Scan history
- Create/Read/Update/Delete operations
- Severity breakdown
- Top targets visualization

### Reports
- View all scans
- Filter and sort
- Export as JSON
- Generate PDF
- Print reports

## 🎨 Design

- **Color Scheme**: Green primary (#85B563), Cyan accent (#CFF0F0)
- **Dark Mode**: Full dark theme support
- **Animations**: Smooth transitions and micro-interactions
- **Typography**: Geist Sans (UI), Geist Mono (code)
- **Responsive**: Mobile-first design approach

## 📈 Performance

- Next.js 15 optimizations
- Image optimization
- Code splitting
- Vercel Edge Network
- Database query optimization
- Browser caching

## 🚢 Deployment

### Vercel Deployment
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Auto-deploy on push

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed steps.

## 📝 Changelog

### v1.0.0 (Initial Release)
- Complete vulnerability scanner
- User authentication
- Dashboard with CRUD
- Reports and exports
- Scheduled scans
- Dark/light theme
- Mobile responsive

## 🤝 Contributing

This is a professional project. For modifications:
1. Create feature branch
2. Commit changes
3. Push to GitHub
4. Test before deploying to Vercel

## 📄 License

Professional use - All rights reserved © 2025 VulnScan

## 📞 Support

For deployment help, see DEPLOYMENT_GUIDE.md

---

**Ready to deploy?** Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) to get live on Vercel in minutes! 🚀
