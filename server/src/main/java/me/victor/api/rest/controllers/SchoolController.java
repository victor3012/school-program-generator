package me.victor.api.rest.controllers;

import me.victor.data.dto.school.AggregatedSchoolDTO;
import me.victor.data.dto.school.CreateSchoolDTO;
import me.victor.data.dto.school.ExtendedAggregatedSchoolDTO;
import me.victor.data.dto.school.UpdateSchoolDTO;
import me.victor.data.entities.School;
import me.victor.data.entities.User;
import me.victor.services.SchoolService;
import me.victor.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/schools")
public class SchoolController {
    private final UserService userService;
    private final SchoolService schoolService;

    public SchoolController(UserService userService, SchoolService schoolService) {
        this.userService = userService;
        this.schoolService = schoolService;
    }

    @PostMapping
    public ExtendedAggregatedSchoolDTO postSchool(WebRequest request, @Valid @RequestBody CreateSchoolDTO dto) {
        User user = this.userService.getUserByRequest(request);

        this.schoolService.createSchool(dto, user);

        return this.schoolService.getSchoolAggregatedInformation(
                this.schoolService.getSchoolByName(dto.getName()).get().getId(), user);
    }

    @PutMapping("/{id}")
    public ExtendedAggregatedSchoolDTO updateSchool(WebRequest request, @PathVariable long id, @Valid @RequestBody UpdateSchoolDTO dto) {
        User user = this.userService.getUserByRequest(request);
        School school = this.schoolService.updateSchool(id, dto, user);
        return this.schoolService.getSchoolAggregatedInformation(school);
    }

    @GetMapping
    public List<AggregatedSchoolDTO> getSchools(WebRequest request) {
        User user = this.userService.getUserByRequest(request);

        return this.schoolService.getUserSchools(user);
    }

    @GetMapping("/{id}")
    public ExtendedAggregatedSchoolDTO getSchool(WebRequest request, @PathVariable long id) {
        User user = this.userService.getUserByRequest(request);
        this.schoolService.ensureTeacher(id, user);

        return this.schoolService.getSchoolAggregatedInformation(id, user);
    }
}
