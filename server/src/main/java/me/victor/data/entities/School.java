package me.victor.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "schools")
public class School extends ObjectWithId {
    @Column(nullable = false)
    private String name;

    private List<Teacher> teachers;
    private List<Room> rooms;
    private List<Subject> subjects;
    private List<Schedule> schedules;
}
