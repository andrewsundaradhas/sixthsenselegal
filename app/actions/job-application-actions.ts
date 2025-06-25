// DEPRECATED: Job application form now uses Formspree. This file is no longer used.

"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { z } from "zod"
import nodemailer from "nodemailer"
import { jobPositions } from "@/lib/job-data"

const baseApplicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  experience: z.string().min(1),
  education: z.string().min(1),
  coverLetter: z.string().optional(),
  jobId: z.string().min(1),
  // Added status field with a default value
  status: z.string().default("pending"),
})

export async function submitJobApplication(formData: FormData) {
  try {
    // Get job ID and find job details
    const jobId = formData.get("jobId") as string
    const job = jobPositions.find((j) => j.id === jobId)

    if (!job) {
      return { success: false, message: "Invalid job position" }
    }

    // Extract base fields
    const baseData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      experience: formData.get("experience"),
      education: formData.get("education"),
      coverLetter: formData.get("coverLetter") || "",
      jobId: jobId,
    }

    // Validate base data
    const validatedBaseData = baseApplicationSchema.parse(baseData)

    // Extract job-specific answers
    const specificAnswers: Record<string, string> = {}
    if (job.specificQuestions) {
      job.specificQuestions.forEach((question) => {
        specificAnswers[question.id] = (formData.get(question.id) as string) || ""
      })
    }

    // Get resume file if provided
    const resumeFile = formData.get("resume") as File
    let resumeFileName = ""

    if (resumeFile && resumeFile.name && resumeFile.size > 0) {
      resumeFileName = resumeFile.name
    }

    // Create Supabase client
    const supabase = createServerSupabaseClient()

    // Insert data into job_applications table
    // Assuming your Supabase table has columns:
    // job_id, job_title, full_name, email, phone, experience, education, cover_letter, resume_filename, specific_answers, status
    const { error } = await supabase
      .from("job_applications")
      .insert({
        job_id: jobId,
        job_title: job.title,
        full_name: validatedBaseData.fullName,
        email: validatedBaseData.email,
        phone: validatedBaseData.phone,
        experience: validatedBaseData.experience,
        education: validatedBaseData.education,
        cover_letter: validatedBaseData.coverLetter,
        resume_filename: resumeFileName,
        specific_answers: specificAnswers, // Store as JSONB in Supabase
        status: validatedBaseData.status, // Include the new status field
      })
      .throwOnError() // This will throw a proper PostgrestError if there's an issue

    if (error) {
      throw error
    }

    // Send email notification (non-blocking)
    sendJobApplicationEmail(validatedBaseData, job, specificAnswers, resumeFile).catch((e) =>
      console.error("Job application email notification failed:", e),
    )

    return {
      success: true,
      message: "Application submitted successfully. We will review it and get back to you soon.",
    }
  } catch (error) {
    console.error("Error processing job application:", error)
    return { success: false, message: "An error occurred while processing your application. Please try again." }
  }
}

async function sendJobApplicationEmail(
  data: z.infer<typeof baseApplicationSchema>,
  job: any,
  specificAnswers: Record<string, string>,
  resumeFile?: File,
) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn("EMAIL_USER or EMAIL_PASSWORD environment variables are not set. Email will not be sent.")
    return
  }

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Format specific answers for email
    let specificAnswersHtml = ""
    if (job.specificQuestions) {
      specificAnswersHtml = job.specificQuestions
        .map((question) => {
          return `<p><strong>${question.label}:</strong> ${specificAnswers[question.id] || "Not provided"}</p>`
        })
        .join("")
    }

    // Prepare email attachments
    const attachments = []

    if (resumeFile && resumeFile.name && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer())
      attachments.push({
        filename: resumeFile.name,
        content: buffer,
      })
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "help.sixthsenselegal@gmail.com", // Updated recipient email
      subject: `New Job Application: ${job.title} - ${data.fullName}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Position:</strong> ${job.title}</p>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <h3>Experience</h3>
        <p>${data.experience}</p>
        <h3>Education</h3>
        <p>${data.education}</p>
        ${data.coverLetter ? `<h3>Cover Letter</h3><p>${data.coverLetter}</p>` : ""}
        ${specificAnswersHtml ? `<h3>Position-Specific Questions</h3>${specificAnswersHtml}` : ""}
        ${resumeFile && resumeFile.name ? `<p><strong>Resume:</strong> Attached (${resumeFile.name})</p>` : "<p><strong>Resume:</strong> Not provided</p>"}
        <p><strong>Status:</strong> ${data.status}</p>
      `,
      attachments: attachments,
    }

    // Send email
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error("Error sending email:", error)
    // We don't throw here to prevent the entire function from failing
    // The application is still saved in the database
  }
}
