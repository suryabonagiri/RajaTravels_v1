import { Component, inject } from '@angular/core';
import { ContentService } from '../core/content.service';
import { AnimatedCounter } from '../shared/animated-counter';
import { ScrollReveal } from '../shared/scroll-reveal';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-about',
  imports: [ScrollReveal, SectionHeading, AnimatedCounter],
  template: `
    <section id="about" class="py-20 md:py-28 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Image side -->
          <div scrollReveal="left" class="relative">
            <div class="relative brand-shape overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80"
                alt="Beautiful river cruise boat on Godavari representing AP Tourism experience"
                loading="lazy"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
            </div>

            <div
              scrollReveal="scale"
              [revealDelay]="300"
              class="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-2xl p-5 card-shadow-lg border border-gold/10"
            >
              <div class="text-center">
                <div class="text-3xl font-bold text-gold">10+</div>
                <div class="text-xs text-text-secondary font-medium mt-1">
                  Years of
                  <br />
                  Excellence
                </div>
              </div>
            </div>

            <div class="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/20 rounded-3xl -z-10"></div>
          </div>

          <!-- Text side -->
          <div scrollReveal="right">
            <app-section-heading badge="About Us" title="Welcome to Raja Travels" [center]="false" />

            <div class="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base -mt-6">
              <p>
                Welcome to <strong class="text-primary">Raja Travels</strong>, your trusted partner for exploring the
                enchanting beauty of Andhra Pradesh. We are an
                <strong class="text-gold-dark">AP Tourism Authorized Tours and Travels</strong>
                company dedicated to providing you with the most memorable and authentic travel experiences in this
                vibrant region.
              </p>
              <p>
                At Raja Travels, we specialize in three of Andhra Pradesh's hidden gems:
                <strong class="text-primary">Papikondalu, Maredumilli, and Haritha Resorts</strong>. These destinations
                offer a unique blend of natural beauty, cultural richness, and adventure, and we are here to help you
                uncover their secrets.
              </p>
              <p>
                Beyond our renowned tours, we take pride in offering
                <strong class="text-primary">top-notch bus rental services</strong>
                for marriages, corporate events, family trips, and group tours across Andhra Pradesh and Telangana.
              </p>
            </div>

            <div class="mt-6 flex items-center gap-3 p-4 bg-gold/5 rounded-xl border border-gold/15">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white font-bold text-sm shrink-0"
              >
                AP
              </div>
              <div>
                <div class="text-sm font-bold text-primary">AP Tourism Authorized Agent</div>
                <div class="text-xs text-text-secondary">Officially certified by Andhra Pradesh Tourism</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div
          scrollReveal="up"
          class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-8 bg-gradient-to-r from-primary via-primary-light to-primary rounded-3xl"
        >
          @for (stat of content.business().stats; track stat.label) {
            <app-animated-counter [value]="stat.value" [suffix]="stat.suffix" [label]="stat.label" [light]="true" />
          }
        </div>
      </div>
    </section>
  `,
})
export class About {
  protected readonly content = inject(ContentService);
}
