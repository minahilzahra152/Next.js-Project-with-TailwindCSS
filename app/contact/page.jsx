"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Shield,
  Headphones,
  Building,
  Globe,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

const contactInfo = [
  { icon: Mail, title: "Email", value: "support@vulnscan.io", desc: "We respond within 24 hours" },
  { icon: Phone, title: "Phone", value: "+1 (555) 123-4567", desc: "Mon-Fri, 9am-5pm PST" },
  { icon: MapPin, title: "Address", value: "123 Security Lane, SF, CA 94102", desc: "Headquarters" },
  { icon: Clock, title: "Hours", value: "24/7 Support", desc: "For enterprise customers" },
]

const departments = [
  { icon: Headphones, title: "General Support", email: "support@vulnscan.io", desc: "For general inquiries and help" },
  {
    icon: Shield,
    title: "Security Team",
    email: "security@vulnscan.io",
    desc: "Report vulnerabilities or security concerns",
  },
  { icon: Building, title: "Enterprise Sales", email: "sales@vulnscan.io", desc: "For business and enterprise plans" },
  {
    icon: Globe,
    title: "Partnerships",
    email: "partners@vulnscan.io",
    desc: "Collaboration and integration inquiries",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    setErrors({})

    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
          <MessageSquare className="w-4 h-4" />
          Get in Touch
        </div>
        <h1 className="text-4xl md:text-5xl font-bold animate-in slide-in-from-bottom-2">Contact Us</h1>
        <p className="text-muted-foreground mt-4 text-lg animate-in slide-in-from-bottom-3">
          Have questions about our security services? Need help with your account? Our team is here to help you protect
          your digital assets.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="grid gap-4 md:grid-cols-4">
        {contactInfo.map((c, i) => (
          <Card
            key={c.title}
            className="text-center hover:border-primary/50 transition-all animate-in fade-in-50"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <c.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-primary mt-1">{c.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Main Content */}
      <section className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Send us a Message
            </CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-8 animate-in fade-in-50">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Message Sent!</h3>
                <p className="text-muted-foreground mt-2">
                  Thank you for contacting us. We'll respond within 24 hours.
                </p>
                <Button
                  className="mt-6"
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: "", email: "", subject: "", category: "General", message: "" })
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? "border-destructive" : ""}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    >
                      <option>General</option>
                      <option>Technical Support</option>
                      <option>Sales</option>
                      <option>Security</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Departments */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Contact by Department</h2>
            <p className="text-muted-foreground mt-2">Reach out directly to the right team for faster assistance.</p>
          </div>
          <div className="space-y-4">
            {departments.map((d, i) => (
              <Card
                key={d.title}
                className="hover:border-primary/50 transition-all animate-in fade-in-50"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <d.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{d.title}</h3>
                    <p className="text-sm text-muted-foreground">{d.desc}</p>
                    <a href={`mailto:${d.email}`} className="text-sm text-primary hover:underline mt-1 inline-block">
                      {d.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map */}
          <Card>
            <CardContent className="p-0 overflow-hidden rounded-lg">
              <img
                src="/san-francisco-map-location-marker.jpg"
                alt="Office location map"
                className="w-full h-[200px] object-cover"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/10 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Quick Answers</h2>
          <p className="text-muted-foreground mt-2">Common questions about contacting us</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
          {[
            {
              q: "What is your response time?",
              a: "We typically respond within 24 hours for general inquiries and within 4 hours for enterprise customers.",
            },
            {
              q: "Do you offer phone support?",
              a: "Phone support is available for enterprise customers. Others can reach us via email or the contact form.",
            },
            {
              q: "Can I schedule a demo?",
              a: "Yes! Contact our sales team at sales@vulnscan.io to schedule a personalized demo.",
            },
            {
              q: "How do I report a security issue?",
              a: "Please email security@vulnscan.io with details. We take all security reports seriously.",
            },
          ].map((faq, i) => (
            <div key={i} className="p-4 rounded-lg bg-card border border-border/50">
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="text-sm text-muted-foreground mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
