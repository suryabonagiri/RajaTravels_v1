package com.rajatravels.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "faqs")
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500)
    private String question;

    @Column(length = 2000)
    private String answer;

    private int sortOrder;

    protected Faq() {
    }

    public Faq(String question, String answer, int sortOrder) {
        this.question = question;
        this.answer = answer;
        this.sortOrder = sortOrder;
    }

    public Long getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public int getSortOrder() {
        return sortOrder;
    }
}
