"use client"

import { useEffect } from "react"

// The site is now a single page; this route redirects to the matching section.
export default function AppointmentsRedirect() {
  useEffect(() => {
    window.location.replace("/#appointments")
  }, [])
  return null
}
