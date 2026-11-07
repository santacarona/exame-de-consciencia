import { useEffect, RefObject } from 'react';

// Keyboard support for modal dialogs: Escape closes, Tab cycles inside the dialog
export function useDialogKeyboard(isOpen: boolean, dialogRef: RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const buttons = dialogRef.current.querySelectorAll<HTMLElement>('button');
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first?.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, dialogRef, onClose]);
}
