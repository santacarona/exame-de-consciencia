import React from 'react';
import { Flame } from 'lucide-react';
import { SantaCaronaSignature } from './SantaCaronaSignature';
import { AppHeader } from './AppHeader';

interface PreparationScreenProps {
  onComplete: () => void;
  onBack?: () => void;
}

export const PreparationScreen: React.FC<PreparationScreenProps> = ({ onComplete, onBack }) => {
  return (
    <div className="relative z-10 flex flex-col flex-1 min-h-0 w-full bg-canvas text-ink font-sans overflow-hidden animate-in fade-in duration-700">

      {onBack ? (
        <AppHeader label="Oração Preparatória" onBack={onBack} />
      ) : (
        <div className="h-14 shrink-0 flex items-center justify-center">
          <span className="text-[12px] uppercase tracking-[0.18em] text-ink-muted-80">Oração Preparatória</span>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-4 w-full max-w-md mx-auto overflow-y-auto scroll-smooth">

        <Flame
          size={52}
          strokeWidth={1.25}
          className="text-primary mb-9 shrink-0 drop-shadow-[3px_5px_30px_rgba(0,0,0,0.22)]"
        />

        <div className="max-w-sm mx-auto flex flex-col gap-4">
          <p className="text-ink-muted-80 text-[17px] leading-[1.47] tracking-[-0.374px] text-left font-sans">
            Meu bom Deus e Salvador, Pai de misericórdia, eis-me aqui prostrado aos vossos pés, cheio de confusão e de remorsos, qual outro filho pródigo que volta arrependido à casa paterna.
          </p>
          <p className="text-ink-muted-80 text-[17px] leading-[1.47] tracking-[-0.374px] text-left font-sans">
            Não mereço perdão, porque desgostei demasiadamente a vossa bondade infinita. Mas sei que não olhais para os meus pecados senão para perdoá-los, como Pai misericordioso que sois.
          </p>
          <p className="text-ink-muted-80 text-[17px] leading-[1.47] tracking-[-0.374px] text-left font-sans">
            Pelos méritos inefáveis do vosso Filho, crucificado e morto por meu amor, pelos méritos do seu Preciosíssimo Sangue, pelas suas lágrimas e agonia, tende piedade de mim. Dai-me luz para conhecer os meus pecados; sincero arrependimento para os aborrecer; firme propósito para nunca mais os cometer; ânimo para os acusar e para cumprir com a devida penitência.
          </p>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10 w-full px-6 pb-6 pt-4 max-w-md mx-auto shrink-0 flex flex-col gap-4">
        <button
          onClick={onComplete}
          className="w-full flex items-center justify-center h-14 bg-primary text-white text-[17px] font-semibold tracking-[0.04em] rounded-pill transition-transform duration-150 active:scale-95"
        >
          <span>AMÉM</span>
        </button>
        <SantaCaronaSignature />
      </div>

    </div>
  );
};
