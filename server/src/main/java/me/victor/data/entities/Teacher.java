package me.victor.data.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "teachers")
public class Teacher extends ObjectWithId {
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @ElementCollection
    private List<TeacherRole> teacherRoles;

    @ManyToOne(fetch = FetchType.EAGER, optional = false, cascade = CascadeType.ALL)
    private School school;

    public Teacher() {

    }

    public Teacher(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public Teacher setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public Teacher setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public Teacher setEmail(String email) {
        this.email = email;
        return this;
    }

    public List<TeacherRole> getTeacherRoles() {
        return teacherRoles;
    }

    public Teacher setTeacherRoles(List<TeacherRole> teacherRoles) {
        this.teacherRoles = teacherRoles;
        return this;
    }

    public School getSchool() {
        return school;
    }

    public Teacher setSchool(School school) {
        this.school = school;
        return this;
    }
}
