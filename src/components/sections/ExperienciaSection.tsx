import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EXPERIENCE_URL } from '@/data/portfolio'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { Panel } from '@/components/ui/Panel'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function ExperienciaSection() {
  const { t } = useTranslation()
  const ref = useGsapReveal<HTMLElement>({ y: 50 })

  return (
    <section id="experiencia" ref={ref} className="relative scroll-mt-28 px-6 py-28 md:py-36">
      <div className="relative z-10 mx-auto max-w-6xl">
        <Panel data-reveal className="relative overflow-hidden rounded-4xl p-8 md:p-14">
          <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-secondary/25 blur-3xl" />

          <div className="relative max-w-2xl">
            <SectionHeading
              title={t('experience.title')}
              description={t('experience.description')}
              className="mb-8"
            />

            <a
              href={EXPERIENCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex"
            >
              <Panel
                interactive
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary/90 px-7 text-sm font-medium text-primary-foreground"
              >
                {t('experience.cta')}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Panel>
            </a>
          </div>
        </Panel>
      </div>
    </section>
  )
}