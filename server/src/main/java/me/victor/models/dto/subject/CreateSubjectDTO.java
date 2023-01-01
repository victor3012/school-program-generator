package me.victor.models.dto.subject;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CreateSubjectDTO {
    @NotNull(message = "Subject name must not be empty")
    @NotEmpty(message = "Subject name must not be empty")
    @Size(max = 255, message = "Subject name cannot be more than 255 symbols")
    private String name;

    public String getName() {
        return name;
    }

    public CreateSubjectDTO setName(String name) {
        this.name = name;
        return this;
    }
}
