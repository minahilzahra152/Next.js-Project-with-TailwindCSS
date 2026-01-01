"use client"

import { useEffect } from "react"
import { tickSchedules } from "@/lib/scheduler"

export function SchedulerDaemon() {
  useEffect(() => {
    tickSchedules()
    const id = setInterval(() => tickSchedules(), 60000)
    return () => clearInterval(id)
  }, [])
  return null
}
