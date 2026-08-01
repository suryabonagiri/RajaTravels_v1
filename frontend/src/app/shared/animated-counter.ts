import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  template: `
    <div class="text-center">
      <div
        class="text-3xl md:text-4xl lg:text-5xl font-bold"
        [class]="light() ? 'text-gradient-gold' : 'text-gold'"
      >
        {{ count().toLocaleString() }}{{ suffix() }}
      </div>
      <div
        class="mt-2 text-sm font-medium tracking-wide uppercase"
        [class]="light() ? 'text-white/60' : 'text-text-secondary'"
      >
        {{ label() }}
      </div>
    </div>
  `,
})
export class AnimatedCounter implements AfterViewInit, OnDestroy {
  readonly value = input.required<number>();
  readonly suffix = input('');
  readonly label = input.required<string>();
  readonly light = input(false);

  protected readonly count = signal(0);

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private timer?: ReturnType<typeof setInterval>;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.startCounting();
            this.observer?.disconnect();
          }
        }
      },
      { rootMargin: '-50px 0px' }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private startCounting(): void {
    const target = this.value();
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    this.timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        this.count.set(target);
        clearInterval(this.timer);
      } else {
        this.count.set(Math.floor(current));
      }
    }, 16);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
