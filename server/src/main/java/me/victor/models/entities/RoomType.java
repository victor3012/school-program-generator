package me.victor.models.entities;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "room_types")
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
