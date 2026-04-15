import React from 'react';

export const SantaCaronaSignature: React.FC = () => (
  <div className="flex flex-col items-center gap-1.5 opacity-60">
    <span className="text-[9px] text-parchment uppercase tracking-widest font-sans select-none">
      Uma iniciativa
    </span>
    <img
      src="https://santacarona.com.br/wp-content/uploads/2024/03/LOGO-SC-BRANCA.png"
      alt="Santa Carona"
      className="w-[70%] max-w-[160px] h-auto"
    />
  </div>
);
