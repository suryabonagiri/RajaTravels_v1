import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { DEFAULT_BUSINESS } from './constants';
import {
  BusinessInfo,
  Destination,
  Faq,
  HarithaResort,
  Testimonial,
  TourPackage,
  TravelService,
} from './models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  readonly business = signal<BusinessInfo>(DEFAULT_BUSINESS);
  readonly services = signal<TravelService[]>([]);
  readonly destinations = signal<Destination[]>([]);
  readonly packages = signal<TourPackage[]>([]);
  readonly testimonials = signal<Testimonial[]>([]);
  readonly faqs = signal<Faq[]>([]);
  readonly resorts = signal<HarithaResort[]>([]);

  constructor() {
    this.http.get<BusinessInfo>('/api/business').subscribe((b) => this.business.set(b));
    this.http.get<TravelService[]>('/api/services').subscribe((s) => this.services.set(s));
    this.http.get<Destination[]>('/api/destinations').subscribe((d) => this.destinations.set(d));
    this.http.get<TourPackage[]>('/api/packages').subscribe((p) => this.packages.set(p));
    this.http.get<Testimonial[]>('/api/testimonials').subscribe((t) => this.testimonials.set(t));
    this.http.get<Faq[]>('/api/faqs').subscribe((f) => this.faqs.set(f));
    this.http.get<HarithaResort[]>('/api/resorts').subscribe((r) => this.resorts.set(r));
  }
}
