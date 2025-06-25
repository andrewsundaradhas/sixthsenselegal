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
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 lg:py-0 section-spacing">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 flex justify-center">
            <img
              src="/images/logo.png"
              alt="SIXTH SENSE LEGAL"
              className="w-auto h-80 md:h-[500px]"
              onError={(e) => {
                console.error("Logo failed to load")
                e.currentTarget.src =
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20152522-jjpwpyWNl7X2ScR1n6iOQeSJLteReI.png"
              }}
            />
          </div>

          <AnimatedMotto
            text="Making Law, Make Sense"
            className="font-panara text-xl md:text-2xl text-white mb-16 inline-block"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button3D variant="default" size="lg" asChild>
              <Link href="/appointments">Book an Appointment</Link>
            </Button3D>
            <Button3D variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button3D>
          </div>

          <div
            ref={motifRef}
            className="opacity-0 transform transition-all duration-1000 ease-out"
            style={{
              opacity: isMotifInView ? 1 : 0,
              transform: isMotifInView ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <LegalSvgMotifs className="max-w-3xl mx-auto" />
          </div>
        </motion.div>
      </section>
    </div>
  )
}
