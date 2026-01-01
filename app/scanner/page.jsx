"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { saveReport } from "@/lib/storage"
import { nanoid } from "nanoid"
import { addSchedule, getSchedules, removeSchedule, toggleSchedule } from "@/lib/scheduler"
import { getRandomVulnerabilities } from "@/lib/mock-vulnerabilities"
import { Zap, Terminal, Clock, Target, Play, Pause, Trash2, Plus } from "lucide-react"

export default function ScannerPage() {
  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [logs, setLogs] = useState([])
  const [findings, setFindings] = useState([])
  const [schedules, setSchedules] = useState(() => getSchedules())
  const [freq, setFreq] = useState("daily")

  function appendLog(line) {
    setLogs((l) => [...l.slice(-199), `[${new Date().toLocaleTimeString()}] ${line}`])
  }

  async function startScan() {
    if (!url.trim()) return
    setIsScanning(true)
    setProgress(0)
    setFindings([])
    setLogs([])
    const start = Date.now()
    appendLog(`Initializing scan for ${url} ...`)

    const mockVulns = getRandomVulnerabilities(Math.floor(Math.random() * 4) + 2)

    for (let i = 1; i <= 100; i++) {
      await new Promise((r) => setTimeout(r, 24 + Math.random() * 20))
      setProgress(i)
      if (i % 7 === 0) appendLog("Checking common misconfigurations...")
      if (i % 13 === 0) appendLog("Testing input vectors and payloads...")
      if (i % 19 === 0) appendLog("Enumerating endpoints and assets...")
      if (i % 25 === 0) appendLog("Analyzing security headers...")
      if (i % 31 === 0) appendLog("Testing authentication mechanisms...")

      const vulnIndex = Math.floor((i / 100) * mockVulns.length)
      if (vulnIndex < mockVulns.length && i % 15 === 0 && i > 10) {
        const vuln = mockVulns[vulnIndex]
        const finding = {
          id: nanoid(),
          title: vuln.title,
          severity: vuln.severity,
          description: vuln.description,
          cwe: vuln.cwe,
          remediation: vuln.remediation,
        }
        setFindings((fs) => [finding, ...fs])
        appendLog(`Found ${finding.severity} finding: ${finding.title}`)
      }
    }

    const complete = Date.now()
    appendLog("Scan complete. Compiling report...")
    const finalFindings = [...findings]
    const score = Math.max(
      0,
      100 - finalFindings.reduce((acc, f) => acc + { Low: 5, Medium: 15, High: 30, Critical: 50 }[f.severity], 0),
    )
    const report = {
      id: nanoid(),
      url,
      startedAt: new Date(start).toISOString(),
      completedAt: new Date(complete).toISOString(),
      findings: finalFindings,
      score,
      status: "completed",
    }
    saveReport(report)
    appendLog("Report saved successfully.")
    setIsScanning(false)
  }

  function refreshSchedules() {
    setSchedules(getSchedules())
  }

  function handleAddSchedule() {
    if (!url.trim()) return
    addSchedule({ id: nanoid(), url, frequency: freq, active: true })
    refreshSchedules()
  }

  const sevColor = {
    Low: "bg-muted text-foreground",
    Medium: "bg-accent text-accent-foreground",
    High: "bg-destructive text-destructive-foreground",
    Critical: "bg-primary text-primary-foreground",
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Target className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Vulnerability Scanner</h1>
          <p className="text-muted-foreground">Scan targets for security vulnerabilities</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Quick Scan
              </span>
              <Badge variant="outline">Local-only</Badge>
            </CardTitle>
            <CardDescription>Enter a target URL to start scanning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                inputMode="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="font-mono"
              />
              <Button onClick={startScan} disabled={isScanning} className="font-mono">
                {isScanning ? "Scanning..." : "Start"}
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span className="font-mono">{progress}%</span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-2" />
                {isScanning && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="h-full w-1 bg-primary/60 animate-pulse"
                      style={{ transform: `translateX(${progress}%)` }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Findings ({findings.length})</h3>
              <div className="rounded-md border border-border/50 max-h-60 overflow-auto p-2">
                {findings.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">No findings yet. Start a scan.</p>
                ) : (
                  <ul className="space-y-2">
                    {findings.map((f) => (
                      <li
                        key={f.id}
                        className="flex items-start justify-between gap-3 p-2 rounded-lg bg-secondary/20 animate-in fade-in-50"
                      >
                        <div>
                          <p className="font-medium text-sm">{f.title}</p>
                          <p className="text-xs text-muted-foreground">{f.cwe}</p>
                        </div>
                        <Badge className={sevColor[f.severity]}>{f.severity}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </CardContent>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 -bottom-10 h-24 bg-[linear-gradient(90deg,transparent,theme(colors.primary/.2),transparent)] animate-[shimmer_2.4s_infinite]"
          />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-accent" />
              Real-time Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border/50 bg-secondary/30 p-3 max-h-[320px] overflow-auto font-mono text-xs leading-6">
              {logs.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">Logs will appear here...</p>
              ) : (
                logs.map((line, idx) => (
                  <p key={idx} className="animate-in fade-in-50">
                    {line}
                  </p>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Scans */}
      <Card className="hacker-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            Scheduled Scans
          </CardTitle>
          <CardDescription>Set up recurring vulnerability scans</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <Input
              inputMode="url"
              placeholder="https://target.example"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="font-mono"
            />
            <select
              className="rounded-md border bg-background px-3 py-2 text-sm"
              value={freq}
              onChange={(e) => setFreq(e.target.value)}
            >
              <option value="15min">Every 15 minutes</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <Button onClick={handleAddSchedule} className="font-mono">
              <Plus className="w-4 h-4 mr-2" />
              Add Schedule
            </Button>
          </div>

          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary/30">
                <tr className="[&>th]:px-4 [&>th]:py-3 text-left">
                  <th>URL</th>
                  <th>Frequency</th>
                  <th>Next Run</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted-foreground p-6">
                      No scheduled scans. Add one above.
                    </td>
                  </tr>
                ) : (
                  schedules.map((s) => (
                    <tr key={s.id} className="border-t animate-in fade-in-50">
                      <td className="px-4 py-3 font-mono text-xs max-w-[200px] truncate">{s.url}</td>
                      <td className="px-4 py-3 capitalize">{s.frequency}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(s.nextRunISO).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={s.active ? "default" : "secondary"}>{s.active ? "Active" : "Paused"}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toggleSchedule(s.id, !s.active)
                            refreshSchedules()
                          }}
                        >
                          {s.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            removeSchedule(s.id)
                            refreshSchedules()
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
