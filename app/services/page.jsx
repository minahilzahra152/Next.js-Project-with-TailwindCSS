import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Globe,
  Server,
  Shield,
  Lock,
  Eye,
  Zap,
  Network,
  Code,
  Database,
  Cloud,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Web Application Scanning",
    description:
      "Comprehensive security testing for web applications including OWASP Top 10 vulnerabilities, XSS, SQL injection, CSRF, and more.",
    features: ["OWASP Top 10 Coverage", "Automated XSS Detection", "SQL Injection Testing", "CSRF Protection Analysis"],
  },
  {
    icon: Server,
    title: "API Security Testing",
    description:
      "Thorough assessment of REST and GraphQL APIs for authentication flaws, authorization bypasses, and data exposure risks.",
    features: ["REST API Analysis", "GraphQL Security", "Authentication Testing", "Rate Limiting Checks"],
  },
  {
    icon: Network,
    title: "Network Vulnerability Assessment",
    description:
      "Identify vulnerabilities in your network infrastructure, including open ports, misconfigurations, and outdated services.",
    features: ["Port Scanning", "Service Detection", "Configuration Audit", "SSL/TLS Analysis"],
  },
  {
    icon: Cloud,
    title: "Cloud Security Audit",
    description:
      "Security assessment for cloud environments including AWS, Azure, and GCP configurations and permissions.",
    features: ["IAM Review", "S3 Bucket Security", "Network Security Groups", "Compliance Checks"],
  },
  {
    icon: Code,
    title: "Source Code Analysis",
    description:
      "Static analysis of source code to identify security vulnerabilities, coding errors, and potential backdoors.",
    features: ["SAST Integration", "Dependency Scanning", "Secret Detection", "Code Quality Metrics"],
  },
  {
    icon: Database,
    title: "Database Security",
    description: "Assessment of database configurations, access controls, and data protection mechanisms.",
    features: ["Access Control Review", "Encryption Analysis", "Query Injection Testing", "Backup Security"],
  },
]

const features = [
  { icon: Zap, title: "Fast Scanning", desc: "Get results in minutes, not hours" },
  { icon: Shield, title: "Comprehensive Coverage", desc: "Test for thousands of vulnerabilities" },
  { icon: Eye, title: "Detailed Reports", desc: "Actionable insights and remediation guidance" },
  { icon: Lock, title: "Secure by Design", desc: "Your data stays protected" },
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold animate-in slide-in-from-bottom-2">Security Services</h1>
        <p className="text-muted-foreground mt-4 text-lg animate-in slide-in-from-bottom-3">
          Comprehensive vulnerability assessment and security testing services to protect your digital assets.
        </p>
        <div className="flex justify-center gap-4 mt-8 animate-in slide-in-from-bottom-4">
          <Link href="/scanner">
            <Button size="lg" className="font-mono">
              <Zap className="w-4 h-4 mr-2" />
              Start Scanning
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="bg-transparent">
              Contact Sales
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-6 md:grid-cols-4">
        {features.map((f, i) => (
          <Card
            key={f.title}
            className="text-center animate-in fade-in-50 slide-in-from-bottom-2"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Services Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="text-muted-foreground mt-2">Choose the right security solution for your needs</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Card
              key={s.title}
              className="group hover:border-primary/50 transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-2"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary/10 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-2">Simple process, powerful results</p>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {[
            { step: "1", title: "Configure", desc: "Set up your target and scan parameters" },
            { step: "2", title: "Scan", desc: "Our engine tests for vulnerabilities" },
            { step: "3", title: "Analyze", desc: "Review detailed findings and reports" },
            { step: "4", title: "Remediate", desc: "Fix issues with guided recommendations" },
          ].map((s, i) => (
            <div key={s.step} className="text-center animate-in fade-in-50" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {s.step}
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-bold">Ready to Secure Your Applications?</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Start scanning today and discover vulnerabilities before attackers do. Our comprehensive suite of security
          tools helps you stay protected.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/auth/signup">
            <Button size="lg" className="font-mono">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
