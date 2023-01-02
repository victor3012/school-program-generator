package me.victor.models.entities;

import me.victor.models.entities.timetable.Timetable;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "schedules")
public class Schedule extends ObjectWithName {
    @OneToMany
    private List<Lesson> lessons;

    private boolean isMain;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Timetable timetable;

    public Schedule() {
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public Schedule setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }
}
