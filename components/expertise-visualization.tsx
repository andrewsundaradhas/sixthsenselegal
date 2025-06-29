"use client"

import type React from "react"

import { useState, useRef, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import gsap from "gsap"

interface ExpertiseNode {
  id: string
  label: string
  children?: ExpertiseNode[]
  angle: number
  distance: number
}

const branchLabels = [
  { id: "tnpid", label: "TNPID" },
  { id: "drt", label: "DRT" },
  { id: "cci", label: "CCI" },
  { id: "cbi", label: "CBI" },
  { id: "ed", label: "ED", children: [
    { id: "fema", label: "FEMA", angle: 20, distance: 120 },
    { id: "pmla", label: "PMLA", angle: 30, distance: 120 },
    { id: "feoa", label: "FEOA", angle: 40, distance: 120 },
  ] },
  { id: "customs", label: "Customs" },
  { id: "cbic", label: "CBIC" },
  { id: "eow", label: "EOW" },
  { id: "tax", label: "Tax Matters", children: [
    { id: "income-tax", label: "Income Tax", angle: 140, distance: 120 },
    { id: "gst", label: "GST", angle: 160, distance: 120 },
  ] },
  { id: "cofeposa", label: "COFEPOSA" },
  { id: "ibc", label: "IBC", children: [
    { id: "nclt", label: "NCLT", angle: 200, distance: 120 },
    { id: "nclat", label: "NCLAT", angle: 220, distance: 120 },
  ] },
];

function getResponsiveRadius() {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 640) return 80; // Mobile
    if (window.innerWidth < 768) return 100; // Small tablet
    if (window.innerWidth < 1024) return 130; // Tablet
  }
  return 170; // Desktop
}

const useExpertiseData = () => {
  const [radius, setRadius] = useState(getResponsiveRadius());
  // Responsive radius on resize
  useEffect(() => {
    const handleResize = () => setRadius(getResponsiveRadius());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const n = branchLabels.length;
  return useMemo(() =>
    branchLabels.map((branch, i) => {
      const angle = ((2 * Math.PI) / n) * i - Math.PI / 2;
      return {
        ...branch,
        angle: (angle * 180) / Math.PI, // convert to degrees for existing code
        distance: radius,
      };
    }), [radius]);
};

export default function ExpertiseVisualization({ className = "" }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedNodes, setExpandedNodes] = useState<string[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const expertiseData = useExpertiseData();

  const handleMainBubbleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
      createParticleExplosion()
    } else {
      setIsExpanded(false)
      setExpandedNodes([])
    }
  }

  const handleNodeClick = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    // Check if the node has children
    const node = expertiseData.find((n) => n.id === nodeId)
    if (!node?.children?.length) return

    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter((id) => id !== nodeId))

      // Animate child nodes collapsing
      if (svgRef.current) {
        const childPaths = svgRef.current.querySelectorAll(`.path-${nodeId}-child`)
        childPaths.forEach((path) => {
          gsap.to(path, {
            attr: { d: getPathStartPoint(nodeId) },
            duration: 0.5,
            ease: "power2.inOut",
          })
        })
      }
    } else {
      setExpandedNodes([...expandedNodes, nodeId])

      // Animate child nodes expanding
      setTimeout(() => {
        if (svgRef.current) {
          const childPaths = svgRef.current.querySelectorAll(`.path-${node.id}-child`)
          childPaths.forEach((path, index) => {
            const node = expertiseData.find((n) => n.id === nodeId)
            if (node?.children && node.children[index]) {
              const child = node.children[index]
              const childId = node.children[index].id
              gsap.to(path, {
                attr: { d: getPathData(node.id, child.id) }, // Corrected to use node.id and child.id
                duration: 0.8,
                ease: "power2.out",
              })
            }
          })
        }
      }, 100)
    }
  }

  const createParticleExplosion = () => {
    if (!particlesRef.current) return

    const particles = []
    const particleCount = 30
    const colors = ["#DC2626", "#FFFFFF", "#B91C1C"]

    // Clear previous particles
    particlesRef.current.innerHTML = ""

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute rounded-full"

      // Random size between 3px and 8px
      const size = Math.random() * 5 + 3
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random color from our palette
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

      // Start at center
      particle.style.left = "50%"
      particle.style.top = "50%"
      particle.style.transform = "translate(-50%, -50%)"

      particlesRef.current.appendChild(particle)
      particles.push(particle)
    }

    // Animate particles
    particles.forEach((particle) => {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 200 + 50
      const duration = Math.random() * 1 + 0.5

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        duration: duration,
        ease: "power2.out",
      })
    })
  }

  // Calculate position based on angle and distance
  const getPosition = (angle: number, distance: number) => {
    const radians = (angle * Math.PI) / 180
    return {
      x: Math.cos(radians) * distance,
      y: Math.sin(radians) * distance,
    }
  }

  // Calculate child node positions with radial branching
  const getChildPosition = (parentId: string, childId: string, childIndex: number, childCount: number) => {
    const parent = expertiseData.find((node) => node.id === parentId)
    if (!parent) return { x: 0, y: 0 }

    const parentPos = getPosition(parent.angle, parent.distance)

    // Calculate angle spread based on number of children (45 degrees between children)
    const angleSpread = 45
    const startAngle = parent.angle - (angleSpread * (childCount - 1)) / 2
    const childAngle = startAngle + childIndex * angleSpread

    // Calculate position at a fixed distance from parent
    const childDistance = 120
    const radians = (childAngle * Math.PI) / 180

    return {
      x: parentPos.x + Math.cos(radians) * childDistance,
      y: parentPos.y + Math.sin(radians) * childDistance,
    }
  }

  // Generate SVG path data for curved connections
  const getPathData = (parentId: string, childId: string) => {
    const parent = expertiseData.find((node) => node.id === parentId)
    if (!parent) return ""

    const parentPos = getPosition(parent.angle, parent.distance)

    const childIndex = parent.children?.findIndex((c) => c.id === childId) || 0
    const childCount = parent.children?.length || 0
    const childPos = getChildPosition(parentId, childId, childIndex, childCount)

    // Calculate control points for a smooth curve
    const midX = (parentPos.x + childPos.x) / 2
    const midY = (parentPos.y + childPos.y) / 2

    // Add some curvature based on the angle
    const curveFactor = 30
    const dx = childPos.x - parentPos.x
    const dy = childPos.y - parentPos.y
    const angle = Math.atan2(dy, dx) + Math.PI / 2

    const controlX = midX + Math.cos(angle) * curveFactor
    const controlY = midY + Math.sin(angle) * curveFactor

    return `M${parentPos.x},${parentPos.y} Q${controlX},${controlY} ${childPos.x},${childPos.y}`
  }

  // Get starting point for path animation
  const getPathStartPoint = (parentId: string) => {
    const parent = expertiseData.find((node) => node.id === parentId)
    if (!parent) return ""

    const parentPos = getPosition(parent.angle, parent.distance)
    return `M${parentPos.x},${parentPos.y} Q${parentPos.x},${parentPos.y} ${parentPos.x},${parentPos.y}`
  }

  return (
    <div ref={containerRef} className={cn("relative w-full bubble-container", className)}>
      <div className="h-[500px] sm:h-[600px] md:h-[700px] flex items-center justify-center w-full">
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-20"></div>

        {/* SVG for curved connections */}
        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <g transform={`translate(50%, 50%)`}>
            {/* Main node connections */}
            <AnimatePresence>
              {isExpanded &&
                expertiseData.map((node) => (
                  <motion.path
                    key={`line-${node.id}`}
                    d={`M0,0 L${getPosition(node.angle, node.distance).x},${getPosition(node.angle, node.distance).y}`}
                    stroke="url(#redGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: (node.angle / 360) * 0.3 }}
                  />
                ))}
            </AnimatePresence>

            {/* Child node connections */}
            {expertiseData.map((node) =>
              node.children?.map((child, index) => (
                <path
                  key={`path-${node.id}-${child.id}`}
                  className={`path-${node.id}-child`}
                  d={expandedNodes.includes(node.id) ? getPathData(node.id, child.id) : getPathStartPoint(node.id)}
                  stroke="url(#whiteGradient)"
                  strokeWidth="2"
                  fill="none"
                  opacity={expandedNodes.includes(node.id) ? 0.8 : 0}
                />
              )),
            )}

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="rgba(220, 38, 38, 0.3)" />
              </linearGradient>
              <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" />
              </linearGradient>
            </defs>
          </g>
        </svg>

        <motion.div
          className="absolute w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] bg-red-600 rounded-full flex items-center justify-center cursor-pointer z-30 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          animate={{ scale: isExpanded ? 0.8 : 1 }}
          onClick={handleMainBubbleClick}
          whileHover={{ scale: isExpanded ? 0.85 : 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <h3 className="font-daydream text-white text-xs sm:text-sm text-center leading-tight px-2 sm:px-4">
            SIXTH SENSE LEGAL
          </h3>
        </motion.div>

        <AnimatePresence>
          {isExpanded &&
            expertiseData.map((node) => {
              const position = getPosition(node.angle, node.distance)
              const hasChildren = node.children && node.children.length > 0

              // Calculate responsive size based on label length and screen size
              const baseSize = typeof window !== "undefined" && window.innerWidth < 640 ? 80 : 90
              const nodeSize = Math.max(baseSize, Math.min(120, node.label.length * 10))
              // Labels with 7 or more characters will use 'xs' font size
              const fontSize = node.label.length >= 7 ? "xs" : "sm"

              return (
                <motion.div
                  key={node.id}
                  className={cn(
                    "absolute bg-black/80 backdrop-blur-sm border-2 rounded-full p-2 sm:p-3 cursor-pointer z-20",
                    expandedNodes.includes(node.id) ? "border-white" : "border-red-600",
                    hasChildren ? "cursor-pointer" : "cursor-default",
                  )}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    x: position.x,
                    y: position.y,
                    scale: expandedNodes.includes(node.id) ? 1.1 : 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.3 },
                  }}
                  onClick={(e) => handleNodeClick(node.id, e)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: (node.angle / 360) * 0.5,
                  }}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    maxWidth: `${nodeSize}px`,
                  }}
                >
                  <span
                    className={cn(
                      `font-panara font-bold text-${fontSize} whitespace-nowrap transition-colors duration-200`,
                      hoveredNode === node.id ? "text-red-400" : "text-white",
                    )}
                  >
                    {node.label}
                  </span>

                  <AnimatePresence>
                    {expandedNodes.includes(node.id) &&
                      node.children &&
                      node.children.map((child, childIndex) => {
                        const childCount = node.children?.length || 0
                        const childPosition = getChildPosition(node.id, child.id, childIndex, childCount)

                        // Calculate position relative to parent
                        const relativeX = childPosition.x - position.x
                        const relativeY = childPosition.y - position.y

                        return (
                          <motion.div
                            key={child.id}
                            className="absolute bg-black/80 backdrop-blur-sm border border-white rounded-full p-1 sm:p-2 z-10"
                            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              x: relativeX,
                              y: relativeY,
                            }}
                            exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                              delay: childIndex * 0.1,
                            }}
                            onMouseEnter={() => setHoveredNode(child.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                          >
                            <span
                              className={cn(
                                "font-panara font-bold text-xs whitespace-nowrap transition-colors duration-200",
                                hoveredNode === child.id ? "text-red-400" : "text-white",
                              )}
                            >
                              {child.label}
                            </span>
                          </motion.div>
                        )
                      })}
                  </AnimatePresence>
                </motion.div>
              )
            })}
        </AnimatePresence>
      </div>
    </div>
  )
}
