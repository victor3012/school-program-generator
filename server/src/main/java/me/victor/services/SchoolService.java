package me.victor.services;

import me.victor.data.dao.SchoolRepository;
import me.victor.data.dao.UserRepository;
import me.victor.data.dto.school.AggregatedSchoolDTO;
import me.victor.data.dto.school.CreateSchoolDTO;
import me.victor.data.dto.school.ExtendedAggregatedSchoolDTO;
import me.victor.data.dto.school.UpdateSchoolDTO;
import me.victor.data.entities.School;
import me.victor.data.entities.Teacher;
import me.victor.data.entities.TeacherRole;
import me.victor.data.entities.User;
import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.InsufficientPermissionsException;
import me.victor.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SchoolService {
    private final SchoolRepository schoolRepository;
    private final TeacherService teacherService;
    private final RoomService roomService;
    private final SubjectService subjectService;
    private final UserRepository userRepository;

    public SchoolService(SchoolRepository schoolRepository, TeacherService teacherService, RoomService roomService,
                         SubjectService subjectService, UserRepository userRepository) {
        this.schoolRepository = schoolRepository;
        this.teacherService = teacherService;
        this.roomService = roomService;
        this.subjectService = subjectService;
        this.userRepository = userRepository;
    }

    public void createSchool(CreateSchoolDTO dto, User user) {
        String name = dto.getName();

        if (this.schoolRepository.findByName(name).isPresent()) {
            throw new DataFormatException("A school with this name already exists");
        }

        School school = new School()
                .setName(name)
                .setBoss(user);

        Teacher teacher = new Teacher()
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setEmail(user.getEmail())
                .setTeacherRoles(List.of(TeacherRole.DIRECTOR, TeacherRole.SYSTEM_ADMINISTRATOR));

        teacher.setSchool(school);

        this.schoolRepository.save(school);
        this.teacherService.save(teacher);
    }

    public Optional<School> getSchoolByName(String name) {
        return this.schoolRepository.findByName(name);
    }


    public List<AggregatedSchoolDTO> getUserSchools(User user) {
        return getSchoolsAssociatedWith(user)
                .stream()
                .map(x -> {
                    return new AggregatedSchoolDTO()
                            .setId(x.getId())
                            .setName(x.getName())
                            .setTeachersCount(this.teacherService.getTeachersCountBySchoolId(x.getId()))
                            .setRoomsCount(this.roomService.getRoomsCountBySchoolId(x.getId()));
                })
                .collect(Collectors.toList());
    }

    public ExtendedAggregatedSchoolDTO getSchoolAggregatedInformation(long schoolId, User user) {
        ensureTeacher(schoolId, user);

        School school = this.schoolRepository.findById(schoolId)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

        return getSchoolAggregatedInformation(school);
    }

    public ExtendedAggregatedSchoolDTO getSchoolAggregatedInformation(School school) {
        return (ExtendedAggregatedSchoolDTO) new ExtendedAggregatedSchoolDTO()
                .setSubjectsCount(this.subjectService.getSubjectsCountBySchoolId(school.getId()))
                .setId(school.getId())
                .setName(school.getName())
                .setTeachersCount(this.teacherService.getTeachersCountBySchoolId(school.getId()))
                .setRoomsCount(this.roomService.getRoomsCountBySchoolId(school.getId()));
    }

    private List<School> getSchoolsAssociatedWith(User user) {
        String email = user.getEmail();

        List<Teacher> teachers = this.teacherService.getTeachers(email);

        return teachers.isEmpty()
                ? new ArrayList<>()
                : teachers.stream()
                .map(Teacher::getSchool)
                .collect(Collectors.toList());
    }

    public void ensureDirector(long schoolId, User user) {
        ensureDirector(schoolId, user, "Only school directors can access this");
    }

    public void ensureDirector(long schoolId, User user, String message) {
        List<TeacherRole> roles = getRoles(schoolId, user);

        if (!roles.contains(TeacherRole.DIRECTOR)) {
            throw new InsufficientPermissionsException(message);
        }
    }

    public void ensureTeacher(long schoolId, User user) {
        ensureTeacher(schoolId, user, "Only school teachers can access this");
    }

    public void ensureTeacher(long schoolId, User user, String message) {
        List<TeacherRole> roles = getRoles(schoolId, user);

        if (!roles.contains(TeacherRole.DIRECTOR)) {
            throw new InsufficientPermissionsException(message);
        }
    }


    private List<TeacherRole> getRoles(long schoolId, User user) {
        Teacher teacher = this.teacherService.getTeacherInSchool(schoolId, user.getEmail())
                .orElseThrow(() -> new InsufficientPermissionsException("You cannot access this resource"));

        return teacher.getTeacherRoles();
    }

    public School updateSchool(long id, UpdateSchoolDTO dto, User user) {
        ensureDirector(id, user, "Only school directors can make such a change");

        School school = this.schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

        school.setName(dto.getName());
        school.setTeachers(this.teacherService.getTeachersBySchoolId(id));

        if (dto.getOwnerId() != 0) {
            User newOwner = this.userRepository.findById(dto.getOwnerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Invalid user id"));

            school.setBoss(newOwner);

            if (school.getTeachers().stream().noneMatch(x -> x.getEmail().equals(newOwner.getEmail()))) {
                school.getTeachers().add(new Teacher()
                        .setFirstName(newOwner.getFirstName())
                        .setLastName(newOwner.getLastName())
                        .setSchool(school)
                        .setEmail(newOwner.getEmail())
                        .setTeacherRoles(List.of(TeacherRole.DIRECTOR, TeacherRole.TEACHER)));
            }
        }

        for (Teacher teacher : school.getTeachers()) {
            teacher.getTeacherRoles().remove(TeacherRole.DIRECTOR);

            if (teacher.getTeacherRoles().isEmpty()) {
                teacher.getTeacherRoles().add(TeacherRole.TEACHER);
            }
        }

        this.schoolRepository.save(school);
        this.teacherService.saveAll(school.getTeachers());

        return school;
    }
}
