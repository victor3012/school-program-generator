package me.victor.api.rest.controllers;

import me.victor.data.dto.room.CreateRoomDTO;
import me.victor.data.dto.room.RetrieveRoomDTO;
import me.victor.data.dto.subject.CreateSubjectDTO;
import me.victor.data.dto.subject.RetrieveSubjectDTO;
import me.victor.data.entities.School;
import me.victor.data.entities.User;
import me.victor.exceptions.ResourceNotFoundException;
import me.victor.services.RoomService;
import me.victor.services.SchoolService;
import me.victor.services.SubjectService;
import me.victor.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/schools/{id}/subjects")
public class SubjectController {
    private final UserService userService;
    private final SchoolService schoolService;
    private final SubjectService subjectService;

    public SubjectController(UserService userService, SchoolService schoolService, SubjectService subjectService) {
        this.userService = userService;
        this.schoolService = schoolService;
        this.subjectService = subjectService;
    }

    @PostMapping
    public List<RetrieveSubjectDTO> createRoom(WebRequest request, @PathVariable long id, @Valid @RequestBody CreateSubjectDTO dto) {
        User user = this.userService.getUserByRequest(request);
        schoolService.ensureSystemAdmin(id, user);

        School school = this.schoolService.getSchool(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid school"));

        this.subjectService.createSubject(school, dto);

        return retrieveRooms(request, id);
    }

    @GetMapping
    public List<RetrieveSubjectDTO> retrieveRooms(WebRequest request, @PathVariable long id) {
        User user = this.userService.getUserByRequest(request);
        schoolService.ensureTeacher(id, user);

        return this.subjectService.getSubjectsInSchool(id);
    }
}
