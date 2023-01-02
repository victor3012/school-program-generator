package me.victor.models.entities;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "groups")
public class Group extends ObjectWithName {
    @ManyToOne(optional = false)
    private School school;

    public School getSchool() {
        return school;
    }

    public Group setSchool(School school) {
        this.school = school;
        return this;
    }
}
