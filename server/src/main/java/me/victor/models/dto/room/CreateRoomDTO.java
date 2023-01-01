package me.victor.models.dto.room;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CreateRoomDTO {
    @NotNull(message = "Room name must not be empty")
    @NotEmpty(message = "Room name must not be empty")
    @Size(max = 25, message = "Room name cannot exceed 25 symbols")
    private String name;

    public String getName() {
        return name;
    }

    public CreateRoomDTO setName(String name) {
        this.name = name;
        return this;
    }
}
