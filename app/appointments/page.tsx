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
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-daydream text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center px-4">APPOINTMENTS</h1>

          <p className="font-panara text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 text-center max-w-3xl mx-auto px-4 leading-relaxed">
            Schedule a consultation with our legal experts. Fill out the form below and we will get back to you to
            confirm your appointment.
          </p>
        </motion.div>
      </section>

      {/* Form and Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 section-spacing bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div ref={formRef} className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isFormInView ? 1 : 0, x: isFormInView ? 0 : -20 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-black border-border overflow-visible">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="font-panara text-xl sm:text-2xl">Book an Appointment</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Fill out the form below to request an appointment with our team.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 overflow-visible">
                  <form
                    action="https://formspree.io/f/xyzjbeaa"
                    method="POST"
                    encType="multipart/form-data"
                    className="space-y-4 sm:space-y-6"
                    onSubmit={() => setSubmitted(true)}
                  >
                    <input type="hidden" name="_next" value="https://sixthsenselegal.com/thank-you" />
                    <input type="hidden" name="_captcha" value="false" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="form-field-focus sm:col-span-1">
                        <label htmlFor="name" className="block mb-1.5 sm:mb-2 text-sm sm:text-base w-full">Full Name</label>
                        <Input id="name" name="name" type="text" placeholder="John Doe" required className="h-10 sm:h-11 w-full" />
                      </div>
                      <div className="form-field-focus sm:col-span-1">
                        <label htmlFor="email" className="block mb-1.5 sm:mb-2 text-sm sm:text-base w-full">Email</label>
                        <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required className="h-10 sm:h-11 w-full" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="form-field-focus sm:col-span-1">
                        <label htmlFor="phone" className="block mb-1.5 sm:mb-2 text-sm sm:text-base w-full">Phone Number</label>
                        <Input id="phone" name="phone" type="text" placeholder="+91 98765 43210" required className="h-10 sm:h-11 w-full" />
                      </div>
                      <div className="form-field-focus sm:col-span-1">
                        <label htmlFor="serviceType" className="block mb-1.5 sm:mb-2 text-sm sm:text-base w-full">Service Type</label>
                        <select id="serviceType" name="serviceType" required className="w-full h-10 sm:h-11 bg-black border rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600/50">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="form-field-focus sm:col-span-1">
                        <label htmlFor="date" className="block mb-1.5 sm:mb-2 text-sm sm:text-base w-full">Preferred Date</label>
                        <div className="relative">
                          <Input id="date" name="date" type="date" required className="h-10 sm:h-11 pr-10" />
                          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                      <div className="form-field-focus sm:col-span-1">
                        <label htmlFor="time" className="block mb-1.5 sm:mb-2 text-sm sm:text-base w-full">Preferred Time</label>
                        <select id="time" name="time" required className="w-full h-10 sm:h-11 bg-black border rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600/50">
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
                      <label htmlFor="message" className="block mb-1.5 sm:mb-2 text-sm sm:text-base w-full">Additional Information</label>
                      <Textarea id="message" name="message" placeholder="Please provide any additional details about your case or inquiry." className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base" />
                    </div>
                    <Button3D type="submit" className="w-full h-11 sm:h-12 text-sm sm:text-base" disabled={submitted}>
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
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="font-panara text-xl sm:text-2xl">Contact Information</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Reach out to us directly through the following channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <Phone className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-panara font-medium text-white text-sm sm:text-base mb-1">Phone</h3>
                      <p className="font-panara text-muted-foreground text-sm sm:text-base">044-4526-6510</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <MapPin className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-panara font-medium text-white text-sm sm:text-base mb-1">Address</h3>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Prince+Towers,+College+Road,+Nungambakkam,+Chennai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-panara text-muted-foreground hover:text-red-600 transition-colors duration-200 cursor-pointer underline decoration-transparent hover:decoration-red-600 text-sm sm:text-base"
                      >
                        Prince Towers, College Road,
                        <br />
                        Nungambakkam, Chennai
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <h3 className="font-panara font-medium text-white mb-3 sm:mb-4 text-sm sm:text-base">Office Hours</h3>
                    <div className="space-y-2">
                      <p className="font-panara text-xs sm:text-sm text-muted-foreground flex justify-between items-center">
                        <span>Monday - Friday</span>
                        <span className="ml-2">9:00 AM - 6:00 PM</span>
                      </p>
                      <p className="font-panara text-xs sm:text-sm text-muted-foreground flex justify-between items-center">
                        <span>Saturday</span>
                        <span className="ml-2">9:00 AM - 1:00 PM</span>
                      </p>
                      <p className="font-panara text-xs sm:text-sm text-muted-foreground flex justify-between items-center">
                        <span>Sunday</span>
                        <span className="ml-2">Closed</span>
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
