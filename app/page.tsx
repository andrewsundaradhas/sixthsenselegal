"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

import { Button3D } from "@/components/button-3d"
import AnimatedMotto from "@/components/animated-motto"
import LegalSvgMotifs from "@/components/legal-svg-motifs"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const motifRef = useRef<HTMLDivElement>(null)
  const isMotifInView = useInView(motifRef, { once: true, amount: 0.3 })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-0 section-spacing">
        <motion.div
          className="text-center w-full max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 sm:mb-8 md:mb-12 flex justify-center px-2">
            <img
              src="/images/logo.png"
              alt="SIXTH SENSE LEGAL"
              className="w-full max-w-[200px] xs:max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl h-auto aspect-square p-2 sm:p-3 md:p-4"
              style={{ objectFit: "contain" }}
              onError={(e) => {
                console.error("Logo failed to load")
                e.currentTarget.src =
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20152522-jjpwpyWNl7X2ScR1n6iOQeSJLteReI.png"
              }}
            />
          </div>

          <AnimatedMotto
            text="Making Law Make Sense"
            className="font-panara text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-8 sm:mb-12 md:mb-16 inline-block px-4"
          />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 md:mb-16 px-4">
            <Button3D variant="default" size="lg" className="w-full sm:w-auto min-w-[200px]" asChild>
              <Link href="/appointments">Book an Appointment</Link>
            </Button3D>
            <Button3D variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]" asChild>
              <Link href="/about">Learn More</Link>
            </Button3D>
          </div>

          <div
            ref={motifRef}
            className="opacity-0 transform transition-all duration-1000 ease-out px-4 sm:px-6 md:px-8"
            style={{
              opacity: isMotifInView ? 1 : 0,
              transform: isMotifInView ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <LegalSvgMotifs className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto" />
          </div>
        </motion.div>
      </section>
    </div>
  )
}
