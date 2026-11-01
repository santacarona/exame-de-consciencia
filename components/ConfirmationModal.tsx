import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm bg-surface-pearl border border-hairline rounded-lg p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">

        <div className="mb-5">
          <AlertTriangle className="w-7 h-7 text-primary" strokeWidth={1.5} />
        </div>

        <h3 className="text-[20px] font-semibold tracking-[-0.2px] text-ink mb-3 font-sans">
          {title}
        </h3>

        <p className="text-ink-muted-80 text-[14px] mb-8 leading-relaxed font-sans">
          {description}
        </p>

        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-pill font-sans font-semibold text-[14px] border border-hairline text-ink-muted-80 transition-transform active:scale-95"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-pill font-sans font-semibold text-[14px] bg-primary text-white transition-transform active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
