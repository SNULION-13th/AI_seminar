import { useEffect } from 'react';

interface KeyboardShortcuts {
  onSearch?: () => void;
  onUpload?: () => void;
  onEscape?: () => void;
  onThemeToggle?: () => void;
}

export function useKeyboardShortcuts({
  onSearch,
  onUpload,
  onEscape,
  onThemeToggle
}: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement)?.contentEditable === 'true'
      ) {
        // Allow Escape key even in inputs
        if (event.key === 'Escape' && onEscape) {
          onEscape();
        }
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? event.metaKey : event.ctrlKey;

      // Cmd/Ctrl + K: Search
      if (cmdOrCtrl && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onSearch?.();
      }

      // U: Upload
      if (event.key.toLowerCase() === 'u' && !cmdOrCtrl && !event.altKey && !event.shiftKey) {
        event.preventDefault();
        onUpload?.();
      }

      // Escape: Close modals
      if (event.key === 'Escape') {
        onEscape?.();
      }

      // Cmd/Ctrl + Shift + D: Toggle theme
      if (cmdOrCtrl && event.shiftKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        onThemeToggle?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearch, onUpload, onEscape, onThemeToggle]);
}