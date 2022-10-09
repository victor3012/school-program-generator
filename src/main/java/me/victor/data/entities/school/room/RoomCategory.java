package me.victor.data.entities.school.room;

import me.victor.data.entities.school.School;

import javax.persistence.*;

@Entity
@Table(name = "room_categories")
public class RoomCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private School school;

    public RoomCategory() {
    }

    public RoomCategory(String name, School school) {
        this.name = name;
        this.school = school;
    }

    public long getId() {
        return id;
    }

    public RoomCategory setId(long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public RoomCategory setName(String name) {
        this.name = name;
        return this;
    }

    public School getSchool() {
        return school;
    }

    public RoomCategory setSchool(School school) {
        this.school = school;
        return this;
    }
}
