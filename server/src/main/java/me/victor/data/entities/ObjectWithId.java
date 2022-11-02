package me.victor.data.entities;

import javax.annotation.Generated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class ObjectWithId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public ObjectWithId() {

    }

    public long getId() {
        return id;
    }

    public ObjectWithId setId(long id) {
        this.id = id;
        return this;
    }
}
