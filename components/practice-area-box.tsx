"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PracticeAreaBoxProps {
  title: string
  index: number
  className?: string
}

export default function PracticeAreaBox({ title, index, className }: PracticeAreaBoxProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn(
        "relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl px-6 py-4 cursor-pointer transform transition-all duration-300",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
        boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.4)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-br from-red-600/20 to-white/5 opacity-0 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />
      <h3 className="font-panara font-bold text-white text-lg relative z-10">{title}</h3>
    </motion.div>
  )
}
