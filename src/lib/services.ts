import { BUS_TYPES, HARITHA_RESORTS, PACKAGES } from "./constants";

export interface ServiceInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  subtitle: string;
  image: string;
  longDescription: string;
  features: string[];
  inclusions: string[];
  idealFor: string[];
  relatedPackageIds?: string[];
  showBusTypes?: boolean;
  resortList?: boolean;
}

export const SERVICE_DETAILS: ServiceInfo[] = [
  {
    id: "bus-rental",
    title: "Premium Bus Rental",
    description:
      "Luxury and comfortable buses for all occasions — from family trips to corporate events. Choose from 17 to 42 seater options.",
    icon: "bus",
    subtitle: "Comfortable coaches for every occasion",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1400&q=80",
    longDescription:
      "Hire well-maintained AC and Non-AC coaches from Raja Travels for marriages, corporate outings, temple trips, school tours, and family vacations. Our drivers are experienced, vehicles carry GPS tracking, and we arrange flexible pickup points across Andhra Pradesh, Telangana, and neighboring states.",
    features: [
      "AC & Non-AC options available",
      "Experienced & professional drivers",
      "Well-maintained premium fleet",
      "GPS tracking on all vehicles",
      "24/7 customer support",
      "Flexible scheduling",
      "Competitive pricing",
      "All India permits",
    ],
    inclusions: [
      "Vehicle with driver",
      "Fuel as per agreed package",
      "On-trip support from our team",
    ],
    idealFor: [
      "Marriage trips",
      "Corporate events",
      "Family tours",
      "Temple pilgrimages",
      "School / college tours",
    ],
    showBusTypes: true,
  },
  {
    id: "papikondalu",
    title: "Papikondalu Boat Tourism",
    description:
      "Experience the breathtaking Papikondalu hills through scenic boat rides on the Godavari river. AP Tourism authorized packages.",
    icon: "boat",
    subtitle: "Godavari river paradise",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
    longDescription:
      "Cruise through the majestic Papikondalu hills on the Godavari with AP Tourism authorized boat packages. Our flagship Papikondalu 1 Day Tour Package (Adult ₹1,250 / Child ₹1,050 for ages 3–10) includes road transfer from Rajamahendravaram, boat check-in at Pattiseema / Polavaram / Purushothapatnam revu, breakfast and vegetarian lunch on the boat, darshan at GandiPochamma Temple, scenic Papi hills views, and a visit to Perantapalli Ashramam & Veereswara Swamy Temple before returning by evening.",
    features: [
      "Scenic Godavari boat cruise",
      "Papikondalu hill & gorge views",
      "AP Tourism authorized operations",
      "Life jackets & safety-equipped boats",
      "Family-friendly itineraries",
      "Day trips and night-stay options",
    ],
    inclusions: [
      "Boat ride on Godavari",
      "Meals as per package",
      "Transport from Rajahmundry (selected packages)",
      "Guide support on tour days",
    ],
    idealFor: [
      "Families",
      "Couples",
      "Group outings",
      "First-time Godavari visitors",
    ],
    relatedPackageIds: ["papi-1day", "badra-1day", "sirivaka-2day", "kolluru-2day"],
  },
  {
    id: "maredumilli",
    title: "Maredumilli Eco Tourism",
    description:
      "Explore the pristine forests, waterfalls, and tribal culture of Maredumilli — Andhra Pradesh's hidden eco paradise.",
    icon: "forest",
    subtitle: "Forests, waterfalls & tribal trails",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80",
    longDescription:
      "Discover Maredumilli’s dense forests, Jalatarangini and other waterfalls, and vibrant tribal heritage. We arrange day trips and multi-day eco packages with resort stays, guided treks, and comfortable transport from Rajahmundry.",
    features: [
      "Waterfall sightseeing",
      "Forest trekking options",
      "Tribal village experiences",
      "Eco-resort stay packages",
      "Guided nature walks",
      "Family & adventure friendly",
    ],
    inclusions: [
      "Sightseeing as per itinerary",
      "Meals on selected packages",
      "Resort stay on overnight packages",
      "Transport arrangements",
    ],
    idealFor: [
      "Nature lovers",
      "Weekend getaways",
      "Photography trips",
      "School / college groups",
    ],
    relatedPackageIds: ["mare-1day", "mare-2day"],
  },
  {
    id: "haritha",
    title: "Haritha Resorts Booking",
    description:
      "Book official AP Tourism Haritha Resorts across Andhra Pradesh. Premium stays at government-approved properties.",
    icon: "resort",
    subtitle: "Official AP Tourism stays",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=80",
    longDescription:
      "As an authorized AP Tourism agent, Raja Travels helps you book Haritha Resorts across beaches, hill stations, islands, and jungle properties — at official rates with transport add-ons if you need a complete trip.",
    features: [
      "Official AP Tourism inventory",
      "Beach, hill & jungle properties",
      "Help with dates & room types",
      "Optional bus / cab transfer",
      "Family and group bookings",
      "Transparent government rates guidance",
    ],
    inclusions: [
      "Resort booking assistance",
      "Confirmation support",
      "Suggested itineraries for the location",
      "Optional pickup & drop",
    ],
    idealFor: [
      "Weekend leisure stays",
      "Family holidays",
      "Corporate retreats",
      "Temple + stay combinations",
    ],
    resortList: true,
  },
  {
    id: "group-tours",
    title: "Group & Family Tours",
    description:
      "Customized group tours for families, friends, and communities. Complete trip planning with accommodation and transport.",
    icon: "group",
    subtitle: "Custom trips for every group",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80",
    longDescription:
      "Tell us your group size, dates, and interests — we design a complete tour covering transport, stays, sightseeing, and meals. Ideal for joint families, friend circles, community associations, and celebration trips.",
    features: [
      "Fully customized itineraries",
      "Transport + stay coordination",
      "Destination mix (river, forest, temple, beach)",
      "Meal planning support",
      "Dedicated trip coordinator",
      "Flexible group sizes",
    ],
    inclusions: [
      "Trip planning consultation",
      "Vehicle arrangement",
      "Stay booking support",
      "On-trip assistance",
    ],
    idealFor: [
      "Joint families",
      "Friend groups",
      "Community associations",
      "Celebration tours",
    ],
    relatedPackageIds: ["papi-1day", "mare-2day", "sirivaka-2day"],
  },
  {
    id: "corporate",
    title: "Corporate & Event Trips",
    description:
      "Professional transport solutions for corporate outings, marriage trips, and special events with premium service.",
    icon: "corporate",
    subtitle: "Reliable fleet for business & events",
    image:
      "https://images.unsplash.com/photo-1544620341-11cbdc683583?w=1400&q=80",
    longDescription:
      "From office outings and offsites to marriage fleets and event shuttles, we provide punctual premium coaches with professional drivers, route planning, and multi-vehicle coordination when needed.",
    features: [
      "Multi-vehicle coordination",
      "Punctual professional drivers",
      "Marriage & event shuttle support",
      "Corporate outing packages",
      "Invoice-friendly booking process",
      "Pan-AP & inter-state routes",
    ],
    inclusions: [
      "Dedicated fleet planning",
      "Driver & vehicle assignment",
      "Route guidance",
      "Trip-day coordination",
    ],
    idealFor: [
      "Corporate offsites",
      "Wedding guest transport",
      "Conference shuttles",
      "Team celebrations",
    ],
    showBusTypes: true,
  },
];

export function getAllServices(): ServiceInfo[] {
  return SERVICE_DETAILS;
}

export function getServiceById(id: string): ServiceInfo | undefined {
  return SERVICE_DETAILS.find((s) => s.id === id);
}

export function getServiceSlugs(): string[] {
  return SERVICE_DETAILS.map((s) => s.id);
}

export function getRelatedPackages(service: ServiceInfo) {
  if (!service.relatedPackageIds?.length) return [];
  return PACKAGES.filter((p) => service.relatedPackageIds?.includes(p.id));
}

export function getBusTypesForService(service: ServiceInfo) {
  return service.showBusTypes ? BUS_TYPES : [];
}

export function getResortsForService(service: ServiceInfo) {
  return service.resortList ? HARITHA_RESORTS : [];
}
