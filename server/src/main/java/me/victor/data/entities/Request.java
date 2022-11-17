package me.victor.data.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "requests")
public class Request extends ObjectWithId {
    @ManyToOne(optional = false)
    private Teacher requestedBy;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<SpecialLesson> lessons;

    public Teacher getRequestedBy() {
        return requestedBy;
    }

    public Request setRequestedBy(Teacher requestedBy) {
        this.requestedBy = requestedBy;
        return this;
    }

    public List<SpecialLesson> getLessons() {
        return lessons;
    }

    public Request setLessons(List<SpecialLesson> lessons) {
        this.lessons = lessons;
        return this;
    }
}
