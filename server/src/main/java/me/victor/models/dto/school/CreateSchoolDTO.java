package me.victor.models.dto.school;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CreateSchoolDTO {
    @NotNull(message = "School name must be at least 5 symbols")
    @Size(min = 5, message = "School name must be at least 5 symbols")
    @Size(max = 255, message = "School name must be less than 255 symbols")
    private String name;

    public String getName() {
        return name;
    }

    public CreateSchoolDTO setName(String name) {
        this.name = name;
        return this;
    }
}
