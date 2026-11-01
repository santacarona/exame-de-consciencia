import React, { useState } from 'react';
import { Copy, Check, RotateCcw, BookOpen, ScrollText } from 'lucide-react';
import { PrayerModal } from './PrayerModal';
import { AdBanner } from './AdBanner';
import { SantaCaronaSignature } from './SantaCaronaSignature';
import { AppHeader } from './AppHeader';

interface ResultsScreenProps {
  accusedSins: string[];
  onReset: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ accusedSins, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);

  const handleCopy = () => {
    const text = "Meus Pecados:\n\n" + accusedSins.map(s => `- ${s}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas overflow-hidden animate-in fade-in duration-500">

      <AppHeader
        label="Resumo da Confissão"
        onBack={onReset}
        right={<ScrollText className="text-primary" size={20} strokeWidth={1.5} />}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 py-2 scroll-smooth">
        <p className="text-body-muted text-[14px] leading-relaxed px-1 font-sans text-center mb-6">
          Abaixo estão os pontos que sua consciência examinou.
        </p>

        {accusedSins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-body-muted gap-3 border border-hairline rounded-lg bg-surface-pearl">
            <Check size={24} className="text-primary" />
            <p className="text-[14px] font-sans">Nenhuma falta acusada.</p>
          </div>
        ) : (
          <ul className="flex flex-col">
            {accusedSins.map((sin, index) => (
              <li
                key={index}
                className="flex items-start gap-3 py-4 border-t border-hairline first:border-t-0"
              >
                <span className="mt-[7px] w-1.5 h-1.5 rounded-pill bg-primary shrink-0" />
                <p className="text-[16px] font-normal text-ink leading-[1.47] tracking-[-0.2px] font-sans">
                  {sin}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="h-8" />
      </main>

      {/* Footer */}
      <footer className="relative z-20 px-5 py-4 pb-6 flex flex-col gap-3 shrink-0">
        <AdBanner className="mb-1" />

        <button
          onClick={() => setIsPrayerOpen(true)}
          className="w-full flex items-center justify-center gap-3 bg-primary text-white font-semibold text-[15px] py-3.5 px-6 rounded-pill transition-transform active:scale-95"
        >
          <BookOpen size={20} />
          <span className="font-sans">Rezar Ato de Contrição</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            disabled={accusedSins.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-surface-pearl border border-hairline text-ink-muted-80 font-semibold text-[14px] py-3 px-4 rounded-md transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copied ? <Check size={18} className="text-primary" /> : <Copy size={18} />}
            <span className="font-sans">{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 bg-transparent text-ink-muted-48 font-semibold text-[14px] py-3 px-4 rounded-md transition-transform active:scale-95 hover:text-ink-muted-80"
          >
            <RotateCcw size={18} />
            <span className="font-sans">Finalizar</span>
          </button>
        </div>

        <SantaCaronaSignature />
      </footer>

      <PrayerModal
        isOpen={isPrayerOpen}
        onClose={() => setIsPrayerOpen(false)}
      />

    </div>
  );
};
