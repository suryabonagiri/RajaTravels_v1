export interface TravelService {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  adultPrice: string;
  childPrice: string;
  duration: string;
  destination: string;
  highlights: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  review: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface HarithaResort {
  name: string;
  location: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  phones: string[];
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  socialLinks: Record<string, string>;
  busTypes: string[];
  stats: Stat[];
}

export interface InquiryRequest {
  serviceType: string;
  startPoint: string;
  destination: string;
  journeyDate: string;
  busType: string;
  customerName: string;
  phone: string;
  message: string;
}
