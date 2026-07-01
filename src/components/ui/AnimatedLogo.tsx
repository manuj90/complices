import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import caraDerBlanco from '@/assets/cara-der-blanca.svg'
import caraIzqBlanco from '@/assets/cara-izq-blanca.svg'
import nameBlanco from '@/assets/name-blanco.svg'
import { cn } from '@/lib/utils'

/** mr negativo = overlap de las caras en su posición final (mismo criterio que LogoIntro). */
const FACE_OVERLAP_CLASS = '-mr-3 md:-mr-4'

/**
 * Logo en loop: cara izq entra y se va, cara der entra y se va, se juntan,
 * giran y aparece el nombre. Se mantiene armado unos segundos y repite.
 */
export function AnimatedLogo({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.6, defaults: { ease: 'power2.inOut' } })

      tl.set('[data-alogo-faces]', { rotate: 0 })
        .set('[data-alogo-face="left"]', { xPercent: 0, opacity: 0 })
        .set('[data-alogo-face="right"]', { xPercent: 0, opacity: 0 })
        .set('[data-alogo-name]', { opacity: 0, scale: 0.85 })

        .fromTo(
          '[data-alogo-face="left"]',
          { xPercent: -260, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.75 },
        )
        .to('[data-alogo-face="left"]', { xPercent: -260, opacity: 0, duration: 0.65 }, '+=0.35')

        .fromTo(
          '[data-alogo-face="right"]',
          { xPercent: 260, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.75 },
        )
        .to('[data-alogo-face="right"]', { xPercent: 260, opacity: 0, duration: 0.65 }, '+=0.35')

        .fromTo(
          '[data-alogo-face="left"]',
          { xPercent: -260, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)' },
        )
        .fromTo(
          '[data-alogo-face="right"]',
          { xPercent: 260, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)' },
          '<',
        )

        .to('[data-alogo-faces]', { rotate: 360, duration: 1.1, ease: 'power2.inOut' })
        .to(
          '[data-alogo-name]',
          { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
          '-=0.4',
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative flex w-47.5 items-center justify-center overflow-hidden md:w-57.5 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className,
      )}
    >
      <div className="flex items-center">
        <div data-alogo-faces className="relative flex shrink-0 items-center">
          <img
            data-alogo-face="left"
            src={caraIzqBlanco}
            alt=""
            draggable={false}
            className={cn('h-7 w-auto md:h-9', FACE_OVERLAP_CLASS)}
          />
          <img
            data-alogo-face="right"
            src={caraDerBlanco}
            alt="Cómplices"
            draggable={false}
            className="h-7 w-auto md:h-9"
          />
        </div>

        <img
          data-alogo-name
          src={nameBlanco}
          alt=""
          draggable={false}
          className="ml-2 h-4 w-auto shrink-0 md:h-5"
        />
      </div>
    </div>
  )
}