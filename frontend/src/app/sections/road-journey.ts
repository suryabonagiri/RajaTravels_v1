import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { JOURNEY_CTA, smoothScrollTo } from '../core/constants';
import { ContentService } from '../core/content.service';
import { TravelService } from '../core/models';

const ICON_MAP: Record<string, string> = {
  bus: 'fa-solid fa-bus',
  boat: 'fa-solid fa-ship',
  forest: 'fa-solid fa-tree',
  resort: 'fa-solid fa-hotel',
  group: 'fa-solid fa-users',
  corporate: 'fa-solid fa-briefcase',
};

@Component({
  selector: 'app-road-journey',
  template: `
    @if (reduceMotion()) {
      <section id="journey" class="relative py-20 md:py-28 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary to-[#061530]"></div>
        <div class="absolute inset-0 bg-pattern opacity-30"></div>
        <div class="relative max-w-3xl mx-auto px-4 sm:px-6">
          <p class="text-gold font-semibold tracking-wide text-sm uppercase mb-3">Our Services</p>
          <h2 class="font-heading text-3xl md:text-4xl text-white mb-6">Everything we offer</h2>
          <ul class="grid sm:grid-cols-2 gap-3 mb-10">
            @for (service of stops(); track service.id; let i = $index) {
              <li class="text-sm text-gold-light/90">
                <span class="text-gold font-mono text-xs mr-2">{{ pad(i + 1) }}</span>
                {{ service.title }}
              </li>
            }
          </ul>
          <ol class="space-y-8 border-l border-gold/40 pl-6">
            @for (service of stops(); track service.id) {
              <li class="relative">
                <span class="absolute -left-[1.9rem] top-1 h-3 w-3 rounded-full bg-gold"></span>
                <h3 class="text-xl text-white font-semibold mb-2">{{ service.title }}</h3>
                <p class="text-white/65 text-sm leading-relaxed mb-3">{{ service.description }}</p>
                <button
                  type="button"
                  (click)="goCta(service.id)"
                  class="inline-flex items-center gap-2 text-gold text-sm font-medium cursor-pointer"
                >
                  {{ ctaLabel(service.id) }}
                  <i class="fa-solid fa-arrow-right text-xs"></i>
                </button>
              </li>
            }
          </ol>
        </div>
      </section>
    } @else {
      <section
        id="journey"
        #sectionEl
        class="relative"
        [style.height]="sectionHeight()"
      >
        <div class="sticky top-0 h-[100dvh] overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-[#071a38]"></div>
          <div
            class="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(245,158,11,0.14),transparent_45%),radial-gradient(ellipse_at_80%_80%,rgba(26,99,191,0.35),transparent_50%)]"
          ></div>
          <div class="absolute inset-0 bg-pattern opacity-25"></div>

          <div
            class="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4 md:pt-24 md:pb-8 flex flex-col"
          >
            <div class="shrink-0 mb-3 md:mb-5">
              <p class="text-gold font-semibold tracking-[0.18em] text-[10px] md:text-xs uppercase mb-1.5">
                Raja Route
              </p>
              <h2 class="font-heading text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-3 md:mb-4">
                All services we <span class="text-gradient-gold">offer</span>
              </h2>
              <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-2">
                @for (service of stops(); track service.id; let i = $index) {
                  <li>
                    <button
                      type="button"
                      (click)="scrollToStop(i)"
                      class="w-full text-left flex items-start gap-2 rounded-lg px-2.5 py-2 border transition-all duration-300 cursor-pointer"
                      [class]="
                        i === activeIndex()
                          ? 'bg-gold/15 border-gold/45 text-white'
                          : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-gold/30 hover:text-white'
                      "
                    >
                      <span
                        class="mt-0.5 font-mono text-[10px] md:text-xs shrink-0"
                        [class]="i === activeIndex() ? 'text-gold' : 'text-gold/60'"
                      >
                        {{ pad(i + 1) }}
                      </span>
                      <span
                        class="text-xs md:text-sm font-medium leading-snug"
                        [class.text-gold-light]="i === activeIndex()"
                      >
                        {{ service.title }}
                      </span>
                    </button>
                  </li>
                }
              </ul>
            </div>

            <div class="relative flex-1 min-h-0 grid grid-cols-[auto_1fr] gap-4 md:gap-10">
              <div class="relative w-12 sm:w-14 md:w-20 h-full">
                <div
                  class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-9 sm:w-10 md:w-12 rounded-full bg-[#1a2332] border border-white/10 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.45)]"
                >
                  <div
                    class="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(180deg,transparent,transparent_10px,rgba(255,255,255,0.04)_10px,rgba(255,255,255,0.04)_12px)]"
                  ></div>
                  <div
                    class="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-0.5 bg-[repeating-linear-gradient(180deg,#FBBF24_0_10px,transparent_10px_22px)] opacity-80"
                  ></div>
                  <div
                    class="absolute left-0 right-0 top-0 bg-gradient-to-b from-gold/35 to-gold/10 transition-[height] duration-75"
                    [style.height.%]="progress() * 100"
                  ></div>
                </div>

                @for (service of stops(); track service.id; let i = $index) {
                  <button
                    type="button"
                    class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    [style.top.%]="4 + (i / maxIndex()) * 84"
                    [attr.aria-label]="'Go to ' + service.title"
                    [attr.aria-current]="i === activeIndex() ? 'step' : null"
                    (click)="scrollToStop(i)"
                  >
                    <span
                      class="block rounded-full border-2 transition-all duration-300"
                      [class]="
                        i === activeIndex()
                          ? 'h-3.5 w-3.5 bg-gold border-white scale-125 shadow-[0_0_16px_rgba(245,158,11,0.7)]'
                          : i < activeIndex()
                            ? 'h-3 w-3 bg-gold/80 border-gold-light'
                            : 'h-3 w-3 bg-primary-dark border-white/40'
                      "
                    ></span>
                  </button>
                }

                <div
                  class="absolute left-1/2 -translate-x-1/2 z-20 w-8 sm:w-9 md:w-10"
                  [style.top.%]="4 + progress() * 84"
                >
                  <div class="journey-bus will-change-transform">
                    <svg viewBox="0 0 48 64" class="w-full h-auto drop-shadow-lg" aria-hidden="true">
                      <rect x="8" y="4" width="32" height="48" rx="8" fill="#F59E0B" />
                      <rect x="12" y="10" width="24" height="14" rx="3" fill="#FEF3C7" />
                      <rect x="12" y="28" width="10" height="8" rx="2" fill="#FEF3C7" />
                      <rect x="26" y="28" width="10" height="8" rx="2" fill="#FEF3C7" />
                      <rect x="14" y="48" width="8" height="6" rx="2" fill="#002D66" />
                      <rect x="26" y="48" width="8" height="6" rx="2" fill="#002D66" />
                      <circle cx="18" cy="58" r="4" fill="#1f2937" />
                      <circle cx="30" cy="58" r="4" fill="#1f2937" />
                      <rect x="20" y="2" width="8" height="4" rx="1" fill="#D97706" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="min-h-0 flex items-center overflow-y-auto">
                @if (activeStop(); as stop) {
                  <div class="w-full max-w-xl py-1">
                    <p class="text-gold/80 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-2">
                      Service {{ activeIndex() + 1 }} of {{ stops().length }}
                    </p>
                    <div class="flex items-center gap-3 mb-3 md:mb-4">
                      <span
                        class="inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gold/15 text-gold border border-gold/30"
                      >
                        <i [class]="iconClass(stop.icon)" class="text-xl"></i>
                      </span>
                      <h3 class="font-heading text-xl sm:text-2xl md:text-3xl text-white leading-snug">
                        {{ stop.title }}
                      </h3>
                    </div>
                    <p class="text-white/70 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                      {{ stop.description }}
                    </p>
                    <button
                      type="button"
                      (click)="goCta(stop.id)"
                      class="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-primary-dark font-semibold text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-colors shimmer cursor-pointer"
                    >
                      {{ ctaLabel(stop.id) }}
                      <i class="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    }
  `,
  styles: `
    .journey-bus {
      animation: journey-bus-sway 0.55s ease-in-out infinite;
    }

    @keyframes journey-bus-sway {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(1.2px);
      }
      75% {
        transform: translateX(-1.2px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .journey-bus {
        animation: none;
      }
    }
  `,
})
export class RoadJourney implements OnInit {
  private readonly content = inject(ContentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sectionRef = viewChild<ElementRef<HTMLElement>>('sectionEl');

  protected readonly reduceMotion = signal(false);
  protected readonly progress = signal(0);
  protected readonly activeIndex = signal(0);

  protected readonly stops = computed(() => this.content.services());
  protected readonly maxIndex = computed(() => Math.max(this.stops().length - 1, 1));
  protected readonly sectionHeight = computed(() => `${Math.max(this.stops().length, 2) * 95}vh`);
  protected readonly activeStop = computed<TravelService | null>(() => {
    const list = this.stops();
    if (!list.length) return null;
    return list[this.activeIndex()] ?? list[0];
  });

  ngOnInit(): void {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => this.reduceMotion.set(mq.matches);
    syncMotion();
    mq.addEventListener('change', syncMotion);
    this.destroyRef.onDestroy(() => mq.removeEventListener('change', syncMotion));

    fromEvent(window, 'scroll', { passive: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateProgress());

    fromEvent(window, 'resize', { passive: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateProgress());

    queueMicrotask(() => this.updateProgress());
  }

  @HostListener('window:load')
  onLoad(): void {
    this.updateProgress();
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  protected iconClass(icon: string): string {
    return ICON_MAP[icon] ?? ICON_MAP['bus'];
  }

  protected ctaLabel(id: string): string {
    return JOURNEY_CTA[id]?.label ?? 'Learn more';
  }

  protected goCta(id: string): void {
    smoothScrollTo(JOURNEY_CTA[id]?.href ?? 'services');
  }

  protected scrollToStop(index: number): void {
    const el = this.sectionRef()?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target = absoluteTop + (index / this.maxIndex()) * scrollable;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  private updateProgress(): void {
    if (this.reduceMotion()) return;
    const el = this.sectionRef()?.nativeElement;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) {
      this.progress.set(0);
      this.activeIndex.set(0);
      return;
    }

    const traveled = -rect.top;
    const p = Math.min(1, Math.max(0, traveled / scrollable));
    this.progress.set(p);

    const count = this.stops().length;
    if (count <= 1) {
      this.activeIndex.set(0);
      return;
    }
    this.activeIndex.set(Math.min(count - 1, Math.round(p * (count - 1))));
  }
}
