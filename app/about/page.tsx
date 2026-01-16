"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Timeline, { type TimelineItem } from "@/components/timeline"
import ExpertiseVisualization from "@/components/expertise-visualization"

const timelineItems: TimelineItem[] = [
  {
    year: "2015",
    title: "Firm Established",
    description: "SIXTH SENSE LEGAL was founded with a vision to provide exceptional legal services.",
    icon: "calendar",
  },
  {
    year: "2017",
    title: "Expansion of Practice Areas",
    description: "Added specialized expertise in CBI, ED, and Tax Matters to our service offerings.",
    icon: "briefcase",
  },
  {
    year: "2019",
    title: "New Office Location",
    description: "Moved to our current location at Prince Towers, Nungambakkam, Chennai.",
    icon: "map-pin",
  },
  {
    year: "2021",
    title: "Team Growth",
    description: "Expanded our team of legal professionals to better serve our growing client base.",
    icon: "users",
  },
  {
    year: "2023",
    title: "Recognition & Awards",
    description: "Recognized for excellence in legal services and client satisfaction.",
    icon: "award",
  },
]

export default function AboutPage() {
  const expertiseRef = useRef<HTMLDivElement>(null)
  const isExpertiseInView = useInView(expertiseRef, { once: true, amount: 0.3 })

  return (
    <div className="min-h-screen">
      {/* About Us Header */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-daydream text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center px-4">ABOUT US</h1>

          <div className="max-w-4xl mx-auto px-4">
            <p className="font-panara text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 text-center leading-relaxed">
              Since 2015, SIXTH SENSE LEGAL has been providing exceptional legal services with a focus on integrity,
              expertise, and client satisfaction. Our team of experienced professionals is dedicated to delivering the
              highest quality legal representation across a wide range of practice areas.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Expertise Visualization - mobile only, before timeline */}
      <section className="block md:hidden py-8 sm:py-12 px-4 sm:px-6 section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="font-panara font-bold text-white text-xl sm:text-2xl mb-4 sm:mb-6 text-center px-2">Our Expertise</h2>
          <p className="font-panara text-center text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto text-sm sm:text-base px-2 leading-relaxed">
            Click on the central bubble to explore our areas of expertise. Each practice area represents our specialized
            knowledge and experience in providing exceptional legal services.
          </p>
          <div className="relative w-full overflow-hidden px-2">
            <div className="flex justify-center items-center min-h-[350px] xs:min-h-[400px] sm:min-h-[450px]">
              <div className="relative w-full max-w-full mx-auto">
                <ExpertiseVisualization />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Timeline Section - mobile below expertise, desktop as usual */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 section-spacing bg-gradient-to-b from-black to-[#0A0A0A] overflow-visible">
        <h2 className="font-panara font-bold text-white text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-12 md:mb-16 text-center px-4">Our Journey</h2>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 overflow-visible">
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* Expertise Visualization - desktop only, after timeline */}
      <section ref={expertiseRef} className="hidden md:block py-20 px-4 md:px-8 lg:px-12 section-spacing">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isExpertiseInView ? 1 : 0, y: isExpertiseInView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-panara font-bold text-white text-2xl md:text-3xl mb-8 text-center">Our Expertise</h2>
          <p className="font-panara text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Click on the central bubble to explore our areas of expertise. Each practice area represents our specialized
            knowledge and experience in providing exceptional legal services.
          </p>
          <div className="expertise-container">
            <ExpertiseVisualization />
          </div>
        </motion.div>
      </section>

      {/* Our Approach Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 section-spacing bg-gradient-to-b from-black to-[#0A0A0A]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-panara font-bold text-white text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 text-center px-4">Our Approach</h2>
          <div className="max-w-4xl mx-auto text-center px-4">
            <p className="font-panara text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              At Sixth Sense Legal, our approach is rooted in integrity, expertise, and a deep commitment to our clients. We believe in clear communication, thorough research, and strategic advocacy tailored to each unique case. Our team collaborates closely to ensure every client receives personalized attention and the highest standard of legal service.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 font-panara text-sm sm:text-base text-white">
              <li className="bg-black/60 rounded-xl p-4 sm:p-5 md:p-6 border border-red-600/30 shadow-sm hover:border-red-600/50 transition-colors">
                <span className="block text-red-600 font-semibold mb-2 sm:mb-3 text-base sm:text-lg">Client-Centric</span>
                <span className="text-muted-foreground">We prioritize our clients' needs, providing transparent advice and regular updates throughout every stage of the legal process.</span>
              </li>
              <li className="bg-black/60 rounded-xl p-4 sm:p-5 md:p-6 border border-red-600/30 shadow-sm hover:border-red-600/50 transition-colors">
                <span className="block text-red-600 font-semibold mb-2 sm:mb-3 text-base sm:text-lg">Collaborative</span>
                <span className="text-muted-foreground">Our lawyers work as a team, leveraging diverse expertise to develop creative, effective solutions for complex legal challenges.</span>
              </li>
              <li className="bg-black/60 rounded-xl p-4 sm:p-5 md:p-6 border border-red-600/30 shadow-sm hover:border-red-600/50 transition-colors sm:col-span-2 md:col-span-1">
                <span className="block text-red-600 font-semibold mb-2 sm:mb-3 text-base sm:text-lg">Ethical & Strategic</span>
                <span className="text-muted-foreground">We uphold the highest ethical standards and pursue every matter with diligence, discretion, and a focus on long-term results.</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
