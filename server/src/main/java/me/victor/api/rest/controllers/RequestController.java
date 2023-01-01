package me.victor.api.rest.controllers;

import me.victor.data.dto.request.CreateRequestDTO;
import me.victor.data.entities.Teacher;
import me.victor.data.entities.User;
import me.victor.services.RequestService;
import me.victor.services.SchoolService;
import me.victor.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

@RestController
@CrossOrigin
@RequestMapping("api/schools/{id}/requests")
public class RequestController {
    private final UserService userService;
    private final SchoolService schoolService;
    private final RequestService requestService;

    public RequestController(UserService userService, SchoolService schoolService,
                             RequestService requestService) {
        this.userService = userService;
        this.schoolService = schoolService;
        this.requestService = requestService;
    }

    @PostMapping
    public void createRequest(WebRequest request, @PathVariable long id, CreateRequestDTO dto) {
        User user = this.userService.getUserByRequest(request);
        Teacher teacher = this.schoolService.ensureTeacher(id, user);

        this.requestService.submitRequest(teacher, dto);
    }
}
