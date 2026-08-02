import { Component, HostListener, inject, signal } from '@angular/core';
import { BookingService } from '../core/booking.service';
import { ContentService } from '../core/content.service';

@Component({
  selector: 'app-floating-buttons',
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      @if (showScrollTop()) {
        <button
          (click)="scrollToTop()"
          class="w-11 h-11 rounded-full bg-primary/90 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:bg-primary transition-colors cursor-pointer border border-white/10"
          aria-label="Scroll to top"
        >
          <i class="fa-solid fa-arrow-up text-sm"></i>
        </button>
      }

      <a
        [href]="whatsAppLink()"
        target="_blank"
        rel="noopener noreferrer"
        class="relative w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary-light text-white flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer"
        [attr.aria-label]="'Chat with ' + content.business().name + ' on WhatsApp'"
      >
        <i class="fa-brands fa-whatsapp text-2xl"></i>
        <span class="absolute inset-0 rounded-full bg-gold animate-ping opacity-30"></span>
      </a>
    </div>
  `,
})
export class FloatingButtons {
  protected readonly content = inject(ContentService);
  private readonly booking = inject(BookingService);

  protected readonly showScrollTop = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.showScrollTop.set(window.scrollY > 500);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected whatsAppLink(): string {
    return this.booking.whatsAppLink(
      "Hi! I'm visiting the Raja Travels website and would like more information about your services."
    );
  }
}
