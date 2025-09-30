// app/(home)/about/page.tsx
import type { Metadata } from 'next';
import { site } from '@/lib/seo';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

import ContactSection from '@/components/sections/ContactSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';

export const metadata: Metadata = {
  title: 'Tentang',
  description: `${site.name} menyediakan hunian nyaman dan strategis di Jakarta dengan fasilitas lengkap.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className='bg-background'>
        <div className='max-w-6xl mx-auto px-4 lg:px-8 py-16 md:py-24'>
          <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight'>
            Tentang Kos Tentram
          </h1>
          <p className='mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl'>
            Hunian nyaman dengan akses strategis, cocok untuk mahasiswa dan
            pekerja yang membutuhkan tempat tinggal sementara di Jakarta.
          </p>
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <main className='bg-background'>
        <section className='max-w-6xl mx-auto px-4 lg:px-8 py-12 md:py-20 grid lg:grid-cols-2 gap-12 items-start'>
          <div className='relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-sm'>
            <Image
              src='/about-room.jpg'
              alt='Suasana kamar dan fasilitas di Kos Tentram'
              fill
              className='object-cover'
              sizes='(max-width: 1024px) 100vw, 50vw'
              priority
            />
          </div>

          <div className='space-y-6'>
            <h2 className='text-3xl md:text-4xl font-bold'>
              Hunian Ideal Anda
            </h2>
            <p className='text-lg leading-relaxed text-foreground/90'>
              Kos Tentram telah menjadi pilihan utama bagi mahasiswa dan pekerja
              yang membutuhkan tempat tinggal sementara. Kami menawarkan
              lingkungan yang tenang dan aman, serta fasilitas lengkap untuk
              menjamin kenyamanan penghuninya. Dengan lokasinya yang strategis,
              kami memudahkan akses ke berbagai fasilitas umum.
            </p>
            <p className='text-lg leading-relaxed text-foreground/90'>
              Kami berkomitmen untuk memberikan pengalaman tinggal terbaik,
              dengan ruang yang bersih dan nyaman. Banyak penghuni merasa betah
              dan nyaman selama tinggal di Kos Tentram.
            </p>

            <div className='pt-2'>
              <Link href='/contact'>
                <Button>Hubungi Kami</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE (animated – client component) */}
        <WhyChooseSection />
      </main>

      <ContactSection
        title='Butuh Info Ketersediaan Kamar?'
        subtitle='Tim kami siap membantu memilih kamar yang sesuai kebutuhan Anda.'
        href='/contact'
        ctaText='Tanyakan Sekarang'
      />

      <Footer />
    </>
  );
}
