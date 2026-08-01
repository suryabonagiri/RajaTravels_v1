import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/**
 * Fade/slide-in on scroll, replacing the Framer Motion whileInView animations.
 * Usage: <div scrollReveal="left" [revealDelay]="150">
 */
@Directive({
  selector: '[scrollReveal]',
})
export class ScrollReveal implements OnInit, OnDestroy {
  readonly scrollReveal = input<'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | ''>('up');
  readonly revealDelay = input(0);

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const element = this.el.nativeElement as HTMLElement;
    const direction = this.scrollReveal() || 'up';
    element.classList.add('sr');
    if (direction !== 'fade') {
      element.classList.add(`sr-${direction}`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.style.transitionDelay = `${this.revealDelay()}ms`;
            element.classList.add('sr-visible');
            this.observer?.unobserve(element);
          }
        }
      },
      { rootMargin: '-30px 0px', threshold: 0.1 }
    );
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
