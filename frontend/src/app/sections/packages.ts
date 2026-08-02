import { Component, inject } from '@angular/core';
import { ContentService } from '../core/content.service';
import { ScrollReveal } from '../shared/scroll-reveal';
import { SectionHeading } from '../shared/section-heading';
import { PackageCard } from '../ui/package-card';

@Component({
  selector: 'app-packages',
  imports: [SectionHeading, PackageCard, ScrollReveal],
  template: `
    <section id="packages" class="py-20 md:py-28 relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=40"
          alt="Background scenery"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-primary/95"></div>
        <div class="absolute inset-0 bg-pattern opacity-20"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-heading
          badge="Tour Packages"
          title="AP Tourism Packages"
          subtitle="Choose from our carefully curated tour packages. Every package includes transport, meals, and unforgettable experiences."
          [light]="true"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          @for (pkg of content.packages(); track pkg.id; let i = $index) {
            <app-package-card
              [title]="pkg.title"
              [adultPrice]="pkg.adultPrice"
              [childPrice]="pkg.childPrice"
              [duration]="pkg.duration"
              [highlights]="pkg.highlights"
              [index]="i"
            />
          }
        </div>

        <p scrollReveal="fade" [revealDelay]="500" class="text-center text-white/40 text-sm mt-10">
          * Prices are subject to change. Contact us for the latest rates and custom packages.
        </p>
      </div>
    </section>
  `,
})
export class Packages {
  protected readonly content = inject(ContentService);
}
