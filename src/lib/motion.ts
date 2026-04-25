import type { Variants, Transition } from 'framer-motion'

export const easing = [0.16, 1, 0.3, 1] as const

export const transition: Transition = {
  duration: 0.5,
  ease: easing,
}

export const transitionFast: Transition = {
  duration: 0.3,
  ease: easing,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition,
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionFast,
  },
}

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition,
  },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition,
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: transitionFast,
  },
}

export const stagger = (delay = 0.07, staggerDelay = 0.05): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: delay,
      delayChildren: staggerDelay,
    },
  },
})

export const heroStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const cardHover = {
  y: -6,
  transition: { duration: 0.25, ease: easing },
}

export const iconHover = {
  scale: 1.1,
  transition: { duration: 0.15, ease: easing },
}

export const dotReveal: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.15, duration: 0.4, ease: easing },
  },
}

export const lineReveal: Variants = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 1.2, ease: easing },
  },
}

export function getReducedVariants(
  variants: Variants,
  prefersReduced: boolean | null,
): Variants {
  if (!prefersReduced) return variants
  const reduced: Variants = {}
  for (const key of Object.keys(variants)) {
    reduced[key] = { opacity: key === 'hidden' ? 0 : 1 }
  }
  return reduced
}
