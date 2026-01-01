import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vuln Scan - Professional Vulnerability Scanner",
  description:
    "Professional vulnerability scanning and security assessment tool. Find vulnerabilities before hackers do. Comprehensive security testing for web applications, APIs, and infrastructure.",
  keywords: ["vulnerability scanner", "security assessment", "penetration testing", "web security"],
  authors: [{ name: "Vuln Scan" }],
  creator: "Vuln Scan",
  publisher: "Vuln Scan",
  robots: "index, follow",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vuln-scan.vercel.app",
    siteName: "Vuln Scan",
    title: "Vuln Scan - Professional Vulnerability Scanner",
    description: "Find vulnerabilities before hackers do.",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Vuln Scan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vuln Scan - Professional Vulnerability Scanner",
    description: "Find vulnerabilities before hackers do.",
    images: ["/icon.svg"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <main className="min-h-[calc(100vh-8rem)]">{children}</main>
          <SiteFooter />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
