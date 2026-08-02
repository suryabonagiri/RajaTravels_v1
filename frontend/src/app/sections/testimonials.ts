import { Component, inject } from '@angular/core';
import { ContentService } from '../core/content.service';
import { SectionHeading } from '../shared/section-heading';
import { TestimonialCard } from '../ui/testimonial-card';

@Component({
  selector: 'app-testimonials',
  imports: [SectionHeading, TestimonialCard],
  template: `
    <section class="py-20 md:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-heading
          badge="Testimonials"
          title="What Our Customers Say"
          subtitle="Here's what our happy travelers have to say about their experience with Raja Travels."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          @for (t of content.testimonials().slice(0, 3); track t.name; let i = $index) {
            <app-testimonial-card
              [name]="t.name"
              [location]="t.location"
              [rating]="t.rating"
              [review]="t.review"
              [index]="i"
            />
          }
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 max-w-4xl mx-auto">
          @for (t of content.testimonials().slice(3, 5); track t.name; let i = $index) {
            <app-testimonial-card
              [name]="t.name"
              [location]="t.location"
              [rating]="t.rating"
              [review]="t.review"
              [index]="i + 3"
            />
          }
        </div>
      </div>
    </section>
  `,
})
export class Testimonials {
  protected readonly content = inject(ContentService);
}
