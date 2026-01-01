"use client"

import { runAndSaveReport } from "./scan"

const KEY = "vs_schedules"

function now() {
  return new Date()
}

function addMinutes(d, mins) {
  return new Date(d.getTime() + mins * 60000)
}

export function calcNextRun(from, freq) {
  switch (freq) {
    case "15min":
      return addMinutes(from, 15)
    case "hourly":
      return addMinutes(from, 60)
    case "daily":
      return addMinutes(from, 60 * 24)
    case "weekly":
      return addMinutes(from, 60 * 24 * 7)
    default:
      return addMinutes(from, 60 * 24)
  }
}

export function getSchedules() {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveSchedules(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
  window.dispatchEvent(new StorageEvent("storage", { key: KEY }))
}

export function addSchedule(s) {
  const next = calcNextRun(now(), s.frequency).toISOString()
  const list = getSchedules()
  saveSchedules([{ ...s, nextRunISO: next }, ...list])
}

export function removeSchedule(id) {
  const list = getSchedules().filter((s) => s.id !== id)
  saveSchedules(list)
}

export function toggleSchedule(id, active) {
  const list = getSchedules().map((s) => (s.id === id ? { ...s, active } : s))
  saveSchedules(list)
}

export function updateSchedule(id, updates) {
  const list = getSchedules().map((s) => (s.id === id ? { ...s, ...updates } : s))
  saveSchedules(list)
}

export function tickSchedules() {
  const t = now()
  const list = getSchedules()
  let changed = false
  for (let i = 0; i < list.length; i++) {
    const s = list[i]
    if (!s.active) continue
    if (new Date(s.nextRunISO) <= t) {
      runAndSaveReport(s.url)
      const next = calcNextRun(t, s.frequency).toISOString()
      list[i] = { ...s, lastRunISO: t.toISOString(), nextRunISO: next }
      changed = true
    }
  }
  if (changed) saveSchedules(list)
}
