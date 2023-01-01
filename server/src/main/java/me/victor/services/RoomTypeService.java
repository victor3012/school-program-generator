package me.victor.services;

import me.victor.exceptions.DataFormatException;
import me.victor.models.entities.RoomType;
import me.victor.models.entities.School;
import me.victor.repositories.RoomTypeRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoomTypeService {
    private final RoomTypeRepository repository;

    public RoomTypeService(RoomTypeRepository repository) {
        this.repository = repository;
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
}
