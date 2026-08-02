package com.rajatravels.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "travel_services")
public class TravelService {

    @Id
    private String id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String icon;
    private int sortOrder;

    protected TravelService() {
    }

    public TravelService(String id, String title, String description, String icon, int sortOrder) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.sortOrder = sortOrder;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getIcon() {
        return icon;
    }

    public int getSortOrder() {
        return sortOrder;
    }
}
