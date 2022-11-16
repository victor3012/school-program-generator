package me.victor.data.entities;

import javax.persistence.*;

@Entity
@Table(name = "rooms")
public class Room extends ObjectWithId {
    // ToDo composite PK
    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private School school;

    public Room() {
    }

    public Room(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Room setName(String name) {
        this.name = name;
        return this;
    }

    public School getSchool() {
        return school;
    }

    public Room setSchool(School school) {
        this.school = school;
        return this;
    }
}
