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
  "42 Seater",
];

export const SERVICES = [
  {
    id: "bus-rental",
    title: "Premium Bus Rental",
    description:
      "Luxury and comfortable buses for all occasions — from family trips to corporate events. Choose from 17 to 42 seater options.",
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

export type TourItineraryStop = {
  time: string;
  detail: string;
};

export type PackagePricingOption = {
  label: string;
  adultPrice: string;
  childPrice: string;
  childAgeNote?: string;
};

export type PackageRoomRate = {
  label: string;
  weekday: string;
  weekend: string;
};

export type TourDaySchedule = {
  dayLabel: string;
  stops: TourItineraryStop[];
};

export type TourPackage = {
  id: string;
  title: string;
  shortTitle?: string;
  summary?: string;
  adultPrice: string;
  childPrice: string;
  childAgeNote?: string;
  duration: string;
  destination: string;
  highlights: string[];
  reportingPlace?: string;
  reportingTime?: string;
  facilities?: string[];
  visitingPlaces?: string[];
  itinerary?: TourItineraryStop[];
  daySchedules?: TourDaySchedule[];
  pricingOptions?: PackagePricingOption[];
  roomRates?: PackageRoomRate[];
  notes?: string[];
  /** Set when a real photo will be supplied later */
  imagePending?: boolean;
  image?: string;
  imageCaption?: string;
};

export const PACKAGES: TourPackage[] = [
  {
    id: "papi-1day",
    title: "Papikondalu 1 Day Tour Package",
    shortTitle: "Papikondalu 1 Day",
    summary:
      "Classic Godavari day cruise from Rajamahendravaram with temple darshan and Papi hills views.",
    adultPrice: "₹1,250",
    childPrice: "₹1,050",
    childAgeNote: "3–10 years",
    duration: "1 Day",
    destination: "Papikondalu",
    imagePending: true,
    imageCaption: "Papikondalu boat cruise photo",
    highlights: [
      "Boat ride on Holy River Godavari",
      "Breakfast & vegetarian lunch in the boat",
      "Temple darshan & Papi hills scenic views",
      "Road journey from / to Rajamahendravaram",
    ],
    visitingPlaces: [
      "Gandipochamma Temple",
      "Papi hills",
      "Perantapalli Ashramam and Temple",
      "Polavaram Project Area",
      "Devipatnam",
      "Koruturu Cottages",
      "Sirivaka Bamboo huts",
    ],
    itinerary: [
      {
        time: "7:30 AM",
        detail:
          "Road journey to Pattiseema revu / Polavaram revu / Purushothapatnam revu to check in Boat",
      },
      {
        time: "9:00 AM",
        detail:
          "Breakfast in the Boat, then journey starts on Holy River Godavari",
      },
      {
        time: "10:30 AM",
        detail: "Reach GandiPochamma Temple and darshan",
      },
      {
        time: "1:00 PM",
        detail: "Vegetarian lunch in the Boat while on journey",
      },
      {
        time: "2:00 PM",
        detail:
          'Reach Papihills — journey in between "Papi hills", enjoy the scenic beauty',
      },
      {
        time: "3:00 PM",
        detail:
          'Reach Perantapalli village of Khammam district. Visit "Ramakrishna muni vatika" (Ashramam) and Veereswara Swamy Temple and darshan of god Shiva',
      },
      {
        time: "3:30 PM",
        detail: "Return journey by Boat to Gandipochamma Temple",
      },
      {
        time: "5:30 PM",
        detail: "Road journey to Rajamahendravaram",
      },
      {
        time: "7:30 PM",
        detail: "Reach Rajamahendravaram",
      },
    ],
  },
  {
    id: "badra-1day",
    title: "Bhadrachalam 1 Day Tour Package",
    shortTitle: "Bhadrachalam 1 Day",
    summary:
      "Godavari cruise with temple stops, ending with Bhadrachalam temple darshan by evening.",
    adultPrice: "₹2,500",
    childPrice: "₹2,200",
    duration: "1 Day",
    destination: "Bhadrachalam",
    imagePending: true,
    imageCaption: "Bhadrachalam temple / boat transfer photo",
    highlights: [
      "Starts every day at 7 AM from Rajamahendravaram",
      "Breakfast & vegetarian lunch in the boat",
      "A/C to non A/C boat shift at Perantapalli",
      "Road transfer by TATA Magics to Bhadrachalam temple",
    ],
    visitingPlaces: [
      "Pattiseema",
      "Polavaram Project",
      "Gandhi Posamma Temple",
      "Papihills",
      "Perantalapalli Temple",
      "Bhadrachalam",
    ],
    itinerary: [
      {
        time: "7:00 AM",
        detail: "Tour starts every day from Rajamahendravaram",
      },
      {
        time: "Morning",
        detail:
          "Visiting places en route / on river: Polavaram project site, Gandipochamma Temple, Papikondalu, and Perantapalli temple",
      },
      {
        time: "On the boat",
        detail: "Breakfast and vegetarian lunch will be provided in the boat",
      },
      {
        time: "3:00 PM",
        detail: "A/C boat to non A/C boat shifting at Perantapalli Temple",
      },
      {
        time: "After 3:00 PM",
        detail: "Perantapalli to Pochavaram in non A/C boat (about 1 hour)",
      },
      {
        time: "Road transfer",
        detail:
          "Pochavaram to Bhadrachalam temple — about 2 hours by road on our vehicles (TATA Magics only)",
      },
      {
        time: "7:00 PM",
        detail:
          "Finally reaching Bhadrachalam temple. Temple darshan closing time is 9:00 PM",
      },
    ],
  },
  {
    id: "badra-papi-1day",
    title: "Bhadrachalam to Papikondalu 1 Day Tour",
    shortTitle: "Bhadrachalam → Papikondalu",
    summary:
      "Start from Bhadrachalam, cruise Papikondalu on Godavari, and return to Bhadrachalam temple the same day.",
    adultPrice: "On request",
    childPrice: "On request",
    duration: "1 Day",
    destination: "Papikondalu",
    imagePending: true,
    imageCaption: "Bhadrachalam to Papikondalu day cruise photo",
    reportingTime: "7:30 AM",
    reportingPlace:
      "Near Sitarama Temple, Opp: Kalyana Mandapam, Bhadrachalam",
    facilities: [
      "Breakfast in boat",
      "Vegetarian lunch in boat",
      "Evening snacks in boat",
    ],
    visitingPlaces: [
      "Pochavaram",
      "Papikondalu",
      "Perantapalli",
      "Kolluru",
      "Bhadrachalam",
    ],
    highlights: [
      "Reporting near Sitarama Temple, Bhadrachalam",
      "Road transfer to Pochavaram boating unit",
      "Godavari boat cruise via Papikondalu & Perantapalli",
      "Return drop at Bhadrachalam temple",
    ],
    itinerary: [
      {
        time: "7:30 AM",
        detail:
          "Reporting near Sitarama Temple, Opp: Kalyana Mandapam, Bhadrachalam",
      },
      {
        time: "8:00–8:30 AM",
        detail:
          "Assemble and start journey by road. Vehicles up to boating unit, Pochavaram (about 70 km / 1.30 hour) from Bhadrachalam",
      },
      {
        time: "Boat cruise",
        detail:
          "Check into boat, then journey on River Godavari (about 60 km / 5 hours). View Papikondalu via Perantalapalli",
      },
      {
        time: "Papikondalu & Perantapalli",
        detail:
          "Reach Papikondalu, enjoy scenic beauty, then boat reaches Perantapalli tribal village to visit Rama Krishna Muni Vatam and Swayambu Visweswara Swamy Temple",
      },
      {
        time: "Return",
        detail:
          "Check out boat, then road journey by vehicle to Bhadrachalam (about 70 km / 2 hours) and drop at Bhadrachalam temple",
      },
    ],
  },
  {
    id: "sirivaka-2day",
    title: "Sirivaka Night Stay 2 Days Package",
    shortTitle: "Sirivaka Night Stay",
    summary:
      "Great choice for a 2-day Papikondalu trip — Godavari boat tour with overnight stay at renowned Sirivaka Huts and visits to must-see sights.",
    adultPrice: "₹4,800",
    childPrice: "₹4,500",
    childAgeNote: "3–9 years",
    duration: "2 Days",
    destination: "Sirivaka",
    imagePending: true,
    imageCaption: "Sirivaka huts / wooden cottage photo",
    highlights: [
      "Boat tour on River Godavari",
      "Night stay at Sirivaka Huts",
      "Wooden cottage or tent options",
      "Must-see Papikondalu region sights",
    ],
    visitingPlaces: [
      "Papikondalu",
      "Perantapalli",
      "Sirivaka Huts",
      "Godavari River cruise",
    ],
    pricingOptions: [
      {
        label: "Wooden Cottage (Non AC)",
        adultPrice: "₹6,000",
        childPrice: "₹5,500",
        childAgeNote: "3–9 years",
      },
      {
        label: "Tent Accommodation",
        adultPrice: "₹4,800",
        childPrice: "₹4,500",
        childAgeNote: "3–9 years",
      },
    ],
    facilities: [
      "Godavari boat tour",
      "Overnight stay at Sirivaka Huts",
      "Meals as per selected stay option",
    ],
  },
  {
    id: "kolluru-2day",
    title: "Bhadrachalam to Kolluru Huts 2 Days Package",
    shortTitle: "Kolluru Huts 2 Days",
    summary:
      "Boat journey across the Godavari with overnight stay at famous Kolluru Bamboo Huts of Papikondalu, plus all must-see places.",
    adultPrice: "₹4,500",
    childPrice: "₹4,000",
    duration: "2 Days",
    destination: "Kolluru",
    imagePending: true,
    imageCaption: "Kolluru bamboo huts photo",
    reportingTime: "8:00 AM",
    reportingPlace:
      "Near Sitarama Temple, Opp: Kalyana Mandapam, Bhadrachalam",
    facilities: [
      "Breakfast",
      "Vegetarian lunch",
      "Evening snacks",
      "Night veg or non-veg dinner",
      "Accommodation in Bamboo huts",
      "Next day breakfast, veg or non-veg lunch, and evening snacks",
    ],
    visitingPlaces: [
      "Pochavaram",
      "Papihills",
      "Perantapalli",
      "Kolluru",
      "Bhadrachalam",
    ],
    highlights: [
      "Overnight stay in Kolluru Bamboo Huts",
      "Godavari boat journey with Papikondalu views",
      "Temple visits at Perantapalli",
      "Optional Rajahmundry drop (extra ₹100)",
    ],
    daySchedules: [
      {
        dayLabel: "1st Day",
        stops: [
          {
            time: "8:00 AM",
            detail:
              "Reporting near Sitarama Temple, Opp: Kalyana Mandapam, Bhadrachalam",
          },
          {
            time: "8:30 AM",
            detail:
              "Start journey by road — vehicles up to boating unit, Pochavaram (about 70 km / 1.30 hour) from Bhadrachalam",
          },
          {
            time: "Boat cruise",
            detail:
              'Check into boat, journey on River Godavari (about 60 km / 5 hours). View "Papikondalu" and Perantalapalli',
          },
          {
            time: "Papi Hills & Perantapalli",
            detail:
              "Enjoy scenic beauty, visit Rama Krishna Muni Vatam and Swayambu Visweswara Swamy Temple, then reach Bamboo huts",
          },
          {
            time: "Night stay",
            detail:
              "Check out boat — tourists allotted night stay in Bamboo huts",
          },
        ],
      },
      {
        dayLabel: "2nd Day",
        stops: [
          {
            time: "Morning cruise",
            detail:
              "Journey on boat from Bamboo Huts to Pochavaram / Koida (about 30 km / 2 hours)",
          },
          {
            time: "Return",
            detail:
              "Check out boat, then road journey by vehicle to Bhadrachalam (about 70 km / 2 hours) and drop at Bhadrachalam temple",
          },
        ],
      },
    ],
    notes: [
      "If you want Rajahmundry dropping, we will arrange — extra ₹100/-",
      "6:30 PM reaches Pattiseema revu / Polavaram revu / Purushothapatnam revu",
      "7:00 PM to 8:00 PM by road journey to Rajahmundry and dropping to Railway Station",
    ],
  },
  {
    id: "badra-sirivaka-2day",
    title: "Bhadrachalam to Sirivaka Huts 2 Days Tour",
    shortTitle: "Bhadrachalam → Sirivaka",
    summary:
      "Travel from Bhadrachalam and stay overnight at Sirivaka wooden cottages / bamboo huts on a 2-day Godavari River tour.",
    adultPrice: "On request",
    childPrice: "On request",
    duration: "2 Days",
    destination: "Sirivaka",
    imagePending: true,
    imageCaption: "Sirivaka overnight stay photo",
    reportingTime: "8:00 AM",
    reportingPlace:
      "Near Sitarama Temple, Opp: Kalyana Mandapam, Bhadrachalam",
    facilities: [
      "Breakfast",
      "Vegetarian lunch",
      "Evening snacks",
      "Night veg or non-veg dinner",
      "Accommodation in Bamboo huts / Sirivaka cottages",
      "Next day breakfast, veg or non-veg lunch, and evening snacks",
    ],
    visitingPlaces: [
      "Pochavaram",
      "Papihills",
      "Perantapalli",
      "Kolluru",
      "Bhadrachalam",
    ],
    highlights: [
      "Overnight stay at Sirivaka huts / cottages",
      "Godavari boat journey with Papikondalu views",
      "Perantapalli temple visits",
      "Optional Rajahmundry drop (extra ₹100)",
    ],
    daySchedules: [
      {
        dayLabel: "1st Day",
        stops: [
          {
            time: "8:00 AM",
            detail:
              "Reporting near Sitarama Temple, Opp: Kalyana Mandapam, Bhadrachalam",
          },
          {
            time: "8:30 AM",
            detail:
              "Start journey by road — vehicles up to boating unit, Pochavaram (about 70 km / 1.30 hour) from Bhadrachalam",
          },
          {
            time: "Boat cruise",
            detail:
              'Check into boat, journey on River Godavari (about 60 km / 5 hours). View "Papikondalu" and Perantalapalli',
          },
          {
            time: "Papi Hills & Perantapalli",
            detail:
              "Enjoy scenic beauty, visit Rama Krishna Muni Vatam and Swayambu Visweswara Swamy Temple, then reach Bamboo huts",
          },
          {
            time: "Night stay",
            detail:
              "Check out boat — tourists allotted night stay in Bamboo huts / Sirivaka cottages",
          },
        ],
      },
      {
        dayLabel: "2nd Day",
        stops: [
          {
            time: "Morning cruise",
            detail:
              "Journey on boat from Bamboo Huts to Pochavaram / Koida (about 30 km / 2 hours)",
          },
          {
            time: "Return",
            detail:
              "Check out boat, then road journey by vehicle to Bhadrachalam (about 70 km / 2 hours) and drop at Bhadrachalam temple",
          },
        ],
      },
    ],
    notes: [
      "If you want Rajahmundry dropping, we will arrange — extra ₹100/-",
      "6:30 PM reaches Pattiseema revu / Polavaram revu / Purushothapatnam revu",
      "7:00 PM to 8:00 PM by road journey to Rajahmundry and dropping to Railway Station",
    ],
  },
  {
    id: "badra-hotel",
    title: "Bhadrachalam Hotel — Telangana Tourism",
    shortTitle: "Bhadrachalam Hotel",
    summary:
      "Telangana Tourism hotel/resort in Bhadrachalam, built for pilgrims visiting the famous Rama temple on the banks of the Godavari.",
    adultPrice: "From ₹1,000",
    childPrice: "—",
    duration: "Stay",
    destination: "Bhadrachalam",
    imagePending: true,
    imageCaption: "Bhadrachalam Telangana Tourism hotel photo",
    highlights: [
      "Operated by Telangana Tourism",
      "Ideal for Rama temple pilgrims",
      "Weekday & weekend room tariffs",
      "Can be combined with Godavari boat packages",
    ],
    roomRates: [
      {
        label: "A/C Deluxe",
        weekday: "₹1,500",
        weekend: "₹1,750",
      },
      {
        label: "A/C Suite",
        weekday: "₹2,380",
        weekend: "₹2,900",
      },
      {
        label: "Non A/C Dormitory (Basement)",
        weekday: "₹1,600",
        weekend: "₹1,600",
      },
      {
        label: "Non AC Dormitory 5 Bedded (Basement)",
        weekday: "₹1,000",
        weekend: "₹1,000",
      },
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
      "You can book a bus by filling out the booking form on our website, calling us directly at 9397912351, or sending a WhatsApp message. We offer 17 to 42 seater buses for all types of trips.",
  },
  {
    question: "What is included in the Papikondalu tour package?",
    answer:
      "Our Papikondalu 1 Day Tour Package is Adult ₹1,250 and Child ₹1,050 (3–10 years). Visiting places include Gandipochamma Temple, Papi hills, Perantapalli Ashramam and Temple, Polavaram Project Area, Devipatnam, Koruturu Cottages, and Sirivaka Bamboo huts. The day runs from about 7:30 AM road pickup to boat check-in, Godavari cruise with breakfast and vegetarian lunch, temple darshan, Papi hills views, Perantapalli ashramam visit, and return to Rajamahendravaram by about 7:30 PM. Night-stay packages also include accommodation.",
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
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
  { label: "About Us", href: "#about" },
];
