package me.victor.data.entities;

import me.victor.data.entities.enums.RequestStage;

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
}
