"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 mt-16">
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-10 md:py-14 animate-in fade-in-50">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-pretty text-2xl md:text-3xl font-semibold">
              Secure your applications with professional vulnerability scanning.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-prose">
              Schedule scans, export reports, and visualize risk trends. Protect your infrastructure today.
            </p>
          </div>
          <form
            className="grid gap-3 md:justify-self-end w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault()
              alert("Subscribed!")
            }}
          >
            <div className="grid gap-2">
              <label htmlFor="newsletter" className="text-sm">
                Subscribe to security updates
              </label>
              <div className="flex gap-2">
                <Input id="newsletter" type="email" placeholder="you@company.com" className="font-mono" />
                <Button type="submit" className="font-mono">
                  Join
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Get notified about new vulnerabilities and features.</p>
            </div>
          </form>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-secondary/20 border-y border-border/40">
        <div className="container mx-auto px-4 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="animate-in slide-in-from-bottom-2">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Product
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-foreground transition-colors" href="/scanner">
                  Scanner
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" href="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" href="/reports">
                  Reports
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" href="/services">
                  Services
                </Link>
              </li>
            </ul>
          </div>
          <div className="animate-in slide-in-from-bottom-3">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-foreground transition-colors" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <a className="hover:text-foreground transition-colors" href="#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition-colors" href="#docs">
                  Documentation
                </a>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="animate-in slide-in-from-bottom-4">
            <h3 className="text-sm font-semibold">Compliance</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="hover:text-foreground transition-colors">SOC 2 Type II</span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors">ISO 27001</span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors">OWASP Top 10</span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors">CWE/CAPEC</span>
              </li>
            </ul>
          </div>
          <div className="animate-in slide-in-from-bottom-5">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@vulnscan.io
              </li>
              <li>Security: security@vulnscan.io</li>
              <li>Hours: Mon-Fri, 9-5 UTC</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-2 items-center justify-between">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} VulnScan. All rights reserved.
        </p>
        <p className="text-muted-foreground text-xs">Professional security assessment and vulnerability management.</p>
      </div>
    </footer>
  )
}
