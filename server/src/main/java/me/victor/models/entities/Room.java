package me.victor.models.entities;

import javax.persistence.*;

@Entity
@Table(name = "rooms", uniqueConstraints = { @UniqueConstraint(columnNames = { "name", "school_id" }) })
public class Room extends ObjectWithName implements Comparable<Room> {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private School school;

    @ManyToOne(fetch = FetchType.EAGER)
    private RoomType type;

    public Room() {
    }

    public School getSchool() {
        return school;
    }

    public Room setSchool(School school) {
        this.school = school;
        return this;
    }

    public RoomType getType() {
        return type;
    }

    public Room setType(RoomType type) {
        this.type = type;
        return this;
    }

    @Override
    public int compareTo(Room other) {
        return super.getName().compareTo(other.getName());
    }
}
