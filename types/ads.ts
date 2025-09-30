export type CreateAdPayload = {
  title: string;
  body: string;
  price: number;
  published?: boolean; // opsional; default false di BE
  addressLine?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  areaSqm?: number;
  rooms?: number;
  bathrooms?: number;
  facilities?: string[];
};

export type Ad = {
  id: string;
  title: string;
  body: string; // ← pakai body, bukan description
  price: number | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};
