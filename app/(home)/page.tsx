// app/(marketing)/page.tsx
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import About from '@/components/sections/About';
import ContactSection from '@/components/sections/ContactSection';
import Services from '@/components/sections/Services';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Header dipanggil manual */}
      <Header />

      <main className='max-w-6xl mx-auto px-4 py-12 space-y-16'>
        <section className='grid md:grid-cols-2 gap-8 items-center'>
          <div>
            <h1 className='text-4xl md:text-5xl font-bold mb-4 leading-tight'>
              Hunian Nyaman dan Strategis di Jakarta
            </h1>
            <p className='text-lg mb-6'>
              Temukan kamar nyaman di lokasi strategis untuk memenuhi kebutuhan
              tempat tinggal Anda.
            </p>
            <Button href='/contact'>Hubungi Kami</Button>
          </div>

          <Image
            src='/hero.png'
            alt='Kos Tentram'
            width={600}
            height={400}
            className='rounded-2xl shadow object-cover'
          />
        </section>
      </main>

      <Services />
      <About />
      <ContactSection />
      {/* Footer dipanggil manual */}
      <Footer />
    </>
  );
}
