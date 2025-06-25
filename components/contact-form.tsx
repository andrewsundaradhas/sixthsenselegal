"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload } from "lucide-react"

export default function ContactForm() {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-black border-border overflow-hidden">
      <CardHeader>
        <CardTitle className="font-panara text-2xl">Contact Us</CardTitle>
        <CardDescription>For appointment inquiries or job opportunities, please use the forms on the Appointments or Opportunities pages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <a href="/appointments" className="block w-full text-center bg-red-600 text-white py-3 rounded hover:bg-red-700 transition">Book an Appointment</a>
          <a href="/opportunities" className="block w-full text-center bg-black border border-red-600 text-red-600 py-3 rounded hover:bg-red-600 hover:text-white transition">View Careers/Opportunities</a>
        </div>
      </CardContent>
    </Card>
  )
}
