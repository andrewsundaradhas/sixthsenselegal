"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button3D } from "@/components/button-3d"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { jobPositions } from "@/lib/job-data"
import Link from "next/link"

export default function ApplicationPage() {
  const { jobId } = useParams() as { jobId: string }
  const router = useRouter()
  const job = useMemo(() => jobPositions.find((j) => j.id === jobId) ?? null, [jobId])
  const [submitted, setSubmitted] = useState(false)

  if (!job) return null

  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 md:px-8 lg:px-12 section-spacing">
        <h1 className="font-daydream text-white text-3xl md:text-4xl lg:text-5xl mb-4 text-center">APPLICATION FORM</h1>
        <p className="font-panara text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
          Complete the application form for the {job.title} position.
        </p>
      </section>
      <section className="py-20 px-4 md:px-8 lg:px-12 section-spacing bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-black border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Link href="/opportunities">
                  <Button3D>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button3D>
                </Link>
              </div>
              <form
                action="https://formspree.io/f/xyzjbeaa"
                method="POST"
                encType="multipart/form-data"
                className="space-y-6"
                onSubmit={() => setSubmitted(true)}
              >
                <input type="hidden" name="_next" value="https://sixthsenselegal.com/thank-you" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="jobId" value={job.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-field-focus">
                    <label htmlFor="fullName" className="block mb-1">Full Name *</label>
                    <Input id="fullName" name="fullName" type="text" placeholder="John Doe" required />
                  </div>
                  <div className="form-field-focus">
                    <label htmlFor="email" className="block mb-1">Email *</label>
                    <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                  </div>
                </div>
                <div className="form-field-focus">
                  <label htmlFor="phone" className="block mb-1">Phone Number *</label>
                  <Input id="phone" name="phone" type="text" placeholder="+91 98765 43210" required />
                </div>
                {/* Dynamic job-specific questions */}
                {job.specificQuestions.map((q) => (
                  <div className="form-field-focus" key={q.id}>
                    <label htmlFor={q.id} className="block mb-1">{q.label}{q.required ? " *" : ""}</label>
                    {q.type === "textarea" ? (
                      <Textarea id={q.id} name={q.id} placeholder={q.placeholder} required={q.required} className="min-h-[120px]" />
                    ) : (
                      <Input id={q.id} name={q.id} type={q.type} placeholder={q.placeholder} required={q.required} />
                    )}
                  </div>
                ))}
                <div className="form-field-focus">
                  <label htmlFor="experience" className="block mb-1">Professional Experience *</label>
                  <Textarea id="experience" name="experience" placeholder="Describe your relevant work experience." className="min-h-[120px]" required />
                </div>
                <div className="form-field-focus">
                  <label htmlFor="education" className="block mb-1">Educational Background *</label>
                  <Textarea id="education" name="education" placeholder="List your academic qualifications." className="min-h-[120px]" required />
                </div>
                <div className="form-field-focus">
                  <label htmlFor="coverLetter" className="block mb-1">Cover Letter</label>
                  <Textarea id="coverLetter" name="coverLetter" placeholder="Tell us why you're a good fit." className="min-h-[150px]" />
                </div>
                <Button3D type="submit" className="w-full" disabled={submitted}>
                  {submitted ? "Submitted" : "Submit Application"}
                </Button3D>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
