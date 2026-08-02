import { Component, computed, input } from '@angular/core';
import { ScrollReveal } from '../shared/scroll-reveal';

const ICON_MAP: Record<string, string> = {
  bus: 'fa-solid fa-bus',
  boat: 'fa-solid fa-ship',
  forest: 'fa-solid fa-tree',
  resort: 'fa-solid fa-hotel',
  group: 'fa-solid fa-users',
  corporate: 'fa-solid fa-briefcase',
};

@Component({
  selector: 'app-service-card',
  imports: [ScrollReveal],
  template: `
    <div
      scrollReveal="up"
      [revealDelay]="index() * 100"
      class="group relative h-full bg-white brand-shape-reverse p-6 md:p-8 card-shadow hover:card-shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden hover-lift"
    >
      <div
        class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
      ></div>

      <div
        class="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center text-gold group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-dark group-hover:text-white transition-all duration-300 mb-5"
      >
        <i [class]="iconClass()" class="text-2xl"></i>
      </div>

      <h3 class="text-lg font-bold text-primary mb-3 group-hover:text-gold transition-colors duration-300">
        {{ title() }}
      </h3>
      <p class="text-text-secondary text-sm leading-relaxed">
        {{ description() }}
      </p>

      <div
        class="mt-5 flex items-center text-gold font-medium text-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300"
      >
        Learn More
        <i class="fa-solid fa-arrow-right ml-1 text-xs"></i>
      </div>
    </div>
  `,
})
export class ServiceCard {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input.required<string>();
  readonly index = input(0);

  protected readonly iconClass = computed(() => ICON_MAP[this.icon()] ?? 'fa-solid fa-bus');
}
