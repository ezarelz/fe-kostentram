'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authStorage } from '@/lib/auth-storage';
import type { UserProfile } from '@/types/auth';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function IklanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const refresh = () => setProfile(authStorage.getProfile());
    refresh();
    const onStorage = () => refresh();
    const onAuthChanged = () => refresh();
    window.addEventListener('storage', onStorage);
    window.addEventListener('auth:changed', onAuthChanged as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(
        'auth:changed',
        onAuthChanged as EventListener
      );
    };
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  function logout() {
    authStorage.logout();
    setOpen(false);
    setProfile(null);
    router.push('/iklan/login');
  }

  const displayName =
    profile?.name && profile.name.trim() !== '' ? profile.name : profile?.email;

  const btnBase =
    'inline-flex items-center justify-center gap-1 rounded border px-3 py-1 text-sm transition-colors';
  const btn = `${btnBase} hover:bg-accent hover:text-accent-foreground`;
  const btnPrimary = `${btnBase} bg-blue-600 text-white border-blue-600 hover:opacity-90`;

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header full width + sticky */}
      <div className='sticky top-0 z-50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <Header />
        {/* account bar */}
        <div>
          <div className='mx-auto w-full max-w-6xl px-6 h-12 flex items-center justify-end gap-2'>
            {!displayName ? (
              <>
                <Link href='/iklan/login' className={btn}>
                  Login
                </Link>
                <Link href='/iklan/register' className={btnPrimary}>
                  Register
                </Link>
              </>
            ) : (
              <div className='relative' ref={menuRef}>
                <button
                  type='button'
                  onClick={() => setOpen((v) => !v)}
                  className={btn}
                  aria-haspopup='menu'
                  aria-expanded={open}
                >
                  {displayName} <span className='ml-1'>▾</span>
                </button>
                {open ? (
                  <div
                    role='menu'
                    className='absolute right-0 mt-2 w-44 rounded-md border bg-popover text-popover-foreground shadow-md overflow-hidden'
                  >
                    <Link
                      href='/iklan'
                      className='block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground'
                      onClick={() => setOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      type='button'
                      className='w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground'
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className='flex-1'>
        <div className='mx-auto w-full max-w-6xl px-6 py-8'>{children}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
