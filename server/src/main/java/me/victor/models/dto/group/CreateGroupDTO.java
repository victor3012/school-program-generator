package me.victor.models.dto.group;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CreateGroupDTO {
    @NotNull(message = "Group name must not be empty")
    @NotEmpty(message = "Group name must not be empty")
    @Size(max = 25, message = "Group name cannot exceed 25 symbols")
    private String name;

    public String getName() {
        return name;
    }

    public CreateGroupDTO setName(String name) {
        this.name = name;
        return this;
    }
}
