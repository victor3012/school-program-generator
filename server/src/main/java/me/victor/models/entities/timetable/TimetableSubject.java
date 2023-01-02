package me.victor.models.entities.timetable;

import me.victor.models.entities.ObjectWithId;
import me.victor.models.entities.Subject;
import me.victor.models.entities.Teacher;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "timetable_subjects")
public class TimetableSubject extends ObjectWithId {
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Subject subject;

    private int lessonsPerWeek;

    @ManyToMany
    private Set<TimetableGroup> groups;

    @ManyToOne
    private Teacher teacher;

    @ManyToOne
    private Timetable timetable;

    //TODO: restrictions

    public Subject getSubject() {
        return subject;
    }

    public TimetableSubject setSubject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public int getLessonsPerWeek() {
        return lessonsPerWeek;
    }

    public TimetableSubject setLessonsPerWeek(int lessonsPerWeek) {
        this.lessonsPerWeek = lessonsPerWeek;
        return this;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public TimetableSubject setTeacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }
}
