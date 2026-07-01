import { Box, ExternalLink, Film, ImageIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { PortfolioItem } from '@/data/portfolio'
import { cn } from '@/lib/utils'

/** Mismo ratio para todos los ítems del portfolio */
export const PORTFOLIO_MEDIA_FRAME =
  'relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted'

interface PortfolioMediaProps {
  item: PortfolioItem
  title: string
  className?: string
}

export function PortfolioMedia({ item, title, className }: PortfolioMediaProps) {
  const { t } = useTranslation()

  if (item.src) {
    if (item.type === 'iframe') {
      return (
        <div className={cn(PORTFOLIO_MEDIA_FRAME, className)}>
          <iframe
            src={item.src}
            title={title}
            className="pointer-events-none absolute inset-0 size-full scale-[0.85] border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            referrerPolicy="no-referrer"
            tabIndex={-1}
          />
        </div>
      )
    }

    if (item.type === 'image') {
      return (
        <div className={cn(PORTFOLIO_MEDIA_FRAME, className)}>
          <img
            src={item.src}
            alt={title}
            className="size-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
      )
    }

    return (
      <div className={cn(PORTFOLIO_MEDIA_FRAME, className)}>
        <video
          src={item.src}
          poster={item.poster}
          controls
          playsInline
          className="size-full object-cover"
        />
      </div>
    )
  }

  const Icon =
    item.type === '360' ? Box : item.type === 'iframe' ? ExternalLink : item.type === 'image' ? ImageIcon : Film

  return (
    <div
      className={cn(
        PORTFOLIO_MEDIA_FRAME,
        'flex flex-col items-center justify-center gap-3 border border-dashed border-border/80 bg-muted/30 p-6 text-center',
        className,
      )}
    >
      <Icon className="size-8 text-muted-foreground" strokeWidth={1.25} />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {item.type === '360' ? t('portfolio.pending360') : t('portfolio.pending')}
        </p>
      </div>
      {item.type === '360' ? (
        <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-secondary uppercase">
          360°
        </span>
      ) : null}
    </div>
  )
}