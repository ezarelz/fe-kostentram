// components/theme/ThemeToggle.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // SSR & first paint: markup stabil (tidak ada teks dinamis)
    return (
      <button
        className='flex items-center gap-2 rounded-lg px-3 py-2 border border-white/20 cursor-pointer opacity-70'
        aria-label='Toggle dark mode (loading)'
        aria-hidden
      >
        <div className='h-4 w-4 rounded-full bg-white/50' />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='flex items-center gap-2 rounded-lg px-3 py-2 border border-white/20 hover:bg-white/10 transition cursor-pointer'
      aria-label='Toggle dark mode'
    >
      <Image
        src={theme === 'dark' ? '/moon.svg' : '/sun.svg'}
        alt='Theme Icon'
        width={16}
        height={16}
      />
      <span className='text-sm'>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
