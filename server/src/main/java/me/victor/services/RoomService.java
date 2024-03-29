package me.victor.services;

import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.ResourceNotFoundException;
import me.victor.mappers.RoomMapper;
import me.victor.models.dto.room.CreateRoomDTO;
import me.victor.models.dto.room.RetrieveRoomDTO;
import me.victor.models.entities.Room;
import me.victor.models.entities.RoomType;
import me.victor.models.entities.School;
import me.victor.repositories.RoomRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomTypeService roomTypeService;
    private final RoomMapper mapper;

    public RoomService(RoomRepository roomRepository, RoomTypeService roomTypeService, RoomMapper mapper) {
        this.roomRepository = roomRepository;
        this.roomTypeService = roomTypeService;
        this.mapper = mapper;
    }

    public List<Room> getRoomsBySchoolId(long id) {
        return this.roomRepository.findBySchoolId(id);
    }

    public List<RetrieveRoomDTO> getRoomsInSchool(long id) {
        return mapper.roomsToDTOs(getRoomsBySchoolId(id)
                .stream()
                .sorted()
                .collect(Collectors.toList()));
    }

    public RetrieveRoomDTO getRoomInSchool(long roomId, long schoolId) {
        return mapper.roomToDTO(this.roomRepository
                .findByIdAndSchoolId(roomId, schoolId)
                .orElseThrow(() -> new IllegalArgumentException("This room doesn't exist")));
    }

    public void deleteRoom(long roomId, long schoolId) {
        this.roomRepository.deleteByIdAndSchoolId(roomId, schoolId);
    }

    public int getRoomsCountBySchoolId(long id) {
        return this.roomRepository.countBySchoolId(id);
    }

    public void createRoom(School school, CreateRoomDTO dto) {
        Optional<Room> retrievedRoom = getRoom(dto.getName(), school.getId());

        if (retrievedRoom.isPresent()) {
            throw new DataFormatException("A room with this name already exists");
        }

        RoomType type = getRoomType(dto, school);

        Room room = (Room) new Room()
                .setSchool(school)
                .setType(type)
                .setName(dto.getName());

        this.roomRepository.save(room);
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
        room.setType(getRoomType(dto, school));
        this.roomRepository.save(room);
    }

    private Optional<Room> getRoom(String name, long schoolId) {
        return this.roomRepository.getByNameAndSchoolId(name, schoolId);
    }

    private RoomType getRoomType(CreateRoomDTO dto, School school) {
        RoomType type = null;

        if (dto.getType() != null && !dto.getType().isBlank()) {
            Optional<RoomType> roomType = this.roomTypeService.getByName(dto.getType(), school.getId());

            if (roomType.isEmpty()) {
                this.roomTypeService.createRoomType(dto.getType(), school);
                roomType = this.roomTypeService.getByName(dto.getType(), school.getId());
            }

            type = roomType.orElse(null);
        }
        return type;
    }
}
