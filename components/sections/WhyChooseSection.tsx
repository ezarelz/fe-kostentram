// sections/WhyChooseSection.tsx
'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

type Item = { label: string; value: string | number; desc: string };

const ITEMS: Item[] = [
  {
    label: 'Tahun Pengalaman',
    value: '5',
    desc: 'Kami telah melayani ratusan penghuni dengan standar kebersihan dan kenyamanan yang konsisten.',
  },
  {
    label: 'Tingkat Kepuasan',
    value: '98%',
    desc: 'Feedback positif dari para penghuni berkat lokasi strategis dan fasilitas lengkap.',
  },
  {
    label: 'Sejak',
    value: '2020',
    desc: 'Beroperasi sejak 2020 dan terus meningkatkan mutu layanan agar tetap relevan untuk kebutuhan Anda.',
  },
];

function CountUp({
  value,
  duration = 1.2,
  decimals = 0,
  className = '',
}: {
  value: number | string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const raw = String(value).trim();
  const match = raw.match(/^([\d.,]+)(.*)$/); // "98%" -> ["98%", "98", "%"]
  const target = match ? Number(match[1].replace(/[.,]/g, '')) : Number(raw);
  const suffix = match ? match[2] : '';

  const hostRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false); // ✅ kunci: pernah animasi?
  const inView = useInView(hostRef, { once: false, margin: '-20% 0px' });

  const mv = useMotionValue(0);
  const display = useTransform(mv, (latest) => {
    const formatted =
      decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString();
    return `${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!inView) {
      // Jangan reset ke 0 kalau sudah animasi—biar tidak “0” saat scroll up
      if (hasAnimatedRef.current) mv.set(target);
      return;
    }

    // Jika belum pernah animasi → jalankan sekali, lalu kunci
    if (!hasAnimatedRef.current) {
      mv.set(0);
      const controls = animate(mv, target, { duration, ease: 'easeOut' });
      controls.then(() => {
        hasAnimatedRef.current = true;
        mv.set(target); // pastikan exact target setelah animasi
      });
      return () => controls.stop();
    } else {
      // Sudah pernah animasi → pastikan tetap di target saat terlihat
      mv.set(target);
    }
  }, [inView, target, duration, mv]);

  return (
    <span ref={hostRef} className={className}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

export default function WhyChooseSection() {
  return (
    <section className='max-w-6xl mx-auto px-4 lg:px-8 py-12 md:py-20'>
      <h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-10'>
        Mengapa Memilih Kos Tentram?
      </h2>

      <div className='grid md:grid-cols-3 gap-10'>
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
            className='border-t pt-6'
          >
            <div className='flex items-center gap-3 text-foreground/80'>
              <span className='inline-block size-2 rounded-full ring-2 ring-foreground' />
              <p className='font-medium'>{item.label}</p>
            </div>

            <p className='mt-4 text-4xl md:text-5xl font-extrabold'>
              <CountUp value={item.value} duration={1.2} />
            </p>

            <p className='mt-4 text-foreground/80 leading-relaxed'>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
