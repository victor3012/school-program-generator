package me.victor.data.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "timetables")
public class Timetable extends ObjectWithId {
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Schedule schedule;

    @OneToMany(mappedBy = "timetable", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private List<SpecialLesson> specialLessons;



}
