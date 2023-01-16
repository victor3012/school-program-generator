package me.victor.models.entities;

import javax.persistence.*;

@Entity
@Table(name = "subjects", uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "school_id"})})
public class Subject extends ObjectWithName {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private School school;

    @ManyToOne
    private SubjectType type;

    @ManyToOne
    private RoomType roomType;

    public Subject() {
    }

    public School getSchool() {
        return school;
    }

    public Subject setSchool(School school) {
        this.school = school;
        return this;
    }

    public SubjectType getType() {
        return type;
    }

    public Subject setType(SubjectType type) {
        this.type = type;
        return this;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public Subject setRoomType(RoomType roomType) {
        this.roomType = roomType;
        return this;
    }
}
