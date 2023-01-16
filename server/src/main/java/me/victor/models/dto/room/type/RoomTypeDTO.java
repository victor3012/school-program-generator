package me.victor.models.dto.room.type;

public class RoomTypeDTO {
    private long id;
    private String name;

    public long getId() {
        return id;
    }

    public RoomTypeDTO setId(long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public RoomTypeDTO setName(String name) {
        this.name = name;
        return this;
    }
}
