export const BRAND = {
  burgundy: '#941612',
  orange: '#EA5021',
  amber: '#DE8F3B',
  teal: '#477C86',
  gray: '#6D6D6D',
  dark: '#232323',
  cream: '#F1E8E8',
} as const;

export type BrandColor = (typeof BRAND)[keyof typeof BRAND];