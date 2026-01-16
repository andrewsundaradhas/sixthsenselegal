'use client'

import type React from "react"
import { Montserrat } from "next/font/google"
import "./globals.css"
import GooeyNav from "@/components/GooeyNav"
import { ThemeProvider } from "@/components/theme-provider"
import ClientDisclaimerGuard from "@/components/ClientDisclaimerGuard"
import IntroScreen from "@/components/IntroScreen"
import { useActiveRoute } from "@/hooks/useActiveRoute"
import { useState, useEffect } from "react"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Appointments", href: "/appointments" },
  { label: "Opportunities", href: "/opportunities" },
]

function LayoutContent({ children }: { children: React.ReactNode }) {
  const activeIndex = useActiveRoute(navItems)
  const [showIntro, setShowIntro] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('sixthsense-visited')
    if (!hasVisited) {
      setShowIntro(true)
    } else {
      setIntroComplete(true)
    }
  }, [])

  const handleIntroComplete = () => {
    localStorage.setItem('sixthsense-visited', 'true')
    setIntroComplete(true)
  }

  return (
    <>
      {showIntro && !introComplete && <IntroScreen onComplete={handleIntroComplete} />}
      {introComplete && (
        <>
          <ClientDisclaimerGuard />
          <div className="min-h-screen flex" style={{ opacity: 1, transition: 'opacity 0.5s' }}>
            <GooeyNav
              items={navItems}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={activeIndex}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
            <main className="flex-1 ml-0 lg:ml-[250px] pt-16 sm:pt-20 lg:pt-0 overflow-x-hidden">{children}</main>
          </div>
        </>
      )}
    </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/day-dream" />
        <title>SIXTH SENSE LEGAL</title>
        <meta name="description" content="Making Law Make Sense" />
      </head>
      <body className={`${montserrat.variable} font-sans bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  )
}
