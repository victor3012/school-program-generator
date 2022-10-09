package me.victor.data.entities.school.lessons;

import javax.persistence.*;
import java.util.List;

/**
 * One of the main presumptions of this program is that
 * every lesson is treated as a group lesson.
 */
@Entity
@Table(name = "group_lessons")
public class GroupLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "groupLesson", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Lesson> lessons;

    public GroupLesson() {
    }

    public GroupLesson(List<Lesson> lessons) {
        this.lessons = lessons;
    }

    public int getId() {
        return id;
    }

    public GroupLesson setId(int id) {
        this.id = id;
        return this;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public GroupLesson setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }
}
