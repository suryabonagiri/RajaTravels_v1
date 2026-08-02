import { Component, inject, input } from '@angular/core';
import { BookingService } from '../core/booking.service';
import { ScrollReveal } from '../shared/scroll-reveal';

@Component({
  selector: 'app-destination-card',
  imports: [ScrollReveal],
  template: `
    <div
      scrollReveal="up"
      [revealDelay]="index() * 150"
      class="group relative h-full bg-white brand-shape overflow-hidden card-shadow-lg hover:shadow-[0_15px_40px_rgba(0,71,158,0.15)] transition-all duration-500"
    >
      <div class="relative h-64 md:h-72 overflow-hidden">
        <img
          [src]="image()"
          [alt]="title()"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>

        <div class="absolute top-4 left-4 px-3 py-1.5 glass rounded-full text-xs font-semibold text-white tracking-wide">
          <i class="fa-solid fa-location-dot mr-1 text-gold"></i> {{ subtitle() }}
        </div>

        <div class="absolute bottom-4 left-4 right-4">
          <h3 class="text-2xl md:text-3xl font-bold text-white font-heading">
            {{ title() }}
          </h3>
        </div>
      </div>

      <div class="p-6 md:p-8">
        <p class="text-text-secondary text-sm leading-relaxed mb-5">
          {{ description() }}
        </p>

        <div class="flex flex-wrap gap-2 mb-6">
          @for (h of highlights(); track h) {
            <span class="px-3 py-1 bg-gold/8 text-gold-dark text-xs font-medium rounded-full border border-gold/15">
              {{ h }}
            </span>
          }
        </div>

        <button
          (click)="bookNow()"
          class="w-full py-3.5 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl shimmer hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-shadow duration-300 cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  `,
})
export class DestinationCard {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly description = input.required<string>();
  readonly image = input.required<string>();
  readonly highlights = input.required<string[]>();
  readonly index = input(0);

  private readonly booking = inject(BookingService);

  protected bookNow(): void {
    this.booking.openWhatsApp(this.booking.formatPackageInquiry(`${this.title()} Tour`));
  }
}
