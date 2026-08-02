import { Component, computed, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BookingService } from '../core/booking.service';
import { ContentService } from '../core/content.service';
import { ScrollReveal } from '../shared/scroll-reveal';
import { SectionHeading } from '../shared/section-heading';

@Component({
  selector: 'app-contact',
  imports: [SectionHeading, ScrollReveal],
  template: `
    <section id="contact" class="py-20 md:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-heading
          badge="Get in Touch"
          title="Contact Us"
          subtitle="Have questions or ready to book? Reach out to us through any of the channels below."
        />

        <div class="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <!-- Contact info -->
          <div scrollReveal="left">
            <h3 class="text-lg font-bold text-primary mb-4">Call Us Directly</h3>
            <div class="grid grid-cols-2 gap-3 mb-8">
              @for (phone of content.business().phones; track phone) {
                <a
                  [href]="'tel:' + phone"
                  class="flex items-center gap-3 p-4 bg-surface rounded-xl border border-gray-100 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                >
                  <div
                    class="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300 shrink-0"
                  >
                    <i class="fa-solid fa-phone text-xs"></i>
                  </div>
                  <span class="text-sm font-semibold text-primary">{{ phone }}</span>
                </a>
              }
            </div>

            <div class="space-y-4 mb-8">
              <a
                [href]="whatsAppLink()"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20 hover:bg-primary/10 hover:border-gold/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shrink-0"
                >
                  <i class="fa-brands fa-whatsapp text-lg"></i>
                </div>
                <div>
                  <div class="text-sm font-semibold text-primary">WhatsApp Us</div>
                  <div class="text-xs text-text-secondary">Quick response guaranteed</div>
                </div>
              </a>

              <div class="flex items-center gap-4 p-4 bg-surface rounded-xl border border-gray-100">
                <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <i class="fa-solid fa-envelope text-sm"></i>
                </div>
                <div>
                  <div class="text-sm font-semibold text-primary">{{ content.business().email }}</div>
                  <div class="text-xs text-text-secondary">Email us anytime</div>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-surface rounded-xl border border-gray-100">
                <div
                  class="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center text-emerald shrink-0 mt-0.5"
                >
                  <i class="fa-solid fa-location-dot text-sm"></i>
                </div>
                <div>
                  <div class="text-sm font-semibold text-primary">Our Office</div>
                  <div class="text-xs text-text-secondary leading-relaxed">{{ content.business().address }}</div>
                </div>
              </div>

              <div class="flex items-center gap-4 p-4 bg-surface rounded-xl border border-gray-100">
                <div class="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <i class="fa-solid fa-clock text-sm"></i>
                </div>
                <div>
                  <div class="text-sm font-semibold text-primary">Working Hours</div>
                  <div class="text-xs text-text-secondary">Mon - Sun: 6:00 AM - 10:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Google map -->
          <div scrollReveal="right" class="flex flex-col">
            <h3 class="text-lg font-bold text-primary mb-4">Find Us on Map</h3>
            <div class="flex-1 min-h-[400px] rounded-3xl overflow-hidden border border-gray-200 card-shadow">
              <iframe
                [src]="mapUrl()"
                width="100%"
                height="100%"
                style="border: 0; min-height: 400px"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Raja Travels Office Location - Rajahmundry"
              ></iframe>
            </div>
            <p class="text-xs text-text-light mt-3 text-center">📍 {{ content.business().address }}</p>
            <a
              [href]="googleMapsSearchUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-3 text-xs font-bold text-gold hover:text-primary transition-colors text-center inline-block mx-auto border-b border-gold/30 hover:border-primary/30"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly content = inject(ContentService);
  private readonly booking = inject(BookingService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly mapUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.content.business().mapEmbedUrl)
  );

  protected readonly googleMapsSearchUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(
      'Raja Travels (ap tourism authorised) papikondalu tourism 12-21-5, beside sri latha hosipital, Aryapuram, Rajamahendravaram'
    );

  protected whatsAppLink(): string {
    return this.booking.whatsAppLink("Hi! I'd like to know more about Raja Travels services.");
  }
}
