package com.rajatravels.web;

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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ContentController {

    private final TourPackageRepository packages;
    private final DestinationRepository destinations;
    private final TravelServiceRepository services;
    private final TestimonialRepository testimonials;
    private final FaqRepository faqs;
    private final HarithaResortRepository resorts;

    public ContentController(TourPackageRepository packages,
                             DestinationRepository destinations,
                             TravelServiceRepository services,
                             TestimonialRepository testimonials,
                             FaqRepository faqs,
                             HarithaResortRepository resorts) {
        this.packages = packages;
        this.destinations = destinations;
        this.services = services;
        this.testimonials = testimonials;
        this.faqs = faqs;
        this.resorts = resorts;
    }

    @GetMapping("/packages")
    public List<TourPackage> getPackages() {
        return packages.findAllByOrderBySortOrderAsc();
    }

    @GetMapping("/destinations")
    public List<Destination> getDestinations() {
        return destinations.findAllByOrderBySortOrderAsc();
    }

    @GetMapping("/services")
    public List<TravelService> getServices() {
        return services.findAllByOrderBySortOrderAsc();
    }

    @GetMapping("/testimonials")
    public List<Testimonial> getTestimonials() {
        return testimonials.findAllByOrderBySortOrderAsc();
    }

    @GetMapping("/faqs")
    public List<Faq> getFaqs() {
        return faqs.findAllByOrderBySortOrderAsc();
    }

    @GetMapping("/resorts")
    public List<HarithaResort> getResorts() {
        return resorts.findAllByOrderBySortOrderAsc();
    }
}
