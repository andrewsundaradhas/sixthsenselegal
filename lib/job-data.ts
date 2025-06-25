export interface JobQuestion {
  id: string
  label: string
  type: "text" | "number" | "textarea"
  placeholder: string
  required: boolean
}

export interface JobPosition {
  id: string
  title: string
  category: string
  experience: string
  location: string
  description: string
  specificQuestions: JobQuestion[]
}

export const jobPositions: JobPosition[] = [
  {
    id: "typist",
    title: "Typist",
    category: "Administrative",
    experience: "Entry Level",
    location: "Chennai",
    description: "Responsible for typing legal documents with high accuracy and attention to detail.",
    specificQuestions: [
      {
        id: "typing_speed",
        label: "Typing Speed (WPM)",
        type: "number",
        placeholder: "e.g., 60",
        required: true,
      },
      {
        id: "typing_software",
        label: "Typing Software Experience",
        type: "text",
        placeholder: "e.g., MS Word, Google Docs",
        required: true,
      },
    ],
  },
  {
    id: "stenographer",
    title: "Stenographer",
    category: "Administrative",
    experience: "Entry Level",
    location: "Chennai",
    description: "Record and transcribe legal proceedings, meetings, and dictations with precision.",
    specificQuestions: [
      {
        id: "stenography_speed",
        label: "Stenography Speed (WPM)",
        type: "number",
        placeholder: "e.g., 120",
        required: true,
      },
      {
        id: "stenography_experience",
        label: "Years of Stenography Experience",
        type: "number",
        placeholder: "e.g., 2",
        required: true,
      },
    ],
  },
  {
    id: "intern",
    title: "Intern",
    category: "Internship",
    experience: "Student",
    location: "Chennai",
    description: "Gain practical legal experience while assisting with research and administrative tasks.",
    specificQuestions: [
      {
        id: "current_education",
        label: "Current Educational Institution",
        type: "text",
        placeholder: "e.g., National Law School",
        required: true,
      },
      {
        id: "year_of_study",
        label: "Current Year of Study",
        type: "text",
        placeholder: "e.g., 3rd Year LLB",
        required: true,
      },
      {
        id: "availability",
        label: "Availability (Start Date and Duration)",
        type: "text",
        placeholder: "e.g., June 1, 2025 for 3 months",
        required: true,
      },
    ],
  },
  {
    id: "junior-advocate",
    title: "Junior Advocate",
    category: "Legal",
    experience: "1-3 Years",
    location: "Chennai",
    description: "Assist senior advocates in case preparation, legal research, and client interactions.",
    specificQuestions: [
      {
        id: "bar_enrollment",
        label: "Bar Enrollment Details",
        type: "text",
        placeholder: "e.g., Bar Council of Tamil Nadu, Enrollment No.",
        required: true,
      },
      {
        id: "practice_areas",
        label: "Areas of Practice",
        type: "text",
        placeholder: "e.g., Criminal Law, Corporate Law",
        required: true,
      },
    ],
  },
  {
    id: "advocate",
    title: "Advocate",
    category: "Legal",
    experience: "3-5 Years",
    location: "Chennai",
    description: "Handle cases independently, represent clients in court, and provide legal counsel.",
    specificQuestions: [
      {
        id: "bar_enrollment",
        label: "Bar Enrollment Details",
        type: "text",
        placeholder: "e.g., Bar Council of Tamil Nadu, Enrollment No.",
        required: true,
      },
      {
        id: "practice_areas",
        label: "Areas of Practice",
        type: "text",
        placeholder: "e.g., Criminal Law, Corporate Law",
        required: true,
      },
      {
        id: "cases_handled",
        label: "Number of Cases Handled Independently",
        type: "number",
        placeholder: "e.g., 50",
        required: true,
      },
    ],
  },
  {
    id: "consultant",
    title: "Consultant",
    category: "Legal",
    experience: "5-8 Years",
    location: "Chennai",
    description: "Provide specialized legal expertise in specific practice areas and advise clients.",
    specificQuestions: [
      {
        id: "specialization",
        label: "Area of Specialization",
        type: "text",
        placeholder: "e.g., Tax Law, Intellectual Property",
        required: true,
      },
      {
        id: "significant_cases",
        label: "Significant Cases or Achievements",
        type: "textarea",
        placeholder: "Please describe your most significant cases or professional achievements",
        required: true,
      },
    ],
  },
  {
    id: "senior-consultant",
    title: "Senior Consultant",
    category: "Legal",
    experience: "8+ Years",
    location: "Chennai",
    description: "Lead complex cases, mentor junior staff, and develop client relationships.",
    specificQuestions: [
      {
        id: "leadership_experience",
        label: "Leadership Experience",
        type: "textarea",
        placeholder: "Please describe your experience leading legal teams or mentoring junior staff",
        required: true,
      },
      {
        id: "client_portfolio",
        label: "Client Portfolio",
        type: "textarea",
        placeholder: "Please describe the types of clients you have worked with (no confidential details)",
        required: true,
      },
    ],
  },
]
