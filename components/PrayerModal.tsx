import React, { useRef } from 'react';
import { BookOpen } from 'lucide-react';
import { useDialogKeyboard } from './useDialogKeyboard';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerModal: React.FC<PrayerModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialogKeyboard(isOpen, dialogRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Ato de Contrição"
        className="relative w-full max-w-sm bg-surface-pearl border border-hairline rounded-lg p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">

        <div className="mb-5">
          <BookOpen className="w-7 h-7 text-primary" strokeWidth={1.5} />
        </div>

        <h3 className="text-[20px] font-semibold tracking-[-0.2px] text-ink mb-6 font-sans">
          Ato de Contrição
        </h3>

        <p className="text-ink-muted-80 text-[15px] leading-[1.47] font-sans mb-8">
          "Meu Deus, porque sois infinitamente bom e Vos amo de todo o meu coração, pesa-me de Vos ter ofendido e, com o auxílio da Vossa divina graça, proponho firmemente emendar-me e nunca mais Vos tornar a ofender. Peço e espero o perdão das minhas culpas pela Vossa infinita misericórdia."
        </p>

        <button
          autoFocus
          onClick={onClose}
          className="w-full py-3 px-4 rounded-pill font-sans font-semibold text-[14px] bg-primary text-white transition-transform active:scale-95"
        >
          Amém
        </button>
      </div>
    </div>
  );
};
