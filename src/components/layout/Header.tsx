import { Languages, Menu, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setStoredLanguage } from '@/i18n'
import { useTheme } from '@/context/ThemeContext'
import { AnimatedLogo } from '@/components/ui/AnimatedLogo'

const NAV = [
  { key: 'home', href: '#hero' },
  { key: 'about', href: '#nosotros' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'experience', href: '#experiencia' },
] as const

export function Header() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const toggleLang = () => {
    const next = i18n.language === 'es' ? 'en' : 'es'
    setStoredLanguage(next)
    void i18n.changeLanguage(next)
  }

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-10">
          <a href="#hero" className="shrink-0" onClick={() => setOpen(false)}>
            <AnimatedLogo className="h-8 lg:h-10" />
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:text-foreground"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={toggleLang}
              className="hidden items-center gap-1.5 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground lg:inline-flex"
              aria-label="Toggle language"
            >
              <Languages className="size-3.5" />
              {i18n.language.toUpperCase()}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="hidden text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground lg:inline-flex"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>

            <button
              type="button"
              className="inline-flex size-8 items-center justify-center text-foreground lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col bg-background lg:hidden"
          >
            <div className="h-16 shrink-0 border-b border-border/60 sm:h-[4.5rem]" />

            <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
              {NAV.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.35, ease: 'easeOut' }}
                  className="w-full max-w-xs py-3 text-center text-sm font-medium tracking-[0.28em] text-foreground uppercase transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </motion.a>
              ))}
            </nav>

            <div className="flex shrink-0 items-center justify-center gap-4 border-t border-border/60 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={toggleLang}
                aria-label={
                  i18n.language === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'
                }
                className="liquid-glass inline-flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <Languages className="size-5" strokeWidth={1.75} />
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
                }
                className="liquid-glass inline-flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                {theme === 'dark' ? (
                  <Sun className="size-5" strokeWidth={1.75} />
                ) : (
                  <Moon className="size-5" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}