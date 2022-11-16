package me.victor.data.dto.school;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UpdateSchoolDTO {
    @NotNull(message = "Provided school name is invalid")
    @Size(min = 5, message = "School name must be at least 5 symbols")
    @Size(max = 255, message = "School name must be less than 255 symbols")
    private String name;
    private long ownerId;

    public String getName() {
        return name;
    }

    public UpdateSchoolDTO setName(String name) {
        this.name = name;
        return this;
    }

    public long getOwnerId() {
        return ownerId;
    }

    public UpdateSchoolDTO setOwnerId(long ownerId) {
        this.ownerId = ownerId;
        return this;
    }
}
