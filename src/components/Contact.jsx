import { motion } from 'framer-motion'
import { Linkedin, Mail } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { site } from '../data/content.js'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-24 sm:py-32">
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">Contact</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="contact-heading"
            className="mt-4 font-display text-display-lg font-semibold tracking-tight text-balance"
          >
            Let's work together.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-ink-600 dark:text-ink-300">
            I read every message. Whether it's a contract, a role, or just to say hello — reach
            out via LinkedIn or email.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
          <a href={site.socials.email} aria-label="Email" className="icon-link">
            <Mail size={16} />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="icon-link"
          >
            <Linkedin size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
