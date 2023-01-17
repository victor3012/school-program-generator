package me.victor.api.rest.controllers;

import me.victor.exceptions.ResourceNotFoundException;
import me.victor.models.dto.group.CreateGroupDTO;
import me.victor.models.dto.group.GroupDTO;
import me.victor.models.entities.School;
import me.victor.models.entities.User;
import me.victor.services.GroupService;
import me.victor.services.SchoolService;
import me.victor.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/schools/{id}/groups")
public class GroupController {
    private final GroupService service;
    private final SchoolService schoolService;
    private final UserService userService;

    public GroupController(GroupService service, SchoolService schoolService, UserService userService) {
        this.service = service;
        this.schoolService = schoolService;
        this.userService = userService;
    }

    @PostMapping
    public List<GroupDTO> createGroup(WebRequest request, @PathVariable long id, @Valid @RequestBody CreateGroupDTO dto) {
        User user = this.userService.getUserByRequest(request);
        this.schoolService.ensureSystemAdmin(id, user);

        School school = this.schoolService.getSchool(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid school"));

        this.service.createGroup(school, dto);

        return getGroups(request, id);
    }

    @PutMapping
    public List<GroupDTO> createGroup(WebRequest request, @PathVariable long id, @Valid @RequestBody GroupDTO dto) {
        User user = this.userService.getUserByRequest(request);
        this.schoolService.ensureSystemAdmin(id, user);

        School school = this.schoolService.getSchool(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid school"));

        this.service.updateGroup(school, dto);

        return getGroups(request, id);
    }

    @GetMapping
    public List<GroupDTO> getGroups(WebRequest request, @PathVariable long id) {
        User user = this.userService.getUserByRequest(request);
        this.schoolService.ensureSystemAdmin(id, user);

        School school = this.schoolService.getSchool(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid school"));

        return this.service.getGroups(school);
    }
}
