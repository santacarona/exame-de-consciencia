import React, { useState } from 'react';
import { Copy, Check, RotateCcw, BookOpen, ArrowLeft, ScrollText, Diamond } from 'lucide-react';
import { PrayerModal } from './PrayerModal';
import { AdBanner } from './AdBanner';

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
    <div className="relative flex h-full w-full flex-col overflow-hidden animate-in fade-in duration-500">
      
      {/* Header - Removed bg, blur and border "blocks" */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4 sticky top-0 shrink-0">
        <button 
            onClick={onReset}
            className="flex items-center justify-center w-10 h-10 rounded-full text-parchment-dim hover:bg-primary-dim/50 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <ScrollText className="text-primary" size={24} strokeWidth={1.5} />
          <h1 className="text-lg font-bold tracking-tight text-white font-sans">Resumo da Confissão</h1>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto px-4 py-2 scroll-smooth">
        <div className="mb-6 text-center">
            <p className="text-sm text-parchment-dim/80 leading-relaxed px-2 font-sans">
                Abaixo estão os pontos que sua consciência examinou.
            </p>
        </div>

        <div className="relative flex flex-col mb-6">
            {/* Top Gradient Border - Kept as separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
            
            <div className="px-3 py-5 sm:p-6">
                {accusedSins.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-parchment-dim/60 gap-3">
                         <div className="p-3 rounded-full bg-obsidian/50 border border-primary/20">
                            <Check size={24} className="text-primary" />
                         </div>
                         <p className="text-sm font-sans">Nenhuma falta acusada.</p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {accusedSins.map((sin, index) => (
                            <li key={index} className="relative flex items-start gap-3 p-3 rounded-lg bg-obsidian/40 border border-primary-dim/30 hover:border-primary/40 transition-colors group">
                                <div className="mt-1 flex items-center justify-center shrink-0">
                                    {/* Purple Diamond Icon matching button */}
                                    <Diamond size={12} fill="#FF4F00" className="text-primary drop-shadow-[0_0_6px_rgba(255,79,0,0.4)]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-normal text-parchment leading-relaxed text-pretty font-sans">
                                        {sin}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        
        {/* Spacer for scrolling clearance - Increased to match top spacing visual */}
        <div className="h-10"></div>
      </main>

      {/* Footer - Removed bg, blur and border "blocks" */}
      <footer className="relative z-20 px-4 py-4 pb-6 flex flex-col gap-3 shrink-0">
        <AdBanner className="mb-1" />

        <button 
            onClick={() => setIsPrayerOpen(true)}
            className="group w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dim active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all duration-200"
        >
            <BookOpen className="group-hover:animate-pulse" size={24} />
            <span className="font-sans">Rezar Ato de Contrição</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
            <button 
                onClick={handleCopy}
                disabled={accusedSins.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-transparent border border-parchment-dim/40 hover:bg-primary/10 text-parchment-dim hover:text-white font-semibold py-3 px-4 rounded-lg transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                <span className="font-sans">{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
            
            <button 
                onClick={onReset}
                className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-primary-dim/30 text-[#5C5C5C] hover:text-parchment font-medium py-3 px-4 rounded-lg transition-colors active:scale-[0.98]"
            >
                <RotateCcw size={20} />
                <span className="font-sans">Finalizar</span>
            </button>
        </div>
        
        <p className="text-[10px] text-parchment-dim/30 font-sans tracking-widest uppercase text-center mt-2">
            Uma iniciativa Santa Carona
        </p>
      </footer>

      <PrayerModal 
        isOpen={isPrayerOpen} 
        onClose={() => setIsPrayerOpen(false)} 
      />

    </div>
  );
};