import { z } from 'zod'

/**
 * One schema per content type. Required fields live here.
 * Dates are strings: "2026", "2026-07" or "2026-07-15". Empty string = unknown.
 */
const date = z
  .string()
  .regex(/^$|^\d{4}(-\d{2}(-\d{2})?)?$/, 'use "YYYY", "YYYY-MM" or "YYYY-MM-DD"')
const url = z.string().url().or(z.literal(''))
const list = z.array(z.string()).default([])

export const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date,
  status: z.enum(['ongoing', 'completed']).default('completed'),
  role: z.string().default(''),
  /** Area ids from content/areas.json; the first is the main area */
  areas: z.array(z.string()).min(1),
  tags: list,
  tech: list,
  links: z
    .object({ github: url.optional(), demo: url.optional(), devpost: url.optional(), paper: url.optional(), video: url.optional() })
    .default({}),
  image: z.string().default(''),
  hackathon: z.string().default(''),
  featured: z.boolean().default(false),
  order: z.number().default(100),
})

export const hackathonSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['hackathon', 'contest']).default('hackathon'),
  organizer: z.string().default(''),
  date,
  location: z.string().default(''),
  international: z.boolean().default(true),
  challenge: z.string().default(''),
  team: list,
  role: z.string().default(''),
  result: z.string().default('Participant'),
  project: z.string().default(''),
  links: z.object({ event: url.optional(), devpost: url.optional(), certificate: url.optional() }).default({}),
  image: z.string().default(''),
  featured: z.boolean().default(true),
  order: z.number().default(100),
})

export const honorSchema = z.object({
  title: z.string().min(1),
  kind: z.enum(['award', 'contest', 'scholarship', 'test', 'recognition']),
  issuer: z.string().default(''),
  detail: z.string().default(''),
  date,
  link: url.default(''),
  order: z.number().default(100),
})

export const certificateSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  date,
  credentialUrl: url.default(''),
  skills: list,
  image: z.string().default(''),
  order: z.number().default(100),
})

const timelineBase = {
  start: date.default(''),
  end: date.default(''),
  link: url.default(''),
  linkLabel: z.string().default(''),
  highlights: list,
  order: z.number().default(100),
}

export const experienceSchema = z.object({
  org: z.string().min(1),
  role: z.string().min(1),
  kind: z.string().default(''),
  location: z.string().default(''),
  ...timelineBase,
})

export const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  grade: z.string().default(''),
  ...timelineBase,
})

export const leadershipSchema = z.object({
  org: z.string().min(1),
  role: z.string().min(1),
  ...timelineBase,
})

export const publicationSchema = z.object({
  title: z.string().min(1),
  authors: z.array(z.string()).min(1),
  venue: z.string().default(''),
  date,
  status: z.enum(['published', 'accepted', 'under review', 'preprint', 'in preparation']).default('published'),
  links: z.object({ pdf: url.optional(), doi: url.optional(), code: url.optional() }).default({}),
  bibtex: z.string().default(''),
  order: z.number().default(100),
})

export const profileSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  headline: z.string(),
  location: z.string(),
  statement: z.string(),
  bio: z.array(z.string()),
  interests: z.array(z.string()),
  /** Life outside work, shown in About */
  offline: z.array(z.string()).default([]),
  openTo: z.string(),
  email: z.string().email(),
  links: z.object({
    github: url,
    linkedin: url,
    scholar: url,
    orcid: url,
    transcript: url,
  }),
  photo: z.string(),
  cv: z.string(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
})

export const areasSchema = z.array(z.object({ id: z.string(), name: z.string(), blurb: z.string() }))

export const skillsSchema = z.array(z.object({ group: z.string(), items: z.array(z.string()) }))

/** Folder name in content/ → schema. Add a line here for a new content type. */
export const collections = {
  projects: projectSchema,
  hackathons: hackathonSchema,
  honors: honorSchema,
  certificates: certificateSchema,
  experience: experienceSchema,
  education: educationSchema,
  leadership: leadershipSchema,
  publications: publicationSchema,
} as const

export type CollectionName = keyof typeof collections
export type Entry<K extends CollectionName> = z.infer<(typeof collections)[K]> & {
  slug: string
  body: string
  /** Body rendered to HTML at build time */
  html: string
}
export type Project = Entry<'projects'>
export type Hackathon = Entry<'hackathons'>
export type Honor = Entry<'honors'>
export type Certificate = Entry<'certificates'>
export type Experience = Entry<'experience'>
export type Education = Entry<'education'>
export type Leadership = Entry<'leadership'>
export type Publication = Entry<'publications'>
export type Profile = z.infer<typeof profileSchema>
export type Skills = z.infer<typeof skillsSchema>
export type Area = z.infer<typeof areasSchema>[number]
