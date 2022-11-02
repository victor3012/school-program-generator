package me.victor.services;

import me.victor.data.dao.RoomRepository;
import me.victor.data.entities.Room;
import org.springframework.security.core.parameters.P;
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
}
