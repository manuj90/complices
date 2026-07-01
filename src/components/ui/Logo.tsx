import logoBlanco from '@/assets/logo-blanco.svg'
import { cn } from '@/lib/utils'

type LogoVariant = 'header' | 'hero' | 'intro'

interface LogoProps {
  variant?: LogoVariant
  className?: string
}

const variantClasses: Record<LogoVariant, string> = {
  header: 'w-[clamp(90px,12vw,140px)]',
  intro: 'w-[min(88vw,520px)]',
  hero: 'w-56',
}

export function Logo({ variant = 'header', className }: LogoProps) {
  return (
    <img
      src={logoBlanco}
      alt="Cómplices"
      draggable={false}
      className={cn(
        'block h-auto object-contain',
        variantClasses[variant],
        'drop-shadow-[0_0_28px_rgba(234,80,33,0.18)]',
        variant === 'intro' && 'drop-shadow-[0_0_48px_rgba(234,80,33,0.22)]',
        className,
      )}
    />
  )
}