import logoBlanco from '@/assets/logo-blanco.svg'
import logoNego from '@/assets/logo-nego.svg'
import { cn } from '@/lib/utils'

type LogoVariant = 'header' | 'hero' | 'intro'

interface LogoProps {
  variant?: LogoVariant
  className?: string
}

const variantClasses: Record<LogoVariant, string> = {
  header: 'w-[clamp(100px,14vw,150px)]',
  intro: 'w-[min(88vw,520px)]',
  hero: 'w-56',
}

export function Logo({ variant = 'header', className }: LogoProps) {
  return (
    <picture className={cn('block', className)}>
      <source srcSet={logoBlanco} media="(prefers-color-scheme: dark)" />
      <img
        src={logoNego}
        alt="Cómplices"
        draggable={false}
        className={cn(
          'block h-auto object-contain',
          variantClasses[variant],
          'drop-shadow-[0_0_20px_rgba(35,35,35,0.15)]',
          'dark:drop-shadow-[0_0_20px_rgba(241,232,232,0.12)]',
          variant === 'intro' &&
            'dark:drop-shadow-[0_0_40px_rgba(234,80,33,0.2)]',
        )}
      />
    </picture>
  )
}