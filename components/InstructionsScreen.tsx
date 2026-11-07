import React from 'react';
import { ListChecks, MousePointer2, Lock, Brain } from 'lucide-react';
import { AdBanner } from './AdBanner';
import { SantaCaronaSignature } from './SantaCaronaSignature';
import { AppHeader } from './AppHeader';

interface InstructionsScreenProps {
  onBack: () => void;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onBack }) => {
  return (
    <div className="relative flex flex-1 min-h-0 w-full flex-col bg-canvas text-ink font-sans animate-in fade-in duration-500">

      <AppHeader label="Como funciona" onBack={onBack} />

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto px-6 w-full max-w-md mx-auto scroll-smooth py-4">

        <div className="flex flex-col gap-8 w-full">

          {/* Step 1 */}
          <div className="flex flex-col w-full">
            <div className="flex items-start gap-4 w-full">
              <Brain size={22} strokeWidth={1.5} className="text-primary shrink-0 mt-1" />
              <div className="flex flex-col gap-1 text-left">
                <h3 className="text-[17px] font-semibold tracking-[-0.2px] text-ink">
                  Passo 1: Avalie suas ações
                </h3>
                <p className="text-[15px] text-body-muted leading-relaxed font-normal">
                  Deslize os cards com as perguntas baseadas nos mandamentos.
                </p>
              </div>
            </div>

            {/* Visual demo */}
            <div className="relative h-36 w-full flex items-center justify-center mt-6 select-none">
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <span className="text-[13px] font-normal text-ink-muted-48">← Não Pequei</span>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <span className="text-[13px] font-semibold text-primary">Pequei →</span>
              </div>

              <div className="relative z-10 w-32 h-44 bg-surface-pearl border border-hairline rounded-lg flex items-center justify-center flex-col p-4">
                <p className="text-center text-[15px] font-semibold text-ink leading-snug">
                  "Faltei à Missa aos domingos?"
                </p>
                <div className="absolute bottom-4 animate-pulse text-ink-muted-48">
                  <MousePointer2 size={18} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4 w-full">
            <ListChecks size={22} strokeWidth={1.5} className="text-primary shrink-0 mt-1" />
            <div className="flex flex-col gap-1 text-left">
              <h3 className="text-[17px] font-semibold tracking-[-0.2px] text-ink">
                Passo 2: Sua lista pronta
              </h3>
              <p className="text-[15px] text-body-muted leading-relaxed font-normal">
                Ao final, geramos um roteiro organizado para você levar ao confessionário. Sinta-se seguro.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full p-6 shrink-0 flex flex-col items-center">
        <AdBanner className="mb-4" />

        <div className="flex items-center gap-2 mb-4 opacity-60">
          <Lock size={12} className="text-ink-muted-48" />
          <span className="text-[12px] text-ink-muted-48 font-normal tracking-wide font-sans">
            Sigilo Total. Seus dados nunca saem deste dispositivo.
          </span>
        </div>

        <button
          onClick={onBack}
          className="w-full h-14 rounded-pill bg-primary active:scale-95 transition-transform duration-150 flex items-center justify-center mb-4"
        >
          <span className="text-white text-[14px] font-semibold tracking-[0.08em] uppercase font-sans">
            Voltar para tela inicial
          </span>
        </button>

        <SantaCaronaSignature />
      </footer>
    </div>
  );
};
