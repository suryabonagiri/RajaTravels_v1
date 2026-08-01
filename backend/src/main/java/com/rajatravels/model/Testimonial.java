package com.rajatravels.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "testimonials")
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private int rating;

    @Column(length = 2000)
    private String review;

    private int sortOrder;

    protected Testimonial() {
    }

    public Testimonial(String name, String location, int rating, String review, int sortOrder) {
        this.name = name;
        this.location = location;
        this.rating = rating;
        this.review = review;
        this.sortOrder = sortOrder;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public int getRating() {
        return rating;
    }

    public String getReview() {
        return review;
    }

    public int getSortOrder() {
        return sortOrder;
    }
}
