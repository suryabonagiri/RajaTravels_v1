import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { BookingForm } from '../ui/booking-form';

interface HeroSlide {
  video: string;
  badge: string;
  badgeIcon: string;
  headingLine1: string;
  headingLine2: string;
  subtitle: string;
}

const SLIDES: HeroSlide[] = [
  {
    video: '/videos/bus-hero.mp4',
    badge: 'Premium Bus Travel',
    badgeIcon: 'fa-solid fa-bus',
    headingLine1: 'Your Journey',
    headingLine2: 'Begins Here',
    subtitle:
      'Experience luxury travel across Andhra Pradesh with our premium bus fleet. From corporate events to family celebrations.',
  },
  {
    video: '/videos/boat-hero.mp4',
    badge: 'Papikondalu Boat Tourism',
    badgeIcon: 'fa-solid fa-ship',
    headingLine1: 'Explore the',
    headingLine2: 'Godavari Magic',
    subtitle:
      'Cruise through the majestic Papikondalu hills on the Godavari river. AP Tourism authorized boat tours and eco adventures.',
  },
];

const TRUST_BADGES = [
  { icon: 'fa-solid fa-shield-halved', text: 'AP Tourism Authorized' },
  { icon: 'fa-solid fa-bus', text: 'Premium Fleet' },
  { icon: 'fa-solid fa-map-location-dot', text: '10+ Years Experience' },
];

const SLIDE_DURATION = 8000;

@Component({
  selector: 'app-hero',
  imports: [BookingForm],
  template: `
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-dark">
      <!-- Video backgrounds -->
      @for (slide of slides; track slide.video; let i = $index) {
        <div
          class="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          [style.opacity]="activeSlide() === i ? 1 : 0"
        >
          <video
            autoplay
            muted
            loop
            playsinline
            preload="auto"
            class="absolute inset-0 w-full h-full object-cover"
            [class.hero-zoom]="activeSlide() === i"
          >
            <source [src]="slide.video" type="video/mp4" />
          </video>
        </div>
      }

      <!-- Cinematic overlays -->
      <div class="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-primary-dark/80 z-[1]"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-primary-dark/60 via-transparent to-primary-dark/50 z-[1]"></div>
      <div class="absolute inset-0 bg-pattern opacity-20 z-[1]"></div>
      <div
        class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent z-[2]"
      ></div>

      <!-- Slide indicators -->
      <div class="absolute bottom-28 md:bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        @for (slide of slides; track slide.video; let i = $index) {
          <button (click)="setSlide(i)" class="group relative cursor-pointer" [attr.aria-label]="'Go to slide ' + (i + 1)">
            <div class="w-12 md:w-16 h-1 rounded-full bg-white/20 overflow-hidden">
              <div
                class="h-full bg-gold rounded-full transition-[width] ease-linear"
                [style.width]="activeSlide() === i && progressRunning() ? '100%' : '0%'"
                [style.transition-duration]="activeSlide() === i && progressRunning() ? slideDuration + 'ms' : '300ms'"
              ></div>
            </div>
          </button>
        }
      </div>

      <!-- Main content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left: text content, re-animated on each slide change -->
          <div class="text-center lg:text-left">
            @if (current(); as slide) {
              <div [class]="textVisible() ? 'hero-text hero-text-visible' : 'hero-text'">
                <div class="inline-flex items-center gap-2.5 px-5 py-2.5 glass rounded-full mb-6 border border-gold/20">
                  <span class="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                  <span class="text-gold text-xs font-semibold tracking-wider uppercase">{{ slide.badge }}</span>
                  <i [class]="slide.badgeIcon" class="text-gold/60 text-sm"></i>
                </div>

                <h1
                  class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-heading leading-[1.1] mb-6"
                >
                  {{ slide.headingLine1 }}
                  <br />
                  <span class="text-gradient-gold">{{ slide.headingLine2 }}</span>
                </h1>

                <p class="text-white/55 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
                  {{ slide.subtitle }}
                </p>
              </div>
            }

            <div class="flex flex-wrap justify-center lg:justify-start gap-3">
              @for (badge of trustBadges; track badge.text) {
                <div
                  class="flex items-center gap-2 px-3.5 py-2 glass rounded-xl text-xs text-white/60 border border-white/5 hover:border-gold/20 hover:text-white/80 transition-all duration-300"
                >
                  <i [class]="badge.icon" class="text-gold"></i>
                  {{ badge.text }}
                </div>
              }
            </div>
          </div>

          <!-- Right: booking form -->
          <div>
            <app-booking-form />
          </div>
        </div>
      </div>

      <!-- Bottom fade -->
      <div class="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white/50 to-transparent z-[2]"></div>
    </section>
  `,
  styles: `
    .hero-text {
      opacity: 0;
      transform: translateY(30px);
      filter: blur(6px);
      transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
        filter 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .hero-text-visible {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  `,
})
export class Hero implements OnInit, OnDestroy {
  protected readonly slides = SLIDES;
  protected readonly trustBadges = TRUST_BADGES;
  protected readonly slideDuration = SLIDE_DURATION;

  protected readonly activeSlide = signal(0);
  protected readonly textVisible = signal(false);
  protected readonly progressRunning = signal(false);

  private rotationTimer?: ReturnType<typeof setInterval>;

  protected current(): HeroSlide {
    return this.slides[this.activeSlide()];
  }

  ngOnInit(): void {
    // Kick off the text entrance and progress bar after first paint
    setTimeout(() => {
      this.textVisible.set(true);
      this.progressRunning.set(true);
    }, 100);
    this.startRotation();
  }

  private startRotation(): void {
    clearInterval(this.rotationTimer);
    this.rotationTimer = setInterval(() => {
      this.transitionTo((this.activeSlide() + 1) % this.slides.length);
    }, SLIDE_DURATION);
  }

  protected setSlide(index: number): void {
    if (index === this.activeSlide()) {
      return;
    }
    this.transitionTo(index);
    this.startRotation();
  }

  private transitionTo(index: number): void {
    this.textVisible.set(false);
    this.progressRunning.set(false);
    setTimeout(() => {
      this.activeSlide.set(index);
      this.textVisible.set(true);
      this.progressRunning.set(true);
    }, 400);
  }

  ngOnDestroy(): void {
    clearInterval(this.rotationTimer);
  }
}
