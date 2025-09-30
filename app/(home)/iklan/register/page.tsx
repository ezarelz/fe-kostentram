'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerApi } from '@/lib/auth';
import { authStorage } from '@/lib/auth-storage';
import { getAxiosMessage } from '@/lib/http';
import type { RegisterPayload } from '@/types/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterPayload>({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErr(null);
    try {
      const { data } = await registerApi(form);
      // beberapa BE tidak mengembalikan token; kalau tidak ada, lewati
      if (data.token) authStorage.setToken(data.token);
      authStorage.setProfile({ name: form.name, email: form.email });
      router.push('/iklan');
    } catch (e) {
      setErr(getAxiosMessage(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='max-w-sm'>
      <h1 className='text-2xl font-bold mb-4'>Register</h1>
      <form onSubmit={submit} className='space-y-3'>
        <input
          className='w-full border px-3 py-2 rounded'
          placeholder='Nama (opsional)'
          value={form.name ?? ''}
          onChange={(ev) => setForm({ ...form, name: ev.target.value })}
        />
        <input
          className='w-full border px-3 py-2 rounded'
          type='email'
          placeholder='Email'
          value={form.email}
          onChange={(ev) => setForm({ ...form, email: ev.target.value })}
          required
        />
        <input
          className='w-full border px-3 py-2 rounded'
          type='password'
          placeholder='Password'
          value={form.password}
          onChange={(ev) => setForm({ ...form, password: ev.target.value })}
          required
        />
        <button
          className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50'
          disabled={loading}
        >
          {loading ? 'Mendaftar…' : 'Daftar'}
        </button>
      </form>
      {err && <p className='mt-3 text-red-500 text-sm'>{err}</p>}
      <p className='mt-4 text-sm'>
        Sudah punya akun?{' '}
        <Link className='underline' href='/iklan/login'>
          Login
        </Link>
      </p>
    </div>
  );
}
