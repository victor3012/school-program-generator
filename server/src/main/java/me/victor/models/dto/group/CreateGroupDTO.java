package me.victor.models.dto.group;

public class CreateGroupDTO {
    private String name;

    public String getName() {
        return name;
    }

    public CreateGroupDTO setName(String name) {
        this.name = name;
        return this;
    }
}
