import { Component, inject } from '@angular/core';
import { BookingService } from '../core/booking.service';
import { NAV_LINKS, smoothScrollTo } from '../core/constants';
import { ContentService } from '../core/content.service';
import { ScrollReveal } from '../shared/scroll-reveal';

@Component({
  selector: 'app-footer',
  imports: [ScrollReveal],
  template: `
    <footer class="bg-white border-t border-gray-100 relative overflow-hidden pt-20 pb-10">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <!-- Brand -->
          <div scrollReveal="up">
            <div class="mb-6 relative w-[260px] h-[75px] md:w-[320px] md:h-[90px] overflow-hidden group">
              <img
                src="/Raja_Travels_logo.png"
                alt="Raja Travels Logo"
                class="absolute left-[-32px] top-[-69px] w-full h-[246%] object-contain object-left group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            <p class="text-text-secondary text-sm leading-relaxed mb-6">
              Your trusted partner for exploring the enchanting beauty of Andhra Pradesh. We provide premium luxury
              travel experiences with uncompromised comfort.
            </p>
            <div class="flex gap-3">
              @for (social of socials; track social.label) {
                <a
                  [href]="content.business().socialLinks[social.key]"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="social.label"
                  class="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-gold hover:text-white transition-all duration-300 text-sm"
                >
                  <i [class]="social.icon"></i>
                </a>
              }
            </div>
          </div>

          <!-- Quick Links -->
          <div scrollReveal="up" [revealDelay]="100">
            <h4 class="text-primary font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
            <ul class="space-y-2.5">
              @for (link of navLinks; track link.href) {
                <li>
                  <button
                    (click)="scrollTo(link.href)"
                    class="text-text-secondary hover:text-gold transition-colors duration-200 text-sm cursor-pointer"
                  >
                    {{ link.label }}
                  </button>
                </li>
              }
            </ul>
          </div>

          <!-- Services -->
          <div scrollReveal="up" [revealDelay]="200">
            <h4 class="text-primary font-semibold mb-4 text-sm tracking-wide uppercase">Our Services</h4>
            <ul class="space-y-2.5 text-sm text-text-secondary">
              <li>Bus Rental Services</li>
              <li>Papikondalu Boat Tourism</li>
              <li>Maredumilli Eco Tourism</li>
              <li>Haritha Resort Booking</li>
              <li>Group &amp; Family Tours</li>
              <li>Corporate Trips</li>
              <li>Marriage Trip Buses</li>
            </ul>
          </div>

          <!-- Contact -->
          <div scrollReveal="up" [revealDelay]="300">
            <h4 class="text-primary font-semibold mb-4 text-sm tracking-wide uppercase">Contact Us</h4>
            <ul class="space-y-3">
              <li class="flex items-start gap-3 text-text-secondary text-sm">
                <i class="fa-solid fa-location-dot text-gold mt-0.5 shrink-0"></i>
                <span>{{ content.business().address }}</span>
              </li>
              @for (phone of content.business().phones.slice(0, 2); track phone) {
                <li>
                  <a
                    [href]="'tel:' + phone"
                    class="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm"
                  >
                    <i class="fa-solid fa-phone text-gold text-xs"></i>
                    {{ phone }}
                  </a>
                </li>
              }
              <li>
                <a
                  [href]="'mailto:' + content.business().email"
                  class="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm"
                >
                  <i class="fa-solid fa-envelope text-gold text-xs"></i>
                  {{ content.business().email }}
                </a>
              </li>
              <li>
                <a
                  [href]="whatsAppLink()"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 text-text-secondary hover:text-emerald-600 transition-colors text-sm"
                >
                  <i class="fa-brands fa-whatsapp text-emerald-500 text-sm"></i>
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-text-secondary text-sm text-center md:text-left">
            © {{ year }} Raja Travels | AP Tourism Authorized Agent. All rights reserved.
          </p>
          <button
            (click)="scrollTo('home')"
            class="flex items-center gap-2 text-text-secondary hover:text-gold text-sm transition-colors cursor-pointer"
          >
            Back to Top <i class="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly content = inject(ContentService);
  private readonly booking = inject(BookingService);

  protected readonly navLinks = NAV_LINKS;
  protected readonly year = new Date().getFullYear();

  protected readonly socials = [
    { key: 'facebook', label: 'Facebook', icon: 'fa-brands fa-facebook-f' },
    { key: 'instagram', label: 'Instagram', icon: 'fa-brands fa-instagram' },
    { key: 'youtube', label: 'YouTube', icon: 'fa-brands fa-youtube' },
    { key: 'twitter', label: 'Twitter', icon: 'fa-brands fa-twitter' },
  ];

  protected scrollTo(id: string): void {
    smoothScrollTo(id);
  }

  protected whatsAppLink(): string {
    return this.booking.whatsAppLink("Hi! I'd like to know more about Raja Travels services.");
  }
}
