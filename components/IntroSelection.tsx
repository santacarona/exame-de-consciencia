import React from 'react';
import { UserType } from '../types';
import { Leaf, Church, ChevronRight, Baby, Scroll } from 'lucide-react';
import { AdBanner } from './AdBanner';
import { WeddingRingsIcon } from './WeddingRingsIcon';

interface IntroSelectionProps {
  onSelect: (type: UserType) => void;
  onInstructions: () => void;
  onConfessionGuide: () => void;
}

export const IntroSelection: React.FC<IntroSelectionProps> = ({ onSelect, onInstructions, onConfessionGuide }) => {
  return (
    <div className="relative flex h-full w-full flex-col animate-in fade-in duration-700">

      {/* Header Placeholder (To match design spacing) */}
      <header className="flex items-center justify-between p-4 pb-2 z-10 min-h-[56px] shrink-0"></header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-6 w-full max-w-md mx-auto z-10 py-4">

        {/* Hero Title Section */}
        <div className="mb-3 text-center relative w-full">
          <h1 className="text-parchment text-[32px] font-serif font-normal leading-[1.15] tracking-wide text-glow mb-2">
            Exame de<br/><span className="text-primary">Consciência</span>
          </h1>
        </div>

        {/* Links de Suporte (Minimalista - Opção 1) */}
        <div className="flex items-center justify-center gap-3 mb-6 text-sm font-bold tracking-[0.1em] text-parchment/40 font-sans uppercase">
            <button 
                onClick={onInstructions}
                className="hover:text-primary transition-colors border-b border-transparent hover:border-primary/30 pb-0.5"
            >
                Dúvidas sobre o app?
            </button>
            <span className="text-parchment/10 select-none">|</span>
            <button 
                onClick={onConfessionGuide}
                className="hover:text-primary transition-colors border-b border-transparent hover:border-primary/30 pb-0.5"
            >
                Como se confessar?
            </button>
        </div>

        {/* Selection List */}
        <div className="flex flex-col gap-3 w-full">
          
          {/* Card Criança */}
          <button
            onClick={() => onSelect('child')}
            className="group relative flex w-full items-center gap-4 rounded-xl border border-primary/20 bg-obsidian-light p-4 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 active:scale-95 text-left"
          >
            <Baby className="text-primary w-9 h-9 shrink-0 ml-1" strokeWidth={1.5} />
            <div className="flex-1">
              <h3 className="text-parchment text-lg font-serif mb-0.5">Criança</h3>
              <p className="text-parchment-dim text-sm leading-snug opacity-70 font-sans">
                Pequenos passos na fé.
              </p>
            </div>
            <ChevronRight className="text-parchment/30 group-hover:text-primary/60 transition-colors" />
          </button>

          {/* Card Jovem */}
          <button
            onClick={() => onSelect('youth')}
            className="group relative flex w-full items-center gap-4 rounded-xl border border-primary/20 bg-obsidian-light p-4 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 active:scale-95 text-left"
          >
            <Leaf className="text-primary w-9 h-9 shrink-0 ml-1" strokeWidth={1.5} />
            <div className="flex-1">
              <h3 className="text-parchment text-lg font-serif mb-0.5">Jovem</h3>
              <p className="text-parchment-dim text-sm leading-snug opacity-70 font-sans">
                Para o início da jornada.
              </p>
            </div>
            <ChevronRight className="text-parchment/30 group-hover:text-primary/60 transition-colors" />
          </button>

          {/* Card Adulto */}
          <button
            onClick={() => onSelect('adult')}
            className="group relative flex w-full items-center gap-4 rounded-xl border border-primary/20 bg-obsidian-light p-4 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 active:scale-95 text-left"
          >
            <WeddingRingsIcon size={36} strokeWidth={1.5} className="text-primary shrink-0 ml-1" />
            <div className="flex-1">
              <h3 className="text-parchment text-lg font-serif mb-0.5">Adulto</h3>
              <p className="text-parchment-dim text-sm leading-snug opacity-70 font-sans">
                Batalhas da maturidade.
              </p>
            </div>
            <ChevronRight className="text-parchment/30 group-hover:text-primary/60 transition-colors" />
          </button>

          {/* Card Sacerdote */}
          <button
            onClick={() => onSelect('priest')}
            className="group relative flex w-full items-center gap-4 rounded-xl border border-primary/20 bg-obsidian-light p-4 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 active:scale-95 text-left"
          >
            <Church className="text-primary w-9 h-9 shrink-0 ml-1" strokeWidth={1.5} />
            <div className="flex-1">
              <h3 className="text-parchment text-lg font-serif mb-0.5">Sacerdote</h3>
              <p className="text-parchment-dim text-sm leading-snug opacity-70 font-sans">
                Vocação e serviço ao altar.
              </p>
            </div>
            <ChevronRight className="text-parchment/30 group-hover:text-primary/60 transition-colors" />
          </button>

          {/* Card Confissão Geral */}
          <button
            onClick={() => onSelect('general')}
            className="group relative flex w-full items-center gap-4 rounded-xl border border-parchment/15 bg-obsidian-light p-4 transition-all duration-300 hover:border-parchment/35 hover:bg-parchment/5 active:scale-95 text-left"
          >
            <Scroll className="text-parchment/70 w-9 h-9 group-hover:text-parchment transition-colors shrink-0 ml-1" strokeWidth={1.5} />
            <div className="flex-1">
              <h3 className="text-parchment/90 text-lg font-serif mb-0.5 tracking-wide">
                Confissão Geral
              </h3>
              <p className="text-parchment-dim/70 text-sm leading-snug opacity-80 font-sans">
                Renovação completa da fé.
              </p>
            </div>
            <ChevronRight className="text-parchment/20 group-hover:text-parchment/50 transition-colors" />
          </button>

          <AdBanner className="mt-2" />
          
        </div>
      </main>

      <footer className="relative z-10 w-full py-3 flex items-center justify-center shrink-0">
          <p className="text-[10px] text-parchment/20 uppercase tracking-widest font-sans">
              Uma iniciativa Santa Carona
          </p>
      </footer>
    </div>
  );
};