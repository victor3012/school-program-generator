package me.victor.services;

import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.ResourceNotFoundException;
import me.victor.mappers.SubjectMapper;
import me.victor.models.dto.subject.CreateSubjectDTO;
import me.victor.models.dto.subject.RetrieveSubjectDTO;
import me.victor.models.entities.School;
import me.victor.models.entities.Subject;
import me.victor.models.entities.SubjectType;
import me.victor.repositories.SubjectRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final RoomTypeService roomTypeService;
    private final SubjectTypeService subjectTypeService;
    private final SubjectMapper mapper;

    public SubjectService(SubjectRepository subjectRepository, RoomTypeService roomTypeService,
                          SubjectTypeService subjectTypeService, SubjectMapper mapper) {
        this.subjectRepository = subjectRepository;
        this.roomTypeService = roomTypeService;
        this.subjectTypeService = subjectTypeService;
        this.mapper = mapper;
    }

    public int getSubjectsCountBySchoolId(long id) {
        return this.subjectRepository.countBySchoolId(id);
    }

    public void createSubject(School school, CreateSubjectDTO dto) {
        Optional<Subject> retrievedSubject = getSubjectByNameAndSchoolId(dto.getName(), school.getId());

        if (retrievedSubject.isPresent()) {
            throw new DataFormatException("Subject with this name already exists");
        }

        Subject subject = (Subject) new Subject()
                .setSchool(school)
                .setRoomType(this.roomTypeService.getByName(dto.getRoomType(), school.getId()).orElse(null))
                .setType(getSubjectTypeByName(dto.getType(), school))
                .setName(dto.getName());

        this.subjectRepository.save(subject);
    }

    public void updateSubject(School school, CreateSubjectDTO dto, long subjectId) {
        Optional<Subject> retrievedSubject = getSubjectByNameAndSchoolId(dto.getName(), school.getId());

        if (retrievedSubject.isPresent()) {
            throw new DataFormatException("Subject with this name already exists");
        }

        Subject subject = (Subject) this.subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid subject"))
                .setRoomType(this.roomTypeService.getByName(dto.getRoomType(), school.getId()).orElse(null))
                .setType(getSubjectTypeByName(dto.getType(), school))
                .setName(dto.getName());

        this.subjectRepository.save(subject);
    }

    private Optional<Subject> getSubjectByNameAndSchoolId(String name, long schoolId) {
        return this.subjectRepository.findByNameAndSchoolId(name, schoolId);
    }

    public List<Subject> getSubjectsBySchoolId(long schoolId) {
        return this.subjectRepository.findBySchoolId(schoolId);
    }

    public List<RetrieveSubjectDTO> getSubjectsInSchool(long schoolId) {
        return mapper.subjectsToDTOs(getSubjectsBySchoolId(schoolId)
                .stream()
                .sorted(Comparator.comparing(Subject::getName))
                .collect(Collectors.toList()));
    }

    public RetrieveSubjectDTO getSubjectInSchool(long subjectId, long schoolId) {
        return mapper.subjectToDTO(this.subjectRepository
                .findByIdAndSchoolId(subjectId, schoolId)
                .orElseThrow(() -> new IllegalArgumentException("This subject doesn't exist")));
    }

    public void deleteSubject(long subjectId, long schoolId) {
        this.subjectRepository.deleteByIdAndSchoolId(subjectId, schoolId);
    }

    private SubjectType getSubjectTypeByName(String name, School school) {
        SubjectType type = null;

        if (name != null && !name.isBlank()) {
            Optional<SubjectType> subjectType = this.subjectTypeService.getByName(name, school.getId());

            if (subjectType.isEmpty()) {
                this.subjectTypeService.createSubjectType(name, school);
                subjectType = this.subjectTypeService.getByName(name, school.getId());
            }

            type = subjectType.orElse(null);
        }
        return type;
    }
}
