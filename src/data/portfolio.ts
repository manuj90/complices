export type PortfolioMediaType = 'video' | 'image' | 'iframe' | '360'

export type PortfolioCategoryId =
  | 'motion'
  | '3d'
  | 'branding'
  | 'photoshop'
  | 'illustrator'
  | 'webs'

export interface PortfolioItem {
  id: string
  categoryId: PortfolioCategoryId
  itemKey: string
  itemIndex?: number
  type: PortfolioMediaType
  src?: string
  poster?: string
}

export interface PortfolioCategory {
  id: PortfolioCategoryId
  items: PortfolioItem[]
}

const item = (
  categoryId: PortfolioCategoryId,
  itemKey: string,
  type: PortfolioMediaType,
  itemIndex?: number,
): PortfolioItem => ({
  id: `${categoryId}-${itemIndex ?? itemKey}`,
  categoryId,
  itemKey,
  itemIndex,
  type,
})

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: 'motion',
    items: Array.from({ length: 5 }, (_, i) => item('motion', 'motion', 'video', i + 1)),
  },
  {
    id: '3d',
    items: Array.from({ length: 5 }, (_, i) => item('3d', '3d', '360', i + 1)),
  },
  {
    id: 'branding',
    items: [item('branding', 'branding', 'video')],
  },
  {
    id: 'photoshop',
    items: Array.from({ length: 3 }, (_, i) => item('photoshop', 'photoshop', 'image', i + 1)),
  },
  {
    id: 'illustrator',
    items: Array.from({ length: 3 }, (_, i) => item('illustrator', 'illustrator', 'image', i + 1)),
  },
  {
    id: 'webs',
    items: Array.from({ length: 3 }, (_, i) => item('webs', 'web', 'iframe', i + 1)),
  },
]

export const EXPERIENCE_URL = 'https://oliverioespeleta.wixsite.com/complices'