"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, Clock, Scale, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface HexagonProps {
  title: string
  value: string
  icon: "award" | "clock" | "scale" | "users"
  index: number
}

const hexagonItems: HexagonProps[] = [
  {
    title: "Years Expertise",
    value: "10",
    icon: "award",
    index: 0,
  },
  {
    title: "Complex Cases",
    value: "20+",
    icon: "scale",
    index: 1,
  },
  {
    title: "Success Rate",
    value: "95%",
    icon: "award",
    index: 2,
  },
  {
    title: "Client Support",
    value: "24/7",
    icon: "clock",
    index: 3,
  },
]

function Hexagon({ title, value, icon, index }: HexagonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    switch (icon) {
      case "award":
        return <Award className="h-8 w-8 text-red-600" />
      case "clock":
        return <Clock className="h-8 w-8 text-red-600" />
      case "scale":
        return <Scale className="h-8 w-8 text-red-600" />
      case "users":
        return <Users className="h-8 w-8 text-red-600" />
    }
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div
        className={cn(
          "relative w-[180px] h-[200px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300",
          "before:content-[''] before:absolute before:w-full before:h-full before:bg-black/80 before:backdrop-blur-md",
          "before:border before:border-red-600/30 before:transform before:rotate-0 before:transition-all before:duration-500",
          "before:clip-path-hexagon hover:before:border-red-600/80 hover:before:shadow-[0_0_20px_rgba(220,38,38,0.3)]",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4"
          animate={{
            rotateY: isHovered ? 180 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <span className="font-panara font-bold text-4xl text-white mb-2">{value}</span>
          <span className="font-panara text-white text-center">{title}</span>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 p-4"
          initial={{ rotateY: -180 }}
          animate={{
            rotateY: isHovered ? 0 : -180,
          }}
          transition={{ duration: 0.5 }}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          {getIcon()}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  return (
    <div className="w-full py-12">
      <h2 className="font-panara font-bold text-white text-2xl md:text-3xl mb-12 text-center">Why Choose Us</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {hexagonItems.map((item) => (
          <Hexagon key={item.title} {...item} />
        ))}
      </div>
    </div>
  )
}
