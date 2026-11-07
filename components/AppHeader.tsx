import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface AppHeaderProps {
  label: string;
  onBack: () => void;
  right?: React.ReactNode;
  backOnEscape?: boolean;
}

// global-nav — ultra-thin black bar, icon-circular back button, centered nav-link label
export const AppHeader: React.FC<AppHeaderProps> = ({ label, onBack, right, backOnEscape = true }) => {
  useEffect(() => {
    if (!backOnEscape) return;
    const onKeyDown = (e: KeyboardEvent) => {
      // An open dialog handles its own Escape
      if (e.key === 'Escape' && !document.querySelector('[role="dialog"]')) onBack();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [backOnEscape, onBack]);

  return (
    <header className="relative z-20 w-full max-w-3xl mx-auto flex items-center justify-between px-4 py-3 shrink-0">
      <button
        onClick={onBack}
        aria-label="Voltar"
        className="flex w-11 h-11 shrink-0 items-center justify-center rounded-pill bg-chip-translucent text-ink transition-transform active:scale-95"
      >
        <ArrowLeft size={20} strokeWidth={1.5} />
      </button>
      <h2 className="text-[12px] font-normal uppercase tracking-[0.18em] text-ink-muted-80 flex-1 text-center px-2 truncate">
        {label}
      </h2>
      <div className="w-11 h-11 shrink-0 flex items-center justify-center">
        {right}
      </div>
    </header>
  );
};
