import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import caraDerBlanco from '@/assets/cara-der-blanca.svg'
import caraDerNegro from '@/assets/cara-der-negra.svg'
import caraIzqBlanco from '@/assets/cara-izq-blanca.svg'
import caraIzqNegro from '@/assets/cara-izq-negra.svg'
import nameBlanco from '@/assets/name-blanco.svg'
import nameNegro from '@/assets/name-negro.svg'
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

        // Frame 1: cara izquierda entra y se va
        .fromTo(
          '[data-alogo-face="left"]',
          { xPercent: -260, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.75 },
        )
        .to('[data-alogo-face="left"]', { xPercent: -260, opacity: 0, duration: 0.65 }, '+=0.35')

        // Frame 2: cara derecha entra y se va
        .fromTo(
          '[data-alogo-face="right"]',
          { xPercent: 260, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.75 },
        )
        .to('[data-alogo-face="right"]', { xPercent: 260, opacity: 0, duration: 0.65 }, '+=0.35')

        // Frame 3: se juntan, una entra por la izquierda y la otra por la derecha
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

        // Frame 4: giran juntas y aparece el nombre
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
        'relative flex w-[190px] items-center justify-center overflow-hidden md:w-[230px] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className,
      )}
    >
      <div className="flex items-center">
        <div data-alogo-faces className="relative flex shrink-0 items-center">
          <img
            data-alogo-face="left"
            src={caraIzqNegro}
            alt=""
            draggable={false}
            className={cn('h-7 w-auto dark:hidden md:h-9', FACE_OVERLAP_CLASS)}
          />
          <img
            data-alogo-face="left"
            src={caraIzqBlanco}
            alt=""
            draggable={false}
            className={cn('hidden h-7 w-auto dark:block md:h-9', FACE_OVERLAP_CLASS)}
          />
          <img
            data-alogo-face="right"
            src={caraDerNegro}
            alt="Cómplices"
            draggable={false}
            className="h-7 w-auto dark:hidden md:h-9"
          />
          <img
            data-alogo-face="right"
            src={caraDerBlanco}
            alt="Cómplices"
            draggable={false}
            className="hidden h-7 w-auto dark:block md:h-9"
          />
        </div>

        <img
          data-alogo-name
          src={nameNegro}
          alt=""
          draggable={false}
          className="ml-2 h-4 w-auto shrink-0 dark:hidden md:h-5"
        />
        <img
          data-alogo-name
          src={nameBlanco}
          alt=""
          draggable={false}
          className="ml-2 hidden h-4 w-auto shrink-0 dark:block md:h-5"
        />
      </div>
    </div>
  )
}
