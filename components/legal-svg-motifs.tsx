"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface LegalSvgMotifsProps {
  className?: string
}

export default function LegalSvgMotifs({ className }: LegalSvgMotifsProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const paths = svgRef.current?.querySelectorAll("path")
            paths?.forEach((path, index) => {
              setTimeout(() => {
                path.classList.add("animate-draw")
              }, index * 300)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (svgRef.current) {
      observer.observe(svgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-auto", className)}
      viewBox="0 0 800 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Courthouse */}
      <path d="M100 150 L100 80 L140 60 L180 80 L180 150 Z" stroke="white" strokeWidth="2" fill="none" />
      <path d="M90 80 L190 80" stroke="white" strokeWidth="2" fill="none" />
      <path d="M110 80 L110 150" stroke="white" strokeWidth="2" fill="none" />
      <path d="M130 80 L130 150" stroke="white" strokeWidth="2" fill="none" />
      <path d="M150 80 L150 150" stroke="white" strokeWidth="2" fill="none" />
      <path d="M170 80 L170 150" stroke="white" strokeWidth="2" fill="none" />
      <path d="M90 150 L190 150" stroke="white" strokeWidth="2" fill="none" />

      {/* Scales of Justice */}
      <path d="M350 60 L350 150" stroke="white" strokeWidth="2" fill="none" />
      <path d="M320 70 L380 70" stroke="white" strokeWidth="2" fill="none" />
      <path d="M310 100 C310 85 330 85 330 100 C330 115 310 115 310 100 Z" stroke="white" strokeWidth="2" fill="none" />
      <path d="M370 100 C370 85 390 85 390 100 C390 115 370 115 370 100 Z" stroke="white" strokeWidth="2" fill="none" />
      <path d="M330 70 L310 100" stroke="white" strokeWidth="2" fill="none" />
      <path d="M370 70 L390 100" stroke="white" strokeWidth="2" fill="none" />

      {/* Contract/Document */}
      <path d="M500 60 L600 60 L600 150 L500 150 Z" stroke="white" strokeWidth="2" fill="none" />
      <path d="M520 80 L580 80" stroke="white" strokeWidth="2" fill="none" />
      <path d="M520 100 L580 100" stroke="white" strokeWidth="2" fill="none" />
      <path d="M520 120 L560 120" stroke="white" strokeWidth="2" fill="none" />

      {/* Gavel */}
      <path d="M700 80 L740 120" stroke="white" strokeWidth="2" fill="none" />
      <path d="M680 100 L720 60" stroke="white" strokeWidth="2" fill="none" />
      <path
        d="M670 110 L690 90 C695 85 700 90 695 95 L675 115 C670 120 665 115 670 110 Z"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M740 60 L750 50 C755 45 760 50 755 55 L745 65 C740 70 735 65 740 60 Z"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}
