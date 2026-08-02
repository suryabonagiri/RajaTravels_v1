import { Component, inject, signal } from '@angular/core';
import { ContentService } from '../core/content.service';
import { ScrollReveal } from '../shared/scroll-reveal';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-faq',
  imports: [SectionHeading, ScrollReveal],
  template: `
    <section class="py-20 md:py-28 bg-surface">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-heading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Got questions? We've got answers. Find everything you need to know about our services."
        />

        <div class="space-y-3">
          @for (faq of content.faqs(); track faq.question; let i = $index) {
            <div
              scrollReveal="up"
              [revealDelay]="i * 60"
              class="border border-gray-100 rounded-2xl overflow-hidden bg-white card-shadow"
            >
              <button
                (click)="toggle(i)"
                class="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer hover:bg-gray-50/50 transition-colors"
              >
                <span class="font-semibold text-primary text-sm md:text-base pr-4">{{ faq.question }}</span>
                <span class="shrink-0 w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold text-xs">
                  <i [class]="openIndex() === i ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"></i>
                </span>
              </button>
              <div class="faq-answer" [class.open]="openIndex() === i">
                <div>
                  <div
                    class="px-5 md:px-6 pb-5 md:pb-6 text-text-secondary text-sm leading-relaxed border-t border-gray-100 pt-4"
                  >
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class FaqSection {
  protected readonly content = inject(ContentService);
  protected readonly openIndex = signal(-1);

  protected toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? -1 : index);
  }
}
