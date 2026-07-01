import { Languages, Menu, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setStoredLanguage } from '@/i18n'
import { useTheme } from '@/context/ThemeContext'
import { AnimatedLogo } from '@/components/ui/AnimatedLogo'
import { cn } from '@/lib/utils'

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

  return (
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
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <motion.nav
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className={cn('overflow-hidden border-t border-border/60 lg:hidden')}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                className="block py-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                onClick={() => setOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={toggleLang}
              className="py-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
            >
              {i18n.language === 'es' ? 'English' : 'Español'}
            </button>
          </li>
        </ul>
      </motion.nav>
    </header>
  )
}
