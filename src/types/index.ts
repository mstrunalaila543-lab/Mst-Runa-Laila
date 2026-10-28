export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'detail' | 'protection' | 'correction' | 'maintenance';
  duration: string;
  startingPrice: string;
  image: string;
  features: string[];
  recommendedFor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  vehicle: string;
  category: 'correction' | 'coating' | 'interior' | 'wheels';
  beforeImage?: string;
  afterImage: string;
  serviceCompleted: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  vehicle: string;
  date: string;
  rating: number;
  comment: string;
  service: string;
  verified: boolean;
}

export interface BookingFormData {
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  phone: string;
  email: string;
  locationAddress: string;
  notes: string;
}
