package me.victor.data.entities;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "schedules")
public class Schedule extends ObjectWithId {
    @OneToMany
    private List<Lesson> lessons;

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
