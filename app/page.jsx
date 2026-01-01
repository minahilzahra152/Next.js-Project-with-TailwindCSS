import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Lock, BarChart3, Clock, FileText, Globe, Server, Bug } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Scanning",
      text: "Watch terminal-style output stream as findings appear instantly.",
    },
    { icon: FileText, title: "Detailed Reports", text: "Export JSON, generate PDFs, sort and filter all findings." },
    { icon: Lock, title: "Secure & Private", text: "Your data stays in your control with local-first architecture." },
  ]

  const services = [
    { icon: Globe, title: "Web App Scanning", desc: "Comprehensive scanning for XSS, SQL injection, CSRF and more." },
    { icon: Server, title: "API Security", desc: "Test REST and GraphQL endpoints for authentication flaws." },
    {
      icon: Bug,
      title: "Vulnerability Assessment",
      desc: "Identify and prioritize security weaknesses in your stack.",
    },
  ]

  return (
    <div className="relative">
      {/* Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary)_1px,transparent_1px)] [background-size:20px_20px] opacity-10 animate-in fade-in-50"
      />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6 animate-in slide-in-from-bottom-2">
              <Shield className="w-4 h-4" />
              Professional Security Scanner
            </div>
            <h1 className="text-pretty text-4xl md:text-6xl font-bold leading-tight animate-in slide-in-from-bottom-3">
              Find vulnerabilities <span className="text-primary">before hackers do.</span>
            </h1>
            <p className="text-muted-foreground mt-6 text-lg md:text-xl animate-in slide-in-from-bottom-4">
              Run comprehensive security scans, generate detailed reports, and protect your applications with our
              professional vulnerability scanner.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-in slide-in-from-bottom-5">
              <Link href="/scanner">
                <Button size="lg" className="font-mono text-lg px-8">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline" className="font-mono text-lg px-8 bg-transparent">
                  Create Account
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground animate-in slide-in-from-bottom-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Scan in seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span>Real-time analytics</span>
              </div>
            </div>
          </div>
          <div className="relative animate-in fade-in-50 slide-in-from-right-4">
            <div className="rounded-lg border border-border/50 bg-card p-6 shadow-2xl shadow-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">vulnscan-terminal</span>
              </div>
              <div className="bg-secondary/30 rounded-md p-4 font-mono text-xs leading-6 max-h-64 overflow-auto">
                <p className="text-primary caret">$ vulnscan --target https://example.com</p>
                <p className="text-muted-foreground">[INFO] Initializing scan engine...</p>
                <p className="text-muted-foreground">[INFO] Crawling endpoints...</p>
                <p className="text-yellow-500">[WARN] Found: Medium risk - Outdated headers</p>
                <p className="text-destructive">[CRIT] Found: High risk - SQL Injection in /api/users</p>
                <p className="text-muted-foreground">[INFO] Testing authentication...</p>
                <p className="text-green-500">[DONE] Scan complete: 3 issues found</p>
                <p className="text-primary">[SAVE] Report saved: report-2025-01-15.json</p>
              </div>
            </div>
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose VulnScan?</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Professional-grade security scanning with an intuitive interface designed for developers and security teams.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Card
              key={f.title}
              className="group hover:border-primary/50 transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-2"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-muted-foreground mt-2">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="container mx-auto px-4 py-16 bg-secondary/10 rounded-3xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="text-muted-foreground mt-3">Comprehensive security solutions for modern applications.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hacker-glow animate-in fade-in-50"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <s.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services">
            <Button variant="outline" className="bg-transparent">
              View All Services
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-4 text-center">
          {[
            { value: "10K+", label: "Scans Completed" },
            { value: "500+", label: "Vulnerabilities Found" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={stat.label} className="animate-in fade-in-50" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
              <div className="text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to secure your applications?</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Join thousands of developers and security professionals who trust VulnScan for their security needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="font-mono">
                Get Started Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
