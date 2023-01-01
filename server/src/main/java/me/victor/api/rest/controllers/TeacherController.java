package me.victor.api.rest.controllers;

import me.victor.models.dto.teacher.CreateTeacherDTO;
import me.victor.models.dto.teacher.RetrieveTeacherDTO;
import me.victor.models.entities.School;
import me.victor.models.entities.User;
import me.victor.exceptions.ResourceNotFoundException;
import me.victor.services.SchoolService;
import me.victor.services.TeacherService;
import me.victor.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/schools/{id}/teachers")
public class TeacherController {
    private final UserService userService;
    private final SchoolService schoolService;
    private final TeacherService teacherService;

    public TeacherController(UserService userService, SchoolService schoolService, TeacherService teacherService) {
        this.userService = userService;
        this.schoolService = schoolService;
        this.teacherService = teacherService;
    }

    @PostMapping
    public List<RetrieveTeacherDTO> createTeacher(WebRequest request, @PathVariable long id,
                                                  @Valid @RequestBody CreateTeacherDTO dto) {
        User user = this.userService.getUserByRequest(request);

        this.schoolService.ensurePower(id, user,
                "You need to have higher role to assign this role", dto.getRole());

        School school = this.schoolService.getSchool(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid school"));

        this.teacherService.createTeacher(school, dto);

        return retrieveTeachers(request, id);
    }

    @PutMapping("/{teacherId}")
    public List<RetrieveTeacherDTO> updateTeacher(WebRequest request, @PathVariable long id, @PathVariable long teacherId,
                                                  @Valid @RequestBody CreateTeacherDTO dto) {
        User user = this.userService.getUserByRequest(request);

        this.schoolService.ensurePower(id, user,
                "You need to have higher role to adjust this user", dto.getRole().getPower() + 1);

        School school = this.schoolService.getSchool(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid school"));

        this.teacherService.updateTeacher(school, dto, teacherId);

        return retrieveTeachers(request, id);
    }

    @GetMapping
    public List<RetrieveTeacherDTO> retrieveTeachers(WebRequest request, @PathVariable long id) {

        User user = this.userService.getUserByRequest(request);
        this.schoolService.ensureTeacher(id, user);

        return this.teacherService.getTeachersInSchool(id);
    }
}
