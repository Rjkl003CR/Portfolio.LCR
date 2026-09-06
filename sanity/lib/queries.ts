import { client } from './client'

// ─── TypeScript Interfaces ───────────────────────────────────────

export interface SanityProfile {
  _id?: string
  name: string
  greeting?: string
  title?: string
  profileImageUrl?: string
  uploadedImageUrl?: string
  bio?: string[]
  contactBlurb?: string
  email?: string
  phone?: string
  location?: string
  githubUrl?: string
  linkedinUrl?: string
  resumeUrl?: string
}

export interface SanityProject {
  _id?: string
  title: string
  subtitle?: string
  date?: string
  bullets?: string[]
  tech?: string[]
  link?: string
  github?: string
  imageUrl?: string
}

export interface SanitySkillCategory {
  _id?: string
  title: string
  iconKey?: string
  items?: string[]
  order?: number
}

export interface SanityCertification {
  _id?: string
  title: string
  description?: string
  year?: string
  url?: string
  order?: number
}

export interface SanityEducation {
  _id?: string
  degree: string
  school: string
  year?: string
  location?: string
  detail?: string
  active?: boolean
  order?: number
}

export interface SanityLeadership {
  _id?: string
  title: string
  period?: string
  organization?: string
  description?: string
  order?: number
}

// ─── GROQ Queries ────────────────────────────────────────────────

export const PROFILE_QUERY = `*[_type == "profile"][0] {
  _id,
  name,
  greeting,
  title,
  "uploadedImageUrl": profileImage.asset->url,
  profileImageUrl,
  bio,
  contactBlurb,
  email,
  phone,
  location,
  githubUrl,
  linkedinUrl,
  resumeUrl
}`

export const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  subtitle,
  date,
  bullets,
  tech,
  link,
  github,
  "imageUrl": image.asset->url
}`

export const SKILLS_QUERY = `*[_type == "skillCategory"] | order(order asc) {
  _id,
  title,
  iconKey,
  items,
  order
}`

export const CERTIFICATIONS_QUERY = `*[_type == "certification"] | order(order asc) {
  _id,
  title,
  description,
  year,
  url,
  order
}`

export const EDUCATION_QUERY = `*[_type == "education"] | order(order asc) {
  _id,
  degree,
  school,
  year,
  location,
  detail,
  active,
  order
}`

export const LEADERSHIP_QUERY = `*[_type == "leadership"] | order(order asc) {
  _id,
  title,
  period,
  organization,
  description,
  order
}`

// ─── Fetch Functions ─────────────────────────────────────────────

export async function getProfile(): Promise<SanityProfile | null> {
  try {
    const profile = await client.fetch<SanityProfile>(PROFILE_QUERY, {}, { next: { revalidate: 60 } })
    if (profile) return profile
  } catch (error) {
    console.warn('Failed to fetch profile from Sanity:', error)
  }
  return null
}

export async function getProjects(): Promise<SanityProject[]> {
  try {
    const projects = await client.fetch<SanityProject[]>(PROJECTS_QUERY, {}, { next: { revalidate: 60 } })
    if (projects && projects.length > 0) {
      return projects
    }
  } catch (error) {
    console.warn('Failed to fetch projects from Sanity, using fallback data:', error)
  }
  return fallbackProjects
}

export async function getSkillCategories(): Promise<SanitySkillCategory[]> {
  try {
    const skills = await client.fetch<SanitySkillCategory[]>(SKILLS_QUERY, {}, { next: { revalidate: 60 } })
    if (skills && skills.length > 0) return skills
  } catch (error) {
    console.warn('Failed to fetch skills from Sanity:', error)
  }
  return fallbackSkills
}

export async function getCertifications(): Promise<SanityCertification[]> {
  try {
    const certs = await client.fetch<SanityCertification[]>(CERTIFICATIONS_QUERY, {}, { next: { revalidate: 60 } })
    if (certs && certs.length > 0) return certs
  } catch (error) {
    console.warn('Failed to fetch certifications from Sanity:', error)
  }
  return fallbackCertifications
}

export async function getEducation(): Promise<SanityEducation[]> {
  try {
    const edu = await client.fetch<SanityEducation[]>(EDUCATION_QUERY, {}, { next: { revalidate: 60 } })
    if (edu && edu.length > 0) return edu
  } catch (error) {
    console.warn('Failed to fetch education from Sanity:', error)
  }
  return fallbackEducation
}

export async function getLeadership(): Promise<SanityLeadership[]> {
  try {
    const leadership = await client.fetch<SanityLeadership[]>(LEADERSHIP_QUERY, {}, { next: { revalidate: 60 } })
    if (leadership && leadership.length > 0) return leadership
  } catch (error) {
    console.warn('Failed to fetch leadership from Sanity:', error)
  }
  return fallbackLeadership
}

// ─── Fallback Data ───────────────────────────────────────────────
// Used when Sanity is empty or unreachable — keeps the site functional

export const fallbackProfile: SanityProfile = {
  name: "Chamathka Ranathunga",
  greeting: "Hello, I'm",
  title: "Full-Stack Developer & Creative Thinker",
  profileImageUrl: "https://drive.google.com/uc?export=view&id=1mNdOK9J5v8yRXJvIkg-LFLUV8Oip9w2p",
  bio: [
    "I am an Information Technology undergraduate at the University of Moratuwa with a passion for software design and system architecture. I enjoy translating complex business domain problems into scalable web applications and optimizing system workflows.",
    "My hands-on experience spans working with full-stack web technologies like Next.js, Spring Boot, and PostgreSQL, down to modern IoT development using ESP32. I actively participate in hackathons, university leadership roles, and tech events.",
    "I am actively seeking Software Engineering and Business Analyst internship opportunities where I can apply my dual focus on technical development and analytical problem-solving to real business challenges.",
  ],
  contactBlurb: "I am currently seeking software engineering and business analyst internship opportunities. Feel free to send me a message or connect directly!",
  email: "rjklcr003@gmail.com",
  phone: "+94 76 592 3995",
  location: "Moratuwa, Sri Lanka",
  githubUrl: "https://github.com/Rjkl003CR",
  linkedinUrl: "https://www.linkedin.com/in/chamathka-ranathunga-a825922aa",
  resumeUrl: "https://drive.google.com/file/d/1G6yXHsM6qA9XaI32fa7dv-FPYuAGqu2t/view?usp=drive_link",
}

export const fallbackProjects: SanityProject[] = [
  {
    title: "FixZone",
    subtitle: "Vehicle Service Management Platform",
    bullets: [
      "Analyzed service shop operations across 4 stakeholder roles to map existing manual workflows and translate business requirements into digital solutions.",
      "Designed and implemented a scalable multi-tenant architecture using Next.js and Spring Boot, reducing manual workflow overhead by an estimated 60%.",
      "Engineered secure REST APIs with Role-Based Access Control (RBAC) to protect sensitive data across 15+ endpoints.",
    ],
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "Jira"],
    link: "https://github.com/SyntaxSoulG10",
  },
  {
    title: "LoRa 10",
    subtitle: "Long-Range Hiker Safety System",
    date: "Aug. 2025",
    bullets: [
      "Engineered a complete embedded IoT solution from PCB design to firmware, solving the real-world problem of hiker safety in off-grid environments.",
      "Managed project lifecycle including hardware procurement, budget planning, and coordination of offshore PCB manufacturing.",
      "Developed custom OLED UI and FreeRTOS firmware supporting real-time emergency telemetry, establishing reliable communication over LoRa.",
    ],
    tech: ["ESP32", "LoRa SX1278", "GPS", "OLED", "BLE"],
    link: "https://lnkd.in/p/gs7WJK-Y",
  },
]

export const fallbackSkills: SanitySkillCategory[] = [
  { title: "Languages & Frameworks", iconKey: "code", items: ["Java", "JavaScript", "TypeScript", "Spring Boot", "Next.js", "React.js"], order: 0 },
  { title: "Data & Cloud", iconKey: "database", items: ["PostgreSQL", "MySQL", "SQL", "Vercel"], order: 1 },
  { title: "Dev & Architecture", iconKey: "wrench", items: ["Git", "GitHub", "Jira", "REST APIs"], order: 2 },
  { title: "Analytical Skills", iconKey: "book", items: ["Agile/Scrum", "Requirements Analysis", "Process Modeling", "Stakeholder Comm."], order: 3 },
]

export const fallbackCertifications: SanityCertification[] = [
  { title: "HackElite 2.0 Finalist", description: "LevelUp LMS EdTech Project - IEEE WIE Student Affinity Group", year: "2026", order: 0 },
  { title: "InspiHER{Tech} V3.0 Finalist", description: "IEEE WIE Student Branch Affinity Group (SLTC)", year: "2026", order: 1 },
  { title: "Innovate with Ballerina Coding Challenge", description: "IEEE CS Student Branch Chapter & WSO2", year: "2025", order: 2 },
  { title: "Introduction to SQL", description: "Sololearn", year: "2025", url: "https://www.sololearn.com/", order: 3 },
  { title: "FIT Expo Active Participant", description: "Lora10 Microcontroller Project - IT Faculty", year: "2025", order: 4 },
]

export const fallbackEducation: SanityEducation[] = [
  { degree: "BSc (Hons) in Information Technology", school: "University of Moratuwa", year: "Expected 2028", location: "Moratuwa, Sri Lanka", active: true, order: 0 },
  { degree: "G.C.E. Advanced Level (A/L)", school: "Narammala Mayurapada Central College", year: "2022", location: "Kurunegala, Sri Lanka", detail: "Combined Maths (B), Physics (B), Chemistry (A) — Z-Score: 1.6516", order: 1 },
  { degree: "G.C.E. Ordinary Level (O/L)", school: "Narammala Mayurapada Central College", year: "2019", location: "Kurunegala, Sri Lanka", detail: "9 A's (including Mathematics, English, and Science)", order: 2 },
]

export const fallbackLeadership: SanityLeadership[] = [
  { period: "2025 - 2026", title: "Main Batch Representative", organization: "Batch 23, Faculty of Information Technology", description: "Represented 200+ students and actively coordinated with faculty on academic concerns and curriculum feedback.", order: 0 },
  { period: "2025 - Present", title: "HR Pillar Member", organization: "FIT MOMENT, IT Faculty Media Unit", description: "Assisting with human resource activities, team coordination, and supporting internal communications for the media unit.", order: 1 },
  { period: "2026 - Present", title: "Program & Event Coordination", organization: "IEEE WIE Student Branch Affinity Group", description: "Supporting the planning and execution of student branch events, technical workshops, and skill-building sessions.", order: 2 },
]
