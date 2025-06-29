import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import SideNavigation from "@/components/side-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import DisclaimerPopup from "@/components/DisclaimerPopup"
import { useRouter } from "next/navigation"
import ClientDisclaimerGuard from "@/components/ClientDisclaimerGuard"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SIXTH SENSE LEGAL",
  description: "Making Law Make Sense",
  generator: 'v0.dev'
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
      </head>
      <body className={`${montserrat.variable} font-sans bg-black text-white`}>
        <ClientDisclaimerGuard />
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <div className="flex min-h-screen">
            <SideNavigation />
            <main className="flex-1 overflow-x-hidden">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
