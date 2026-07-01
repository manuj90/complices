import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/ui/Logo'

const SESSION_KEY = 'complices-loaded'

export function PageLoader() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SESSION_KEY))

  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(false)
    }, 1400)
    return () => window.clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Logo variant="intro" />
          </motion.div>
          <motion.p
            className="mt-8 text-xs tracking-[0.35em] text-muted-foreground uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t('loader.loading')}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}