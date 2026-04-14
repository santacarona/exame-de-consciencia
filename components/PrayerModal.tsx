import React from 'react';
import { BookOpen } from 'lucide-react';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerModal: React.FC<PrayerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 animate-in fade-in duration-200">
      {/* Backdrop with heavy blur matching ConfirmationModal */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-obsidian/95 border border-primary/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300 backdrop-blur-xl">

        <div className="bg-primary/10 p-4 rounded-full mb-5 border border-primary/20">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>

        <h3 className="text-xl font-serif font-bold text-parchment mb-6">
          Ato de Contrição
        </h3>

        <div className="relative mb-8">
          <p className="text-parchment-dim text-base leading-relaxed font-serif text-justify">
            "Meu Deus, porque sois infinitamente bom e Vos amo de todo o meu coração, pesa-me de Vos ter ofendido e, com o auxílio da Vossa divina graça, proponho firmemente emendar-me e nunca mais Vos tornar a ofender. Peço e espero o perdão das minhas culpas pela Vossa infinita misericórdia."
          </p>
        </div>

        <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-lg font-sans font-bold text-sm bg-primary text-obsidian hover:bg-primary-dim hover:text-parchment shadow-lg transition-all active:scale-95"
        >
            Amém
        </button>
      </div>
    </div>
  );
};