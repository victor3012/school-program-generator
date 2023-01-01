package me.victor.models.entities;

import javax.persistence.*;
import java.time.DayOfWeek;

@Entity
@Table(name = "lessons")
public class Lesson extends ObjectWithId {
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Subject subject;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Room room;

    @Column(name = "class_group")
    private String classGroup;

    @Column(name = "day_of_week")
    private DayOfWeek dayOfWeek;

    @Column(name = "lesson_index")
    private int lessonIndex;

    @Column(name = "is_first_shift")
    private boolean isFirstShift;

    public Subject getSubject() {
        return subject;
    }

    public Lesson setSubject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Lesson setTeacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public Room getRoom() {
        return room;
    }

    public Lesson setRoom(Room room) {
        this.room = room;
        return this;
    }

    public String getClassGroup() {
        return classGroup;
    }

    public Lesson setClassGroup(String classGroup) {
        this.classGroup = classGroup;
        return this;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public Lesson setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
        return this;
    }

    public int getLessonIndex() {
        return lessonIndex;
    }

    public Lesson setLessonIndex(int lessonIndex) {
        this.lessonIndex = lessonIndex;
        return this;
    }

    public boolean isFirstShift() {
        return isFirstShift;
    }

    public Lesson setFirstShift(boolean firstShift) {
        isFirstShift = firstShift;
        return this;
    }
}
