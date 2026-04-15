import React from 'react';
import {
  ArrowLeft,
  ListChecks,
  MousePointer2,
  Lock,
  Brain
} from 'lucide-react';
import { AdBanner } from './AdBanner';

interface InstructionsScreenProps {
  onBack: () => void;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onBack }) => {
  return (
    <div className="relative flex h-full w-full flex-col bg-transparent text-parchment font-display animate-in fade-in duration-500">

      {/* Background Texture Simulation (Offline safe) */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent mix-blend-overlay"></div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-4 bg-transparent shrink-0">
        <button 
          onClick={onBack}
          className="text-parchment/70 hover:text-parchment transition-colors flex w-10 h-10 items-center justify-center rounded-full hover:bg-white/5"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-parchment text-lg font-medium tracking-wide">
          Como funciona
        </h2>
        <div className="w-10 h-10"></div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto px-8 w-full max-w-md mx-auto scroll-smooth no-scrollbar py-4">

        <div className="flex flex-col gap-6 w-full items-center">
          
          {/* Step 1 Section */}
          <div className="flex flex-col w-full items-center">
            
            {/* Text Header with Icon - Left Aligned */}
            <div className="flex items-start gap-4 w-full max-w-xs pl-2">
                <div className="mt-1 text-primary shrink-0">
                  <Brain size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h3 className="text-[18px] font-bold text-parchment">
                    Passo 1: Avalie suas ações
                  </h3>
                  <p className="text-[15px] text-parchment-dim leading-relaxed font-normal">
                    Deslize os cards com as perguntas baseadas nos mandamentos.
                  </p>
                </div>
            </div>

            {/* Visual Interactive Demo - Minimalist - Centered below text */}
            <div className="relative h-36 w-full flex items-center justify-center mt-4 select-none">
              
              {/* Left Label */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-60">
                <span className="text-sm font-medium text-parchment-dim">← Não Pequei</span>
              </div>

              {/* Right Label - Using Purple/Gold instead of Red/Green */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                <span className="text-sm font-bold text-primary">Pequei →</span>
              </div>

              {/* The Card - No Italics, Cleaner */}
              <div className="relative z-10 w-32 h-44 bg-obsidian-light rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex items-center justify-center flex-col p-4 border border-parchment-dim/10">
                <p className="text-center text-[16px] font-medium text-parchment leading-snug">
                  "Faltei à Missa aos domingos?"
                </p>
                <div className="absolute bottom-4 animate-pulse text-parchment-dim/30">
                  <MousePointer2 size={20} strokeWidth={1.5} />
                </div>
              </div>

            </div>
          </div>

          {/* Step 2 Section */}
          <div className="flex items-start gap-4 w-full max-w-xs pl-2">
            <div className="mt-1 text-primary shrink-0">
              <ListChecks size={24} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <h3 className="text-[18px] font-bold text-parchment">
                Passo 2: Sua lista pronta
              </h3>
              <p className="text-[15px] text-parchment-dim leading-relaxed font-normal">
                Ao final, geramos um roteiro organizado para você levar ao confessionário. Sinta-se seguro.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full p-6 bg-transparent shrink-0 flex flex-col items-center">

        <AdBanner className="mb-4" />

        {/* Privacy Notice - Moved to bottom, discrete */}
        <div className="flex items-center gap-2 mb-4 opacity-50">
          <Lock size={12} className="text-parchment-dim" />
          <span className="text-[12px] text-parchment-dim font-normal tracking-wide font-sans">
            Sigilo Total. Seus dados nunca saem deste dispositivo.
          </span>
        </div>

        <button
          onClick={onBack}
          className="w-full h-14 rounded-lg bg-primary hover:bg-primary-dim active:scale-[0.98] transition-all duration-200 flex items-center justify-center shadow-lg mb-4"
        >
          <span className="text-obsidian text-sm font-bold tracking-[0.1em] uppercase font-sans">
            Voltar para tela inicial
          </span>
        </button>
        
        <p className="text-[10px] text-parchment/20 uppercase tracking-widest font-sans text-center">
            Uma iniciativa Santa Carona
        </p>
      </footer>
    </div>
  );
};