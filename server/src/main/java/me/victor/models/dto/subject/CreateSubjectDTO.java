package me.victor.models.dto.subject;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CreateSubjectDTO {
    @NotNull(message = "Subject name must not be empty")
    @NotEmpty(message = "Subject name must not be empty")
    @Size(max = 255, message = "Subject name cannot be more than 255 symbols")
    private String name;

    @Size(max = 25, message = "Subject type cannot exceed 25 symbols")
    private String type;

    @Size(max = 25, message = "Room type cannot exceed 25 symbols")
    private String roomType;

    public String getName() {
        return name;
    }

    public CreateSubjectDTO setName(String name) {
        this.name = name;
        return this;
    }

    public String getType() {
        return type;
    }

    public CreateSubjectDTO setType(String type) {
        this.type = type;
        return this;
    }

    public String getRoomType() {
        return roomType;
    }

    public CreateSubjectDTO setRoomType(String roomType) {
        this.roomType = roomType;
        return this;
    }
}
