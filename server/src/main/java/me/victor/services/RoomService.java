package me.victor.services;

import me.victor.repositories.RoomRepository;
import me.victor.models.dto.room.CreateRoomDTO;
import me.victor.models.dto.room.RetrieveRoomDTO;
import me.victor.models.entities.Room;
import me.victor.models.entities.School;
import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getRoomsBySchoolId(long id) {
        return this.roomRepository.findBySchoolId(id);
    }

    public List<RetrieveRoomDTO> getRoomsInSchool(long id) {
        return getRoomsBySchoolId(id)
                .stream()
                .sorted()
                .map(x -> new RetrieveRoomDTO()
                        .setId(x.getId())
                        .setName(x.getName()))
                .collect(Collectors.toList());
    }

    public int getRoomsCountBySchoolId(long id) {
        return this.roomRepository.countBySchoolId(id);
    }

    public void createRoom(School school, CreateRoomDTO dto) {
        Optional<Room> retrievedRoom = getRoom(dto.getName(), school.getId());

        if (retrievedRoom.isPresent()) {
            throw new DataFormatException("A room with this name already exists");
        }

        Room room = (Room) new Room()
                .setSchool(school)
                .setName(dto.getName());

        this.roomRepository.save(room);
    }

    private Optional<Room> getRoom(String name, long schoolId) {
        return this.roomRepository.getByNameAndSchoolId(name ,schoolId);
    }

    public void updateRoom(School school, long roomId, CreateRoomDTO dto) {
        Room room = this.roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid room"));

        if (room.getSchool().getId() != school.getId()) {
            throw new DataFormatException("There is no such a room in this school");
        }

        Optional<Room> retrievedRoom = getRoom(dto.getName(), school.getId());

        if (retrievedRoom.isPresent()) {
            throw new DataFormatException("Such a room already exists");
        }

        room.setName(dto.getName());
        this.roomRepository.save(room);
    }
}
