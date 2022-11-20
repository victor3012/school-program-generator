package me.victor.services;

import me.victor.data.dao.TeacherRepository;
import me.victor.data.dto.room.RetrieveRoomDTO;
import me.victor.data.dto.teacher.CreateTeacherDTO;
import me.victor.data.dto.teacher.RetrieveTeacherDTO;
import me.victor.data.entities.School;
import me.victor.data.entities.Teacher;
import me.victor.data.entities.TeacherRole;
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

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
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

    public void saveAll(List<Teacher> teachers) {
        this.teacherRepository.saveAll(teachers);
    }

    public void createTeacher(School school, CreateTeacherDTO dto) {
        Optional<Teacher> retrievedTeacher = getTeacherInSchool(school.getId(), dto.getEmail());

        if (retrievedTeacher.isPresent()) {
            throw new DataFormatException("A teacher with this email already exists");
        }

        Teacher teacher = new Teacher()
                .setSchool(school)
                .setFirstName(dto.getFirstName())
                .setLastName(dto.getLastName())
                .setEmail(dto.getEmail())
                .setTeacherRoles(List.of(dto.getRole()));

        this.teacherRepository.save(teacher);
    }

    public void updateTeacher(School school, CreateTeacherDTO dto, long teacherId) {
        Optional<Teacher> retrievedTeacher = getTeacherInSchool(school.getId(), dto.getEmail());

        Teacher currentTeacher = this.teacherRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid teacher"));

        if (retrievedTeacher.isPresent() && retrievedTeacher.get().getId() != teacherId) {
            throw new DataFormatException("A teacher with this email already exists");
        }

        List<TeacherRole> roles = new ArrayList<>();
        roles.add(dto.getRole());

        currentTeacher
                .setFirstName(dto.getFirstName())
                .setLastName(dto.getLastName())
                .setEmail(dto.getEmail())
                .setTeacherRoles(roles);

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
