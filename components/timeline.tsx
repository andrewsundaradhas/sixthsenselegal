"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Calendar, Award, Briefcase, MapPin, Users } from "lucide-react"

interface TimelineItem {
  year: string
  title: string
  description: string
  icon: "calendar" | "award" | "briefcase" | "map-pin" | "users"
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export default function Timeline({ items, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const getIcon = (icon: TimelineItem["icon"]) => {
    switch (icon) {
      case "calendar":
        return <Calendar className="h-6 w-6 text-red-600" />
      case "award":
        return <Award className="h-6 w-6 text-red-600" />
      case "briefcase":
        return <Briefcase className="h-6 w-6 text-red-600" />
      case "map-pin":
        return <MapPin className="h-6 w-6 text-red-600" />
      case "users":
        return <Users className="h-6 w-6 text-red-600" />
    }
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Vertical line for desktop */}
      <div className="absolute left-[120px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 to-red-800 hidden md:block" />

      {/* Horizontal line for mobile */}
      <div className="absolute left-0 right-0 top-[60px] h-0.5 bg-gradient-to-r from-red-600 to-red-800 md:hidden" />

      <div className="md:space-y-16">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative",
              "md:pl-[160px]", // Desktop layout
              "pl-0 pt-[80px] mb-12 md:mb-0", // Mobile layout
              index % 2 === 0 ? "md:even:pl-[160px]" : "md:odd:pl-[160px]",
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Desktop dot */}
            <div className="absolute left-[108px] top-0 w-6 h-6 rounded-full bg-red-600 border-2 border-black z-10 shadow-[0_0_10px_rgba(220,38,38,0.5)] hidden md:block" />

            {/* Mobile dot */}
            <div className="absolute left-0 top-[60px] w-6 h-6 rounded-full bg-red-600 border-2 border-black z-10 shadow-[0_0_10px_rgba(220,38,38,0.5)] md:hidden" />

            {/* Year - Desktop */}
            <div className="absolute left-0 top-0 font-panara font-bold text-red-600 text-2xl hidden md:block">
              {item.year}
            </div>

            {/* Year - Mobile */}
            <div className="absolute left-10 top-[60px] transform -translate-y-1/2 font-panara font-bold text-red-600 text-2xl md:hidden">
              {item.year}
            </div>

            {/* Content card - Desktop */}
            <div className="hidden md:block bg-black/80 backdrop-blur-sm border border-red-600/30 rounded-lg p-4 shadow-[0_4px_20px_rgba(220,38,38,0.2)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-black/50 rounded-full">{getIcon(item.icon)}</div>
                <h3 className="font-panara font-bold text-white text-xl">{item.title}</h3>
              </div>
              <p className="font-panara text-muted-foreground">{item.description}</p>
            </div>

            {/* Content card - Mobile */}
            <div className="md:hidden bg-black/80 backdrop-blur-sm border border-red-600/30 rounded-lg p-4 shadow-[0_4px_20px_rgba(220,38,38,0.2)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-black/50 rounded-full">{getIcon(item.icon)}</div>
                <h3 className="font-panara font-bold text-white text-xl">{item.title}</h3>
              </div>
              <p className="font-panara text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
