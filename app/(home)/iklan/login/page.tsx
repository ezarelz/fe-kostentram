'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginApi } from '@/lib/auth';
import { authStorage } from '@/lib/auth-storage';
import { getAxiosMessage } from '@/lib/http';
import type { LoginPayload } from '@/types/auth';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginPayload>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErr(null);
    try {
      const { data } = await loginApi(form);
      authStorage.setToken(data.token);
      // Update profil: set email dari form, biarkan name jika sudah ada dari register
      authStorage.updateProfile({ email: form.email });
      router.push('/iklan');
    } catch (e) {
      setErr(getAxiosMessage(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='max-w-sm'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      <form onSubmit={submit} className='space-y-3'>
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
          {loading ? 'Masuk…' : 'Masuk'}
        </button>
      </form>
      {err && <p className='mt-3 text-red-500 text-sm'>{err}</p>}
      <p className='mt-4 text-sm'>
        Belum punya akun?{' '}
        <Link className='underline' href='/iklan/register'>
          Daftar
        </Link>
      </p>
    </div>
  );
}
