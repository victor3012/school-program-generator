package me.victor.data.entities.planned.school;

import me.victor.data.entities.*;
import me.victor.data.entities.planned.school.lessons.Lesson;
import me.victor.data.entities.planned.school.program.Program;
import me.victor.data.entities.planned.school.room.Room;

import javax.persistence.*;
import java.util.List;

/**
 * This entity represents a school along with its subsystems and configurations.
 */
@Entity
@Table(name = "schools")
public class School {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private User owner;

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Program> programs;

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Lesson> lessons;

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Grade> grades;

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Teacher> teachers;

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Room> rooms;

    public School() {
    }

    public School(User owner, List<Program> programs, List<Lesson> lessons, List<Grade> grades, List<Teacher> teachers, List<Room> rooms) {
        this.owner = owner;
        this.programs = programs;
        this.lessons = lessons;
        this.grades = grades;
        this.teachers = teachers;
        this.rooms = rooms;
    }

    public int getId() {
        return id;
    }

    public School setId(int id) {
        this.id = id;
        return this;
    }

    public User getOwner() {
        return owner;
    }

    public School setOwner(User owner) {
        this.owner = owner;
        return this;
    }

    public List<Program> getPrograms() {
        return programs;
    }

    public School setPrograms(List<Program> programs) {
        this.programs = programs;
        return this;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public School setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public List<Grade> getGrades() {
        return grades;
    }

    public School setGrades(List<Grade> grades) {
        this.grades = grades;
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
}
