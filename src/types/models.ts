export type Role = 'tenant' | 'owner' | 'broker' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  verified: boolean;
  createdAt: string; // ISO string representation
}

export interface Property {
  id: string;
  title: string;
  description: string;
  rent: number;
  city: string;
  address: string;
  ownerId: string;
  verified: boolean;
  createdAt: string;
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  imageUrl: string;
  createdAt: string;
}

export interface ContactRequest {
  id: string;
  propertyId: string;
  senderId: string;
  message: string;
  createdAt: string;
}

export interface Rating {
  id: string;
  fromUserId: string;
  toUserId: string;
  rating: number; // 1-5
  review: string;
  createdAt: string;
}
