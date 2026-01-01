"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Lock, Mail, User, AlertCircle, Eye, EyeOff, CheckCircle2 } from "lucide-react"

// Client-side validation function
function validateRegistrationForm(fullName, email, password, confirmPassword) {
  const errors = {}

  if (!fullName.trim()) {
    errors.fullName = "Full name is required"
  } else if (fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters"
  }

  if (!email.trim()) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email address"
  }

  if (!password) {
    errors.password = "Password is required"
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters"
  } else if (!/(?=.*[a-z])/.test(password)) {
    errors.password = "Password must contain lowercase letters"
  } else if (!/(?=.*[A-Z])/.test(password)) {
    errors.password = "Password must contain uppercase letters"
  } else if (!/(?=.*\d)/.test(password)) {
    errors.password = "Password must contain numbers"
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required"
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }

  return errors
}

// Password strength checker
function getPasswordStrength(password) {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++
  return strength
}

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const passwordStrength = getPasswordStrength(password)
  const strengthColors = ["bg-destructive", "bg-destructive", "bg-yellow-500", "bg-green-500", "bg-green-600"]
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"]

  const handleSignUp = async (e) => {
    e.preventDefault()

    // Client-side validation
    const validationErrors = validateRegistrationForm(fullName, email, password, confirmPassword)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    const supabase = createClient()

    try {
      // Server-side validation & saving to database via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (authError) throw authError

      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (error) {
      const errorMessage = error.message || "An error occurred during registration"
      setErrors({ submit: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md border-primary/20 shadow-xl shadow-primary/10 backdrop-blur-sm animate-in fade-in-50 slide-in-from-bottom-4">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold text-green-500">Account Created!</h2>
            <p className="text-muted-foreground">Redirecting to login page...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md border-primary/20 shadow-xl shadow-primary/10 backdrop-blur-sm animate-in fade-in-50 slide-in-from-bottom-4">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Lock className="w-6 h-6 text-primary" />
          Create Account
        </CardTitle>
        <CardDescription>Sign up to start scanning for vulnerabilities</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={errors.fullName ? "border-destructive focus:ring-destructive" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-destructive focus:ring-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-destructive focus:ring-destructive pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-secondary"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Strength: {strengthLabels[passwordStrength - 1] || "Very Weak"}
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "border-destructive focus:ring-destructive" : ""}
            />
            {confirmPassword && password === confirmPassword && (
              <p className="text-sm text-green-500 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Passwords match
              </p>
            )}
            {errors.confirmPassword && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {errors.submit && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2 animate-in fade-in-50">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{errors.submit}</p>
            </div>
          )}

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
