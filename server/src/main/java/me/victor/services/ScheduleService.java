package me.victor.services;

import me.victor.models.entities.*;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {
    public ScheduleService() {

    }

    private Lesson[][][] getGroupLessons(Schedule schedule, Group group) {
        List<Lesson> lessons = schedule.getLessons()
                .stream()
                .filter(x -> x.getClassGroups().contains(group))
                .collect(Collectors.toList());

        return groupLessons(lessons);
    }

    private Lesson[][][] getTeacherLessons(Schedule schedule, Teacher teacher) {
        List<Lesson> lessons = schedule.getLessons()
                .stream()
                .filter(x -> x.getTeacher().getId() == teacher.getId())
                .collect(Collectors.toList());

        return groupLessons(lessons);
    }

    private Lesson[][][] getRoomLessons(Schedule schedule, Room room) {
        List<Lesson> lessons = schedule.getLessons()
                .stream()
                .filter(x -> x.getRoom().getId() == room.getId())
                .collect(Collectors.toList());

        return groupLessons(lessons);
    }

    private Lesson[][][] groupLessons(List<Lesson> lessons) {
        Lesson[][][] grouped = new Lesson[5][14][];

        for (int i = 0; i < grouped.length; i++) {
            DayOfWeek day = DayOfWeek.of(i + 1);

            List<Lesson> dailyLessons = lessons
                    .stream()
                    .filter(x -> x.getDayOfWeek() == day)
                    .collect(Collectors.toList());

            for (int j = 0; j < grouped[i].length; j++) {
                final int currentLessonIndex = j;

                Lesson[] currentLessons = dailyLessons
                        .stream()
                        .filter(x -> {
                            int lessonIndex = x.getLessonIndex();

                            if (!x.isFirstShift())
                                lessonIndex += 7;

                            return lessonIndex == currentLessonIndex;
                        }).toArray(Lesson[]::new);

                grouped[i][j] = currentLessons;
            }
        }

        return grouped;
    }
}
