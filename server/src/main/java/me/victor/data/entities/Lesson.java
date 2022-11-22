package me.victor.data.entities;

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
}
