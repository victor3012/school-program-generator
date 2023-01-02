package me.victor.services;

import me.victor.exceptions.DataFormatException;
import me.victor.models.entities.School;
import me.victor.models.entities.SubjectType;
import me.victor.repositories.SubjectTypeRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubjectTypeService {
    private final SubjectTypeRepository repository;

    public SubjectTypeService(SubjectTypeRepository repository) {
        this.repository = repository;
    }

    public Optional<SubjectType> getByName(String name, long id) {
        return this.repository.findByNameAndSchoolId(name, id);
    }

    public void createSubjectType(String name, School school) {
        if (getByName(name, school.getId()).isPresent()) {
            throw new DataFormatException("This subject type already exists");
        }

        this.repository.save((SubjectType) new SubjectType()
                .setSchool(school)
                .setName(name));
    }
}
