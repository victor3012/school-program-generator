package me.victor.data.entities;

import javax.persistence.*;

@Entity
@Table(name = "subjects", uniqueConstraints = { @UniqueConstraint(columnNames = { "name", "school_id" }) })
public class Subject extends ObjectWithId {
    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private School school;

    public Subject() {
    }

    public String getName() {
        return name;
    }

    public Subject setName(String name) {
        this.name = name;
        return this;
    }

    public School getSchool() {
        return school;
    }

    public Subject setSchool(School school) {
        this.school = school;
        return this;
    }
}
