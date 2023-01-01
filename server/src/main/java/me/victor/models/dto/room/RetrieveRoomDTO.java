package me.victor.models.dto.room;

public class RetrieveRoomDTO {
    private long id;
    private String name;

    public long getId() {
        return id;
    }

    public RetrieveRoomDTO setId(long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public RetrieveRoomDTO setName(String name) {
        this.name = name;
        return this;
    }
}
