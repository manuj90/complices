import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import type { PortfolioCategory, PortfolioItem } from '@/data/portfolio'
import { PortfolioMedia } from '@/components/portfolio/PortfolioMedia'
import { Panel } from '@/components/ui/Panel'
import { useDragScroll } from '@/hooks/useDragScroll'

const CARD_WIDTH = 'min(78vw, 320px)'

interface PortfolioGridProps {
  category: PortfolioCategory
}

function getItemTitle(t: (key: string, opts?: Record<string, unknown>) => string, item: PortfolioItem) {
  if (item.itemIndex !== undefined) {
    return t(`portfolio.items.${item.itemKey}`, { n: item.itemIndex })
  }
  return t(`portfolio.items.${item.itemKey}`)
}

export function PortfolioGrid({ category }: PortfolioGridProps) {
  const { t } = useTranslation()
  const trackRef = useDragScroll<HTMLDivElement>()

  const scrollBy = (direction: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.75 * direction, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {t('portfolio.drag')}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="inline-flex size-8 items-center justify-center rounded-full border border-border hover:border-foreground/50"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="inline-flex size-8 items-center justify-center rounded-full border border-border hover:border-foreground/50"
            aria-label="Siguiente"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={trackRef}
          className="portfolio-track scrollbar-hide -mx-6 flex gap-5 px-6 pb-2 md:-mx-0 md:px-0"
        >
          {category.items.map((item, index) => {
            const title = getItemTitle(t, item)
            return (
              <motion.article
                key={item.id}
                style={{ width: CARD_WIDTH }}
                className="shrink-0 snap-start"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              >
                <Panel interactive className="h-full rounded-3xl p-4 md:p-5">
                  <PortfolioMedia item={item} title={title} />
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-medium">{title}</h3>
                    <span className="shrink-0 text-[10px] text-muted-foreground tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </Panel>
              </motion.article>
            )
          })}
        </div>
      </div>
    </div>
  )
}