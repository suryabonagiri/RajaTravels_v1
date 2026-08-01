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
@Table(name = "destinations")
public class Destination {

    @Id
    private String id;

    private String title;
    private String subtitle;

    @Column(length = 1000)
    private String description;

    private String image;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "destination_highlights", joinColumns = @JoinColumn(name = "destination_id"))
    @OrderColumn(name = "position")
    @Column(name = "highlight")
    private List<String> highlights = new ArrayList<>();

    private int sortOrder;

    protected Destination() {
    }

    public Destination(String id, String title, String subtitle, String description,
                       String image, List<String> highlights, int sortOrder) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.image = image;
        this.highlights = highlights;
        this.sortOrder = sortOrder;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public List<String> getHighlights() {
        return highlights;
    }

    public int getSortOrder() {
        return sortOrder;
    }
}
