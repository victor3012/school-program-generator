package me.victor.models.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "timetable_subjects")
public class TimetableSubject extends ObjectWithId {
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Subject subject;

    private int lessonsPerWeek;

    @ManyToOne
    private Teacher teacher;

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
