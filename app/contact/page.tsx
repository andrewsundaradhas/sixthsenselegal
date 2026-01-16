"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactUsPage() {
    const infoRef = useRef<HTMLDivElement>(null)
    const isInfoInView = useInView(infoRef, { once: true, amount: 0.3 })

    return (
        <div className="min-h-screen flex flex-col justify-center">
            {/* Header Section */}
            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="font-daydream text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-center px-4 uppercase tracking-tighter">CONTACT US</h1>

                    <p className="font-panara text-base sm:text-lg md:text-xl text-muted-foreground mb-8 text-center max-w-3xl mx-auto px-4 leading-relaxed">
                        Get in touch with us for any inquiries or legal assistance.
                    </p>
                </motion.div>
            </section>

            {/* Info Section */}
            <section className="pb-24 px-4 sm:px-6 md:px-8 lg:px-12 flex justify-center">
                <div className="max-w-4xl w-full" ref={infoRef}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInfoInView ? 1 : 0, y: isInfoInView ? 0 : 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Card className="bg-black border-border overflow-hidden">
                            <CardHeader className="p-6 sm:p-8 text-center border-b border-border">
                                <CardTitle className="font-panara text-2xl sm:text-3xl">Office Information</CardTitle>
                                <CardDescription className="text-base sm:text-lg">Our contact details and physical location.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 sm:p-12">
                                {/* Address */}
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="p-3 rounded-full bg-red-600/10">
                                        <MapPin className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-panara font-bold text-white text-lg mb-2">Address</h3>
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

                                {/* Phone */}
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="p-3 rounded-full bg-red-600/10">
                                        <Phone className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-panara font-bold text-white text-lg mb-2">Phone</h3>
                                        <p className="font-panara text-muted-foreground text-sm sm:text-base underline decoration-transparent">
                                            044-4526-6510
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="p-3 rounded-full bg-red-600/10">
                                        <Mail className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-panara font-bold text-white text-lg mb-2">Email</h3>
                                        <a href="mailto:sixthsenselegal@gmail.com" className="font-panara text-muted-foreground hover:text-red-600 transition-colors duration-200 text-sm sm:text-base">
                                            sixthsenselegal@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </CardContent>

                            <div className="bg-muted/30 p-6 sm:p-8 flex flex-col items-center border-t border-border">
                                <h3 className="font-panara font-bold text-white mb-4 text-center">Office Hours</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
                                    <div className="text-center">
                                        <p className="font-panara text-xs text-muted-foreground uppercase tracking-widest mb-1">Mon - Fri</p>
                                        <p className="font-panara text-sm text-white">9:00 AM - 6:00 PM</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-panara text-xs text-muted-foreground uppercase tracking-widest mb-1">Saturday</p>
                                        <p className="font-panara text-sm text-white">9:00 AM - 1:00 PM</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-panara text-xs text-muted-foreground uppercase tracking-widest mb-1">Sunday</p>
                                        <p className="font-panara text-sm text-white text-red-500 font-bold">Closed</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
