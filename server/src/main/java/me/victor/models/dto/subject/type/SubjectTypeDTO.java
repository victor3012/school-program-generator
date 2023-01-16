package me.victor.models.dto.subject.type;

public class SubjectTypeDTO {
    private long id;
    private String name;

    public long getId() {
        return id;
    }

    public SubjectTypeDTO setId(long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public SubjectTypeDTO setName(String name) {
        this.name = name;
        return this;
    }
}
