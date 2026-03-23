import { User, Property, PropertyImage, ContactRequest, Rating } from './models';

export interface IAuthService {
  getCurrentUser(): Promise<User | null>;
  login(email: string, password?: string): Promise<User>;
  register(email: string, password: string, name: string, role: string): Promise<User>;
  logout(): Promise<void>;
}

export interface IPropertyService {
  getPropertyById(id: string): Promise<Property | null>;
  getProperties(filters?: any): Promise<Property[]>;
  createProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'verified'>): Promise<Property>;
  updateProperty(id: string, updates: Partial<Property>): Promise<Property>;
  deleteProperty(id: string): Promise<void>;
  
  uploadImage(propertyId: string, file: File): Promise<PropertyImage>;
  getPropertyImages(propertyId: string): Promise<PropertyImage[]>;
}

export interface IContactService {
  createContactRequest(requestData: Omit<ContactRequest, 'id' | 'createdAt'>): Promise<ContactRequest>;
  getRequestsForProperty(propertyId: string): Promise<ContactRequest[]>;
  getRequestsByUser(userId: string): Promise<ContactRequest[]>;
}

export interface IRatingService {
  createRating(ratingData: Omit<Rating, 'id' | 'createdAt'>): Promise<Rating>;
  getRatingsForUser(userId: string): Promise<Rating[]>;
}

export interface IAdminService {
  verifyProperty(propertyId: string, verified: boolean): Promise<void>;
  verifyUser(userId: string, verified: boolean): Promise<void>;
  getPendingProperties(): Promise<Property[]>;
  getPendingUsers(): Promise<User[]>;
}
