import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 md:mb-14', className)}>
      <h2 className="font-display text-4xl font-light tracking-tight md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </div>
  )
}