import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'

export function CursorGlow() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 120, damping: 20 })
  const springY = useSpring(y, { stiffness: 120, damping: 20 })
  const background = useMotionTemplate`radial-gradient(500px circle at ${springX}px ${springY}px, rgba(234,80,33,0.14), transparent 65%)`

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-1 hidden md:block"
      style={{ background }}
      aria-hidden
    />
  )
}