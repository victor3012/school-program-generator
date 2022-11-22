package me.victor.data.dto.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.DayOfWeek;
import java.time.LocalDate;

public class RequestDTO {
    @NotNull(message = "Invalid title")
    @NotEmpty(message = "Invalid title")
    private String title;
    @NotNull(message = "Invalid date")
    private LocalDate date;
    private long roomId;
    private long teacherId;
    @NotNull(message = "Invalid class group")
    @NotEmpty(message = "Invalid class group")
    private String classGroup;
    @NotNull(message =  "Invalid week day")
    private DayOfWeek weekDay;
    @Positive(message = "Invalid lesson index")
    private int lessonIndex;
    private boolean isFirstShift;
}
