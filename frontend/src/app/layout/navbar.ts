import { Component, HostListener, inject, signal } from '@angular/core';
import { NAV_LINKS, smoothScrollTo } from '../core/constants';
import { ContentService } from '../core/content.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-gray-200/50 py-0.5"
      [class]="
        isScrolled()
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.05)]'
          : 'bg-white/80 backdrop-blur-lg shadow-sm'
      "
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button (click)="navigate('home')" class="flex items-center cursor-pointer group">
          <div
            class="relative w-[180px] h-[48px] md:w-[220px] md:h-[56px] overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
          >
            <img
              src="/Raja_Travels_logo.png"
              alt="Raja Travels Logo"
              class="absolute left-0 top-[-26px] w-full h-[212%] object-contain object-left"
            />
          </div>
        </button>

        <div class="hidden lg:flex items-center gap-2">
          @for (link of navLinks; track link.href) {
            <button
              (click)="navigate(link.href)"
              class="px-3 xl:px-4 py-2 text-sm text-primary font-bold hover:text-gold transition-colors duration-300 rounded-lg hover:bg-primary/5 cursor-pointer tracking-wide"
            >
              {{ link.label }}
            </button>
          }
        </div>

        <div class="flex items-center gap-3">
          <a
            [href]="'tel:' + content.business().primaryPhone"
            class="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold rounded-xl shimmer hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-shadow duration-300"
          >
            <i class="fa-solid fa-phone text-xs"></i>
            Call Now
          </a>

          <button
            (click)="mobileOpen.set(!mobileOpen())"
            class="lg:hidden p-2.5 text-primary hover:text-gold transition-colors cursor-pointer bg-primary/5 rounded-lg"
            aria-label="Toggle menu"
          >
            <i class="text-xl" [class]="mobileOpen() ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
          </button>
        </div>
      </div>
    </nav>

    @if (mobileOpen()) {
      <div class="fixed inset-0 z-40 lg:hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" (click)="mobileOpen.set(false)"></div>
        <div class="absolute top-0 right-0 w-[280px] h-full bg-primary shadow-2xl">
          <div class="pt-20 px-6">
            <div class="space-y-1">
              @for (link of navLinks; track link.href) {
                <button
                  (click)="navigate(link.href)"
                  class="block w-full text-left px-4 py-3 text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all duration-200 font-medium cursor-pointer"
                >
                  {{ link.label }}
                </button>
              }
            </div>

            <div class="mt-8 pt-6 border-t border-white/10">
              <a
                [href]="'tel:' + content.business().primaryPhone"
                class="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold to-gold-dark text-white font-semibold rounded-xl w-full"
              >
                <i class="fa-solid fa-phone text-sm"></i>
                {{ content.business().primaryPhone }}
              </a>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class Navbar {
  protected readonly content = inject(ContentService);
  protected readonly navLinks = NAV_LINKS;
  protected readonly isScrolled = signal(false);
  protected readonly mobileOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  protected navigate(id: string): void {
    smoothScrollTo(id);
    this.mobileOpen.set(false);
  }
}
