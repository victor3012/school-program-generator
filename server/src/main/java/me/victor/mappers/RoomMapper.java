package me.victor.mappers;

import me.victor.models.dto.room.RetrieveRoomDTO;
import me.victor.models.entities.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface RoomMapper {
    @Mapping(target = "roomType", expression = "java(room.getType() == null ? null : room.getType().getName())")
    RetrieveRoomDTO roomToDTO(Room room);

    List<RetrieveRoomDTO> roomsToDTOs(List<Room> rooms);
}
