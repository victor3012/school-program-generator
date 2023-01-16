package me.victor.models.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "schools", uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
public class School extends ObjectWithName {
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private User owner;

    @OneToMany(mappedBy = "school", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Teacher> teachers;
    @OneToMany(mappedBy = "school", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Room> rooms;
    @OneToMany(mappedBy = "school", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Subject> subjects;

    public School() {
    }

    public User getOwner() {
        return owner;
    }

    public School setOwner(User owner) {
        this.owner = owner;
        return this;
    }

    public List<Teacher> getTeachers() {
        return teachers;
    }

    public School setTeachers(List<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public School setRooms(List<Room> rooms) {
        this.rooms = rooms;
        return this;
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public School setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }
}
