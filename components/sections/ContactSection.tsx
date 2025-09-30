// sections/ContactSection.tsx
import Link from 'next/link';
import Button from '@/components/ui/Button';

type ContactSectionProps = {
  title?: string;
  subtitle?: string;
  href?: string;
  ctaText?: string;
  className?: string;
};

export default function ContactSection({
  title = 'Siap untuk Memilih Kami sebagai Hunian Anda?',
  subtitle = 'Hubungi kami sekarang untuk informasi lebih lanjut dan pemesanan kamar.',
  href = '/contact',
  ctaText = 'Hubungi Kami',
  className,
}: ContactSectionProps) {
  return (
    <section
      className={`mx-auto max-w-6xl px-4 lg:px-8 py-12 md:py-20 ${
        className ?? ''
      }`}
    >
      <div
        className='
          rounded-3xl
          bg-neutral-200 dark:bg-neutral-900
          text-foreground
          ring-1 ring-black/5 dark:ring-white/10
          px-6 md:px-16 py-14 md:py-20
          text-center shadow-sm
        '
      >
        <h3 className='text-3xl md:text-5xl font-extrabold tracking-tight'>
          {title}
        </h3>

        <p className='mt-4 text-base md:text-lg text-foreground/80'>
          {subtitle}
        </p>

        <div className='mt-8'>
          <Link href={href}>
            <Button>{ctaText}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
