package me.victor.data.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "schools")
public class School extends ObjectWithId {
    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private User user;

    @OneToMany
    private List<Teacher> teachers;
    @OneToMany
    private List<Room> rooms;
    @OneToMany
    private List<Subject> subjects;
    @OneToMany
    private List<Schedule> schedules;
}
