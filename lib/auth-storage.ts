// lib/auth-storage.ts
import type { UserProfile } from '@/types/auth';

const TOKEN_KEY = 'token';
const PROFILE_KEY = 'profile';

function emitAuthChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('auth:changed'));
  }
}

export const authStorage = {
  // token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
      emitAuthChanged();
    }
  },
  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      emitAuthChanged();
    }
  },

  // profile
  getProfile(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null;
    }
  },
  setProfile(profile: UserProfile): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      emitAuthChanged();
    }
  },
  updateProfile(patch: Partial<UserProfile>): void {
    const prev = this.getProfile();
    const next: UserProfile = {
      email: patch.email ?? prev?.email ?? '',
      name: patch.name ?? prev?.name,
    };
    this.setProfile(next); // setProfile akan emit event
  },

  logout(): void {
    this.clearToken();
    if (typeof window !== 'undefined') localStorage.removeItem(PROFILE_KEY);
    emitAuthChanged();
  },
};
