import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { site, stats } from '../data/content.js'

const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const yearsExp = new Date().getFullYear() - stats.careerStartYear
  const heroStats = [
    { k: `${yearsExp}+ yrs`, v: 'shipping production software' },
    { k: stats.projects.value, v: stats.projects.label },
    { k: stats.scale.value, v: stats.scale.label },
  ]

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Decorative dotted backdrop, fades at bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-dotted mask-fade-b opacity-60"
      />
      {/* Animated gradient orbs — three layers for depth */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        <div className="orb-a absolute -left-40 -top-28 h-[700px] w-[700px] rounded-full bg-indigo-500/[0.09] blur-[100px] dark:bg-indigo-400/[0.15]" />
        <div className="orb-b absolute -bottom-32 -right-40 h-[550px] w-[550px] rounded-full bg-violet-500/[0.08] blur-[90px] dark:bg-violet-400/[0.14]" />
        <div className="orb-c absolute right-[10%] top-[30%] h-[300px] w-[300px] rounded-full bg-indigo-400/[0.05] blur-[70px] dark:bg-indigo-300/[0.09]" />
      </div>
      <div className="container-narrow relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          {/* Availability badge — tinted pill */}
          <motion.div variants={fadeUp} className="mb-7">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3.5 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/[0.08] dark:text-emerald-400">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {site.availability}
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="text-balance text-hero font-extrabold tracking-tightest"
          >
            Building{' '}
            <span className="heading-display font-semibold accent-underline">impactful</span>,
            <br className="hidden sm:block" /> scaleable software.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-600 dark:text-ink-300 sm:text-xl"
          >
            I'm {site.name} — a {site.role.toLowerCase()} in {site.location}. {site.shortBio}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-primary group">
              View selected work
              <ArrowDownRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a href="#contact" className="btn-outline group">
              Get in touch
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          {/* Stats — gradient rule + gradient numbers */}
          <motion.dl
            variants={fadeUp}
            className="relative mt-16 grid w-full grid-cols-3 gap-6 pt-8 sm:gap-10"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent dark:via-ink-700"
            />
            {heroStats.map((stat) => (
              <div key={stat.k}>
                <dt className="bg-gradient-to-r from-ink-900 to-ink-600 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl dark:from-ink-50 dark:to-ink-300">
                  {stat.k}
                </dt>
                <dd className="mt-1 text-xs text-ink-500 dark:text-ink-400 sm:text-sm">
                  {stat.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  )
}
