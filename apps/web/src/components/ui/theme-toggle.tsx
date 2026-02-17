'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="w-10 h-10 flex items-center justify-center rounded-full hover:opacity-70 transition-opacity"
    >
      {theme === 'light' ? (
        <Moon size={18} strokeWidth={1.5} />
      ) : (
        <Sun size={18} strokeWidth={1.5} />
      )}
    </button>
  );
}
