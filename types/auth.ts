export type UserProfile = {
  email: string;
  name?: string | null;
};

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = {
  email: string;
  password: string;
  name?: string;
};

export type AuthResponse = {
  token: string;
};
