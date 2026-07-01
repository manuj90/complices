import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { BlurText } from '@/components/effects/BlurText'
import { FaultyTerminal } from '@/components/effects/FaultyTerminal'
import VariableProximity from '@/components/effects/VariableProximity'
import { LogoIntro } from '@/components/ui/LogoIntro'
import { useTheme } from '@/context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const rootRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

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
        .from('[data-hero-sub]', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.35')
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
      className="relative grid min-h-[100dvh] grid-cols-1 overflow-hidden pt-16 md:grid-cols-2 lg:min-h-screen lg:pt-20"
    >
      <div
        className={`absolute inset-0 z-0 ${theme === 'dark' ? 'opacity-40' : 'opacity-[0.22]'}`}
      >
        <FaultyTerminal
          scale={1.2}
          gridMul={[2, 1]}
          digitSize={2.3}
          timeScale={0.7}
          scanlineIntensity={theme === 'dark' ? 1 : 0.4}
          glitchAmount={1}
          flickerAmount={theme === 'dark' ? 1 : 0.35}
          noiseAmp={theme === 'dark' ? 1 : 0.75}
          curvature={0.1}
          tint={theme === 'dark' ? '#ea5021' : '#c9907a'}
          squareColor={theme === 'dark' ? '#e6e6e6' : '#f0e4e0'}
          squareGlowColor={theme === 'dark' ? '#ffffff' : '#f7efef'}
          backgroundColor={theme === 'dark' ? '#141414' : '#f4ecec'}
          maskRange={theme === 'dark' ? [0.12, 0.55] : [0.36, 0.82]}
          mouseReact
          mouseStrength={theme === 'dark' ? 0.9 : 0.5}
          pageLoadAnimation
          brightness={theme === 'dark' ? 0.6 : 0.28}
        />
      </div>

      <div className="relative z-10 flex min-w-0 flex-col items-center justify-center gap-8 px-4 py-12 text-center sm:gap-10 sm:px-6 sm:py-16 md:py-10 lg:py-16">
        <div data-hero-logo className="w-full max-w-sm sm:max-w-none">
          <LogoIntro />
        </div>

        <div data-hero-tagline className="w-full max-w-lg overflow-hidden px-1">
          <BlurText
            key={t('hero.tagline')}
            text={t('hero.tagline')}
            delay={100}
            animateBy="words"
            direction="top"
            immediate
            animationFrom={{ filter: 'blur(8px)', opacity: 0, y: -20 }}
            animationTo={[
              { filter: 'blur(4px)', opacity: 0.5, y: 4 },
              { filter: 'blur(0px)', opacity: 1, y: 0 },
            ]}
            className="justify-center text-base font-normal text-muted-foreground sm:text-lg md:text-[1.05rem] lg:text-lg xl:text-xl"
          />
        </div>
      </div>

      <div className="relative z-10 flex min-w-0 flex-col justify-end gap-5 border-t border-border/60 px-4 py-8 sm:gap-6 sm:px-6 sm:py-10 md:border-t-0 md:border-l md:px-8 md:py-12 lg:px-16 lg:py-16">
        <div ref={headingRef} className="min-w-0 space-y-3 sm:space-y-4">
          <span
            data-hero-sub
            className="block text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:tracking-[0.3em] md:text-sm"
          >
            {t('hero.eyebrow')}
          </span>
          <h1
            data-hero-sub
            className="w-full max-w-md text-[1.75rem] leading-tight font-medium sm:text-3xl md:text-[1.85rem] md:leading-snug lg:text-4xl xl:text-5xl xl:leading-[1.1]"
          >
            <VariableProximity
              label={t('hero.heading')}
              containerRef={headingRef}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 800, 'opsz' 40"
              radius={120}
              falloff="linear"
            />
          </h1>
          <p
            data-hero-sub
            className="w-full max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base md:text-[0.95rem] md:leading-relaxed lg:text-lg"
          >
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            data-hero-cta
            href="#portfolio"
            className="liquid-glass inline-flex w-full items-center justify-center px-5 py-3 text-[0.65rem] font-semibold tracking-[0.16em] text-foreground uppercase transition-[color,background-color,box-shadow] duration-500 ease-out hover:bg-foreground hover:text-background hover:shadow-none sm:w-auto sm:px-6 sm:text-xs sm:tracking-[0.2em] dark:hover:bg-foreground dark:hover:text-background"
          >
            {t('hero.ctaPortfolio')}
          </a>
          <a
            data-hero-cta
            href="#experiencia"
            className="liquid-glass inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-[0.65rem] font-semibold tracking-[0.16em] text-foreground uppercase transition-[color,background-color,box-shadow] duration-500 ease-out hover:bg-foreground hover:text-background hover:shadow-none sm:w-auto sm:px-6 sm:text-xs sm:tracking-[0.2em] dark:hover:bg-foreground dark:hover:text-background"
          >
            <Sparkles className="size-3.5" />
            {t('hero.ctaExperience')}
          </a>
        </div>
      </div>
    </section>
  )
}