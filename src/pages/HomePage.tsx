import { CursorGlow } from '@/components/effects/CursorGlow'
import { GrainOverlay } from '@/components/effects/GrainOverlay'
import { PageLoader } from '@/components/effects/PageLoader'
import { SmoothScroll } from '@/components/effects/SmoothScroll'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ExperienciaSection } from '@/components/sections/ExperienciaSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { NosotrosSection } from '@/components/sections/NosotrosSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'

export function HomePage() {
  return (
    <>
      <PageLoader />
      <SmoothScroll />
      <CursorGlow />
      <GrainOverlay />
      <Header />
      <main className="relative min-w-0 overflow-x-clip">
        <HeroSection />
        <NosotrosSection />
        <PortfolioSection />
        <ExperienciaSection />
      </main>
      <Footer />
    </>
  )
}