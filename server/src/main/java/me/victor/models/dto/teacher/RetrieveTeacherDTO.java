package me.victor.models.dto.teacher;

public class RetrieveTeacherDTO extends CreateTeacherDTO {
    private long id;

    public long getId() {
        return id;
    }

    public RetrieveTeacherDTO setId(long id) {
        this.id = id;
        return this;
    }
}
