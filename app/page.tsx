"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import "./ssl-redesign.css"

/* ============================================================
   Sixth Sense Legal — v2 cinematic single page
   Faithful port of "Sixth Sense Legal v2.dc.html" (Claude Design handoff).
   Same content, same black / white / red (#e50914) palette.
   ============================================================ */

const LOGO = "/images/logo-knockout.png"

type Card = {
  id: string
  abbr: string
  full: string
  accent: boolean
  children: string[] | null
}

const CARDS: Card[] = [
  { id: "tnpid", abbr: "TNPID", full: "Tamil Nadu Protection of Interests of Depositors Act", accent: false, children: null },
  { id: "drt", abbr: "DRT", full: "Debts Recovery Tribunal", accent: false, children: null },
  { id: "cci", abbr: "CCI", full: "Competition Commission of India", accent: false, children: null },
  { id: "cbi", abbr: "CBI", full: "Central Bureau of Investigation", accent: false, children: null },
  { id: "ed", abbr: "ED", full: "Enforcement Directorate", accent: true, children: ["FEMA", "PMLA", "FEOA"] },
  { id: "customs", abbr: "Customs", full: "Customs Act & Allied Matters", accent: false, children: null },
  { id: "cbic", abbr: "CBIC", full: "Central Board of Indirect Taxes & Customs", accent: false, children: null },
  { id: "eow", abbr: "EOW", full: "Economic Offences Wing", accent: false, children: null },
  { id: "tax", abbr: "Tax", full: "Tax Matters", accent: true, children: ["Income Tax", "GST"] },
  { id: "cofeposa", abbr: "COFEPOSA", full: "Conservation of Foreign Exchange & Prevention of Smuggling Activities Act", accent: false, children: null },
  { id: "ibc", abbr: "IBC", full: "Insolvency & Bankruptcy Code", accent: true, children: ["NCLT", "NCLAT"] },
]
const ROTS = [-5, 3, -3, 4, -4, 2, -2, 5, -3, 4, -5]

type Job = {
  id: string
  title: string
  category: string
  experience: string
  location: string
  description: string
}

const JOBS: Job[] = [
  { id: "typist", title: "Typist", category: "Administrative", experience: "Entry Level", location: "Chennai", description: "Responsible for typing legal documents with high accuracy and attention to detail." },
  { id: "stenographer", title: "Stenographer", category: "Administrative", experience: "Entry Level", location: "Chennai", description: "Record and transcribe legal proceedings, meetings, and dictations with precision." },
  { id: "intern", title: "Intern", category: "Internship", experience: "Student", location: "Chennai", description: "Gain practical legal experience while assisting with research and administrative tasks." },
  { id: "junior-advocate", title: "Junior Advocate", category: "Legal", experience: "1-3 Years", location: "Chennai", description: "Assist senior advocates in case preparation, legal research, and client interactions." },
  { id: "advocate", title: "Advocate", category: "Legal", experience: "3-5 Years", location: "Chennai", description: "Handle cases independently, represent clients in court, and provide legal counsel." },
  { id: "consultant", title: "Consultant", category: "Legal", experience: "5-8 Years", location: "Chennai", description: "Provide specialized legal expertise in specific practice areas and advise clients." },
  { id: "senior-consultant", title: "Senior Consultant", category: "Legal", experience: "8+ Years", location: "Chennai", description: "Lead complex cases, mentor junior staff, and develop client relationships." },
]

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "expertise", label: "Practice" },
  { id: "approach", label: "Approach" },
  { id: "opportunities", label: "Careers" },
  { id: "appointments", label: "Book" },
  { id: "contact", label: "Contact" },
]

const mono = "'JetBrains Mono', monospace"
const display = "'Barlow Condensed', sans-serif"

export default function Home() {
  const [navOpen, setNavOpen] = useState(false)
  const [introMounted, setIntroMounted] = useState(true)
  const [flipped, setFlipped] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState("home")
  const [fCategory, setFCategory] = useState("all")
  const [fExperience, setFExperience] = useState("all")
  const [fLocation, setFLocation] = useState("all")

  const acceptingRef = useRef(false)
  const heroWordsRef = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const closeNav = () => setNavOpen(false)
  const openNav = () => setNavOpen(true)
  const toggleFlip = (id: string) =>
    setFlipped((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  // ---- disclaimer → logo reveal → site ----
  const acceptDisclaimer = () => {
    if (acceptingRef.current) return
    acceptingRef.current = true
    try { sessionStorage.setItem("ssl_disclaimer_accepted", "1") } catch {}
    const $ = (id: string) => document.getElementById(id)
    const card = $("intro-disclaimer"),
      reveal = $("intro-reveal"),
      glow = $("intro-glow2"),
      ov = $("intro-overlay"),
      nav = $("site-nav"),
      dots = $("spy-dots")
    if (card) {
      card.style.opacity = "0"
      card.style.transform = "translateY(-34px) scale(0.96)"
      card.style.pointerEvents = "none"
    }
    timers.current.push(
      setTimeout(() => {
        if (reveal) {
          reveal.style.opacity = "1"
          reveal.style.transform = "scale(1)"
        }
        if (glow) glow.style.opacity = "0.92"
      }, 220),
    )
    timers.current.push(
      setTimeout(() => {
        if (nav) nav.style.opacity = "1"
        if (dots) dots.style.opacity = "1"
        if (reveal) reveal.style.transform = "scale(1.12)"
        if (glow) glow.style.opacity = "0"
        if (ov) ov.style.opacity = "0"
      }, 2700),
    )
    timers.current.push(
      setTimeout(() => {
        document.documentElement.style.overflow = ""
        document.body.style.overflow = ""
        setIntroMounted(false)
      }, 3650),
    )
  }

  // ---- reveals, scroll-spy, scroll lock, hero parallax ----
  useEffect(() => {
    const reveal = (el: HTMLElement) => {
      el.style.opacity = "1"
      el.style.transform = "none"
      el.style.clipPath = "inset(0 0 0 0)"
    }
    let rio: IntersectionObserver | undefined
    let revealSafety: ReturnType<typeof setTimeout> | undefined
    try {
      const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]")]
      const vh0 = window.innerHeight || 800
      rio = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) {
              reveal(e.target as HTMLElement)
              rio!.unobserve(e.target)
            }
          })
        },
        { threshold: 0.1 },
      )
      els.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < vh0 * 0.9) return
        const type = el.getAttribute("data-reveal")
        const d = parseInt(el.getAttribute("data-d") || "0", 10)
        const dl = d / 1000 + "s"
        el.style.transition =
          "opacity .9s cubic-bezier(.16,1,.3,1) " + dl +
          ", transform 1s cubic-bezier(.16,1,.3,1) " + dl +
          ", clip-path 1s cubic-bezier(.16,1,.3,1) " + dl
        el.style.opacity = "0"
        if (type === "mask") {
          el.style.clipPath = "inset(0 0 110% 0)"
          el.style.transform = "translateY(10px)"
        } else {
          el.style.transform = "translateY(42px)"
        }
        rio!.observe(el)
      })
      revealSafety = setTimeout(() => els.forEach(reveal), 2000)
    } catch {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.style.opacity = "1"
        el.style.transform = "none"
        el.style.clipPath = "none"
      })
    }

    let spy: IntersectionObserver | undefined
    try {
      spy = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) setActiveSection((e.target as HTMLElement).id)
          })
        },
        { rootMargin: "-45% 0px -45% 0px" },
      )
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id)
        if (el) spy!.observe(el)
      })
    } catch {}

    // lock scroll while the intro gate is mounted
    try {
      window.scrollTo(0, 0)
      document.documentElement.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
    } catch {}

    const words = heroWordsRef.current
    const onMove = (ev: PointerEvent) => {
      if (!words) return
      const w = window.innerWidth, h = window.innerHeight
      const dx = (ev.clientX - w / 2) / w, dy = (ev.clientY - h / 2) / h
      words.style.transform = "translate(" + dx * -18 + "px, " + dy * -12 + "px)"
    }
    window.addEventListener("pointermove", onMove)

    return () => {
      rio?.disconnect()
      spy?.disconnect()
      if (revealSafety) clearTimeout(revealSafety)
      timers.current.forEach(clearTimeout)
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
      window.removeEventListener("pointermove", onMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredJobs = JOBS.filter(
    (j) =>
      (fCategory === "all" || j.category === fCategory) &&
      (fExperience === "all" || j.experience === fExperience) &&
      (fLocation === "all" || j.location === fLocation),
  )

  const year = new Date().getFullYear()

  return (
    <div
      className="ssl-root"
      style={{
        position: "relative",
        background: "#000",
        minHeight: "100vh",
        fontFamily: "'Montserrat', sans-serif",
        overflowX: "clip",
      }}
    >
      {/* grain + glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.045,
          mixBlendMode: "overlay",
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "-32vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "95vw",
          height: "80vh",
          pointerEvents: "none",
          zIndex: 0,
          background: "radial-gradient(ellipse at center,rgba(229,9,20,0.12),transparent 60%)",
        }}
      />

      {/* ============ NAV ============ */}
      <nav
        id="site-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px clamp(20px,5vw,64px)",
          background: "rgba(0,0,0,0.42)",
          opacity: 0,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <a href="#home" onClick={closeNav} style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e50914", boxShadow: "0 0 10px rgba(229,9,20,0.8)" }} />
          <span style={{ fontFamily: display, fontWeight: 600, fontSize: 18, letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" }}>
            Sixth Sense Legal
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a
            href="#appointments"
            className="ssl-pill-light"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "9px 20px",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 999,
              fontFamily: mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Book ↗
          </a>
          <button
            onClick={openNav}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontFamily: mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "8px 4px",
            }}
          >
            Menu
            <span style={{ display: "inline-flex", flexDirection: "column", gap: 4 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "#fff" }} />
              <span style={{ display: "block", width: 22, height: 1.5, background: "#fff" }} />
            </span>
          </button>
        </div>
      </nav>

      {/* ============ SCROLL-SPY DOTS ============ */}
      <div
        id="spy-dots"
        style={{
          position: "fixed",
          right: "clamp(12px,2vw,26px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 38,
          display: "flex",
          flexDirection: "column",
          gap: 15,
          alignItems: "flex-end",
          opacity: 0,
        }}
      >
        {SECTIONS.map((s) => {
          const active = activeSection === s.id
          return (
            <a key={s.id} href={`#${s.id}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: active ? "rgba(255,255,255,0.7)" : "transparent",
                  transition: "color .3s",
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: active ? "#e50914" : "transparent",
                  border: `1px solid ${active ? "#e50914" : "rgba(255,255,255,0.4)"}`,
                  transition: "all .35s cubic-bezier(.16,1,.3,1)",
                }}
              />
            </a>
          )
        })}
      </div>

      {/* ============ OVERLAY MENU ============ */}
      {navOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            background: "rgba(0,0,0,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px clamp(20px,5vw,64px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span style={{ fontFamily: display, fontWeight: 600, fontSize: 18, letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" }}>
              Sixth Sense Legal
            </span>
            <button
              onClick={closeNav}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                fontFamily: mono,
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                padding: 8,
              }}
            >
              Close ✕
            </button>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(24px,6vw,80px)", gap: 4 }}>
            {[
              ["#home", "Home"],
              ["#about", "About"],
              ["#expertise", "Expertise"],
              ["#opportunities", "Opportunities"],
              ["#appointments", "Appointments"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={closeNav}
                className="ssl-menu-link"
                style={{
                  fontFamily: display,
                  fontWeight: 700,
                  fontSize: "clamp(2.4rem,8vw,5rem)",
                  lineHeight: 1.04,
                  textTransform: "uppercase",
                  color: "#fff",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                {label}
              </a>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 28,
              padding: "clamp(20px,5vw,64px)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              fontFamily: mono,
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span>Prince Towers, College Road, Nungambakkam, Chennai</span>
            <span>044-4526-6510</span>
            <span>sixthsenselegal@gmail.com</span>
          </div>
        </div>
      )}

      {/* ============ INTRO GATE: DISCLAIMER → LOGO REVEAL → SITE ============ */}
      {introMounted && (
        <div
          id="intro-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            opacity: 1,
            transition: "opacity .9s ease",
          }}
        >
          {/* red glow behind logo */}
          <div
            id="intro-glow2"
            style={{
              position: "absolute",
              width: "84vw",
              height: "84vh",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(circle,rgba(229,9,20,0.24),transparent 60%)",
              opacity: 0,
              transition: "opacity 1s ease",
              pointerEvents: "none",
            }}
          />

          {/* DISCLAIMER STAGE */}
          <div
            id="intro-disclaimer"
            style={{
              position: "absolute",
              maxWidth: 680,
              width: "calc(100% - 40px)",
              maxHeight: "calc(100vh - 48px)",
              overflowY: "auto",
              padding: "clamp(26px,3.6vw,44px)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 14,
              background: "rgba(12,12,12,0.88)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.65)",
              opacity: 1,
              transform: "translateY(0) scale(1)",
              transition: "opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 24 }}>
              <img
                src={LOGO}
                alt="Sixth Sense Legal"
                style={{ width: "clamp(116px,17vw,150px)", height: "auto", filter: "drop-shadow(0 0 30px rgba(229,9,20,0.3))", marginBottom: 16 }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e50914", boxShadow: "0 0 10px rgba(229,9,20,0.7)" }} />
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                  Disclaimer · Bar Council of India
                </span>
              </div>
            </div>
            <h2
              style={{
                fontFamily: display,
                fontWeight: 700,
                fontSize: "clamp(1.9rem,4.6vw,2.9rem)",
                lineHeight: 0.96,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: "#fff",
                margin: "0 0 16px",
                textAlign: "center",
              }}
            >
              Before You Enter
            </h2>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.62)",
                margin: "0 auto 20px",
                textAlign: "center",
                maxWidth: 540,
              }}
            >
              The rules of the Bar Council of India prohibit law firms from advertising and soliciting work. By proceeding, you acknowledge that:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 28, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
              {[
                "You are seeking information about Sixth Sense Legal of your own accord; there has been no solicitation, invitation, or inducement of any kind from us or our members.",
                "Nothing on this website constitutes legal advice or creates a lawyer–client relationship.",
                "Sixth Sense Legal is not liable for any action taken in reliance on the information provided here.",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, width: 14, height: 1.5, background: "#e50914", marginTop: 9 }} />
                  <span style={{ fontSize: 13.5, lineHeight: 1.65, color: "rgba(255,255,255,0.7)" }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={acceptDisclaimer}
                className="ssl-btn-invert"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "15px 38px",
                  background: "#fff",
                  color: "#000",
                  border: "1px solid #fff",
                  borderRadius: 999,
                  fontFamily: mono,
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                I Agree — Enter
              </button>
            </div>
          </div>

          {/* LOGO REVEAL STAGE */}
          <div
            id="intro-reveal"
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              opacity: 0,
              transform: "scale(0.82)",
              transition: "opacity 1s ease, transform 1.6s cubic-bezier(.16,1,.3,1)",
              pointerEvents: "none",
            }}
          >
            <img src={LOGO} alt="Sixth Sense Legal" style={{ width: "min(400px,66vw)", height: "auto", filter: "drop-shadow(0 0 60px rgba(229,9,20,0.34))" }} />
            <span style={{ fontFamily: mono, fontSize: "clamp(11px,1.4vw,13px)", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
              Making Law Make Sense
            </span>
          </div>
        </div>
      )}

      {/* ============ HERO (Iad-lab intro) ============ */}
      <section
        id="home"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "130px clamp(20px,6vw,72px) 90px",
          overflow: "hidden",
        }}
      >
        <div
          data-reveal="up"
          style={{
            position: "absolute",
            top: 108,
            left: "clamp(20px,6vw,72px)",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: "#e50914" }}>◆ Sixth Sense Legal</span>
          <span>Making Law Make Sense</span>
          <span>Chennai — Est. 2015</span>
          <span style={{ color: "rgba(255,255,255,0.32)" }}>Criminal · Economic · Regulatory</span>
        </div>

        <div id="hero-words" ref={heroWordsRef} style={{ textAlign: "center", willChange: "transform", transition: "transform .35s cubic-bezier(.16,1,.3,1)" }}>
          {(["Sixth", "Sense"] as const).map((w) => (
            <h1
              key={w}
              style={{
                margin: 0,
                fontFamily: display,
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#fff",
                fontSize: "clamp(4.4rem,23vw,22rem)",
                lineHeight: 0.78,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {w}
            </h1>
          ))}
          <h1
            style={{
              margin: 0,
              fontFamily: display,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "transparent",
              WebkitTextStroke: "2px #e50914",
              fontSize: "clamp(4.4rem,23vw,22rem)",
              lineHeight: 0.78,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            Legal
          </h1>
        </div>

        <div data-reveal="up" data-d="140" style={{ textAlign: "center", marginTop: "clamp(28px,4vw,46px)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 54, height: 2, background: "#e50914", marginBottom: 26 }} />
          <p style={{ maxWidth: 540, fontSize: "clamp(15px,1.5vw,17px)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", margin: "0 0 36px" }}>
            Exceptional legal representation across economic-offence, regulatory, tax and insolvency matters — built on integrity, expertise and client trust.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <a
              href="#appointments"
              className="ssl-btn-invert"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 32px",
                background: "#fff",
                color: "#000",
                border: "1px solid #fff",
                borderRadius: 999,
                fontFamily: mono,
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Book an Appointment ↗
            </a>
            <a
              href="#about"
              className="ssl-btn-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 32px",
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 999,
                fontFamily: mono,
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Learn More
            </a>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            width: 20,
            height: 32,
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            paddingTop: 7,
          }}
        >
          <span className="ssl-scrolldot" style={{ width: 3, height: 7, borderRadius: 2, background: "#e50914" }} />
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" style={{ position: "relative", zIndex: 2, padding: "clamp(80px,11vw,150px) clamp(20px,6vw,90px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(40px,6vw,90px)", maxWidth: 1180, margin: "0 auto", alignItems: "start" }}>
          <div data-reveal="up">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e50914" }} />
              <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>01 / About Us</span>
            </div>
            <h2
              data-reveal="mask"
              style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(2.4rem,5.5vw,4.4rem)", lineHeight: 0.96, textTransform: "uppercase", color: "#fff", letterSpacing: "-0.01em", margin: 0 }}
            >
              Who
              <br />
              We Are
            </h2>
          </div>
          <div data-reveal="up" data-d="120">
            <p style={{ fontSize: "clamp(1.1rem,1.9vw,1.5rem)", lineHeight: 1.62, color: "rgba(255,255,255,0.78)", margin: "0 0 22px", fontWeight: 300 }}>
              Since 2015, <span style={{ color: "#fff", fontWeight: 500 }}>SIXTH SENSE LEGAL</span> has been providing exceptional legal services with a focus on integrity, expertise, and client satisfaction.
            </p>
            <p style={{ fontSize: "clamp(1rem,1.5vw,1.15rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.55)", margin: 0 }}>
              Our team of experienced professionals is dedicated to delivering the highest quality legal representation across a wide range of practice areas.
            </p>
          </div>
        </div>

        <div
          data-reveal="up"
          data-d="120"
          style={{
            maxWidth: 1180,
            margin: "clamp(56px,7vw,90px) auto 0",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          }}
        >
          {[
            { n: "10", dot: true, label: "Years of Expertise" },
            { n: "20+", dot: false, label: "Complex Cases" },
            { n: "95%", dot: false, label: "Success Rate" },
            { n: "24/7", dot: false, label: "Client Support", last: true },
          ].map((s, i) => (
            <div key={i} style={{ padding: "34px 24px", borderRight: s.last ? undefined : "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(2.6rem,4.5vw,3.6rem)", lineHeight: 1, color: "#fff" }}>
                {s.n}
                {s.dot && <span style={{ color: "#e50914" }}>.</span>}
              </div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ JOURNEY ============ */}
      <section
        id="journey"
        style={{ position: "relative", zIndex: 2, padding: "clamp(80px,11vw,150px) clamp(20px,6vw,90px)", background: "linear-gradient(180deg,#000,#070707)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div data-reveal="up" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e50914" }} />
            <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>02 / Our Journey</span>
          </div>
          <h2
            data-reveal="mask"
            style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(2.4rem,5.5vw,4.4rem)", lineHeight: 0.96, textTransform: "uppercase", color: "#fff", letterSpacing: "-0.01em", margin: "0 0 clamp(44px,6vw,72px)" }}
          >
            The Road So Far
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { y: "2015", d: 0, top: "6px", title: "Firm Established", body: "SIXTH SENSE LEGAL was founded with a vision to provide exceptional legal services." },
              { y: "2017", d: 60, top: "-4px", title: "Expansion of Practice Areas", body: "Added specialized expertise in CBI, ED, and Tax Matters to our service offerings." },
              { y: "2019", d: 120, top: "-4px", title: "New Office Location", body: "Moved to our current location at Prince Towers, Nungambakkam, Chennai." },
              { y: "2021", d: 180, top: "-4px", title: "Team Growth", body: "Expanded our team of legal professionals to better serve our growing client base." },
              { y: "2023", d: 240, last: true, title: "Recognition & Awards", body: "Recognized for excellence in legal services and client satisfaction." },
            ].map((it) => (
              <div key={it.y} data-reveal="up" data-d={it.d || undefined} style={{ display: "grid", gridTemplateColumns: "clamp(70px,12vw,120px) 36px 1fr", alignItems: "start" }}>
                <div style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.1rem)", color: "rgba(255,255,255,0.32)", textAlign: "right", paddingRight: 18, lineHeight: 1 }}>{it.y}</div>
                <div style={{ position: "relative", display: "flex", justifyContent: "center", alignSelf: "stretch" }}>
                  <span
                    style={
                      it.last
                        ? { position: "absolute", top: "-4px", height: 14, width: 1, background: "rgba(255,255,255,0.12)" }
                        : { position: "absolute", top: it.top, bottom: "-28px", width: 1, background: "rgba(255,255,255,0.12)" }
                    }
                  />
                  <span style={{ position: "relative", width: 11, height: 11, borderRadius: "50%", background: "#e50914", boxShadow: "0 0 0 4px rgba(229,9,20,0.15)", marginTop: 4 }} />
                </div>
                <div style={{ paddingBottom: it.last ? 0 : 40 }}>
                  <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: "clamp(1.3rem,2.4vw,1.7rem)", textTransform: "uppercase", letterSpacing: "0.01em", color: "#fff", margin: "0 0 8px" }}>{it.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 560 }}>{it.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPERTISE — CAH SCATTER CARDS ============ */}
      <section id="expertise" style={{ position: "relative", zIndex: 2, padding: "clamp(80px,11vw,150px) clamp(20px,6vw,72px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal="up" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e50914" }} />
            <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>03 / Areas of Practice</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 18, marginBottom: "clamp(36px,5vw,56px)" }}>
            <h2
              data-reveal="mask"
              style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(2.4rem,5.5vw,4.4rem)", lineHeight: 0.96, textTransform: "uppercase", color: "#fff", letterSpacing: "-0.01em", margin: 0 }}
            >
              The Deck
              <br />
              We Play
            </h2>
            <p data-reveal="up" data-d="100" style={{ maxWidth: 420, fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: 0 }}>
              Each card is a practice area. <span style={{ color: "#fff" }}>Tap any card to flip it</span> — cards edged in <span style={{ color: "#e50914" }}>red</span> open into their sub-fields.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 20 }}>
            {CARDS.map((c, i) => {
              const isFlipped = flipped.includes(c.id)
              const rot = ROTS[i % ROTS.length]
              const borderColor = c.accent ? "#e50914" : "#000"
              return (
                <div key={c.id} data-reveal="up" data-d={i * 55 || undefined} style={{ perspective: "1300px" }}>
                  <div
                    className="ssl-card"
                    onClick={() => toggleFlip(c.id)}
                    style={{ position: "relative", height: 228, cursor: "pointer", ["--rot" as string]: `${rot}deg` } as CSSProperties}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        transformStyle: "preserve-3d",
                        transition: "transform .7s cubic-bezier(.7,0,.2,1)",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      {/* FRONT */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          background: "#fff",
                          borderRadius: 14,
                          boxShadow: `inset 0 0 0 2px ${borderColor}`,
                          padding: 20,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)" }}>Practice</span>
                          {c.children && (
                            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#e50914", color: "#fff", fontFamily: display, fontWeight: 700, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>+</span>
                          )}
                        </div>
                        <div style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(1.7rem,2.6vw,2.3rem)", lineHeight: 0.92, textTransform: "uppercase", color: "#000", letterSpacing: "-0.01em" }}>{c.abbr}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e50914" }} />
                          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>Sixth Sense Legal</span>
                        </div>
                      </div>
                      {/* BACK */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          background: "#0a0a0a",
                          borderRadius: 14,
                          boxShadow: `inset 0 0 0 2px ${borderColor}`,
                          padding: 20,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e50914" }}>{c.abbr}</span>
                          <p style={{ fontFamily: display, fontWeight: 500, fontSize: "clamp(1.05rem,1.7vw,1.3rem)", lineHeight: 1.05, textTransform: "uppercase", color: "#fff", margin: "8px 0 0", letterSpacing: "0.01em" }}>{c.full}</p>
                        </div>
                        {c.children && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                            {c.children.map((ch) => (
                              <span key={ch} style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", border: "1px solid rgba(229,9,20,0.6)", borderRadius: 999, padding: "5px 11px" }}>{ch}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ APPROACH ============ */}
      <section
        id="approach"
        style={{ position: "relative", zIndex: 2, padding: "clamp(80px,11vw,150px) clamp(20px,6vw,90px)", background: "linear-gradient(180deg,#000,#070707)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal="up" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e50914" }} />
            <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>04 / Our Approach</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(30px,5vw,70px)", alignItems: "end", marginBottom: "clamp(44px,6vw,70px)" }}>
            <h2
              data-reveal="mask"
              style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(2.4rem,5.5vw,4.4rem)", lineHeight: 0.96, textTransform: "uppercase", color: "#fff", letterSpacing: "-0.01em", margin: 0 }}
            >
              How We Work
            </h2>
            <p data-reveal="up" data-d="100" style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.58)", margin: 0 }}>
              At Sixth Sense Legal, our approach is rooted in integrity, expertise, and a deep commitment to our clients. We believe in clear communication, thorough research, and strategic advocacy tailored to each unique case. Our team collaborates closely to ensure every client receives personalized attention and the highest standard of legal service.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {[
              { n: "01", d: 0, title: "Client-Centric", body: "We prioritize our clients' needs, providing transparent advice and regular updates throughout every stage of the legal process." },
              { n: "02", d: 100, title: "Collaborative", body: "Our lawyers work as a team, leveraging diverse expertise to develop creative, effective solutions for complex legal challenges." },
              { n: "03", d: 200, title: "Ethical & Strategic", body: "We uphold the highest ethical standards and pursue every matter with diligence, discretion, and a focus on long-term results." },
            ].map((c) => (
              <div key={c.n} data-reveal="up" data-d={c.d || undefined} className="ssl-approach" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "34px 30px", background: "rgba(255,255,255,0.015)" }}>
                <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.18em", color: "#e50914", marginBottom: 18 }}>{c.n}</div>
                <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: "1.6rem", textTransform: "uppercase", letterSpacing: "0.01em", color: "#fff", margin: "0 0 14px" }}>{c.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OPPORTUNITIES ============ */}
      <section id="opportunities" style={{ position: "relative", zIndex: 2, padding: "clamp(80px,11vw,150px) clamp(20px,6vw,90px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal="up" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e50914" }} />
            <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>05 / Opportunities</span>
          </div>
          <h2
            data-reveal="mask"
            style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(2.4rem,5.5vw,4.4rem)", lineHeight: 0.96, textTransform: "uppercase", color: "#fff", letterSpacing: "-0.01em", margin: "0 0 18px" }}
          >
            Join The Team
          </h2>
          <p data-reveal="up" data-d="100" style={{ maxWidth: 640, fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", margin: "0 0 clamp(34px,5vw,52px)" }}>
            Join our team of legal professionals and contribute to our mission of providing exceptional legal services. Explore current openings and apply for positions that match your skills and career goals.
          </p>

          <div data-reveal="up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 14 }}>
            <div>
              <label style={{ display: "block", fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>Job Category</label>
              <select
                value={fCategory}
                onChange={(e) => setFCategory(e.target.value)}
                className="ssl-input"
                style={{ width: "100%", height: 48, background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, color: "#fff", fontFamily: "'Montserrat',sans-serif", fontSize: 14, padding: "0 14px", cursor: "pointer", outline: "none" }}
              >
                <option value="all">All Categories</option>
                <option value="Administrative">Administrative</option>
                <option value="Legal">Legal</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>Experience Level</label>
              <select
                value={fExperience}
                onChange={(e) => setFExperience(e.target.value)}
                className="ssl-input"
                style={{ width: "100%", height: 48, background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, color: "#fff", fontFamily: "'Montserrat',sans-serif", fontSize: 14, padding: "0 14px", cursor: "pointer", outline: "none" }}
              >
                <option value="all">All Experience Levels</option>
                <option value="Entry Level">Entry Level</option>
                <option value="1-3 Years">1-3 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5-8 Years">5-8 Years</option>
                <option value="8+ Years">8+ Years</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>Location</label>
              <select
                value={fLocation}
                onChange={(e) => setFLocation(e.target.value)}
                className="ssl-input"
                style={{ width: "100%", height: 48, background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, color: "#fff", fontFamily: "'Montserrat',sans-serif", fontSize: 14, padding: "0 14px", cursor: "pointer", outline: "none" }}
              >
                <option value="all">All Locations</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
          </div>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 26 }}>{filteredJobs.length} open positions</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            {filteredJobs.map((job, i) => (
              <div key={job.id} data-reveal="up" data-d={i * 50 || undefined} className="ssl-job" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "28px 26px", background: "rgba(255,255,255,0.015)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
                  <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "0.01em", color: "#fff", margin: 0, lineHeight: 1.0 }}>{job.title}</h3>
                  <span style={{ flexShrink: 0, fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e50914", border: "1px solid rgba(229,9,20,0.5)", borderRadius: 999, padding: "5px 11px" }}>{job.category}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", marginBottom: 18, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#e50914" }} />
                    {job.experience}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
                    {job.location}
                  </span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", flex: 1 }}>{job.description}</p>
                <a
                  href="#appointments"
                  className="ssl-pill-light"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px 24px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 999, fontFamily: mono, fontWeight: 500, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  Apply Now ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APPOINTMENTS ============ */}
      <section
        id="appointments"
        style={{ position: "relative", zIndex: 2, padding: "clamp(80px,11vw,150px) clamp(20px,6vw,90px)", background: "linear-gradient(180deg,#000,#070707)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal="up" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e50914" }} />
            <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>06 / Appointments</span>
          </div>
          <h2
            data-reveal="mask"
            style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(2.4rem,5.5vw,4.4rem)", lineHeight: 0.96, textTransform: "uppercase", color: "#fff", letterSpacing: "-0.01em", margin: "0 0 18px" }}
          >
            Book A Consultation
          </h2>
          <p data-reveal="up" data-d="100" style={{ maxWidth: 640, fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", margin: "0 0 clamp(34px,5vw,52px)" }}>
            Schedule a consultation with our legal experts. Fill out the form below and we will get back to you to confirm your appointment.
          </p>

          <form data-reveal="up" action="https://formspree.io/f/xyzjbeaa" method="POST" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "clamp(24px,4vw,40px)", background: "rgba(255,255,255,0.015)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
              <div>
                <label style={fieldLabel}>Full Name</label>
                <input name="name" type="text" placeholder="John Doe" required className="ssl-input" style={fieldInput} />
              </div>
              <div>
                <label style={fieldLabel}>Email</label>
                <input name="email" type="email" placeholder="john.doe@example.com" required className="ssl-input" style={fieldInput} />
              </div>
              <div>
                <label style={fieldLabel}>Phone Number</label>
                <input name="phone" type="text" placeholder="+91 98765 43210" required className="ssl-input" style={fieldInput} />
              </div>
              <div>
                <label style={fieldLabel}>Service Type</label>
                <select name="serviceType" required className="ssl-input" style={{ ...fieldInput, cursor: "pointer" }}>
                  <option value="">Select a service</option>
                  <option value="cbi">CBI Matters</option>
                  <option value="ed">ED Matters</option>
                  <option value="tax">Tax Matters</option>
                  <option value="ibc">IBC Matters</option>
                  <option value="customs">Customs</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style={fieldLabel}>Preferred Date</label>
                <input name="date" type="date" required className="ssl-input" style={{ ...fieldInput, colorScheme: "dark" }} />
              </div>
              <div>
                <label style={fieldLabel}>Preferred Time</label>
                <select name="time" required className="ssl-input" style={{ ...fieldInput, cursor: "pointer" }}>
                  <option value="">Select a time</option>
                  <option value="9am">9:00 AM</option>
                  <option value="10am">10:00 AM</option>
                  <option value="11am">11:00 AM</option>
                  <option value="12pm">12:00 PM</option>
                  <option value="2pm">2:00 PM</option>
                  <option value="3pm">3:00 PM</option>
                  <option value="4pm">4:00 PM</option>
                  <option value="5pm">5:00 PM</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={fieldLabel}>Additional Information</label>
              <textarea
                name="message"
                placeholder="Please provide any additional details about your case or inquiry."
                className="ssl-input"
                style={{ width: "100%", minHeight: 120, background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, color: "#fff", fontFamily: "'Montserrat',sans-serif", fontSize: 15, padding: 14, outline: "none", resize: "vertical" }}
              />
            </div>
            <button
              type="submit"
              className="ssl-btn-invert"
              style={{ marginTop: 24, width: "100%", padding: 16, background: "#fff", color: "#000", border: "1px solid #fff", borderRadius: 999, fontFamily: mono, fontWeight: 500, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}
            >
              Request Appointment ↗
            </button>
          </form>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" style={{ position: "relative", zIndex: 2, padding: "clamp(80px,11vw,150px) clamp(20px,6vw,90px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal="up" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e50914" }} />
            <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>07 / Contact Us</span>
          </div>
          <h2
            data-reveal="mask"
            style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(2.4rem,5.5vw,4.4rem)", lineHeight: 0.96, textTransform: "uppercase", color: "#fff", letterSpacing: "-0.01em", margin: "0 0 18px" }}
          >
            Get In Touch
          </h2>
          <p data-reveal="up" data-d="100" style={{ maxWidth: 560, fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", margin: "0 0 clamp(40px,5vw,60px)" }}>
            Get in touch with us for any inquiries or legal assistance.
          </p>

          <div data-reveal="up" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Prince+Towers,+College+Road,+Nungambakkam,+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", padding: "36px 28px 36px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e50914", marginBottom: 14 }}>Address</div>
              <div className="ssl-link-soft" style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
                Prince Towers, College Road,
                <br />
                Nungambakkam, Chennai
              </div>
            </a>
            <div style={{ padding: "36px 28px", borderBottom: "1px solid rgba(255,255,255,0.1)", borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e50914", marginBottom: 14 }}>Phone</div>
              <a href="tel:04445266510" className="ssl-link-soft" style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>044-4526-6510</a>
            </div>
            <div style={{ padding: "36px 0 36px 28px", borderBottom: "1px solid rgba(255,255,255,0.1)", borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e50914", marginBottom: 14 }}>Email</div>
              <a href="mailto:sixthsenselegal@gmail.com" className="ssl-link-soft" style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", textDecoration: "none", wordBreak: "break-all" }}>sixthsenselegal@gmail.com</a>
            </div>
          </div>

          <div data-reveal="up" data-d="100" style={{ marginTop: 44 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>Office Hours</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 18, maxWidth: 680 }}>
              {[
                ["Mon — Fri", "9:00 AM – 6:00 PM", "#fff"],
                ["Saturday", "9:00 AM – 1:00 PM", "#fff"],
                ["Sunday", "Closed", "#e50914"],
              ].map(([day, hrs, col]) => (
                <div key={day} style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>{day}</span>
                  <span style={{ fontFamily: display, fontSize: 15, color: col }}>{hrs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ position: "relative", zIndex: 2, padding: "clamp(50px,7vw,80px) clamp(20px,6vw,90px) 40px", borderTop: "1px solid rgba(255,255,255,0.1)", background: "#000" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "space-between", alignItems: "center" }}>
          <a href="#home" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e50914" }} />
            <span style={{ fontFamily: display, fontWeight: 600, fontSize: 20, letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" }}>Sixth Sense Legal</span>
          </a>
          <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: 0 }}>Making Law Make Sense</p>
          <div style={{ display: "flex", gap: 24, fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {[
              ["#about", "About"],
              ["#expertise", "Expertise"],
              ["#opportunities", "Careers"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="ssl-link-soft" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{label}</a>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1180, margin: "34px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)", fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)" }}>
          © {year} Sixth Sense Legal · All rights reserved.
        </div>
      </footer>
    </div>
  )
}

const fieldLabel: CSSProperties = {
  display: "block",
  fontFamily: mono,
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
  marginBottom: 9,
}

const fieldInput: CSSProperties = {
  width: "100%",
  height: 48,
  background: "#0a0a0a",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 6,
  color: "#fff",
  fontFamily: "'Montserrat',sans-serif",
  fontSize: 15,
  padding: "0 14px",
  outline: "none",
}
