import { motion } from 'motion/react'
import { Logo } from '@/components/ui/Logo'

export function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <Logo variant="intro" />
        <p className="max-w-md text-sm text-muted-foreground">
          Sitio de marca en construcción.
        </p>
      </motion.div>
    </main>
  )
}