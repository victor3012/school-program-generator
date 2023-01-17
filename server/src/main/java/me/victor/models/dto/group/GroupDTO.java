package me.victor.models.dto.group;

public class GroupDTO extends CreateGroupDTO {
    private long id;

    public long getId() {
        return id;
    }

    public GroupDTO setId(long id) {
        this.id = id;
        return this;
    }
}
