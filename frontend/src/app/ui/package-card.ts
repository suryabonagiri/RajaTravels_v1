import { Component, inject, input } from '@angular/core';
import { BookingService } from '../core/booking.service';
import { ScrollReveal } from '../shared/scroll-reveal';

@Component({
  selector: 'app-package-card',
  imports: [ScrollReveal],
  template: `
    <div
      scrollReveal="up"
      [revealDelay]="index() * 100"
      class="group relative h-full bg-white brand-shape overflow-hidden card-shadow hover:card-shadow-lg transition-all duration-300 border border-gray-100 hover-lift-sm"
    >
      <div class="bg-gradient-to-r from-primary to-primary-light p-5 pb-6">
        <div class="flex items-center gap-2 text-gold/80 text-xs font-medium mb-2">
          <i class="fa-solid fa-clock text-[10px]"></i>
          {{ duration() }}
        </div>
        <h3 class="text-lg font-bold text-white leading-tight">{{ title() }}</h3>
      </div>

      <div class="px-6 -mt-3">
        <div class="inline-flex items-baseline gap-2 bg-white rounded-xl px-4 py-2 card-shadow border border-gold/20">
          <span class="text-2xl font-bold text-gold-dark">{{ adultPrice() }}</span>
          <span class="text-xs text-text-secondary">/adult</span>
        </div>
      </div>

      <div class="p-6 pt-4">
        <div class="text-sm text-text-secondary mb-4">
          Child: <span class="font-semibold text-primary">{{ childPrice() }}</span>
        </div>

        <ul class="space-y-2.5 mb-6">
          @for (item of highlights(); track item) {
            <li class="flex items-start gap-2.5 text-sm">
              <i class="fa-solid fa-check text-emerald text-xs mt-1 shrink-0"></i>
              <span class="text-text-secondary">{{ item }}</span>
            </li>
          }
        </ul>

        <button
          (click)="bookNow()"
          class="w-full py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl shimmer hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 cursor-pointer text-sm"
        >
          Book This Package
        </button>
      </div>
    </div>
  `,
})
export class PackageCard {
  readonly title = input.required<string>();
  readonly adultPrice = input.required<string>();
  readonly childPrice = input.required<string>();
  readonly duration = input.required<string>();
  readonly highlights = input.required<string[]>();
  readonly index = input(0);

  private readonly booking = inject(BookingService);

  protected bookNow(): void {
    this.booking.openWhatsApp(this.booking.formatPackageInquiry(this.title()));
  }
}
