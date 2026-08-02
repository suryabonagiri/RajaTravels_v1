import { Component, inject } from '@angular/core';
import { ContentService } from '../core/content.service';
import { SectionHeading } from '../shared/section-heading';
import { DestinationCard } from '../ui/destination-card';

@Component({
  selector: 'app-destinations',
  imports: [SectionHeading, DestinationCard],
  template: `
    <section id="destinations" class="py-20 md:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-heading
          badge="Explore"
          title="Popular Destinations"
          subtitle="Discover the hidden gems of Andhra Pradesh. From river cruises to forest adventures, every destination is a journey worth taking."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          @for (dest of content.destinations(); track dest.id; let i = $index) {
            <app-destination-card
              [title]="dest.title"
              [subtitle]="dest.subtitle"
              [description]="dest.description"
              [image]="dest.image"
              [highlights]="dest.highlights"
              [index]="i"
            />
          }
        </div>
      </div>
    </section>
  `,
})
export class Destinations {
  protected readonly content = inject(ContentService);
}
