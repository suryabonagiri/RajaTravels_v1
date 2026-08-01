package com.rajatravels.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "haritha_resorts")
public class HarithaResort {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private int sortOrder;

    protected HarithaResort() {
    }

    public HarithaResort(String name, String location, int sortOrder) {
        this.name = name;
        this.location = location;
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

    public int getSortOrder() {
        return sortOrder;
    }
}
