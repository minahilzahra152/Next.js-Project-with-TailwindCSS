"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useReports, deleteReport, updateReport } from "@/lib/storage"
import {
  Shield,
  Zap,
  FileText,
  Clock,
  Trash2,
  Edit2,
  Plus,
  Target,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
  Settings,
  LogOut,
  BarChart3,
  UserPlus,
  LogIn,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DashboardClient({ user, profile, initialScans, scheduledScans }) {
  const { reports, refresh } = useReports()
  const router = useRouter()
  const [editingReport, setEditingReport] = useState(null)
  const [editUrl, setEditUrl] = useState("")

  const isLoggedIn = !!user

  // Logout function
  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    localStorage.removeItem("auth_token")
    router.push("/auth/login")
    router.refresh()
  }

  // CRUD Operations
  const handleDeleteReport = (id) => {
    if (confirm("Are you sure you want to delete this report?")) {
      deleteReport(id)
      refresh()
    }
  }

  const handleEditReport = (report) => {
    setEditingReport(report)
    setEditUrl(report.url)
  }

  const handleSaveEdit = () => {
    if (editingReport && editUrl) {
      updateReport(editingReport.id, { url: editUrl })
      setEditingReport(null)
      setEditUrl("")
      refresh()
    }
  }

  // Dashboard Analytics
  const totalFindings = useMemo(() => {
    return reports.reduce((acc, r) => acc + (r.findings?.length || 0), 0)
  }, [reports])

  const criticalCount = useMemo(() => {
    return reports.reduce((acc, r) => acc + (r.findings?.filter((f) => f.severity === "Critical").length || 0), 0)
  }, [reports])

  const highCount = useMemo(() => {
    return reports.reduce((acc, r) => acc + (r.findings?.filter((f) => f.severity === "High").length || 0), 0)
  }, [reports])

  const mediumCount = useMemo(() => {
    return reports.reduce((acc, r) => acc + (r.findings?.filter((f) => f.severity === "Medium").length || 0), 0)
  }, [reports])

  const lowCount = useMemo(() => {
    return reports.reduce((acc, r) => acc + (r.findings?.filter((f) => f.severity === "Low").length || 0), 0)
  }, [reports])

  const avgScore = useMemo(() => {
    return reports.length ? Math.round(reports.reduce((a, r) => a + (r.score ?? 0), 0) / reports.length) : 0
  }, [reports])

  const topTargets = useMemo(() => {
    if (!reports || reports.length === 0) return []
    const data = {}
    reports.forEach((r) => {
      if (!r.url) return
      if (!data[r.url]) {
        data[r.url] = { url: r.url, crit: 0, high: 0, total: 0 }
      }
      if (r.findings && Array.isArray(r.findings)) {
        r.findings.forEach((f) => {
          if (f.severity === "Critical") data[r.url].crit++
          if (f.severity === "High") data[r.url].high++
          data[r.url].total++
        })
      }
    })
    return Object.values(data)
      .sort((a, b) => b.crit - a.crit || b.high - a.high || b.total - a.total)
      .slice(0, 5)
  }, [reports])

  const alerts = useMemo(() => {
    if (!reports || reports.length === 0) return []
    return reports
      .flatMap((r) =>
        (r.findings || []).map((f) => ({ url: r.url, sev: f.severity, title: f.title, ts: r.completedAt })),
      )
      .filter((a) => a.sev === "High" || a.sev === "Critical")
      .sort((a, b) => +new Date(b.ts || "") - +new Date(a.ts || ""))
      .slice(0, 6)
  }, [reports])

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Security Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            {isLoggedIn ? (
              <>
                Welcome back, <span className="text-foreground font-medium">{profile?.full_name || user?.email}</span>
              </>
            ) : (
              <>
                Welcome, <span className="text-foreground font-medium">Guest</span> -{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Login
                </Link>{" "}
                to save your data
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Badge variant="outline" className="text-primary border-primary">
                {profile?.role === "admin" ? "Administrator" : "User"}
              </Badge>
              <Link href="/profile">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Badge variant="outline" className="text-muted-foreground border-muted-foreground">
                Guest Mode
              </Badge>
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {!isLoggedIn && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">You are browsing as a guest</p>
                <p className="text-sm text-muted-foreground">
                  Create an account to save your scans and reports permanently
                </p>
              </div>
            </div>
            <Link href="/auth/signup">
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Create Free Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Link href="/scanner">
          <Card className="cursor-pointer hover:border-primary/50 transition-all group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">New Scan</h3>
                <p className="text-sm text-muted-foreground">Start scanning</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/reports">
          <Card className="cursor-pointer hover:border-primary/50 transition-all group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">View Reports</h3>
                <p className="text-sm text-muted-foreground">{reports.length} reports</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Card className="hover:border-primary/50 transition-all">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-semibold">Scheduled</h3>
              <p className="text-sm text-muted-foreground">{scheduledScans?.length || 0} active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-all">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold">Critical Issues</h3>
              <p className="text-sm text-muted-foreground">{criticalCount} found</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Scans</p>
                <p className="text-3xl font-bold">{reports.length}</p>
              </div>
              <Activity className="w-8 h-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Findings</p>
                <p className="text-3xl font-bold">{totalFindings}</p>
              </div>
              <Target className="w-8 h-8 text-accent opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-3xl font-bold">{avgScore}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Targets Scanned</p>
                <p className="text-3xl font-bold">{topTargets.length}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Severity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Severity Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">High</p>
                  <p className="text-2xl font-bold text-orange-500">{highCount}</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Medium</p>
                  <p className="text-2xl font-bold text-yellow-500">{mediumCount}</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Low</p>
                  <p className="text-2xl font-bold text-blue-500">{lowCount}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Recent Critical Alerts
          </CardTitle>
          <CardDescription>Latest high and critical severity findings</CardDescription>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-green-500" />
              <p>No critical alerts</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {alerts.map((a, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-secondary/20 border border-secondary/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{a.url}</p>
                  </div>
                  <Badge variant={a.sev === "Critical" ? "destructive" : "secondary"} className="flex-shrink-0">
                    {a.sev}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Recent Scans with CRUD */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Scan Reports</CardTitle>
            <CardDescription>Manage your vulnerability scan results</CardDescription>
          </div>
          <Link href="/scanner">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Scan
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary/30">
                <tr className="[&>th]:px-4 [&>th]:py-3 text-left">
                  <th>Target URL</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Findings</th>
                  <th>Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted-foreground p-8">
                      <Target className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>No scans yet. Start your first scan!</p>
                      <Link href="/scanner">
                        <Button size="sm" className="mt-4">
                          Launch Scanner
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  reports.slice(0, 10).map((r) => (
                    <tr key={r.id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs max-w-[200px] truncate">{r.url}</td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="font-mono">
                          {r.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-mono">{r.score}</td>
                      <td className="px-4 py-3 font-mono">{r.findings?.length || 0}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {new Date(r.completedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleEditReport(r)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Report</DialogTitle>
                                <DialogDescription>Update the target URL for this scan report.</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 pt-4">
                                <Input
                                  value={editUrl}
                                  onChange={(e) => setEditUrl(e.target.value)}
                                  placeholder="Enter new URL"
                                />
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" onClick={() => setEditingReport(null)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleSaveEdit}>Save</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteReport(r.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {reports.length > 10 && (
            <div className="text-center mt-4">
              <Link href="/reports">
                <Button variant="outline" className="bg-transparent">
                  View All Reports
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Risky Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Top Risky Targets
          </CardTitle>
          <CardDescription>Targets with most critical and high severity findings</CardDescription>
        </CardHeader>
        <CardContent>
          {topTargets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No targets scanned yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topTargets.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg border bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-mono text-sm truncate max-w-[300px]">{t.url}</p>
                      <p className="text-xs text-muted-foreground">{t.total} total findings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {t.crit > 0 && <Badge variant="destructive">{t.crit} Critical</Badge>}
                    {t.high > 0 && <Badge className="bg-orange-500/20 text-orange-500">{t.high} High</Badge>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
