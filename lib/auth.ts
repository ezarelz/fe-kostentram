// /lib/api/auth.ts
import { http } from '@/lib/http';
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth';

export function loginApi(payload: LoginPayload) {
  return http.post<AuthResponse>('/auth/login', payload);
}

export function registerApi(payload: RegisterPayload) {
  return http.post<AuthResponse>('/auth/register', payload);
}
