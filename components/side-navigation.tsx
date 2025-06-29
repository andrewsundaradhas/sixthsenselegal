"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Appointments", path: "/appointments" },
  { name: "Opportunities", path: "/opportunities" },
]

export default function SideNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Close menu when route changes
    setIsOpen(false)
  }, [pathname])

  // Handle document body class to prevent scrolling when menu is open
  useEffect(() => {
    if (!mounted) return

    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen, mounted])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-6 left-6 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-border transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link href="/">
              <div className="flex flex-col items-center">
                <img
                  src="/images/logo.png"
                  alt="SIXTH SENSE LEGAL"
                  className="h-40 w-auto"
                  onError={(e) => {
                    console.error("Logo failed to load")
                    e.currentTarget.src =
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20152522-jjpwpyWNl7X2ScR1n6iOQeSJLteReI.png"
                  }}
                />
                <p className="font-panara text-sm text-white mt-2">Making Law Make Sense</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-6 py-8">
            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={cn(
                      "font-panara text-lg font-medium block transition-all duration-200 hover-3d",
                      pathname === item.path
                        ? "text-red-600 border-l-2 border-red-600 pl-3"
                        : "text-white hover:text-red-600 pl-3",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 mt-auto">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SIXTH SENSE LEGAL</p>
          </div>
        </div>
      </div>

      {/* Push content when menu is open on larger screens */}
      <div
        className={cn(
          "lg:pl-64 transition-[padding] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "lg:pl-0" : "",
        )}
      />
    </>
  )
}
