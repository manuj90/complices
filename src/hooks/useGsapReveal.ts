import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function useGsapReveal<T extends HTMLElement>(options?: {
  y?: number
  stagger?: number
  start?: string
}) {
  const ref = useRef<T>(null)
  const { y = 48, stagger = 0.08, start = 'top 82%' } = options ?? {}

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('[data-reveal]')
    const items = targets.length ? targets : [el]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [y, stagger, start])

  return ref
}