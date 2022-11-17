package me.victor.data.dto.subject;

public class RetrieveSubjectDTO extends CreateSubjectDTO {
    private long id;

    public long getId() {
        return id;
    }

    public RetrieveSubjectDTO setId(long id) {
        this.id = id;
        return this;
    }
}
