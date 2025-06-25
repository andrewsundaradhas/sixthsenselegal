"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button3D } from "@/components/button-3d"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin } from "lucide-react"
import { jobPositions } from "@/lib/job-data"

export default function OpportunitiesPage() {
  const [filters, setFilters] = useState({
    category: "all",
    experience: "all",
    location: "all",
  })

  const jobListRef = useRef<HTMLDivElement>(null)
  const isJobListInView = useInView(jobListRef, { once: true, amount: 0.1 })

  const filteredJobs = jobPositions.filter((job) => {
    return (
      (filters.category === "all" || job.category === filters.category) &&
      (filters.experience === "all" || job.experience === filters.experience) &&
      (filters.location === "all" || job.location === filters.location)
    )
  })

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-daydream text-white text-3xl md:text-4xl lg:text-5xl mb-4 text-center">OPPORTUNITIES</h1>

          <p className="font-panara text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Join our team of legal professionals and contribute to our mission of providing exceptional legal services.
            Explore current openings and apply for positions that match your skills and career goals.
          </p>
        </motion.div>
      </section>

      {/* Jobs Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 section-spacing bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="font-panara text-sm font-medium mb-2 block">Job Category</label>
              <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Administrative">Administrative</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-panara text-sm font-medium mb-2 block">Experience Level</label>
              <Select
                value={filters.experience}
                onValueChange={(value) => setFilters({ ...filters, experience: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Experience Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Experience Levels</SelectItem>
                  <SelectItem value="Entry Level">Entry Level</SelectItem>
                  <SelectItem value="1-3 Years">1-3 Years</SelectItem>
                  <SelectItem value="3-5 Years">3-5 Years</SelectItem>
                  <SelectItem value="5-8 Years">5-8 Years</SelectItem>
                  <SelectItem value="8+ Years">8+ Years</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-panara text-sm font-medium mb-2 block">Location</label>
              <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div ref={jobListRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isJobListInView ? 1 : 0, y: isJobListInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-black/80 backdrop-blur-sm border-border overflow-hidden hover:border-red-600/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-panara font-bold text-xl text-white">{job.title}</h3>
                        <Badge variant="outline" className="bg-red-600/10 text-red-600 border-red-600">
                          {job.category}
                        </Badge>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          {job.experience}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {job.location}
                        </div>
                      </div>

                      <p className="font-panara text-muted-foreground mb-6">{job.description}</p>

                      <Button3D asChild className="w-full">
                        <Link href={`/opportunities/apply/${job.id}`}>Apply Now</Link>
                      </Button3D>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="font-panara text-muted-foreground">
                  No job openings match your current filters. Please try different filter options.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
