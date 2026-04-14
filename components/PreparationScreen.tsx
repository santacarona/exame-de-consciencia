import React from 'react';
import { Flame, ArrowLeft } from 'lucide-react';

interface PreparationScreenProps {
  onComplete: () => void;
  onBack?: () => void;
}

export const PreparationScreen: React.FC<PreparationScreenProps> = ({ onComplete, onBack }) => {
  return (
    <div className="relative z-10 flex flex-col h-full w-full text-parchment font-display selection:bg-primary selection:text-white overflow-hidden animate-in fade-in duration-700">
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 pb-2 w-full shrink-0">
        <button 
          onClick={onBack}
          aria-label="Voltar" 
          className={`text-parchment flex w-12 h-12 shrink-0 items-center justify-center hover:bg-parchment/10 rounded-full transition-colors ${!onBack ? 'invisible' : ''}`}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-parchment text-sm font-bold uppercase tracking-[0.15em] flex-1 text-center opacity-80">
          Oração Preparatória
        </h2>
        <div className="w-12 h-12 shrink-0"></div> 
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-4 w-full max-w-md mx-auto overflow-y-auto scroll-smooth">
        
        {/* Icon Section */}
        <div className="relative flex items-center justify-center mb-8 shrink-0">
          {/* Glow Effect */}
          <div className="absolute w-20 h-20 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Flame Icon */}
          <Flame 
            size={64} 
            strokeWidth={1}
            className="text-primary animate-pulse drop-shadow-[0_0_15px_rgba(139,69,158,0.5)]" 
          />
        </div>

        {/* Prayer Text Section */}
        <div className="relative max-w-sm mx-auto">
          <span className="absolute -top-6 -left-2 text-5xl text-primary font-serif leading-none opacity-30 select-none">“</span>
          
          <div className="px-3">
            <p className="text-parchment text-[17px] leading-relaxed text-justify font-normal font-serif opacity-90">
              Meu bom Deus e Salvador, Pai de misericórdia, eis-me aqui prostrado aos vossos pés, cheio de confusão e de remorsos, qual outro filho pródigo que volta arrependido à casa paterna. 
            </p>
            <p className="text-parchment text-[17px] leading-relaxed text-justify font-normal font-serif opacity-90 mt-3">
              Não mereço perdão, porque desgostei demasiadamente a vossa bondade infinita. Mas sei que não olhais para os meus pecados senão para perdoá-los, como Pai misericordioso que sois.
            </p>
            <p className="text-parchment text-[17px] leading-relaxed text-justify font-normal font-serif opacity-90 mt-3">
              Pelos méritos inefáveis do vosso Filho, crucificado e morto por meu amor, pelos méritos do seu Preciosíssimo Sangue, pelas suas lágrimas e agonia, tende piedade de mim. Dai-me luz para conhecer os meus pecados; sincero arrependimento para os aborrecer; firme propósito para nunca mais os cometer; ânimo para os acusar e para cumprir com a devida penitência.
            </p>
          </div>

          <span className="absolute -bottom-8 -right-2 text-5xl text-primary font-serif leading-none opacity-30 select-none">”</span>
        </div>
      </main>

      {/* Footer Button */}
      <div className="relative z-10 w-full px-6 pb-6 pt-4 max-w-md mx-auto shrink-0 flex flex-col gap-4">
        <button 
          onClick={onComplete}
          className="w-full flex items-center justify-center h-14 bg-primary hover:brightness-110 active:bg-primary-dim text-parchment text-lg font-bold tracking-[0.1em] rounded-lg shadow-[0_4px_14px_0_rgba(139,69,158,0.39)] transition-all duration-300 transform active:scale-[0.98]"
        >
          <span>AMÉM</span>
        </button>
        <p className="text-[10px] text-parchment/20 uppercase tracking-widest font-sans text-center">
            Uma iniciativa Santa Carona
        </p>
      </div>

    </div>
  );
};