package me.victor.models.entities;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class ObjectWithName extends ObjectWithId {
    @Column(nullable = false)
    private String name;

    public String getName() {
        return name;
    }

    public ObjectWithName setName(String name) {
        this.name = name;
        return this;
    }
}
