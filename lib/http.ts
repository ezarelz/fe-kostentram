import axios, { AxiosError, AxiosInstance } from 'axios';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000';

export const http: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true, // aktifkan jika pakai cookie httpOnly
});

export function getAxiosMessage(e: unknown): string {
  if (e instanceof AxiosError) {
    const data = e.response?.data;
    if (typeof data === 'string') return data;
    if (data && typeof data === 'object' && 'message' in data) {
      const msg = (data as { message?: string }).message;
      if (typeof msg === 'string') return msg;
    }
    return e.message;
  }
  if (e instanceof Error) return e.message;
  return 'Unknown error';
}

export function bearer(token: string | null): Record<'Authorization', string> {
  return { Authorization: `Bearer ${token ?? ''}` };
}
