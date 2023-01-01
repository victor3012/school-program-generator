package me.victor.services;

import me.victor.data.dao.RequestRepository;
import me.victor.data.dto.request.CreateRequestDTO;
import me.victor.data.entities.Request;
import me.victor.data.entities.School;
import me.victor.data.entities.Teacher;
import me.victor.data.entities.User;
import me.victor.data.entities.enums.RequestStage;
import me.victor.data.entities.enums.TeacherRole;
import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;

@Service
public class RequestService {
    private final RequestRepository requestRepository;
    private final SchoolService schoolService;
    private final TeacherService teacherService;

    public RequestService(RequestRepository requestRepository, SchoolService schoolService,
                          TeacherService teacherService) {
        this.requestRepository = requestRepository;
        this.schoolService = schoolService;
        this.teacherService = teacherService;
    }


    public void submitRequest(Teacher requestedBy, CreateRequestDTO dto) {
        School school = requestedBy.getSchool();
        Teacher assignedTeacher = requestedBy;

        boolean greaterThanTeacher = this.schoolService.getHighestRolePower(requestedBy.getTeacherRoles()) >=
                TeacherRole.SYSTEM_ADMIN.getPower();

        if (greaterThanTeacher && dto.getAssignedTeacher() != 0) {
            assignedTeacher = this.teacherService.getTeacherInSchool(school.getId(), dto.getAssignedTeacher())
                    .orElseThrow(() -> new ResourceNotFoundException("There is no such a teacher in this school"));
        }

        int lessonIndex = dto.getLessonIndex();
        int maxLessonIndex = lessonIndex + dto.getLessonsCount();

        if (!dto.isFirstShift()) {
            maxLessonIndex += 7;
        }

        if (maxLessonIndex > 14) {
            throw new DataFormatException("Unable to book for this lessons");
        }

        DayOfWeek day = dto.getDate().getDayOfWeek();

        if (day.equals(DayOfWeek.SATURDAY) || day.equals(DayOfWeek.SUNDAY)) {
            throw new DataFormatException("Unable to book in weekends");
        }

        Request request = new Request()
                .setTitle(dto.getTitle())
                .setDate(dto.getDate())
                .setAssignedTeacher(assignedTeacher)
                .setRequestedBy(requestedBy)
                .setFirstShift(dto.isFirstShift())
                .setLessonIndex(dto.getLessonIndex())
                .setLessonsCount(dto.getLessonsCount())
                .setStage(RequestStage.PENDING);

        this.requestRepository.save(request);
    }
}
