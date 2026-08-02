package com.rajatravels.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BusinessController {

    public record Stat(String label, int value, String suffix) {
    }

    public record BusinessInfo(
            String name,
            String tagline,
            String description,
            List<String> phones,
            String primaryPhone,
            String whatsappNumber,
            String email,
            String address,
            String mapEmbedUrl,
            Map<String, String> socialLinks,
            List<String> busTypes,
            List<Stat> stats
    ) {
    }

    private static final BusinessInfo BUSINESS = new BusinessInfo(
            "Raja Travels",
            "AP Tourism Authorized Agent",
            "Your trusted partner for exploring the enchanting beauty of Andhra Pradesh. "
                    + "AP Tourism Authorized Tours and Travels company dedicated to providing the most "
                    + "memorable and authentic travel experiences.",
            List.of("9397912351", "9397912411", "7036572664"),
            "9397912351",
            "919397912351",
            "rajatravelsbs@yahoo.in",
            "12-21-5, beside sri latha hosipital, Aryapuram, Rajamahendravaram, Andhra Pradesh 533104",
            "https://maps.google.com/maps?q=Raja%20Travels%20(ap%20tourism%20authorised)%20papikondalu%20tourism"
                    + "%2012-21-5%2C%20beside%20sri%20latha%20hosipital%2C%20Aryapuram%2C%20Rajamahendravaram"
                    + "&t=&z=15&ie=UTF8&iwloc=&output=embed",
            Map.of(
                    "facebook", "https://facebook.com/rajatravels",
                    "instagram", "https://instagram.com/rajatravels",
                    "youtube", "https://youtube.com/@rajatravels",
                    "twitter", "https://twitter.com/rajatravels"
            ),
            List.of("17 Seater", "32 Seater", "40 Seater", "45 Seater", "49 Seater", "Custom Requirement"),
            List.of(
                    new Stat("Happy Customers", 15000, "+"),
                    new Stat("Tours Completed", 5000, "+"),
                    new Stat("Years Experience", 10, "+"),
                    new Stat("Bus Fleet", 25, "+")
            )
    );

    @GetMapping("/business")
    public BusinessInfo getBusiness() {
        return BUSINESS;
    }
}
