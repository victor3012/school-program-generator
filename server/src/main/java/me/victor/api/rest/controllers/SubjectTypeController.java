package me.victor.api.rest.controllers;

import me.victor.exceptions.ResourceNotFoundException;
import me.victor.models.dto.subject.type.SubjectTypeDTO;
import me.victor.models.entities.School;
import me.victor.models.entities.User;
import me.victor.services.SchoolService;
import me.victor.services.SubjectTypeService;
import me.victor.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/schools/{id}/subjectTypes")
public class SubjectTypeController {
    private final SubjectTypeService service;
    private final SchoolService schoolService;
    private final UserService userService;

    public SubjectTypeController(SubjectTypeService service, SchoolService schoolService, UserService userService) {
        this.service = service;
        this.schoolService = schoolService;
        this.userService = userService;
    }

    @GetMapping
    public List<SubjectTypeDTO> getSubjectTypes(WebRequest request, @PathVariable long id) {
        User user = this.userService.getUserByRequest(request);
        this.schoolService.ensureSystemAdmin(id, user);

        School school = this.schoolService.getSchool(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid school"));

        return this.service.getSubjectTypes(school);

    }
}