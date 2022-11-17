package me.victor.api.rest.controllers;

import me.victor.data.dao.SchoolRepository;
import me.victor.data.dto.room.CreateRoomDTO;
import me.victor.data.dto.room.RetrieveRoomDTO;
import me.victor.data.entities.Room;
import me.victor.data.entities.School;
import me.victor.data.entities.User;
import me.victor.exceptions.ResourceNotFoundException;
import me.victor.services.RoomService;
import me.victor.services.SchoolService;
import me.victor.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/schools/{id}/rooms")
public class RoomController {
    private final UserService userService;
    private final SchoolService schoolService;
    private final RoomService roomService;

    public RoomController(UserService userService, SchoolService schoolService, RoomService roomService) {
        this.userService = userService;
        this.schoolService = schoolService;
        this.roomService = roomService;
    }

    @PostMapping
    public List<RetrieveRoomDTO> createRoom(WebRequest request, @PathVariable long id, @Valid @RequestBody CreateRoomDTO dto) {
        User user = this.userService.getUserByRequest(request);
        schoolService.ensureSystemAdministrator(id, user);

        School school = this.schoolService.getSchool(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid school"));

        this.roomService.createRoom(school, dto);

        return retrieveRooms(request, id);
    }

    @GetMapping
    public List<RetrieveRoomDTO> retrieveRooms(WebRequest request, @PathVariable long id) {
        User user = this.userService.getUserByRequest(request);
        schoolService.ensureTeacher(id, user);

        return roomService.getRoomsInSchool(id);
    }
}
