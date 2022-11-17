package me.victor.data.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "special_lessons")
public class SpecialLesson extends Lesson {
    @Column
    private LocalDate date;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Timetable timetable;
}
