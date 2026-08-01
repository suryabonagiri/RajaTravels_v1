package com.rajatravels.web;

import com.rajatravels.model.BookingInquiry;
import com.rajatravels.repository.BookingInquiryRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    public record InquiryRequest(
            @NotBlank String serviceType,
            @NotBlank String startPoint,
            @NotBlank String destination,
            @NotBlank String journeyDate,
            String busType,
            @NotBlank @Size(max = 100) String customerName,
            @NotBlank @Pattern(regexp = "[0-9+\\-() ]{7,15}", message = "must be a valid phone number") String phone,
            @Size(max = 2000) String message
    ) {
    }

    private final BookingInquiryRepository inquiries;

    public InquiryController(BookingInquiryRepository inquiries) {
        this.inquiries = inquiries;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody InquiryRequest request) {
        BookingInquiry saved = inquiries.save(new BookingInquiry(
                request.serviceType(),
                request.startPoint(),
                request.destination(),
                request.journeyDate(),
                request.busType(),
                request.customerName(),
                request.phone(),
                request.message()
        ));
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", saved.getId(), "status", "received"));
    }
}
