package me.victor.mappers;

import me.victor.models.dto.room.type.RoomTypeDTO;
import me.victor.models.entities.RoomType;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface RoomTypeMapper {
    RoomTypeDTO roomTypeToDTO(RoomType type);

    List<RoomTypeDTO> roomTypesToDTOs(List<RoomType> types);
}
