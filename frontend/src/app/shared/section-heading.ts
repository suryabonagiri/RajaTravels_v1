import { Component, input } from '@angular/core';
import { ScrollReveal } from './scroll-reveal';

@Component({
  selector: 'app-section-heading',
  imports: [ScrollReveal],
  template: `
    <div scrollReveal="up" class="mb-12 md:mb-16" [class.text-center]="center()">
      @if (badge()) {
        <span
          class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
          [class]="
            light()
              ? 'bg-white/10 text-gold-light border border-white/10'
              : 'bg-gold/10 text-gold-dark border border-gold/20'
          "
        >
          {{ badge() }}
        </span>
      }
      <h2
        class="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight"
        [class]="light() ? 'text-white' : 'text-primary'"
      >
        {{ title() }}
      </h2>
      @if (subtitle()) {
        <p
          class="mt-4 text-base md:text-lg max-w-2xl leading-relaxed"
          [class.mx-auto]="center()"
          [class]="light() ? 'text-white/70' : 'text-text-secondary'"
        >
          {{ subtitle() }}
        </p>
      }
      <div class="mt-5" [class]="center() ? 'flex justify-center' : ''">
        <div class="section-divider"></div>
      </div>
    </div>
  `,
})
export class SectionHeading {
  readonly badge = input('');
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly light = input(false);
  readonly center = input(true);
}
