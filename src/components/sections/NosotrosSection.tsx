import { useTranslation } from 'react-i18next'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { Panel } from '@/components/ui/Panel'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function NosotrosSection() {
  const { t } = useTranslation()
  const ref = useGsapReveal<HTMLElement>({ y: 60 })

  return (
    <section id="nosotros" ref={ref} className="relative scroll-mt-28 px-6 py-28 md:py-36">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div data-reveal>
          <SectionHeading title={t('about.title')} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[t('about.p1'), t('about.p2')].map((text) => (
            <Panel key={text} data-reveal interactive className="rounded-3xl p-8 md:p-10">
              <p className="font-display text-xl leading-relaxed text-foreground/90 md:text-2xl">
                {text}
              </p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  )
}