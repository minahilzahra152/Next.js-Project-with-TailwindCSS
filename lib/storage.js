"use client"

import { useEffect, useState } from "react"

const KEY = "vs_reports"

export function getReports() {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveReport(report) {
  const all = getReports()
  localStorage.setItem(KEY, JSON.stringify([report, ...all]))
  window.dispatchEvent(new StorageEvent("storage", { key: KEY }))
}

export function deleteReport(id) {
  const filtered = getReports().filter((r) => r.id !== id)
  localStorage.setItem(KEY, JSON.stringify(filtered))
  window.dispatchEvent(new StorageEvent("storage", { key: KEY }))
}

export function updateReport(id, updates) {
  const all = getReports()
  const updated = all.map((r) => (r.id === id ? { ...r, ...updates } : r))
  localStorage.setItem(KEY, JSON.stringify(updated))
  window.dispatchEvent(new StorageEvent("storage", { key: KEY }))
}

export function exportReportsJSON(reports) {
  const blob = new Blob([JSON.stringify(reports, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `vuln-reports-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function useReports() {
  const [reports, setReports] = useState([])
  useEffect(() => {
    setReports(getReports())
    const onChange = (e) => {
      if (e.key === KEY) setReports(getReports())
    }
    window.addEventListener("storage", onChange)
    return () => window.removeEventListener("storage", onChange)
  }, [])
  return { reports, refresh: () => setReports(getReports()) }
}
