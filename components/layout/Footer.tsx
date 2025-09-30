import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='mt-20 border-t border-neutral-200 dark:border-neutral-800'>
      <div className='max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm'>
        <div>
          <p className='font-semibold'>Kos Tentram</p>
          <p className='text-gray-600 dark:text-gray-400'>
            Hak Cipta © {new Date().getFullYear()} Kos Tentram
          </p>
        </div>

        <div className='space-y-2'>
          <Link href='/'>Beranda</Link>
          <br />
          <Link href='/about'>Tentang</Link>
          <br />
          <Link href='/contact'>Kontak</Link>
          <br />
          <Link href='/iklan'>Iklan</Link>
          <br />
          <Link href='https://www.kelolatentram.my.id/'>Member Login</Link>
        </div>

        <div className='space-y-1'>
          <p>Jl. Poncoran Barat XI C No. 14A, Pancoran, Jakarta Selatan</p>
          <p>admin@kolektentram.my.id</p>
        </div>
      </div>
    </footer>
  );
}
