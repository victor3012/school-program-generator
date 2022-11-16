package me.victor.services;

import me.victor.data.dao.RoomRepository;
import me.victor.data.dto.room.CreateRoomDTO;
import me.victor.data.entities.Room;
import me.victor.data.entities.School;
import me.victor.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getRoomsBySchoolId(long id) {
        return this.roomRepository.findBySchoolId(id);
    }

    public int getRoomsCountBySchoolId(long id) {
        return this.roomRepository.countBySchoolId(id);
    }

    public void createRoom(School school, CreateRoomDTO dto) {
        Room room = new Room()
                .setName(dto.getName())
                .setSchool(school);

        this.roomRepository.save(room);
    }
}
