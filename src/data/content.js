// Single source of truth for portfolio content.
// Swap these values with your real details — everything in the UI reads from here.

/**
 * @typedef {Object} SiteConfig
 * @property {string}   name         - Full display name; used in Nav logo, Hero, About, Footer, and index.html (keep in sync)
 * @property {string}   role         - Job title; shown in Hero and About sidebar
 * @property {string}   location     - City, Country; shown in About sidebar
 * @property {string}   email        - Raw email address (no mailto:); used in About card and Contact section
 * @property {string}   shortBio     - One-sentence bio shown below the hero headline
 * @property {string[]} longBio      - Array of paragraph strings rendered in the About section body
 * @property {string}   focus        - Short phrase for the About sidebar "Focus" row
 * @property {string}   availability - Availability badge string shown in Hero
 * @property {{ github: string, linkedin: string, email: string }} socials - href-ready URLs (email should include mailto:)
 */

/** @type {SiteConfig} */
export const site = {
  name: 'Mohamed Erfan',
  role: 'Software Engineer',
  location: 'Kuala Lumpur, Malaysia',
  email: 'erfansiraj97@gmail.com',
  shortBio:
    "I design and build the systems you don't see—but rely on every day.",
  longBio: [
    "Six years ago I wrote my first production Java service. Since then I've been in the backend trenches of fintech — four years building Guidewire's localized insurance platform across APAC, and now working on Mastercard's payment processor at Endava. The common thread: systems where failure isn't an option.",
    "My best work lives where engineering rigor meets product thinking: APIs that are easy to reason about, services that hold under load, and codebases the next team can actually maintain. I've led a team through a full release cycle and mentored engineers along the way. I write things down.",
  ],
  focus: 'Backend, design systems',
  availability: 'Available for full-time roles — Q3 2026',
  photo: '/images/avatar.jpg', // place your photo at public/images/avatar.jpg; set to '' to hide
  socials: {
    github: 'https://github.com/nafre/', 
    linkedin: 'https://www.linkedin.com/in/mohderfan/', 
    email: 'mailto:erfansiraj97@gmail.com',
  },
}

/**
 * @typedef {Object} Project
 * @property {string}   title           - Project name
 * @property {string}   tagline         - Short subtitle shown below the title
 * @property {string}   description     - Body paragraph text on the card
 * @property {string[]} tags            - Technology chip labels
 * @property {string}   year            - Year string shown on the card
 * @property {string}   link            - External URL for the card CTA link
 * @property {string}   linkText        - CTA label (e.g. 'Read More')
 * @property {string}   accent          - Tailwind gradient classes for the card background wash (`bg-gradient-to-br from-* to-*`)
 * @property {string}   accentGradient  - Tailwind gradient classes for the 6px top stripe (`bg-gradient-to-r from-* via-* to-*`)
 */

/** @type {Project[]} */
export const projects = [
  {
    title: 'Guidewire Insurance Suite',
    tagline: 'P&C insurance platform built for APAC compliance',
    description:
      "Localized Guidewire's P&C insurance suite for Australia and New Zealand — implementing GST, regional compliance, and language requirements. Led a team of six through a full release cycle, shipping software relied on by insurers managing substantial risk portfolios.",
    tags: ['Java', 'CI/CD', 'TeamCity'],
    year: '2023',
    link: 'https://www.guidewire.com/resources/blog/technology/new-features-for-go-australia-in-garmisch',
    linkText: 'Read More',
    accent: 'from-indigo-500/20 to-sky-500/10',
    accentGradient: 'from-indigo-500 via-indigo-400 to-sky-400',
  },
  {
    title: 'Mastercard Payment Gateway Services',
    tagline: "The payment processor at the core of Mastercard's gateway",
    description:
      "Building the payment processor service at the heart of Mastercard's gateway infrastructure — the critical path between a cardholder's tap and their bank. Handles millions of transactions daily, coordinating validation across services before routing to the acquirer.",
    tags: ['Java', 'Spring Boot', 'Oracle SQL', 'Jenkins', 'Kafka'],
    year: '2025',
    link: 'https://www.mastercard.com/gateway.html',
    linkText: 'Read More',
    accent: 'from-emerald-500/20 to-teal-500/10',
    accentGradient: 'from-emerald-500 via-teal-400 to-cyan-400',
  },
]

/**
 * @typedef {Object} ExperienceItem
 * @property {string} company - Company or institution name
 * @property {string} role    - Job title or degree
 * @property {string} period  - Human-readable date range, e.g. '2021 — 2025'
 * @property {string} summary - 1–2 sentence description shown on the timeline card
 */

/** @type {ExperienceItem[]} */
export const experience = [
  {
    company: 'Endava',
    role: 'Software Engineer',
    period: '2025 — Present',
    summary:
      "Building Mastercard's payment processor service — the critical path that validates transactions and routes them to the acquirer. Designed for millions of daily transactions, zero tolerance for downtime.",
  },
  {
    company: 'Guidewire Software',
    role: 'Full-stack Software Engineer',
    period: '2021 — 2025',
    summary:
      "Built and maintained Guidewire's localized P&C insurance platform for Australia and New Zealand — regional compliance, GST implementation, and multiple POC cycles. Led a team of six through a full release.",
  },
  {
    company: 'Juris Technologies',
    role: 'Software Engineer',
    period: '2020 — 2021',
    summary:
      'Built loan management systems for banks and licensed lenders — core credit and collections infrastructure for financial institutions.',
  },
  {
    company: 'Universiti Sains Malaysia',
    role: 'B.Sc. Computer Science',
    period: '2016 — 2020',
    summary: 'Focus on software engineering, systems design and architecture.',
  },
]

/**
 * @typedef {Object} SkillGroup
 * @property {string}   group - Category label displayed as the card heading
 * @property {string[]} items - Skill names rendered as chip tags
 */

/** @type {SkillGroup[]} */
export const skills = [
  {
    group: 'Languages',
    items: ['Java', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind', 'Vite'],
  },
  {
    group: 'Backend & Infra',
    items: ['Spring Boot', 'PostgreSQL', 'Kafka', 'Docker'],
  },
  {
    group: 'Craft',
    items: ['System design', 'API design', 'Design systems', 'Technical writing', 'Mentoring'],
  },
  {
    group: 'A.I.',
    items: ['Github Copilot', 'Claude Code', 'OpenAI Codex'],
  },
]

/**
 * @typedef {Object} Stats
 * @property {number} careerStartYear - Used to compute years of experience dynamically in Hero
 * @property {{ value: string, label: string }} projects - Stat card value + label
 * @property {{ value: string, label: string }} scale    - Stat card value + label
 */

/** @type {Stats} */
export const stats = {
  careerStartYear: 2020,
  projects: { value: '10+', label: 'projects across 3 industries' },
  scale: { value: '1M+', label: 'users on production systems' },
}

/**
 * @typedef {Object} NavLink
 * @property {string} href  - Anchor hash (e.g. '#work')
 * @property {string} label - Display text in the nav bar
 */

/** @type {NavLink[]} */
export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]
