package com.rajatravels.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "booking_inquiries")
public class BookingInquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceType;
    private String startPoint;
    private String destination;
    private String journeyDate;
    private String busType;
    private String customerName;
    private String phone;

    @Column(length = 2000)
    private String message;

    private Instant createdAt;

    protected BookingInquiry() {
    }

    public BookingInquiry(String serviceType, String startPoint, String destination, String journeyDate,
                          String busType, String customerName, String phone, String message) {
        this.serviceType = serviceType;
        this.startPoint = startPoint;
        this.destination = destination;
        this.journeyDate = journeyDate;
        this.busType = busType;
        this.customerName = customerName;
        this.phone = phone;
        this.message = message;
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getServiceType() {
        return serviceType;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public String getDestination() {
        return destination;
    }

    public String getJourneyDate() {
        return journeyDate;
    }

    public String getBusType() {
        return busType;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getPhone() {
        return phone;
    }

    public String getMessage() {
        return message;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
