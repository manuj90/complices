import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PanelProps {
  children: ReactNode
  className?: string
  interactive?: boolean
}

/** Panel plano y minimalista: sólo borde, sin blur ni brillo. */
export function Panel({ children, className, interactive = false }: PanelProps) {
  return (
    <div
      className={cn(
        'border border-border bg-card/40',
        interactive && 'transition-colors duration-300 hover:border-foreground/50',
        className,
      )}
    >
      {children}
    </div>
  )
}
