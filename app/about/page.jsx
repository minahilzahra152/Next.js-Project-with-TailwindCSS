import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Users, Globe, Zap, Eye, Heart, CheckCircle2, Github, Twitter, Linkedin } from "lucide-react"

const team = [
  { name: "Alex Chen", role: "CEO & Founder", avatar: "/professional-man-headshot.png" },
  { name: "Sarah Johnson", role: "CTO", avatar: "/professional-woman-headshot.png" },
  { name: "Michael Park", role: "Lead Security Engineer", avatar: "/asian-man-headshot.png" },
  { name: "Emily Davis", role: "Head of Product", avatar: "/professional-blonde-woman-headshot.png" },
]

const values = [
  { icon: Shield, title: "Security First", desc: "We prioritize security in everything we build" },
  { icon: Eye, title: "Transparency", desc: "Open and honest about our methods and findings" },
  { icon: Zap, title: "Innovation", desc: "Constantly evolving to stay ahead of threats" },
  { icon: Heart, title: "Customer Focus", desc: "Your success is our success" },
]

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "10K+", label: "Scans Completed" },
  { value: "500+", label: "Happy Clients" },
  { value: "99.9%", label: "Uptime" },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
          <Shield className="w-4 h-4" />
          About VulnScan
        </div>
        <h1 className="text-4xl md:text-5xl font-bold animate-in slide-in-from-bottom-2">
          Protecting Digital Assets Since 2020
        </h1>
        <p className="text-muted-foreground mt-6 text-lg animate-in slide-in-from-bottom-3">
          We are a team of passionate security professionals dedicated to making the internet safer for everyone. Our
          mission is to provide accessible, powerful security tools that help organizations identify and fix
          vulnerabilities before they can be exploited.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={s.label} className="text-center animate-in fade-in-50" style={{ animationDelay: `${i * 100}ms` }}>
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-primary">{s.value}</div>
              <div className="text-muted-foreground mt-2">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Mission */}
      <section className="grid gap-12 md:grid-cols-2 items-center">
        <div className="animate-in slide-in-from-left-4">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            We believe that every organization, regardless of size, deserves access to enterprise-grade security tools.
            Our platform democratizes vulnerability scanning, making it accessible to startups, SMBs, and large
            enterprises alike.
          </p>
          <p className="text-muted-foreground mt-4">
            By combining cutting-edge technology with intuitive design, we empower security teams and developers to
            identify and remediate vulnerabilities quickly and efficiently.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Comprehensive vulnerability detection",
              "Real-time threat analysis",
              "Actionable remediation guidance",
              "Continuous monitoring and alerts",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-secondary/20 rounded-2xl p-8 animate-in slide-in-from-right-4">
          <img src="/cybersecurity-team.png" alt="Security team" className="rounded-lg" />
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/10 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <p className="text-muted-foreground mt-2">The principles that guide everything we do</p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="text-center p-6 rounded-xl bg-card border border-border/50 animate-in fade-in-50"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{v.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="text-muted-foreground mt-2">The experts behind VulnScan</p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {team.map((t, i) => (
            <Card
              key={t.name}
              className="text-center group hover:border-primary/50 transition-all animate-in fade-in-50"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="pt-6">
                <img
                  src={t.avatar || "/placeholder.svg"}
                  alt={t.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.role}</p>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-3xl font-bold">Find Us</h2>
          <p className="text-muted-foreground mt-4">
            Our headquarters is located in the heart of San Francisco's tech district, but our team works remotely
            across the globe to provide 24/7 support and development.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Headquarters</p>
                <p className="text-sm text-muted-foreground">123 Security Lane, San Francisco, CA 94102</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Remote Team</p>
                <p className="text-sm text-muted-foreground">Team members across 15+ countries</p>
              </div>
            </div>
          </div>
          <Link href="/contact" className="inline-block mt-6">
            <Button>Contact Us</Button>
          </Link>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border/50">
          <img src="/san-francisco-office-building-map.jpg" alt="Office location" className="w-full h-[300px] object-cover" />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "Does VulnScan perform real attacks?",
              a: "No. Our scanner simulates vulnerability checks without causing harm to your systems. All tests are non-destructive.",
            },
            {
              q: "How often should I scan my applications?",
              a: "We recommend scanning after every deployment and at least weekly for production systems.",
            },
            {
              q: "Can I export my scan results?",
              a: "Yes! You can export reports in JSON format or print them as PDFs for compliance documentation.",
            },
            {
              q: "Is my data secure?",
              a: "Absolutely. We use industry-standard encryption and never store your sensitive data longer than necessary.",
            },
          ].map((faq, i) => (
            <details key={i} className="rounded-lg border border-border/50 px-4 py-3 group">
              <summary className="cursor-pointer font-medium flex items-center justify-between">
                {faq.q}
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-muted-foreground mt-3 text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
