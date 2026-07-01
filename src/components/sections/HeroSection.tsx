import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaultyTerminal } from '@/components/effects/FaultyTerminal'
import { LogoIntro } from '@/components/ui/LogoIntro'
import { useTheme } from '@/context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.6)' } })
      tl.from('[data-face="left"]', { xPercent: -140, rotate: -20, opacity: 0, duration: 1 })
        .from('[data-face="right"]', { xPercent: 140, rotate: 20, opacity: 0, duration: 1 }, '<')
        .to('[data-hero-logo]', { scale: 1.04, duration: 0.18, ease: 'power1.out' })
        .to('[data-hero-logo]', { scale: 1, duration: 0.3, ease: 'power2.out' })
        .from(
          '[data-logo-name]',
          { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out' },
          '-=0.25',
        )
        .from('[data-hero-tagline]', { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out' }, '-=0.3')
        .from('[data-hero-sub]', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.55')
        .from(
          '[data-hero-cta]',
          { opacity: 0, y: 16, stagger: 0.12, duration: 0.7, ease: 'power3.out' },
          '-=0.45',
        )
        .add(() => {
          // Recién acá, con la entrada ya asentada, armamos el scroll-parallax:
          // si se crea en paralelo, pisa las mismas props (xPercent/rotate) y corta la entrada.
          gsap.to('[data-face="left"]', {
            xPercent: -60,
            rotate: -12,
            ease: 'none',
            scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
          })
          gsap.to('[data-face="right"]', {
            xPercent: 60,
            rotate: 12,
            ease: 'none',
            scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
          })
          gsap.to('[data-hero-logo], [data-hero-tagline], [data-hero-sub], [data-hero-cta]', {
            opacity: 0,
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: '60% top',
              scrub: true,
            },
          })
        })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative grid min-h-screen grid-cols-1 overflow-hidden pt-16 md:grid-cols-2 lg:pt-20"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <FaultyTerminal
          scale={1.2}
          gridMul={[2, 1]}
          digitSize={2.3}
          timeScale={0.7}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          curvature={0.1}
          tint="#ea5021"
          backgroundColor={theme === 'dark' ? '#141414' : '#f4ecec'}
          mouseReact
          mouseStrength={0.9}
          pageLoadAnimation
          brightness={0.6}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6 py-16 text-center">
        <div data-hero-logo>
          <LogoIntro />
        </div>

        <p
          data-hero-tagline
          className="text-sm font-normal whitespace-nowrap text-muted-foreground md:text-base"
        >
          {t('hero.tagline')}
        </p>
      </div>

      <div className="relative z-10 flex flex-col justify-end gap-6 border-t border-border/60 px-6 py-10 md:border-t-0 md:border-l md:px-12 md:py-16 lg:px-16">
        <div className="space-y-3">
          <span
            data-hero-sub
            className="block text-xs font-semibold tracking-[0.3em] text-primary uppercase"
          >
            {t('hero.eyebrow')}
          </span>
          <h1
            data-hero-sub
            className="font-display max-w-sm text-2xl leading-snug font-medium md:text-3xl"
          >
            {t('hero.heading')}
          </h1>
          <p data-hero-sub className="max-w-sm text-sm leading-relaxed text-foreground/70 md:text-base">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            data-hero-cta
            href="#portfolio"
            className="inline-flex items-center justify-center border border-border px-6 py-3 text-xs font-semibold tracking-[0.2em] text-foreground uppercase transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            {t('hero.ctaPortfolio')}
          </a>
          <a
            data-hero-cta
            href="#experiencia"
            className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-xs font-semibold tracking-[0.2em] text-foreground uppercase transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <Sparkles className="size-3.5" />
            {t('hero.ctaExperience')}
          </a>
        </div>
      </div>

      <a
        href="#nosotros"
        aria-label={t('hero.scroll')}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  )
}