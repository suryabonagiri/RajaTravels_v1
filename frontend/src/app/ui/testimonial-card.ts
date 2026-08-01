import { Component, input } from '@angular/core';
import { ScrollReveal } from '../shared/scroll-reveal';

@Component({
  selector: 'app-testimonial-card',
  imports: [ScrollReveal],
  template: `
    <div
      scrollReveal="up"
      [revealDelay]="index() * 100"
      class="relative bg-white brand-shape p-6 md:p-8 card-shadow border border-gray-100 h-full flex flex-col"
    >
      <i class="fa-solid fa-quote-left text-gold/20 text-3xl mb-4"></i>

      <div class="flex gap-1 mb-4">
        @for (star of stars(); track $index) {
          <i class="fa-solid fa-star text-gold text-sm"></i>
        }
      </div>

      <p class="text-text-secondary text-sm leading-relaxed flex-1 mb-5">
        &ldquo;{{ review() }}&rdquo;
      </p>

      <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div
          class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(245,158,11,0.2)]"
        >
          {{ name().charAt(0) }}
        </div>
        <div>
          <div class="font-semibold text-primary text-sm">{{ name() }}</div>
          <div class="text-text-light text-xs">{{ location() }}</div>
        </div>
      </div>
    </div>
  `,
})
export class TestimonialCard {
  readonly name = input.required<string>();
  readonly location = input.required<string>();
  readonly rating = input.required<number>();
  readonly review = input.required<string>();
  readonly index = input(0);

  protected stars(): number[] {
    return Array.from({ length: this.rating() });
  }
}
