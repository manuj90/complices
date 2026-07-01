import caraDerBlanco from '@/assets/cara-der-blanca.svg'
import caraDerNegro from '@/assets/cara-der-negra.svg'
import caraIzqBlanco from '@/assets/cara-izq-blanca.svg'
import caraIzqNegro from '@/assets/cara-izq-negra.svg'
import nameBlanco from '@/assets/name-blanco.svg'
import nameNegro from '@/assets/name-negro.svg'
import { cn } from '@/lib/utils'

/** mr negativo ≈ 34% del alto de la cara; recalibrar si cambian los breakpoints de altura. */
const FACE_OVERLAP_CLASS = '-mr-8 sm:-mr-9 md:-mr-10 lg:-mr-12'

export function LogoIntro({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative flex items-center justify-center">
        <img
          data-face="left"
          src={caraIzqNegro}
          alt=""
          draggable={false}
          className={cn('relative z-10 block h-24 w-auto dark:hidden sm:h-28 md:h-32 lg:h-36 xl:h-40', FACE_OVERLAP_CLASS)}
        />
        <img
          data-face="left"
          src={caraIzqBlanco}
          alt=""
          draggable={false}
          className={cn('relative z-10 hidden h-24 w-auto dark:block sm:h-28 md:h-32 lg:h-36 xl:h-40', FACE_OVERLAP_CLASS)}
        />
        <img
          data-face="right"
          src={caraDerNegro}
          alt="Cómplices"
          draggable={false}
          className="relative z-0 block h-24 w-auto dark:hidden sm:h-28 md:h-32 lg:h-36 xl:h-40"
        />
        <img
          data-face="right"
          src={caraDerBlanco}
          alt="Cómplices"
          draggable={false}
          className="relative z-0 hidden h-24 w-auto dark:block sm:h-28 md:h-32 lg:h-36 xl:h-40"
        />
      </div>

      <img
        data-logo-name
        src={nameNegro}
        alt=""
        draggable={false}
        className="mt-4 h-auto w-[min(88vw,320px)] sm:mt-5 sm:w-[min(78vw,360px)] lg:w-[min(72vw,380px)] dark:hidden"
      />
      <img
        data-logo-name
        src={nameBlanco}
        alt=""
        draggable={false}
        className="mt-4 hidden h-auto w-[min(88vw,320px)] sm:mt-5 sm:w-[min(78vw,360px)] lg:w-[min(72vw,380px)] dark:block"
      />
    </div>
  )
}
