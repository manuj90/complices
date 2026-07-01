import { useEffect, useRef } from 'react'

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let isDragging = false
    let startX = 0
    let scrollStart = 0

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      isDragging = true
      startX = e.clientX
      scrollStart = el.scrollLeft
      el.setPointerCapture(e.pointerId)
      el.classList.add('is-dragging')
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      el.scrollLeft = scrollStart - (e.clientX - startX)
    }

    const endDrag = (e: PointerEvent) => {
      if (!isDragging) return
      isDragging = false
      el.classList.remove('is-dragging')
      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId)
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', endDrag)
    el.addEventListener('pointercancel', endDrag)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', endDrag)
      el.removeEventListener('pointercancel', endDrag)
    }
  }, [])

  return ref
}