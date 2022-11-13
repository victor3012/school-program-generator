package me.victor.data.dto.school;

public class UpdateSchoolDTO {
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
