package me.victor.models.entities;

import me.victor.models.entities.enums.RequestStage;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "requests")
public class Request extends ObjectWithId {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private RequestStage stage;

    @ManyToOne(optional = false)
    private Teacher requestedBy;

    @ManyToOne(optional = false)
    private Teacher assignedTeacher;

    @ManyToOne
    private Teacher reviewer;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "is_first_shift")
    private boolean isFirstShift;

    @Column(name = "lesson_index")
    private int lessonIndex;

    @Column(name = "lessons_count")
    private int lessonsCount;

    public String getTitle() {
        return title;
    }

    public Request setTitle(String title) {
        this.title = title;
        return this;
    }

    public RequestStage getStage() {
        return stage;
    }

    public Request setStage(RequestStage stage) {
        this.stage = stage;
        return this;
    }

    public Teacher getRequestedBy() {
        return requestedBy;
    }

    public Request setRequestedBy(Teacher requestedBy) {
        this.requestedBy = requestedBy;
        return this;
    }

    public Teacher getAssignedTeacher() {
        return assignedTeacher;
    }

    public Request setAssignedTeacher(Teacher assignedTeacher) {
        this.assignedTeacher = assignedTeacher;
        return this;
    }

    public Teacher getReviewer() {
        return reviewer;
    }

    public Request setReviewer(Teacher reviewer) {
        this.reviewer = reviewer;
        return this;
    }

    public LocalDate getDate() {
        return date;
    }

    public Request setDate(LocalDate date) {
        this.date = date;
        return this;
    }

    public boolean isFirstShift() {
        return isFirstShift;
    }

    public Request setFirstShift(boolean firstShift) {
        isFirstShift = firstShift;
        return this;
    }

    public int getLessonIndex() {
        return lessonIndex;
    }

    public Request setLessonIndex(int lessonIndex) {
        this.lessonIndex = lessonIndex;
        return this;
    }

    public int getLessonsCount() {
        return lessonsCount;
    }

    public Request setLessonsCount(int lessonsCount) {
        this.lessonsCount = lessonsCount;
        return this;
    }
}
