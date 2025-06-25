"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button3D } from "@/components/button-3d"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, MapPin, Phone } from "lucide-react"

export default function AppointmentsPage() {
  const [submitted, setSubmitted] = useState(false)

  const formRef = useRef<HTMLDivElement>(null)
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 })

  const contactRef = useRef<HTMLDivElement>(null)
  const isContactInView = useInView(contactRef, { once: true, amount: 0.3 })

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-daydream text-white text-3xl md:text-4xl lg:text-5xl mb-4 text-center">APPOINTMENTS</h1>

          <p className="font-panara text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Schedule a consultation with our legal experts. Fill out the form below and we will get back to you to
            confirm your appointment.
          </p>
        </motion.div>
      </section>

      {/* Form and Contact Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 section-spacing bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div ref={formRef} className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isFormInView ? 1 : 0, x: isFormInView ? 0 : -20 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-black border-border overflow-hidden">
                <CardHeader>
                  <CardTitle className="font-panara text-2xl">Book an Appointment</CardTitle>
                  <CardDescription>Fill out the form below to request an appointment with our team.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    action="https://formspree.io/f/xyzjbeaa"
                    method="POST"
                    encType="multipart/form-data"
                    className="space-y-6"
                    onSubmit={() => setSubmitted(true)}
                  >
                    <input type="hidden" name="_next" value="https://sixthsenselegal.com/thank-you" />
                    <input type="hidden" name="_captcha" value="false" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-field-focus">
                        <label htmlFor="name" className="block mb-1">Full Name</label>
                        <Input id="name" name="name" type="text" placeholder="John Doe" required />
                      </div>
                      <div className="form-field-focus">
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-field-focus">
                        <label htmlFor="phone" className="block mb-1">Phone Number</label>
                        <Input id="phone" name="phone" type="text" placeholder="+91 98765 43210" required />
                      </div>
                      <div className="form-field-focus">
                        <label htmlFor="serviceType" className="block mb-1">Service Type</label>
                        <select id="serviceType" name="serviceType" required className="w-full bg-black border rounded px-3 py-2">
                          <option value="">Select a service</option>
                          <option value="cbi">CBI Matters</option>
                          <option value="ed">ED Matters</option>
                          <option value="tax">Tax Matters</option>
                          <option value="ibc">IBC Matters</option>
                          <option value="customs">Customs</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-field-focus">
                        <label htmlFor="date" className="block mb-1">Preferred Date</label>
                        <div className="relative">
                          <Input id="date" name="date" type="date" required />
                          <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="form-field-focus">
                        <label htmlFor="time" className="block mb-1">Preferred Time</label>
                        <select id="time" name="time" required className="w-full bg-black border rounded px-3 py-2">
                          <option value="">Select a time</option>
                          <option value="9am">9:00 AM</option>
                          <option value="10am">10:00 AM</option>
                          <option value="11am">11:00 AM</option>
                          <option value="12pm">12:00 PM</option>
                          <option value="2pm">2:00 PM</option>
                          <option value="3pm">3:00 PM</option>
                          <option value="4pm">4:00 PM</option>
                          <option value="5pm">5:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-field-focus">
                      <label htmlFor="message" className="block mb-1">Additional Information</label>
                      <Textarea id="message" name="message" placeholder="Please provide any additional details about your case or inquiry." className="min-h-[120px]" />
                    </div>
                    <Button3D type="submit" className="w-full" disabled={submitted}>
                      {submitted ? "Submitted" : "Request Appointment"}
                    </Button3D>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div ref={contactRef}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isContactInView ? 1 : 0, x: isContactInView ? 0 : 20 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-black border-border h-full">
                <CardHeader>
                  <CardTitle className="font-panara text-2xl">Contact Information</CardTitle>
                  <CardDescription>Reach out to us directly through the following channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-panara font-medium text-white">Phone</h3>
                      <p className="font-panara text-muted-foreground">044-4526-6510</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-panara font-medium text-white">Address</h3>
                      <p className="font-panara text-muted-foreground">
                        Prince Towers, College Road,
                        <br />
                        Nungambakkam, Chennai
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-panara font-medium text-white mb-4">Office Hours</h3>
                    <div className="space-y-2">
                      <p className="font-panara text-sm text-muted-foreground flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </p>
                      <p className="font-panara text-sm text-muted-foreground flex justify-between">
                        <span>Saturday</span>
                        <span>9:00 AM - 1:00 PM</span>
                      </p>
                      <p className="font-panara text-sm text-muted-foreground flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
