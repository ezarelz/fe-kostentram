'use client';
import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      console.log('EmailJS result', result.status, result.text);
      setStatus('Pesan berhasil terkirim! ✅');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error', error);
      setStatus('Terjadi kesalahan saat mengirim, coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 max-w-md mx-auto'>
      <input
        type='text'
        name='name'
        value={form.name}
        onChange={handleChange}
        placeholder='Nama'
        required
        className='w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent px-4 py-2'
      />
      <input
        type='email'
        name='email'
        value={form.email}
        onChange={handleChange}
        placeholder='Email'
        required
        className='w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent px-4 py-2'
      />
      <textarea
        name='message'
        value={form.message}
        onChange={handleChange}
        placeholder='Pesan Anda'
        rows={4}
        required
        className='w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent px-4 py-2'
      />
      <button
        type='submit'
        disabled={loading}
        className='w-full rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 disabled:opacity-50'
      >
        {loading ? 'Mengirim...' : 'Kirim'}
      </button>
      {status && <p className='text-center text-sm mt-2'>{status}</p>}
    </form>
  );
}
