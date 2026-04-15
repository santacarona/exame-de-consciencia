import React from 'react';

interface WeddingRingsIconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * Duas alianças entrelaçadas — ícone customizado para o perfil Adulto.
 * Representa o matrimônio. Não existe equivalente na biblioteca Lucide.
 */
export const WeddingRingsIcon: React.FC<WeddingRingsIconProps> = ({
  size = 24,
  strokeWidth = 1.5,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Aliança esquerda — círculo completo */}
    <circle cx="8.5" cy="12" r="5.5" />
    {/* Aliança direita — arco externo (passa por trás da aliança esquerda) */}
    <path d="M 12,7.76 A 5.5,5.5 0 1,1 12,16.24" />
  </svg>
);
