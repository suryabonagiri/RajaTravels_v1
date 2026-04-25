// Business Information Constants
export const BUSINESS = {
  name: "Raja Travels",
  tagline: "AP Tourism Authorized Agent",
  description:
    "Your trusted partner for exploring the enchanting beauty of Andhra Pradesh. AP Tourism Authorized Tours and Travels company dedicated to providing the most memorable and authentic travel experiences.",
  phones: ["9397912351", "9397912411", "7036572664"],
  primaryPhone: "9397912351",
  whatsappNumber: "919397912351",
  email: "rajatravelsbs@yahoo.in",
  address:
    "12-21-5, beside sri latha hosipital, Aryapuram, Rajamahendravaram, Andhra Pradesh 533104",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Raja%20Travels%20(ap%20tourism%20authorised)%20papikondalu%20tourism%2012-21-5%2C%20beside%20sri%20latha%20hosipital%2C%20Aryapuram%2C%20Rajamahendravaram&t=&z=15&ie=UTF8&iwloc=&output=embed",
  socialLinks: {
    facebook: "https://facebook.com/rajatravels",
    instagram: "https://instagram.com/rajatravels",
    youtube: "https://youtube.com/@rajatravels",
    twitter: "https://twitter.com/rajatravels",
  },
  emailjs: {
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
    publicKey: "YOUR_PUBLIC_KEY",
  },
};

export const BUS_TYPES = [
  "17 Seater",
  "32 Seater",
  "40 Seater",
  "45 Seater",
  "49 Seater",
  "Custom Requirement",
];

export const SERVICES = [
  {
    id: "bus-rental",
    title: "Premium Bus Rental",
    description:
      "Luxury and comfortable buses for all occasions — from family trips to corporate events. Choose from 17 to 49 seater options.",
    icon: "bus",
  },
  {
    id: "papikondalu",
    title: "Papikondalu Boat Tourism",
    description:
      "Experience the breathtaking Papikondalu hills through scenic boat rides on the Godavari river. AP Tourism authorized packages.",
    icon: "boat",
  },
  {
    id: "maredumilli",
    title: "Maredumilli Eco Tourism",
    description:
      "Explore the pristine forests, waterfalls, and tribal culture of Maredumilli — Andhra Pradesh's hidden eco paradise.",
    icon: "forest",
  },
  {
    id: "haritha",
    title: "Haritha Resorts Booking",
    description:
      "Book official AP Tourism Haritha Resorts across Andhra Pradesh. Premium stays at government-approved properties.",
    icon: "resort",
  },
  {
    id: "group-tours",
    title: "Group & Family Tours",
    description:
      "Customized group tours for families, friends, and communities. Complete trip planning with accommodation and transport.",
    icon: "group",
  },
  {
    id: "corporate",
    title: "Corporate & Event Trips",
    description:
      "Professional transport solutions for corporate outings, marriage trips, and special events with premium service.",
    icon: "corporate",
  },
];

export const DESTINATIONS = [
  {
    id: "papikondalu",
    title: "Papikondalu",
    subtitle: "Godavari River Paradise",
    description:
      "Cruise through the majestic Papikondalu hills on the Godavari river. Witness breathtaking gorges, lush green hills, and serene backwaters on this unforgettable boat journey.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    highlights: ["Boat Cruise", "Hill Views", "River Safari", "Tribal Culture"],
  },
  {
    id: "maredumilli",
    title: "Maredumilli",
    subtitle: "Eco Tourism Haven",
    description:
      "Discover the untouched beauty of Maredumilli's dense forests, stunning waterfalls, and vibrant tribal heritage. A perfect escape into nature's lap.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    highlights: [
      "Waterfalls",
      "Forest Trails",
      "Tribal Villages",
      "Eco Resorts",
    ],
  },
  {
    id: "haritha",
    title: "Haritha Resorts",
    subtitle: "AP Tourism Official Stays",
    description:
      "Stay at premium AP Tourism Haritha Resorts across Andhra Pradesh. From beach resorts to hill stations, experience comfort amidst nature.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    highlights: [
      "Beach Resorts",
      "Hill Stations",
      "Temple Stays",
      "Jungle Bells",
    ],
  },
];

export const PACKAGES = [
  {
    id: "papi-1day",
    title: "Papikondalu 1 Day Tour",
    adultPrice: "₹1,250",
    childPrice: "₹1,050",
    duration: "1 Day",
    destination: "Papikondalu",
    highlights: [
      "Boat ride on Godavari",
      "Papikondalu hill views",
      "Lunch included",
      "Transport from Rajahmundry",
    ],
  },
  {
    id: "badra-1day",
    title: "Bhadrachalam 1 Day Tour",
    adultPrice: "₹2,500",
    childPrice: "₹2,200",
    duration: "1 Day",
    destination: "Bhadrachalam",
    highlights: [
      "Bhadrachalam temple visit",
      "Boat ride",
      "Breakfast & Lunch",
      "AC Transport",
    ],
  },
  {
    id: "sirivaka-2day",
    title: "Sirivaka Night Stay 2 Days",
    adultPrice: "₹4,800",
    childPrice: "₹4,500",
    duration: "2 Days",
    destination: "Sirivaka",
    highlights: [
      "Tent / Cottage accommodation",
      "Boat cruise",
      "All meals included",
      "Bonfire & entertainment",
    ],
  },
  {
    id: "mare-1day",
    title: "Maredumilli 1 Day Tour",
    adultPrice: "₹1,800",
    childPrice: "₹1,500",
    duration: "1 Day",
    destination: "Maredumilli",
    highlights: [
      "Jalatarangini waterfalls",
      "Forest trekking",
      "Tribal village visit",
      "Lunch included",
    ],
  },
  {
    id: "mare-2day",
    title: "Maredumilli 2 Days Package",
    adultPrice: "₹5,000",
    childPrice: "₹4,500",
    duration: "2 Days",
    destination: "Maredumilli",
    highlights: [
      "Resort accommodation",
      "Multiple waterfall visits",
      "All meals included",
      "Guided forest trek",
    ],
  },
  {
    id: "kolluru-2day",
    title: "Bhadrachalam to Kolluru Huts",
    adultPrice: "₹4,500",
    childPrice: "₹4,000",
    duration: "2 Days",
    destination: "Kolluru",
    highlights: [
      "Hut accommodation",
      "Boat cruise",
      "All meals",
      "Campfire night",
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    location: "Hyderabad",
    rating: 5,
    review:
      "Absolutely amazing experience with Raja Travels! The Papikondalu boat tour was breathtaking. The arrangements were perfect and the team was incredibly professional. Highly recommend!",
  },
  {
    name: "Priya Sharma",
    location: "Visakhapatnam",
    rating: 5,
    review:
      "We booked a 45-seater bus for our family wedding trip. The bus was in excellent condition, driver was experienced, and the service was top-notch. Will definitely book again!",
  },
  {
    name: "Venkat Rao",
    location: "Vijayawada",
    rating: 5,
    review:
      "The Maredumilli 2-day package was worth every penny. Beautiful resorts, stunning waterfalls, and excellent food. Raja Travels made our family vacation truly memorable.",
  },
  {
    name: "Sneha Reddy",
    location: "Rajahmundry",
    rating: 5,
    review:
      "As a corporate event planner, I've used Raja Travels multiple times for our team outings. Their buses are premium, service is reliable, and pricing is very reasonable.",
  },
  {
    name: "Anil Prasad",
    location: "Kakinada",
    rating: 5,
    review:
      "The Haritha Resort booking was seamless. Raja Travels arranged everything — from transport to accommodation. The resort was beautiful and the trip was hassle-free!",
  },
];

export const FAQS = [
  {
    question: "Is Raja Travels an authorized AP Tourism agent?",
    answer:
      "Yes, Raja Travels is an officially authorized AP Tourism agent based in Rajahmundry. We are certified to provide tourism packages, Haritha Resort bookings, and Papikondalu boat tourism services.",
  },
  {
    question: "How can I book a bus for my trip?",
    answer:
      "You can book a bus by filling out the booking form on our website, calling us directly at 9397912351, or sending a WhatsApp message. We offer 17 to 49 seater buses for all types of trips.",
  },
  {
    question: "What is included in the Papikondalu tour package?",
    answer:
      "Our Papikondalu tour packages include boat ride on the Godavari river, meals (breakfast and lunch), transport from Rajahmundry, and guide services. Night stay packages also include accommodation.",
  },
  {
    question: "Do you provide buses for marriages and corporate events?",
    answer:
      "Absolutely! We specialize in providing premium buses for marriages, corporate trips, family tours, and special events. We offer various seating capacities and can customize as per your requirements.",
  },
  {
    question: "How do I book Haritha Resorts through Raja Travels?",
    answer:
      "Simply contact us with your preferred destination, dates, and number of guests. As an authorized AP Tourism agent, we can book any Haritha Resort across Andhra Pradesh at official rates.",
  },
  {
    question: "What areas do you cover for bus services?",
    answer:
      "We provide bus rental services across Andhra Pradesh, Telangana, and neighboring states. Popular routes include Rajahmundry, Hyderabad, Visakhapatnam, Vijayawada, and all major tourist destinations.",
  },
  {
    question: "Is it safe to travel with children on the Papikondalu tour?",
    answer:
      "Yes, our Papikondalu tours are completely safe for children. We use well-maintained boats with safety equipment, experienced crew, and life jackets are provided for all passengers including children.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, cancellations and rescheduling are possible. Please contact us at least 48 hours before your trip for a full refund. For rescheduling, we'll accommodate your preferred dates based on availability.",
  },
];

export const STATS = [
  { label: "Happy Customers", value: 15000, suffix: "+" },
  { label: "Tours Completed", value: 5000, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Bus Fleet", value: 25, suffix: "+" },
];

export const HARITHA_RESORTS = [
  { name: "Tyda Haritha Jungle Bells", location: "Tyda" },
  { name: "Suryalanka Beach Resorts", location: "Suryalanka" },
  { name: "Berm Park Haritha Hotel", location: "Vijayawada" },
  { name: "Mypadu Beach Resorts", location: "Mypadu" },
  { name: "Bhavani Island Resort", location: "Vijayawada" },
  { name: "Ananthagiri Resort", location: "Ananthagiri" },
  { name: "Lambasingi Resorts", location: "Lambasingi" },
  { name: "Srisailam Hotels", location: "Srisailam" },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "#packages" },
  { label: "Bus Rental", href: "#bus-rental" },
  { label: "Contact", href: "#contact" },
];
