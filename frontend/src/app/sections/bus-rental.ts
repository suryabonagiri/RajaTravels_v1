import { Component, inject } from '@angular/core';
import { BookingService } from '../core/booking.service';
import { ContentService } from '../core/content.service';
import { ScrollReveal } from '../shared/scroll-reveal';
import { SectionHeading } from '../shared/section-heading';

const BUS_FEATURES = [
  'AC & Non-AC Options Available',
  'Experienced & Professional Drivers',
  'Well-Maintained Premium Fleet',
  'GPS Tracking on All Vehicles',
  '24/7 Customer Support',
  'Flexible Scheduling',
  'Competitive Pricing',
  'All India Permits',
];

@Component({
  selector: 'app-bus-rental',
  imports: [SectionHeading, ScrollReveal],
  template: `
    <section id="bus-rental" class="py-20 md:py-28 bg-surface relative">
      <div class="absolute inset-0 bg-pattern opacity-40"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-heading
          badge="Bus Services"
          title="Premium Bus Rental"
          subtitle="Comfortable, reliable, and affordable bus rental services for every occasion — from family outings to corporate events."
        />

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left: bus types + features -->
          <div scrollReveal="left">
            <h3 class="text-lg font-bold text-primary mb-5">Available Bus Types</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              @for (type of content.business().busTypes; track type) {
                <div
                  class="bg-white rounded-xl p-4 text-center card-shadow border border-gray-100 hover:border-gold/30 hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-default"
                >
                  <div class="text-2xl mb-1">🚌</div>
                  <div class="text-sm font-semibold text-primary">{{ type }}</div>
                </div>
              }
            </div>

            <h3 class="text-lg font-bold text-primary mb-4">Why Our Buses?</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              @for (feature of busFeatures; track feature) {
                <div class="flex items-center gap-2.5 text-sm">
                  <i class="fa-solid fa-check text-emerald text-xs shrink-0"></i>
                  <span class="text-text-secondary">{{ feature }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Right: image + CTA -->
          <div scrollReveal="right">
            <div class="relative brand-shape overflow-hidden aspect-[4/3] mb-6">
              <img
                src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80"
                alt="Premium luxury bus for rental travel services"
                loading="lazy"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <div class="glass rounded-xl p-4 text-center">
                  <p class="text-white font-semibold text-sm">
                    Perfect for Marriages • Corporate Events • Family Tours
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <button
                (click)="inquire()"
                class="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-primary-light hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] text-white font-semibold rounded-xl transition-all duration-300 shimmer cursor-pointer text-sm"
              >
                <i class="fa-brands fa-whatsapp text-lg"></i>
                Inquire on WhatsApp
              </button>
              <a
                [href]="'tel:' + content.business().primaryPhone"
                class="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-primary-light hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] text-white font-semibold rounded-xl transition-all duration-300 shimmer text-sm"
              >
                <i class="fa-solid fa-phone text-sm"></i>
                Call: {{ content.business().primaryPhone }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class BusRental {
  protected readonly content = inject(ContentService);
  private readonly booking = inject(BookingService);

  protected readonly busFeatures = BUS_FEATURES;

  protected inquire(): void {
    this.booking.openWhatsApp(
      "Hi! I'd like to inquire about bus rental services. Please share availability and pricing."
    );
  }
}
