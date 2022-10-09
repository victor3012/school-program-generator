package me.victor.data.entities.school;

import me.victor.data.entities.enums.Position;
import me.victor.data.entities.school.School;

import javax.persistence.*;
import java.util.List;

/**
 * This is a sub-entity to School, defines all teachers.
 *
 * The unique identifiers are two (PK - id) and a combination of the email & school.
 */
@Entity
//@Table(name = "teachers", uniqueConstraints = { @UniqueConstraint(columnNames = { "email", "school_id" }) })
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @ElementCollection
    private List<Position> positions;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private School school;

    public Teacher() {
    }

    public Teacher(String firstName, String lastName, String email, List<Position> positions, School school) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.positions = positions;
        this.school = school;
    }

    public int getId() {
        return id;
    }

    public Teacher setId(int id) {
        this.id = id;
        return this;
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

    public List<Position> getPositions() {
        return positions;
    }

    public Teacher setPositions(List<Position> positions) {
        this.positions = positions;
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
