package com.rajatravels.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tour_packages")
public class TourPackage {

    @Id
    private String id;

    private String title;
    private String adultPrice;
    private String childPrice;
    private String duration;
    private String destination;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "tour_package_highlights", joinColumns = @JoinColumn(name = "package_id"))
    @OrderColumn(name = "position")
    @Column(name = "highlight")
    private List<String> highlights = new ArrayList<>();

    private int sortOrder;

    protected TourPackage() {
    }

    public TourPackage(String id, String title, String adultPrice, String childPrice,
                       String duration, String destination, List<String> highlights, int sortOrder) {
        this.id = id;
        this.title = title;
        this.adultPrice = adultPrice;
        this.childPrice = childPrice;
        this.duration = duration;
        this.destination = destination;
        this.highlights = highlights;
        this.sortOrder = sortOrder;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAdultPrice() {
        return adultPrice;
    }

    public String getChildPrice() {
        return childPrice;
    }

    public String getDuration() {
        return duration;
    }

    public String getDestination() {
        return destination;
    }

    public List<String> getHighlights() {
        return highlights;
    }

    public int getSortOrder() {
        return sortOrder;
    }
}
