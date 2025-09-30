import { http } from './http';
import type { Ad, CreateAdPayload } from '@/types/ads';

export async function createAdApi(
  payload: CreateAdPayload,
  token?: string | null
): Promise<Ad> {
  const headers = token
    ? ({ Authorization: `Bearer ${token}` } as const)
    : undefined;
  const { data } = await http.post<Ad>('/iklan', payload, { headers });
  return data;
}

export type ListAdsParams = {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  q?: string;
};

export async function listAdsApi(params?: ListAdsParams): Promise<Ad[]> {
  const { data } = await http.get<Ad[]>('/iklan', { params });
  return data;
}

export async function deleteAdApi(
  id: number | string,
  token?: string | null
): Promise<void> {
  const headers = token
    ? ({ Authorization: `Bearer ${token}` } as const)
    : undefined;
  await http.delete(`/iklan/${id}`, { headers });
}

// (opsional kalau nanti mau edit)
export type UpdateAdPayload = Partial<CreateAdPayload>;
export async function updateAdApi(
  id: number | string,
  payload: UpdateAdPayload,
  token?: string | null
): Promise<Ad> {
  const headers = token
    ? ({ Authorization: `Bearer ${token}` } as const)
    : undefined;
  const { data } = await http.patch<Ad>(`/iklan/${id}`, payload, { headers });
  return data;
}
