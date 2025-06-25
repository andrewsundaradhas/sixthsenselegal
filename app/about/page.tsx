"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Timeline from "@/components/timeline"
import ExpertiseVisualization from "@/components/expertise-visualization"
import WhyChooseUs from "@/components/why-choose-us"

const timelineItems = [
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

  const whyChooseUsRef = useRef<HTMLDivElement>(null)
  const isWhyChooseUsInView = useInView(whyChooseUsRef, { once: true, amount: 0.3 })

  return (
    <div className="min-h-screen">
      {/* About Us Header */}
      <section className="py-20 px-4 md:px-8 lg:px-12 section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-daydream text-white text-3xl md:text-4xl lg:text-5xl mb-4 text-center">ABOUT US</h1>

          <div className="max-w-4xl mx-auto">
            <p className="font-panara text-lg text-muted-foreground mb-12 text-center">
              Since 2015, SIXTH SENSE LEGAL has been providing exceptional legal services with a focus on integrity,
              expertise, and client satisfaction. Our team of experienced professionals is dedicated to delivering the
              highest quality legal representation across a wide range of practice areas.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 section-spacing bg-gradient-to-b from-black to-[#0A0A0A]">
        <h2 className="font-panara font-bold text-white text-2xl md:text-3xl mb-16 text-center">Our Journey</h2>

        <div className="max-w-5xl mx-auto">
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* Expertise Visualization Section */}
      <section ref={expertiseRef} className="py-20 px-4 md:px-8 lg:px-12 section-spacing">
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

      {/* Why Choose Us Section */}
      <section
        ref={whyChooseUsRef}
        className="py-20 px-4 md:px-8 lg:px-12 section-spacing bg-gradient-to-b from-black to-[#0A0A0A]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isWhyChooseUsInView ? 1 : 0, y: isWhyChooseUsInView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          <WhyChooseUs />
        </motion.div>
      </section>
    </div>
  )
}
