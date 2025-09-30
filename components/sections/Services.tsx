// sections/Services.tsx
import Image from 'next/image';
import Link from 'next/link';

type ServiceItem = {
  title: string;
  slug?: string; // optional link target for the title
  image: string; // /public path
};

const SERVICES: ServiceItem[] = [
  { title: 'Akses Mudah', image: '/services/akses.jpeg', slug: '/contact' },
  {
    title: 'Kebersihan Terjamin',
    image: '/services/kebersihan.jpg',
    slug: '/about',
  },
  { title: 'Lokasi Strategis', image: '/services/lokasi.jpg', slug: '/about' },
  { title: 'Kamar Nyaman', image: '/services/kamar.png', slug: '/about' },
];

export default function Services() {
  return (
    <section id='services' className='max-w-6xl mx-auto px-4 py-12'>
      <p className='uppercase tracking-wide text-sm text-gray-500 mb-2'>
        Layanan
      </p>
      <h2 className='text-3xl md:text-4xl font-semibold mb-8'>
        Layanan Kami yang Terbaik
      </h2>

      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {SERVICES.map((s) => (
          <article
            key={s.title}
            className='group rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm'
          >
            <div className='relative aspect-[4/3]'>
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes='(max-width: 768px) 100vw, 25vw'
                className='object-cover transition-transform duration-300 group-hover:scale-105'
                priority={false}
              />

              {/* Arrow → link to /about */}
              <Link
                href='/about'
                aria-label={`Lihat semua layanan (Services)`}
                className='absolute bottom-2 right-2 grid place-items-center rounded-lg px-3 py-1 text-lg
                           bg-white/90 text-black dark:bg-black/70 dark:text-white
                           ring-1 ring-black/5 dark:ring-white/10
                           transition hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2'
              >
                →
              </Link>
            </div>

            <div className='p-4'>
              {s.slug ? (
                <Link
                  href='/about'
                  className='font-semibold hover:underline inline-block'
                >
                  {s.title}
                </Link>
              ) : (
                <p className='font-semibold'>{s.title}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
