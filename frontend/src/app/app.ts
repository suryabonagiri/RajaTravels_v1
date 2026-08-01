import { Component } from '@angular/core';
import { FloatingButtons } from './layout/floating-buttons';
import { Footer } from './layout/footer';
import { Navbar } from './layout/navbar';
import { About } from './sections/about';
import { BusRental } from './sections/bus-rental';
import { Contact } from './sections/contact';
import { Destinations } from './sections/destinations';
import { FaqSection } from './sections/faq';
import { Hero } from './sections/hero';
import { Packages } from './sections/packages';
import { RoadJourney } from './sections/road-journey';
import { Services } from './sections/services';
import { Testimonials } from './sections/testimonials';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Hero,
    About,
    RoadJourney,
    Services,
    Destinations,
    Packages,
    BusRental,
    Testimonials,
    FaqSection,
    Contact,
    Footer,
    FloatingButtons,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-road-journey />
      <app-services />
      <app-destinations />
      <app-packages />
      <app-bus-rental />
      <app-testimonials />
      <app-faq />
      <app-contact />
    </main>
    <app-footer />
    <app-floating-buttons />
  `,
})
export class App {}
