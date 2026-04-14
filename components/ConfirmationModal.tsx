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
      {/* Backdrop with heavy blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-obsidian/95 border border-primary/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300 backdrop-blur-xl">

        <div className="bg-primary/10 p-4 rounded-full mb-5 border border-primary/20">
          <AlertTriangle className="w-8 h-8 text-primary" />
        </div>

        <h3 className="text-xl font-serif font-bold text-parchment mb-3">
          {title}
        </h3>

        <p className="text-parchment-dim text-sm mb-8 leading-relaxed font-sans opacity-80">
          {description}
        </p>

        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-lg font-sans font-bold text-sm border border-parchment/20 text-parchment-dim hover:bg-obsidian-light hover:text-parchment transition-colors"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-lg font-sans font-bold text-sm bg-primary text-obsidian hover:bg-primary-dim hover:text-parchment shadow-lg transition-all active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};