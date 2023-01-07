package me.victor.services;

import me.victor.mappers.TeacherMapper;
import me.victor.repositories.TeacherRepository;
import me.victor.models.dto.teacher.CreateTeacherDTO;
import me.victor.models.dto.teacher.RetrieveTeacherDTO;
import me.victor.models.entities.School;
import me.victor.models.entities.Teacher;
import me.victor.models.entities.enums.TeacherRole;
import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final TeacherMapper mapper;

    public TeacherService(TeacherRepository teacherRepository, TeacherMapper mapper) {
        this.teacherRepository = teacherRepository;
        this.mapper = mapper;
    }

    public List<Teacher> getTeachers(String email) {
        return this.teacherRepository.findByEmail(email);
    }

    public List<Teacher> getTeachersBySchoolId(long id) {
        return this.teacherRepository.findBySchoolId(id);
    }

    public int getTeachersCountBySchoolId(long id) {
        return this.teacherRepository.countBySchoolId(id);
    }

    public boolean isTeacherInSchool(long schoolId, String email) {
        return this.teacherRepository.existsBySchoolIdAndEmail(schoolId, email);
    }

    public void save(Teacher teacher) {
        this.teacherRepository.save(teacher);
    }

    public Optional<Teacher> getTeacherInSchool(long schoolId, String email) {
        return this.teacherRepository.findByEmailAndSchoolId(email, schoolId);
    }

    public Optional<Teacher> getTeacherInSchool(long schoolId, long teacherId) {
        return this.teacherRepository.findByIdAndSchoolId(teacherId, schoolId);
    }

    public void saveAll(List<Teacher> teachers) {
        this.teacherRepository.saveAll(teachers);
    }

    public void createTeacher(School school, CreateTeacherDTO dto) {
        Optional<Teacher> retrievedTeacher = getTeacherInSchool(school.getId(), dto.getEmail());

        if (retrievedTeacher.isPresent()) {
            throw new DataFormatException("A teacher with this email already exists");
        }

        Teacher teacher = mapper.dtoToTeacher(dto)
                .setSchool(school);

        this.teacherRepository.save(teacher);
    }

    public void updateTeacher(School school, CreateTeacherDTO dto, long teacherId) {
        Optional<Teacher> retrievedTeacher = getTeacherInSchool(school.getId(), dto.getEmail());

        Teacher currentTeacher = this.teacherRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid teacher"));

        if (retrievedTeacher.isPresent() && retrievedTeacher.get().getId() != teacherId) {
            throw new DataFormatException("A teacher with this email already exists");
        }

        long id = currentTeacher.getId();
        currentTeacher = mapper.dtoToTeacher(dto);
        currentTeacher.setId(id);
        currentTeacher.setSchool(school);

        this.teacherRepository.save(currentTeacher);
    }

    public List<RetrieveTeacherDTO> getTeachersInSchool(long schoolId) {
        return getTeachersBySchoolId(schoolId)
                .stream()
                .map(this::getDTOFromTeacher)
                .sorted((x, y) -> {
                    int powerDifference = y.getRole().getPower() - x.getRole().getPower();

                    if (powerDifference != 0) {
                        return powerDifference;
                    }

                    int firstNameResult = x.getFirstName().compareTo(y.getFirstName());

                    if (firstNameResult != 0) {
                        return firstNameResult;
                    }

                    return x.getLastName().compareTo(y.getLastName());
                }).collect(Collectors.toList());
    }

    private TeacherRole getBiggestRole(Teacher teacher) {
        return teacher.getTeacherRoles()
                .stream()
                .max(Comparator.comparingInt(TeacherRole::getPower))
                .orElse(TeacherRole.TEACHER);
    }

    public RetrieveTeacherDTO getDTOFromTeacher(Teacher teacher) {
        return (RetrieveTeacherDTO) new RetrieveTeacherDTO()
                .setId(teacher.getId())
                .setEmail(teacher.getEmail())
                .setFirstName(teacher.getFirstName())
                .setLastName(teacher.getLastName())
                .setRole(getBiggestRole(teacher));
    }
}
