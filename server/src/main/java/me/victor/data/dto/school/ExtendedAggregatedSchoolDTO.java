package me.victor.data.dto.school;

import me.victor.data.dto.teacher.RetrieveTeacherDTO;

public class ExtendedAggregatedSchoolDTO extends AggregatedSchoolDTO {
    private int subjectsCount;
    private RetrieveTeacherDTO teacher;

    public int getSubjectsCount() {
        return subjectsCount;
    }

    public ExtendedAggregatedSchoolDTO setSubjectsCount(int subjectsCount) {
        this.subjectsCount = subjectsCount;
        return this;
    }

    public RetrieveTeacherDTO getTeacher() {
        return teacher;
    }

    public ExtendedAggregatedSchoolDTO setTeacher(RetrieveTeacherDTO teacher) {
        this.teacher = teacher;
        return this;
    }
}
