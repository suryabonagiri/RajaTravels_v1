import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, of, timeout } from 'rxjs';
import { DEFAULT_BUSINESS, DEFAULT_SERVICES } from './constants';
import {
  BusinessInfo,
  Destination,
  Faq,
  HarithaResort,
  Testimonial,
  TourPackage,
  TravelService,
} from './models';

const API_TIMEOUT_MS = 2500;

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  readonly business = signal<BusinessInfo>(DEFAULT_BUSINESS);
  readonly services = signal<TravelService[]>(DEFAULT_SERVICES);
  readonly destinations = signal<Destination[]>([]);
  readonly packages = signal<TourPackage[]>([]);
  readonly testimonials = signal<Testimonial[]>([]);
  readonly faqs = signal<Faq[]>([]);
  readonly resorts = signal<HarithaResort[]>([]);

  constructor() {
    this.load('/api/business', this.business, DEFAULT_BUSINESS);
    this.load('/api/services', this.services, DEFAULT_SERVICES);
    this.load('/api/destinations', this.destinations, []);
    this.load('/api/packages', this.packages, []);
    this.load('/api/testimonials', this.testimonials, []);
    this.load('/api/faqs', this.faqs, []);
    this.load('/api/resorts', this.resorts, []);
  }

  private load<T>(url: string, target: ReturnType<typeof signal<T>>, fallback: T): void {
    this.http
      .get<T>(url)
      .pipe(
        timeout(API_TIMEOUT_MS),
        catchError(() => of(fallback)),
      )
      .subscribe((value) => target.set(value));
  }
}
