import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import SideNavigation from "@/components/side-navigation"
import { ThemeProvider } from "@/components/theme-provider"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SIXTH SENSE LEGAL",
  description: "Making Law, Making Sense",
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
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/day-dream" />
      </head>
      <body className={`${montserrat.variable} font-sans bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <div className="flex min-h-screen">
            <SideNavigation />
            <main className="flex-1 overflow-x-hidden">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
