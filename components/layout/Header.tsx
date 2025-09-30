'use client';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang' },
  { href: '/contact', label: 'Kontak' },
  { href: '/iklan', label: 'Iklan' },
  {
    href: 'https://www.kelolatentram.my.id',
    label: 'Member Login',
    external: true,
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // close mobile menu on route change (simple pathname watcher)
  useMemo(() => {
    setOpen(false);
    return null;
  }, []);

  return (
    <header className='sticky top-0 z-50 bg-slate-900/90 text-white backdrop-blur border-b border-slate-800'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between'>
        {/* LEFT: Logo + Brand */}
        <Link href='/' className='flex items-center gap-3'>
          <Image
            src='/logo/logo.png'
            alt='Kos Tentram'
            width={56}
            height={32}
            priority
            className='h-8 w-auto'
          />
          <span className='text-xl font-extrabold tracking-wide'>
            Kos Tentram
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className='hidden md:flex items-center gap-8'>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...(item.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`text-sm hover:text-orange-300 transition-colors ${
                !item.external && isActive(item.href) ? 'text-orange-400' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className='ml-4'>
            <ThemeToggle />
          </div>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className='md:hidden rounded-lg border border-white/20 px-3 py-2'
          aria-label='Toggle Menu'
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className='md:hidden border-t border-slate-800 px-4 pb-4 space-y-2'>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...(item.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`block py-2 ${
                !item.external && isActive(item.href)
                  ? 'text-orange-400'
                  : 'text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}
