package me.victor.data.entities.school.program;

import me.victor.data.entities.enums.Day;
import me.victor.data.entities.school.lessons.GroupLesson;

import javax.persistence.*;

/**
 * A lesson with fixed date & time.
 */
@Entity
@Table(name = "program_lessons")
public class ProgramLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Day day;

    private int course;

    @ManyToOne(cascade = CascadeType.ALL, fetch =  FetchType.EAGER)
    private GroupLesson lesson;

    public ProgramLesson() {
    }

    public ProgramLesson(Day day, int course, GroupLesson lesson) {
        this.day = day;
        this.course = course;
        this.lesson = lesson;
    }

    public int getId() {
        return id;
    }

    public ProgramLesson setId(int id) {
        this.id = id;
        return this;
    }

    public Day getDay() {
        return day;
    }

    public ProgramLesson setDay(Day day) {
        this.day = day;
        return this;
    }

    public int getCourse() {
        return course;
    }

    public ProgramLesson setCourse(int course) {
        this.course = course;
        return this;
    }

    public GroupLesson getLesson() {
        return lesson;
    }

    public ProgramLesson setLesson(GroupLesson lesson) {
        this.lesson = lesson;
        return this;
    }
}
