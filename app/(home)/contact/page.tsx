// app/(marketing)/contact/page.tsx
import ContactForm from '@/components/ui/ContactForm';
import Image from 'next/image';
import { site } from '@/lib/seo';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Contact() {
  return (
    <>
      <Header />
      <main className='max-w-6xl mx-auto px-4 py-12 space-y-10'>
        {/* Bagian alamat dan gambar */}
        <section className='grid md:grid-cols-2 gap-8 items-start'>
          <div>
            <h1 className='inline text-3xl font-bold mb-4'>
              Hubungi Kami Untuk Informasi
            </h1>
            <p>{site.address}</p>
            <p>Email : {site.email}</p>

            <div className='flex items-center gap-2'>
              {' '}
              <span className='font-medium'>WA: Click → </span>
              <Link
                href={site.whatsapp}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src='/wa_logo.png'
                  alt='WhatsApp'
                  width={50}
                  height={50}
                  className='hover:scale-110 transition-transform'
                />
              </Link>
            </div>
          </div>
          <Image
            src='/room.png'
            alt='Kamar Kos'
            width={500}
            height={300}
            className='rounded-2xl shadow object-cover'
          />
        </section>

        {/* Form di tengah */}
        <section className='flex flex-col items-center justify-center w-full'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>
            Kirim Pesan
          </h2>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
