package me.victor.data.entities.planned.school.program;

import me.victor.data.entities.planned.school.lessons.GroupLesson;
import me.victor.data.entities.planned.school.School;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Weekly schedule.
 */
@Entity
@Table(name = "programs")
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<GroupLesson> groupLessons;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private School school;

    public Program() {
    }

    public Program(List<GroupLesson> groupLessons, LocalDateTime creationDate, School school) {
        this.groupLessons = groupLessons;
        this.creationDate = creationDate;
        this.school = school;
    }

    public int getId() {
        return id;
    }

    public Program setId(int id) {
        this.id = id;
        return this;
    }

    public List<GroupLesson> getGroupLessons() {
        return groupLessons;
    }

    public Program setGroupLessons(List<GroupLesson> groupLessons) {
        this.groupLessons = groupLessons;
        return this;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public Program setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public School getSchool() {
        return school;
    }

    public Program setSchool(School school) {
        this.school = school;
        return this;
    }
}
