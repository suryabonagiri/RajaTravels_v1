package com.rajatravels.bootstrap;

import com.rajatravels.model.Destination;
import com.rajatravels.model.Faq;
import com.rajatravels.model.HarithaResort;
import com.rajatravels.model.Testimonial;
import com.rajatravels.model.TourPackage;
import com.rajatravels.model.TravelService;
import com.rajatravels.repository.DestinationRepository;
import com.rajatravels.repository.FaqRepository;
import com.rajatravels.repository.HarithaResortRepository;
import com.rajatravels.repository.TestimonialRepository;
import com.rajatravels.repository.TourPackageRepository;
import com.rajatravels.repository.TravelServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the database with the site content on first startup (only when tables are empty).
 * Content can afterwards be managed directly in the database.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final TravelServiceRepository services;
    private final DestinationRepository destinations;
    private final TourPackageRepository packages;
    private final TestimonialRepository testimonials;
    private final FaqRepository faqs;
    private final HarithaResortRepository resorts;

    public DataSeeder(TravelServiceRepository services,
                      DestinationRepository destinations,
                      TourPackageRepository packages,
                      TestimonialRepository testimonials,
                      FaqRepository faqs,
                      HarithaResortRepository resorts) {
        this.services = services;
        this.destinations = destinations;
        this.packages = packages;
        this.testimonials = testimonials;
        this.faqs = faqs;
        this.resorts = resorts;
    }

    @Override
    public void run(String... args) {
        seedServices();
        seedDestinations();
        seedPackages();
        seedTestimonials();
        seedFaqs();
        seedResorts();
    }

    private void seedServices() {
        if (services.count() > 0) {
            return;
        }
        services.saveAll(List.of(
                new TravelService("bus-rental", "Premium Bus Rental",
                        "Luxury and comfortable buses for all occasions — from family trips to corporate events. "
                                + "Choose from 17 to 49 seater options.", "bus", 1),
                new TravelService("papikondalu", "Papikondalu Boat Tourism",
                        "Experience the breathtaking Papikondalu hills through scenic boat rides on the Godavari river. "
                                + "AP Tourism authorized packages.", "boat", 2),
                new TravelService("maredumilli", "Maredumilli Eco Tourism",
                        "Explore the pristine forests, waterfalls, and tribal culture of Maredumilli — "
                                + "Andhra Pradesh's hidden eco paradise.", "forest", 3),
                new TravelService("haritha", "Haritha Resorts Booking",
                        "Book official AP Tourism Haritha Resorts across Andhra Pradesh. "
                                + "Premium stays at government-approved properties.", "resort", 4),
                new TravelService("group-tours", "Group & Family Tours",
                        "Customized group tours for families, friends, and communities. "
                                + "Complete trip planning with accommodation and transport.", "group", 5),
                new TravelService("corporate", "Corporate & Event Trips",
                        "Professional transport solutions for corporate outings, marriage trips, "
                                + "and special events with premium service.", "corporate", 6)
        ));
    }

    private void seedDestinations() {
        if (destinations.count() > 0) {
            return;
        }
        destinations.saveAll(List.of(
                new Destination("papikondalu", "Papikondalu", "Godavari River Paradise",
                        "Cruise through the majestic Papikondalu hills on the Godavari river. Witness breathtaking "
                                + "gorges, lush green hills, and serene backwaters on this unforgettable boat journey.",
                        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
                        List.of("Boat Cruise", "Hill Views", "River Safari", "Tribal Culture"), 1),
                new Destination("maredumilli", "Maredumilli", "Eco Tourism Haven",
                        "Discover the untouched beauty of Maredumilli's dense forests, stunning waterfalls, and "
                                + "vibrant tribal heritage. A perfect escape into nature's lap.",
                        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
                        List.of("Waterfalls", "Forest Trails", "Tribal Villages", "Eco Resorts"), 2),
                new Destination("haritha", "Haritha Resorts", "AP Tourism Official Stays",
                        "Stay at premium AP Tourism Haritha Resorts across Andhra Pradesh. From beach resorts to "
                                + "hill stations, experience comfort amidst nature.",
                        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
                        List.of("Beach Resorts", "Hill Stations", "Temple Stays", "Jungle Bells"), 3)
        ));
    }

    private void seedPackages() {
        if (packages.count() > 0) {
            return;
        }
        packages.saveAll(List.of(
                new TourPackage("papi-1day", "Papikondalu 1 Day Tour", "₹1,250", "₹1,050", "1 Day", "Papikondalu",
                        List.of("Boat ride on Godavari", "Papikondalu hill views", "Lunch included",
                                "Transport from Rajahmundry"), 1),
                new TourPackage("badra-1day", "Bhadrachalam 1 Day Tour", "₹2,500", "₹2,200", "1 Day", "Bhadrachalam",
                        List.of("Bhadrachalam temple visit", "Boat ride", "Breakfast & Lunch", "AC Transport"), 2),
                new TourPackage("sirivaka-2day", "Sirivaka Night Stay 2 Days", "₹4,800", "₹4,500", "2 Days", "Sirivaka",
                        List.of("Tent / Cottage accommodation", "Boat cruise", "All meals included",
                                "Bonfire & entertainment"), 3),
                new TourPackage("mare-1day", "Maredumilli 1 Day Tour", "₹1,800", "₹1,500", "1 Day", "Maredumilli",
                        List.of("Jalatarangini waterfalls", "Forest trekking", "Tribal village visit",
                                "Lunch included"), 4),
                new TourPackage("mare-2day", "Maredumilli 2 Days Package", "₹5,000", "₹4,500", "2 Days", "Maredumilli",
                        List.of("Resort accommodation", "Multiple waterfall visits", "All meals included",
                                "Guided forest trek"), 5),
                new TourPackage("kolluru-2day", "Bhadrachalam to Kolluru Huts", "₹4,500", "₹4,000", "2 Days", "Kolluru",
                        List.of("Hut accommodation", "Boat cruise", "All meals", "Campfire night"), 6)
        ));
    }

    private void seedTestimonials() {
        if (testimonials.count() > 0) {
            return;
        }
        testimonials.saveAll(List.of(
                new Testimonial("Rajesh Kumar", "Hyderabad", 5,
                        "Absolutely amazing experience with Raja Travels! The Papikondalu boat tour was breathtaking. "
                                + "The arrangements were perfect and the team was incredibly professional. Highly recommend!", 1),
                new Testimonial("Priya Sharma", "Visakhapatnam", 5,
                        "We booked a 45-seater bus for our family wedding trip. The bus was in excellent condition, "
                                + "driver was experienced, and the service was top-notch. Will definitely book again!", 2),
                new Testimonial("Venkat Rao", "Vijayawada", 5,
                        "The Maredumilli 2-day package was worth every penny. Beautiful resorts, stunning waterfalls, "
                                + "and excellent food. Raja Travels made our family vacation truly memorable.", 3),
                new Testimonial("Sneha Reddy", "Rajahmundry", 5,
                        "As a corporate event planner, I've used Raja Travels multiple times for our team outings. "
                                + "Their buses are premium, service is reliable, and pricing is very reasonable.", 4),
                new Testimonial("Anil Prasad", "Kakinada", 5,
                        "The Haritha Resort booking was seamless. Raja Travels arranged everything — from transport "
                                + "to accommodation. The resort was beautiful and the trip was hassle-free!", 5)
        ));
    }

    private void seedFaqs() {
        if (faqs.count() > 0) {
            return;
        }
        faqs.saveAll(List.of(
                new Faq("Is Raja Travels an authorized AP Tourism agent?",
                        "Yes, Raja Travels is an officially authorized AP Tourism agent based in Rajahmundry. We are "
                                + "certified to provide tourism packages, Haritha Resort bookings, and Papikondalu boat "
                                + "tourism services.", 1),
                new Faq("How can I book a bus for my trip?",
                        "You can book a bus by filling out the booking form on our website, calling us directly at "
                                + "9397912351, or sending a WhatsApp message. We offer 17 to 49 seater buses for all "
                                + "types of trips.", 2),
                new Faq("What is included in the Papikondalu tour package?",
                        "Our Papikondalu tour packages include boat ride on the Godavari river, meals (breakfast and "
                                + "lunch), transport from Rajahmundry, and guide services. Night stay packages also "
                                + "include accommodation.", 3),
                new Faq("Do you provide buses for marriages and corporate events?",
                        "Absolutely! We specialize in providing premium buses for marriages, corporate trips, family "
                                + "tours, and special events. We offer various seating capacities and can customize as "
                                + "per your requirements.", 4),
                new Faq("How do I book Haritha Resorts through Raja Travels?",
                        "Simply contact us with your preferred destination, dates, and number of guests. As an "
                                + "authorized AP Tourism agent, we can book any Haritha Resort across Andhra Pradesh "
                                + "at official rates.", 5),
                new Faq("What areas do you cover for bus services?",
                        "We provide bus rental services across Andhra Pradesh, Telangana, and neighboring states. "
                                + "Popular routes include Rajahmundry, Hyderabad, Visakhapatnam, Vijayawada, and all "
                                + "major tourist destinations.", 6),
                new Faq("Is it safe to travel with children on the Papikondalu tour?",
                        "Yes, our Papikondalu tours are completely safe for children. We use well-maintained boats "
                                + "with safety equipment, experienced crew, and life jackets are provided for all "
                                + "passengers including children.", 7),
                new Faq("Can I cancel or reschedule my booking?",
                        "Yes, cancellations and rescheduling are possible. Please contact us at least 48 hours before "
                                + "your trip for a full refund. For rescheduling, we'll accommodate your preferred "
                                + "dates based on availability.", 8)
        ));
    }

    private void seedResorts() {
        if (resorts.count() > 0) {
            return;
        }
        resorts.saveAll(List.of(
                new HarithaResort("Tyda Haritha Jungle Bells", "Tyda", 1),
                new HarithaResort("Suryalanka Beach Resorts", "Suryalanka", 2),
                new HarithaResort("Berm Park Haritha Hotel", "Vijayawada", 3),
                new HarithaResort("Mypadu Beach Resorts", "Mypadu", 4),
                new HarithaResort("Bhavani Island Resort", "Vijayawada", 5),
                new HarithaResort("Ananthagiri Resort", "Ananthagiri", 6),
                new HarithaResort("Lambasingi Resorts", "Lambasingi", 7),
                new HarithaResort("Srisailam Hotels", "Srisailam", 8)
        ));
    }
}
