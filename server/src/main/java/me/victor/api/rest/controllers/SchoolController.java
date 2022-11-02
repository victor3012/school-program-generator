package me.victor.api.rest.controllers;

import me.victor.data.dto.school.AggregatedSchoolDTO;
import me.victor.data.dto.school.CreateSchoolDTO;
import me.victor.data.dto.school.ExtendedAggregatedSchoolDTO;
import me.victor.data.entities.School;
import me.victor.data.entities.User;
import me.victor.exceptions.DataFormatException;
import me.victor.services.SchoolService;
import me.victor.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/schools")
public class SchoolController {
    private final UserService userService;
    private final SchoolService schoolService;

    public SchoolController(UserService userService, SchoolService schoolService) {
        this.userService = userService;
        this.schoolService = schoolService;
    }

    @PostMapping
    public School postSchool(WebRequest request, @Valid @RequestBody CreateSchoolDTO dto) {
        User user = this.userService.getUserByRequest(request);

        this.schoolService.createSchool(dto, user);

        return this.schoolService.getSchoolByName(dto.getName()).get();
    }

    @GetMapping
    public List<AggregatedSchoolDTO> getSchools(WebRequest request) {
        User user = this.userService.getUserByRequest(request);

        return this.schoolService.getUserSchools(user);
    }

    @GetMapping("/{id}")
    public ExtendedAggregatedSchoolDTO getSchool(WebRequest request, @PathVariable String id) {
        long idLong;

        try {
            idLong = Long.parseLong(id);
        } catch (Exception ex) {
            throw new DataFormatException("Invalid school id");
        }

        User user = this.userService.getUserByRequest(request);

        return this.schoolService.getSchoolAggregatedInformation(idLong, user);
    }
}
