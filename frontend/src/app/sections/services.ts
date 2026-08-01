import { Component, inject } from '@angular/core';
import { ContentService } from '../core/content.service';
import { SectionHeading } from '../shared/section-heading';
import { ServiceCard } from '../ui/service-card';

@Component({
  selector: 'app-services',
  imports: [SectionHeading, ServiceCard],
  template: `
    <section id="services" class="py-20 md:py-28 bg-surface relative">
      <div class="absolute inset-0 bg-pattern opacity-40"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-heading
          badge="What We Offer"
          title="Our Premium Services"
          subtitle="From luxury bus rentals to breathtaking tourism packages, we deliver excellence in every journey across Andhra Pradesh."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          @for (service of content.services(); track service.id; let i = $index) {
            <app-service-card
              [title]="service.title"
              [description]="service.description"
              [icon]="service.icon"
              [index]="i"
            />
          }
        </div>
      </div>
    </section>
  `,
})
export class Services {
  protected readonly content = inject(ContentService);
}
