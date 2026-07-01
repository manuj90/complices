import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { PORTFOLIO_CATEGORIES, type PortfolioCategoryId } from '@/data/portfolio'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { Panel } from '@/components/ui/Panel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

export function PortfolioSection() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<PortfolioCategoryId>('motion')
  const ref = useGsapReveal<HTMLElement>({ y: 40 })

  const active = PORTFOLIO_CATEGORIES.find((c) => c.id === activeId) ?? PORTFOLIO_CATEGORIES[0]

  return (
    <section id="portfolio" ref={ref} className="relative scroll-mt-28 py-28 md:py-36">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div data-reveal>
          <SectionHeading title={t('portfolio.title')} description={t('portfolio.description')} />
        </div>

        <div data-reveal className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {PORTFOLIO_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(category.id)}
              className={cn(
                'shrink-0 rounded-full px-4 py-2.5 text-sm transition-all',
                activeId === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50',
              )}
            >
              {t(`portfolio.categories.${category.id}.label`)}
              <span className="ml-1.5 text-xs opacity-70">({category.items.length})</span>
            </button>
          ))}
        </div>

        <Panel data-reveal className="mb-8 rounded-2xl px-5 py-4">
          <p className="text-sm text-muted-foreground">
            {t(`portfolio.categories.${active.id}.description`)}
          </p>
        </Panel>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <PortfolioGrid category={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}