import React from 'react';
import { UserType } from '../types';
import { Briefcase, Leaf, Church, ChevronRight, Baby, Scroll, GraduationCap } from 'lucide-react';
import { AdBanner } from './AdBanner';
import { SantaCaronaSignature } from './SantaCaronaSignature';

interface IntroSelectionProps {
  onSelect: (type: UserType) => void;
  onInstructions: () => void;
  onConfessionGuide: () => void;
}

interface ProfileOption {
  type: UserType;
  icon: React.ElementType;
  title: string;
  description: string;
}

const PROFILES: ProfileOption[] = [
  { type: 'child', icon: Baby, title: 'Criança', description: 'Pequenos passos na fé.' },
  { type: 'youth', icon: Leaf, title: 'Jovem', description: 'Para o início da jornada.' },
  { type: 'adult', icon: Briefcase, title: 'Adulto', description: 'Batalhas da maturidade.' },
  { type: 'seminarian', icon: GraduationCap, title: 'Seminarista', description: 'Formação e vocação.' },
  { type: 'priest', icon: Church, title: 'Sacerdote', description: 'Vocação e serviço ao altar.' },
  { type: 'general', icon: Scroll, title: 'Confissão Geral', description: 'Renovação completa da fé.' },
];

export const IntroSelection: React.FC<IntroSelectionProps> = ({ onSelect, onInstructions, onConfessionGuide }) => {
  return (
    <div className="relative flex-1 min-h-0 w-full overflow-y-auto bg-canvas animate-in fade-in duration-700">
      <main className="min-h-full flex flex-col px-6 w-full max-w-md md:max-w-3xl lg:max-w-5xl mx-auto z-10 py-10">

        {/* Everything except the signature is centered vertically in the space above it */}
        <div className="flex-1 flex flex-col justify-center">

        {/* Hero */}
        <div className="mb-8 md:mb-10 text-center flex flex-col items-center">
          <svg
            width="30" height="38"
            viewBox="0 0 32 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-primary mb-5 md:w-[40px] md:h-[50px] drop-shadow-[3px_5px_30px_rgba(0,0,0,0.22)]"
          >
            <line x1="16" y1="2" x2="16" y2="38" />
            <line x1="5" y1="12" x2="27" y2="12" />
          </svg>

          <h1 className="text-ink text-[34px] md:text-[48px] lg:text-[56px] leading-[1.1] font-semibold tracking-[-0.3px]">
            Exame de <span className="text-primary">Consciência</span>
          </h1>
        </div>

        {/* Support links */}
        <div className="flex items-center justify-center gap-3 mb-7 md:mb-10 text-[12px] md:text-[13px] font-normal tracking-[0.1em] text-ink-muted-48 font-sans uppercase">
          <button onClick={onInstructions} className="hover:text-primary transition-colors">
            Dúvidas sobre o app?
          </button>
          <span className="text-hairline select-none">·</span>
          <button onClick={onConfessionGuide} className="hover:text-primary transition-colors">
            Como se confessar?
          </button>
        </div>

        {/* Profile list */}
        <div className="flex flex-col gap-3 w-full md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {PROFILES.map(({ type, icon: Icon, title, description }) => (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className="group relative flex w-full items-center gap-4 rounded-lg bg-surface-pearl p-5 text-left transition-colors duration-200 active:scale-[0.98]"
            >
              <Icon className="text-primary w-7 h-7 shrink-0" strokeWidth={1.5} />
              <div className="flex-1 min-w-0">
                <h3 className="text-ink text-[17px] font-semibold tracking-[-0.1px] truncate">{title}</h3>
                <p className="text-body-muted text-[14px] leading-snug font-sans mt-0.5 truncate">
                  {description}
                </p>
              </div>
              <ChevronRight className="text-ink-muted-48 group-hover:text-primary transition-colors shrink-0" size={20} />
            </button>
          ))}
        </div>

        <AdBanner className="mt-5 md:mt-8" />
        </div>

        <footer className="w-full pt-8 flex items-center justify-center shrink-0">
          <SantaCaronaSignature />
        </footer>
      </main>
    </div>
  );
};
