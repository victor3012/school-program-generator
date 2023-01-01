package me.victor.models.dto.request;

import javax.validation.constraints.*;
import java.time.LocalDate;

public class CreateRequestDTO {
    @NotNull(message = "Title is not present")
    @NotBlank(message = "Title cannot be empty")
    private String title;

    @PositiveOrZero(message = "Teacher does not exist")
    private long assignedTeacher;

    @NotNull(message = "Invalid date specified")
    private LocalDate date;

    private boolean isFirstShift;

    @Positive(message = "Invalid lesson index")
    private int lessonIndex;

    @Positive(message = "Invalid lesson count")
    private int lessonsCount;

    public String getTitle() {
        return title;
    }

    public CreateRequestDTO setTitle(String title) {
        this.title = title;
        return this;
    }

    public long getAssignedTeacher() {
        return assignedTeacher;
    }

    public CreateRequestDTO setAssignedTeacher(long assignedTeacher) {
        this.assignedTeacher = assignedTeacher;
        return this;
    }

    public LocalDate getDate() {
        return date;
    }

    public CreateRequestDTO setDate(LocalDate date) {
        this.date = date;
        return this;
    }

    public boolean isFirstShift() {
        return isFirstShift;
    }

    public CreateRequestDTO setFirstShift(boolean firstShift) {
        isFirstShift = firstShift;
        return this;
    }

    public int getLessonIndex() {
        return lessonIndex;
    }

    public CreateRequestDTO setLessonIndex(int lessonIndex) {
        this.lessonIndex = lessonIndex;
        return this;
    }

    public int getLessonsCount() {
        return lessonsCount;
    }

    public CreateRequestDTO setLessonsCount(int lessonsCount) {
        this.lessonsCount = lessonsCount;
        return this;
    }
}
