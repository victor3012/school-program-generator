package me.victor.models.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "schools")
public class School extends ObjectWithId {
    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private User boss;

    @OneToMany(mappedBy = "school", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Teacher> teachers;
    @OneToMany(mappedBy = "school", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Room> rooms;
    @OneToMany(mappedBy = "school", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Subject> subjects;
    @OneToOne
    private Schedule schedule;

    public School() {
    }

    public String getName() {
        return name;
    }

    public School setName(String name) {
        this.name = name;
        return this;
    }

    public User getBoss() {
        return boss;
    }

    public School setBoss(User user) {
        this.boss = user;
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

    public Schedule getSchedule() {
        return schedule;
    }

    public School setSchedule(Schedule schedule) {
        this.schedule = schedule;
        return this;
    }
}
