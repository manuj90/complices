import logoSrc from '../../assets/Logo.svg';

type LogoVariant = 'header' | 'intro' | 'hero' | 'about';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

export function Logo({ variant = 'header', className = '' }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Cómplices"
      className={`logo logo--${variant} ${className}`.trim()}
      draggable={false}
    />
  );
}