package me.victor.data.entities.planned.school.room;

import me.victor.data.entities.planned.school.School;

import javax.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private RoomCategory category;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private School school;

    public Room() {
    }

    public Room(String name, RoomCategory category, School school) {
        this.name = name;
        this.category = category;
        this.school = school;
    }

    public int getId() {
        return id;
    }

    public Room setId(int id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Room setName(String name) {
        this.name = name;
        return this;
    }

    public RoomCategory getCategory() {
        return category;
    }

    public Room setCategory(RoomCategory category) {
        this.category = category;
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
