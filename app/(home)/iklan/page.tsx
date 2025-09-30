'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { authStorage } from '@/lib/auth-storage';
import { getAxiosMessage } from '@/lib/http';
import { createAdApi, listAdsApi, deleteAdApi } from '@/lib/ads';
import type { CreateAdPayload, Ad } from '@/types/ads';

type Flash = { type: 'ok' | 'err'; text: string };

export default function IklanPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  // required
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [priceStr, setPriceStr] = useState<string>('');

  // optional
  const [addressLine, setAddressLine] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [areaSqmStr, setAreaSqmStr] = useState<string>('');
  const [roomsStr, setRoomsStr] = useState<string>('');
  const [bathroomsStr, setBathroomsStr] = useState<string>('');
  const [facilitiesCsv, setFacilitiesCsv] = useState<string>(''); // “WiFi,AC,Parkir”

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [flash, setFlash] = useState<Flash | null>(null);

  // list iklan (published)
  const [ads, setAds] = useState<Ad[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);

  // modal detail
  const [detail, setDetail] = useState<Ad | null>(null);

  useEffect(() => {
    setAuthed(!!authStorage.getToken());
    void fetchAds();
  }, []);

  const canSubmit = useMemo(() => {
    if (title.trim() === '' || body.trim() === '') return false;
    const n = Number(priceStr);
    return Number.isFinite(n);
  }, [title, body, priceStr]);

  async function fetchAds(): Promise<void> {
    try {
      setLoadingList(true);
      const data = await listAdsApi(); // hanya published
      setAds(data);
    } finally {
      setLoadingList(false);
    }
  }

  function toInt(v: string): number | undefined {
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : undefined;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setFlash(null);

    const payload: CreateAdPayload = {
      title: title.trim(),
      body: body.trim(),
      price: Number(priceStr),
      // semua opsional: hanya kirim jika ada isinya
      ...(addressLine.trim() ? { addressLine: addressLine.trim() } : {}),
      ...(city.trim() ? { city: city.trim() } : {}),
      ...(province.trim() ? { province: province.trim() } : {}),
      ...(postalCode.trim() ? { postalCode: postalCode.trim() } : {}),
      ...(toInt(areaSqmStr) !== undefined
        ? { areaSqm: toInt(areaSqmStr)! }
        : {}),
      ...(toInt(roomsStr) !== undefined ? { rooms: toInt(roomsStr)! } : {}),
      ...(toInt(bathroomsStr) !== undefined
        ? { bathrooms: toInt(bathroomsStr)! }
        : {}),
      ...(facilitiesCsv.trim()
        ? {
            facilities: facilitiesCsv
              .split(',')
              .map((s) => s.trim())
              .filter((s) => s.length > 0),
          }
        : {}),
    };

    try {
      await createAdApi(payload, authStorage.getToken());
      setFlash({ type: 'ok', text: 'Iklan berhasil dipasang 🚀' });

      // reset minimal
      setTitle('');
      setBody('');
      setPriceStr('');
      setAddressLine('');
      setCity('');
      setProvince('');
      setPostalCode('');
      setAreaSqmStr('');
      setRoomsStr('');
      setBathroomsStr('');
      setFacilitiesCsv('');

      await fetchAds();
    } catch (err) {
      setFlash({ type: 'err', text: getAxiosMessage(err) });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number | string): Promise<void> {
    if (!confirm('Hapus iklan ini?')) return;
    try {
      await deleteAdApi(id, authStorage.getToken());
      await fetchAds();
    } catch (err) {
      setFlash({ type: 'err', text: getAxiosMessage(err) });
    }
  }

  if (authed === null) return null;

  // ======= BELUM LOGIN: IKLAN TERBARU DI ATAS, LOGIN DI BAWAH =======
  if (!authed) {
    return (
      <div className='space-y-8'>
        {/* Iklan Terbaru (ATAS) */}
        <section>
          <div className='flex items-center gap-3 mb-3'>
            <h2 className='text-lg font-semibold'>Iklan Terbaru</h2>
            <button
              onClick={() => void fetchAds()}
              className='px-3 py-1 rounded border'
              disabled={loadingList}
              aria-label='Refresh iklan'
            >
              {loadingList ? 'Memuat…' : 'Refresh'}
            </button>
          </div>
          <AdsList
            ads={ads}
            loading={loadingList}
            onRefresh={() => void fetchAds()}
            onOpen={(ad) => setDetail(ad)}
            onDelete={undefined} // belum login -> tidak ada hapus
          />
          <AdDetailModal ad={detail} onClose={() => setDetail(null)} />
        </section>

        <hr className='opacity-10' />

        {/* Prompt Pasang Iklan (BAWAH) */}
        <section className='space-y-3'>
          <h1 className='text-2xl font-bold'>Pasang Iklan</h1>
          <p>Kamu perlu login dulu untuk memasang iklan.</p>
          <Link
            href='/iklan/login'
            className='inline-block px-4 py-2 rounded bg-blue-600 text-white'
          >
            Login untuk lanjut
          </Link>
        </section>
      </div>
    );
  }

  // ======= SUDAH LOGIN (form + list di bawahnya) =======
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Pasang Iklan</h1>

      <form onSubmit={submit} className='space-y-3 max-w-xl'>
        <input
          className='w-full border px-3 py-2 rounded'
          placeholder='Judul *'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className='w-full border px-3 py-2 rounded'
          placeholder='Deskripsi (body) *'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <input
          className='w-full border px-3 py-2 rounded'
          placeholder='Harga (angka) *'
          inputMode='decimal'
          value={priceStr}
          onChange={(e) => setPriceStr(e.target.value)}
          required
        />

        <hr className='my-3 opacity-30' />

        {/* Optional fields */}
        <input
          className='w-full border px-3 py-2 rounded'
          placeholder='Alamat (opsional)'
          value={addressLine}
          onChange={(e) => setAddressLine(e.target.value)}
        />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          <input
            className='w-full border px-3 py-2 rounded'
            placeholder='Kota'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className='w-full border px-3 py-2 rounded'
            placeholder='Provinsi'
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
          <input
            className='w-full border px-3 py-2 rounded'
            placeholder='Kode Pos'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          <input
            className='w-full border px-3 py-2 rounded'
            placeholder='Luas (m²)'
            inputMode='numeric'
            value={areaSqmStr}
            onChange={(e) => setAreaSqmStr(e.target.value)}
          />
          <input
            className='w-full border px-3 py-2 rounded'
            placeholder='Kamar'
            inputMode='numeric'
            value={roomsStr}
            onChange={(e) => setRoomsStr(e.target.value)}
          />
          <input
            className='w-full border px-3 py-2 rounded'
            placeholder='Kamar Mandi'
            inputMode='numeric'
            value={bathroomsStr}
            onChange={(e) => setBathroomsStr(e.target.value)}
          />
        </div>
        <input
          className='w-full border px-3 py-2 rounded'
          placeholder='Fasilitas (pisahkan koma, contoh: WiFi,AC,Parkir)'
          value={facilitiesCsv}
          onChange={(e) => setFacilitiesCsv(e.target.value)}
        />

        <button
          disabled={submitting || !canSubmit}
          className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50'
        >
          {submitting ? 'Mengirim…' : 'Kirim Iklan'}
        </button>
      </form>

      {flash ? (
        <p
          className={`mt-4 text-sm ${
            flash.type === 'ok' ? 'text-green-500' : 'text-red-400'
          }`}
        >
          {flash.text}
        </p>
      ) : null}

      <section className='mt-8'>
        <div className='flex items-center gap-3 mb-3'>
          <h2 className='text-lg font-semibold'>Iklan Terbaru</h2>
          <button
            onClick={() => void fetchAds()}
            className='px-3 py-1 rounded border'
            disabled={loadingList}
            aria-label='Refresh iklan'
          >
            {loadingList ? 'Memuat…' : 'Refresh'}
          </button>
        </div>
        <AdsList
          ads={ads}
          loading={loadingList}
          onRefresh={() => void fetchAds()}
          onOpen={(ad) => setDetail(ad)}
          onDelete={(ad) => void handleDelete(ad.id)}
        />
      </section>

      <AdDetailModal ad={detail} onClose={() => setDetail(null)} />
    </div>
  );
}

/* ---------- Komponen kecil ---------- */

function AdsList({
  ads,
  loading,
  onRefresh,
  onOpen,
  onDelete,
}: {
  ads: Ad[];
  loading: boolean;
  onRefresh: () => void;
  onOpen: (ad: Ad) => void;
  onDelete?: (ad: Ad) => void;
}) {
  if (loading) return <p className='opacity-80'>Memuat iklan…</p>;
  if (ads.length === 0)
    return (
      <div className='opacity-80'>
        Belum ada iklan yang tampil.{' '}
        <button className='underline' onClick={onRefresh}>
          Muat ulang
        </button>
        .
      </div>
    );

  return (
    <ul className='grid gap-4'>
      {ads.map((ad) => (
        <li key={String(ad.id)} className='border rounded p-4'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <h3 className='font-semibold'>{ad.title}</h3>
              <p className='mt-1 text-sm line-clamp-2'>{ad.body}</p>
              {ad.createdAt ? (
                <p className='mt-1 text-xs opacity-60'>
                  {new Date(ad.createdAt).toLocaleString('id-ID')}
                </p>
              ) : null}
            </div>

            <div className='flex items-center gap-2'>
              {typeof ad.price === 'number' ? (
                <span className='text-sm border rounded px-2 py-1'>
                  Rp {ad.price.toLocaleString('id-ID')}
                </span>
              ) : null}
              <button
                className='px-2 py-1 text-sm rounded border'
                onClick={() => onOpen(ad)}
              >
                Detail
              </button>
              {onDelete ? (
                <button
                  className='px-2 py-1 text-sm rounded border border-red-400 text-red-500'
                  onClick={() => onDelete(ad)}
                >
                  Hapus
                </button>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function AdDetailModal({
  ad,
  onClose,
}: {
  ad: Ad | null;
  onClose: () => void;
}) {
  if (!ad) return null;
  return (
    <div
      className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
    >
      <div className='bg-white text-black max-w-lg w-full rounded-xl p-5'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-lg font-semibold'>{ad.title}</h3>
          <button className='px-2 py-1 rounded border' onClick={onClose}>
            Tutup
          </button>
        </div>
        {typeof ad.price === 'number' ? (
          <p className='text-sm mb-2'>
            Harga: <b>Rp {ad.price.toLocaleString('id-ID')}</b>
          </p>
        ) : null}
        <p className='whitespace-pre-wrap'>{ad.body}</p>
      </div>
    </div>
  );
}
