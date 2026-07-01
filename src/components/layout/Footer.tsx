import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative z-10 border-t border-border/50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <Logo variant="header" className="opacity-80" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cómplices — {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}