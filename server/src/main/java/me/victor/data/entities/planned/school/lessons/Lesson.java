package me.victor.data.entities.planned.school.lessons;

import me.victor.data.entities.planned.school.Grade;
import me.victor.data.entities.planned.school.room.Room;
import me.victor.data.entities.planned.school.School;
import me.victor.data.entities.planned.school.Teacher;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Grade> grades;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Room room;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Teacher teacher;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private GroupLesson groupLesson;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private School school;

    public Lesson() {
    }

    public Lesson(String name, List<Grade> grades, Room room, Teacher teacher, GroupLesson groupLesson, School school) {
        this.name = name;
        this.grades = grades;
        this.room = room;
        this.teacher = teacher;
        this.groupLesson = groupLesson;
        this.school = school;
    }

    public int getId() {
        return id;
    }

    public Lesson setId(int id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Lesson setName(String name) {
        this.name = name;
        return this;
    }

    public List<Grade> getGrades() {
        return grades;
    }

    public Lesson setGrades(List<Grade> grades) {
        this.grades = grades;
        return this;
    }

    public Room getRoom() {
        return room;
    }

    public Lesson setRoom(Room room) {
        this.room = room;
        return this;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Lesson setTeacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public GroupLesson getGroupLesson() {
        return groupLesson;
    }

    public Lesson setGroupLesson(GroupLesson groupLesson) {
        this.groupLesson = groupLesson;
        return this;
    }

    public School getSchool() {
        return school;
    }

    public Lesson setSchool(School school) {
        this.school = school;
        return this;
    }
}
