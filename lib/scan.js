import { nanoid } from "nanoid"
import { saveReport } from "./storage"
import { getRandomVulnerabilities } from "./mock-vulnerabilities"

const SEVERITIES = ["Low", "Medium", "High", "Critical"]
const TYPES = ["XSS", "SQL Injection", "CSRF", "Open Redirect", "Sensitive Info", "SSRF", "IDOR", "RCE"]

export function generateReport(url) {
  const started = new Date()
  const completed = new Date(started.getTime() + 2000)

  const mockVulns = getRandomVulnerabilities(Math.floor(Math.random() * 4) + 1)
  const findings = mockVulns.map((vuln) => ({
    id: nanoid(),
    title: vuln.title,
    severity: vuln.severity,
    description: vuln.description,
    cwe: vuln.cwe,
    remediation: vuln.remediation,
  }))

  const score = Math.max(
    0,
    100 - findings.reduce((acc, f) => acc + { Low: 5, Medium: 15, High: 30, Critical: 50 }[f.severity], 0),
  )

  return {
    id: nanoid(),
    url,
    startedAt: started.toISOString(),
    completedAt: completed.toISOString(),
    findings,
    score,
    status: "completed",
  }
}

export function runAndSaveReport(url) {
  const report = generateReport(url)
  saveReport(report)
  return report
}
