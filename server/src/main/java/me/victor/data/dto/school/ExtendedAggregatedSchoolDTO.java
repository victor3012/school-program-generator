package me.victor.data.dto.school;

public class ExtendedAggregatedSchoolDTO extends AggregatedSchoolDTO {
    private int subjectsCount;

    public int getSubjectsCount() {
        return subjectsCount;
    }

    public ExtendedAggregatedSchoolDTO setSubjectsCount(int subjectsCount) {
        this.subjectsCount = subjectsCount;
        return this;
    }
}
