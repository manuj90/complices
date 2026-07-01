import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/logo'

export function AboutPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-brand-cream"
      >
        <ArrowLeft className="size-4" />
        Volver
      </Link>

      <Logo variant="hero" className="mb-6" />

      <p className="font-display text-lg italic text-muted-foreground">
        Formar parte de algo más grande que vos.
      </p>
    </main>
  )
}