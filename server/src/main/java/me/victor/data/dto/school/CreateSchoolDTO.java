package me.victor.data.dto.school;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CreateSchoolDTO {
    @NotNull
    @Size(max = 255)
    private String name;

    public String getName() {
        return name;
    }

    public CreateSchoolDTO setName(String name) {
        this.name = name;
        return this;
    }
}
