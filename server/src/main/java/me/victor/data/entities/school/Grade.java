package me.victor.data.entities.school;

import me.victor.data.entities.school.room.Room;

import javax.persistence.*;

@Entity
@Table(name = "grades")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int grade;

    @Column(nullable = false, name = "group_tag")
    private String group;

    @OneToOne(optional = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Room classRoom;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private School school;

    public Grade() {
    }

    public Grade(int grade, String group, Room classRoom, School school) {
        this.grade = grade;
        this.group = group;
        this.classRoom = classRoom;
        this.school = school;
    }

    public int getId() {
        return id;
    }

    public Grade setId(int id) {
        this.id = id;
        return this;
    }

    public int getGrade() {
        return grade;
    }

    public Grade setGrade(int grade) {
        this.grade = grade;
        return this;
    }

    public String getGroup() {
        return group;
    }

    public Grade setGroup(String group) {
        this.group = group;
        return this;
    }

    public Room getClassRoom() {
        return classRoom;
    }

    public Grade setClassRoom(Room classRoom) {
        this.classRoom = classRoom;
        return this;
    }

    public School getSchool() {
        return school;
    }

    public Grade setSchool(School school) {
        this.school = school;
        return this;
    }
}
