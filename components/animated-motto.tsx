"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedMottoProps {
  text: string
  className?: string
  animationType?: "typewriter" | "fade"
}

export default function AnimatedMotto({ text, className = "", animationType = "typewriter" }: AnimatedMottoProps) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (animationType === "typewriter") {
      let index = 0
      const timer = setInterval(() => {
        setDisplayText(text.substring(0, index))
        index++
        if (index > text.length) {
          clearInterval(timer)
          setShowCursor(false) // Hide cursor at the end
        }
      }, 100)

      return () => clearInterval(timer)
    }
  }, [text, animationType])

  if (animationType === "fade") {
    return (
      <motion.p
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {text}
      </motion.p>
    )
  }

  return (
    <span className={className} style={{ whiteSpace: "nowrap" }}>
      {displayText || "\u00A0"}
      {showCursor && displayText.length < text.length && (
        <span className="typewriter-cursor">|</span>
      )}
    </span>
  )
}
