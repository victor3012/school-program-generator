package me.victor.models.entities;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "room_types", uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "school_id"})})
public class RoomType extends ObjectWithName {
    @ManyToOne(optional = false)
    private School school;

    public School getSchool() {
        return school;
    }

    public RoomType setSchool(School school) {
        this.school = school;
        return this;
    }
}
