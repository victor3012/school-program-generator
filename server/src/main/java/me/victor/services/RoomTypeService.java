package me.victor.services;

import me.victor.exceptions.DataFormatException;
import me.victor.mappers.RoomTypeMapper;
import me.victor.models.dto.room.type.RoomTypeDTO;
import me.victor.models.entities.RoomType;
import me.victor.models.entities.School;
import me.victor.repositories.RoomTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomTypeService {
    private final RoomTypeRepository repository;
    private final RoomTypeMapper mapper;

    public RoomTypeService(RoomTypeRepository repository, RoomTypeMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public Optional<RoomType> getByName(String name, long schoolId) {
        return this.repository.findByNameAndSchoolId(name, schoolId);
    }

    public void createRoomType(String name, School school) {
        if (getByName(name, school.getId()).isPresent()) {
            throw new DataFormatException("This room type already exists");
        }

        this.repository.save((RoomType) new RoomType()
                .setSchool(school)
                .setName(name));
    }

    public List<RoomTypeDTO> getRoomTypes(School school) {
        return mapper.roomTypesToDTOs(this.repository.getBySchoolId(school.getId()));
    }
}
