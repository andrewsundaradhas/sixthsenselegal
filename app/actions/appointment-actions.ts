// DEPRECATED: Appointment form now uses Formspree. This file is no longer used.

"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { z } from "zod"
import nodemailer from "nodemailer"

const appointmentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  serviceType: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  message: z.string().optional(),
  // Added status field with a default value
  status: z.string().default("pending"),
})

export async function submitAppointment(formData: FormData) {
  // ── 1. Validate inbound data ────────────────────────────────────────────────
  const parsed = appointmentSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    serviceType: formData.get("serviceType"),
    date: formData.get("date"),
    time: formData.get("time"),
    message: formData.get("message") ?? "",
  })

  if (!parsed.success) {
    return { success: false, message: "Invalid form data" }
  }

  const data = parsed.data

  // ── 2. Persist to Supabase ──────────────────────────────────────────────────
  try {
    const supabase = createServerSupabaseClient()

    // NOTE: column names MUST match the table definition in Supabase.
    // Assuming your Supabase table has columns:
    // name, email, phone, service_type, preferred_date, preferred_time, message, status
    const { error } = await supabase
      .from("appointments")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service_type: data.serviceType, // Mapped to service_type
        preferred_date: data.date, // Mapped to preferred_date
        preferred_time: data.time, // Mapped to preferred_time
        message: data.message,
        status: data.status, // Include the new status field
      })
      .throwOnError() // This will throw a proper PostgrestError if there's an issue

    if (error) {
      // This block will only be reached if throwOnError() didn't catch it,
      // or if there's another type of error.
      throw error
    }
  } catch (err: any) {
    console.error("Error inserting appointment:", err)
    return {
      success: false,
      message:
        "We couldn't save your appointment. Please verify all fields and ensure your Supabase table schema matches.",
    }
  }

  // ── 3. Fire-and-forget notification email (non-blocking) ───────────────────
  sendAppointmentEmail(data).catch((e) => console.error("E-mail notification failed:", e))

  return {
    success: true,
    message: "Appointment request submitted successfully. We will contact you shortly.",
  }
}

// helper – runs after DB save
async function sendAppointmentEmail(data: z.infer<typeof appointmentSchema>) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn("EMAIL_USER or EMAIL_PASSWORD environment variables are not set. Email will not be sent.")
    return
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "help.sixthsenselegal@gmail.com",
    subject: `New Appointment Request – ${data.name}`,
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Service Type:</strong> ${data.serviceType}</p>
      <p><strong>Preferred Date:</strong> ${data.date}</p>
      <p><strong>Preferred Time:</strong> ${data.time}</p>
      <p><strong>Message:</strong> ${data.message || "—"}</p>
      <p><strong>Status:</strong> ${data.status}</p>
    `,
  })
}
