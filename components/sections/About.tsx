import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function About() {
  return (
    <section className='bg-background py-16'>
      <div className='max-w-6xl mx-auto px-4 py-12 space-y-3'>
        {/* Heading Section */}
        <div className='mb-8'>
          <p className='uppercase tracking-wide text-sm text-gray-500'>
            TENTANG
          </p>
          <h2 className='text-3xl md:text-4xl font-bold'>
            Cerita di Balik Kos Tentram yang Nyaman
          </h2>
        </div>

        <p className='text-lg leading-relaxed text-foreground'>
          Kos Tentram telah menjadi pilihan utama bagi mahasiswa dan pekerja
          yang membutuhkan tempat tinggal sementara. Kami menawarkan lingkungan
          yang tenang dan aman, serta fasilitas lengkap untuk menjamin
          kenyamanan penghuninya. Dengan lokasinya yang strategis, kami
          memudahkan akses ke berbagai fasilitas umum.
        </p>

        <p className='text-lg leading-relaxed text-foreground'>
          Kami berkomitmen untuk memberikan pengalaman tinggal terbaik, dengan
          ruang yang bersih dan nyaman. Kami telah membantu banyak orang merasa
          betah dan nyaman selama tinggal di Kos Tentram.
        </p>

        <Link href='/about'>
          <Button className='mt-1'>Pelajari Lebih Lanjut</Button>
        </Link>
      </div>
    </section>
  );
}
