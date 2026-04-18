import { motion } from 'framer-motion'

// Small wrapper for scroll-triggered fade-up.
export default function Reveal({
  children,
  delay = 0,
  y = 16,
  x = 0,
  className = '',
  as: Tag = 'div',
  once = true,
  amount = 0.2,
}) {
  const MotionTag = motion[Tag] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
