import { BusinessInfo } from './models';

/**
 * Initial business info shown before /api/business responds,
 * so contact details render instantly without a loading flash.
 */
export const DEFAULT_BUSINESS: BusinessInfo = {
  name: 'Raja Travels',
  tagline: 'AP Tourism Authorized Agent',
  description:
    'Your trusted partner for exploring the enchanting beauty of Andhra Pradesh. ' +
    'AP Tourism Authorized Tours and Travels company dedicated to providing the most ' +
    'memorable and authentic travel experiences.',
  phones: ['9397912351', '9397912411', '7036572664'],
  primaryPhone: '9397912351',
  whatsappNumber: '919397912351',
  email: 'rajatravelsbs@yahoo.in',
  address: '12-21-5, beside sri latha hosipital, Aryapuram, Rajamahendravaram, Andhra Pradesh 533104',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Raja%20Travels%20(ap%20tourism%20authorised)%20papikondalu%20tourism' +
    '%2012-21-5%2C%20beside%20sri%20latha%20hosipital%2C%20Aryapuram%2C%20Rajamahendravaram' +
    '&t=&z=15&ie=UTF8&iwloc=&output=embed',
  socialLinks: {
    facebook: 'https://facebook.com/rajatravels',
    instagram: 'https://instagram.com/rajatravels',
    youtube: 'https://youtube.com/@rajatravels',
    twitter: 'https://twitter.com/rajatravels',
  },
  busTypes: ['17 Seater', '32 Seater', '40 Seater', '45 Seater', '49 Seater', 'Custom Requirement'],
  stats: [
    { label: 'Happy Customers', value: 15000, suffix: '+' },
    { label: 'Tours Completed', value: 5000, suffix: '+' },
    { label: 'Years Experience', value: 10, suffix: '+' },
    { label: 'Bus Fleet', value: 25, suffix: '+' },
  ],
};

export const NAV_LINKS = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'Services', href: 'services' },
  { label: 'Destinations', href: 'destinations' },
  { label: 'Packages', href: 'packages' },
  { label: 'Bus Rental', href: 'bus-rental' },
  { label: 'Contact', href: 'contact' },
];

export function smoothScrollTo(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
