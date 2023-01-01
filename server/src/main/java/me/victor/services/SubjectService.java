package me.victor.services;

import me.victor.repositories.SubjectRepository;
import me.victor.models.dto.subject.CreateSubjectDTO;
import me.victor.models.dto.subject.RetrieveSubjectDTO;
import me.victor.models.entities.School;
import me.victor.models.entities.Subject;
import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public int getSubjectsCountBySchoolId(long id) {
        return this.subjectRepository.countBySchoolId(id);
    }

    public void createSubject(School school, CreateSubjectDTO dto) {
        Optional<Subject> retrievedSubject = getSubjectByNameAndSchoolId(dto.getName(), school.getId());

        if (retrievedSubject.isPresent()) {
            throw new DataFormatException("Subject with this name already exists");
        }

        Subject subject = new Subject()
                .setName(dto.getName())
                .setSchool(school);

        this.subjectRepository.save(subject);
    }

    public void updateSubject(School school, CreateSubjectDTO dto, long subjectId) {
        Optional<Subject> retrievedSubject = getSubjectByNameAndSchoolId(dto.getName(), school.getId());

        if (retrievedSubject.isPresent()) {
            throw new DataFormatException("Subject with this name already exists");
        }

        Subject subject = this.subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid subject"))
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
        return getSubjectsBySchoolId(schoolId)
                .stream()
                .map(x -> (RetrieveSubjectDTO) new RetrieveSubjectDTO()
                        .setId(x.getId())
                        .setName(x.getName()))
                .sorted(Comparator.comparing(CreateSubjectDTO::getName))
                .collect(Collectors.toList());
    }
}
