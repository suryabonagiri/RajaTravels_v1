import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { catchError, of, timeout } from 'rxjs';
import {
  DEFAULT_BUSINESS,
  DEFAULT_DESTINATIONS,
  DEFAULT_FAQS,
  DEFAULT_PACKAGES,
  DEFAULT_RESORTS,
  DEFAULT_SERVICES,
  DEFAULT_TESTIMONIALS,
} from './constants';
import {
  BusinessInfo,
  Destination,
  Faq,
  HarithaResort,
  Testimonial,
  TourPackage,
  TravelService,
} from './models';

const API_TIMEOUT_MS = 1500;

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  readonly business = signal<BusinessInfo>(DEFAULT_BUSINESS);
  readonly services = signal<TravelService[]>(DEFAULT_SERVICES);
  readonly destinations = signal<Destination[]>(DEFAULT_DESTINATIONS);
  readonly packages = signal<TourPackage[]>(DEFAULT_PACKAGES);
  readonly testimonials = signal<Testimonial[]>(DEFAULT_TESTIMONIALS);
  readonly faqs = signal<Faq[]>(DEFAULT_FAQS);
  readonly resorts = signal<HarithaResort[]>(DEFAULT_RESORTS);

  constructor() {
    // Keep seeded defaults if the backend is down — only replace on success.
    this.load('/api/business', this.business, DEFAULT_BUSINESS);
    this.load('/api/services', this.services, DEFAULT_SERVICES);
    this.load('/api/destinations', this.destinations, DEFAULT_DESTINATIONS);
    this.load('/api/packages', this.packages, DEFAULT_PACKAGES);
    this.load('/api/testimonials', this.testimonials, DEFAULT_TESTIMONIALS);
    this.load('/api/faqs', this.faqs, DEFAULT_FAQS);
    this.load('/api/resorts', this.resorts, DEFAULT_RESORTS);
  }

  private load<T>(url: string, target: WritableSignal<T>, fallback: T): void {
    this.http
      .get<T>(url)
      .pipe(
        timeout(API_TIMEOUT_MS),
        catchError(() => of(fallback)),
      )
      .subscribe((value) => {
        if (value != null) {
          target.set(value);
        }
      });
  }
}
