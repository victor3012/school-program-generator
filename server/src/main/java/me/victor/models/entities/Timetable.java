package me.victor.models.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "timetables")
public class Timetable extends ObjectWithName {
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Schedule schedule;

    public Schedule getSchedule() {
        return schedule;
    }

    public Timetable setSchedule(Schedule schedule) {
        this.schedule = schedule;
        return this;
    }

    //TODO: RESTRICTIONS
}
