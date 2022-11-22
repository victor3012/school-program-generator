package me.victor.services;

import me.victor.data.dao.SchoolRepository;
import me.victor.data.dao.UserRepository;
import me.victor.data.dto.school.AggregatedSchoolDTO;
import me.victor.data.dto.school.CreateSchoolDTO;
import me.victor.data.dto.school.ExtendedAggregatedSchoolDTO;
import me.victor.data.dto.school.UpdateSchoolDTO;
import me.victor.data.entities.School;
import me.victor.data.entities.Teacher;
import me.victor.data.entities.enums.TeacherRole;
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

    public Optional<School> getSchool(long id) {
        return this.schoolRepository.findById(id);
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
                .setTeacherRoles(List.of(TeacherRole.PRINCIPAL));

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

        return getSchoolAggregatedInformation(school, user);
    }

    public ExtendedAggregatedSchoolDTO getSchoolAggregatedInformation(School school, User user) {
        return (ExtendedAggregatedSchoolDTO) new ExtendedAggregatedSchoolDTO()
                .setSubjectsCount(this.subjectService.getSubjectsCountBySchoolId(school.getId()))
                .setTeacher(this.teacherService.getDTOFromTeacher(
                        this.teacherService.getTeacherInSchool(school.getId(), user.getEmail())
                                .orElseThrow(() -> new ResourceNotFoundException("Invalid teacher"))))
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

    public void ensurePrincipal(long schoolId, User user) {
        ensurePrincipal(schoolId, user, "Only school directors can access this");
    }

    public void ensurePrincipal(long schoolId, User user, String message) {
        ensurePower(schoolId, user, message, TeacherRole.PRINCIPAL);
    }

    public void ensureSystemAdmin(long schoolId, User user) {
        ensureSystemAdmin(schoolId, user, "Only system administrators can access this");
    }

    public void ensureSystemAdmin(long schoolId, User user, String message) {
        ensurePower(schoolId, user, message, TeacherRole.SYSTEM_ADMIN);
    }

    public void ensureTeacher(long schoolId, User user) {
        ensureTeacher(schoolId, user, "Only school teachers can access this");
    }

    public void ensureTeacher(long schoolId, User user, String message) {
        ensurePower(schoolId, user, message, TeacherRole.TEACHER);
    }

    public void ensurePower(long schoolId, User user, String message, TeacherRole role) {
        ensurePower(schoolId, user, message, role.getPower());
    }

    public void ensurePower(long schoolId, User user, String message, long power) {
        List<TeacherRole> roles = getRoles(schoolId, user);

        if (getHighestRolePower(roles) < power) {
            throw new InsufficientPermissionsException(message);
        }
    }


    private List<TeacherRole> getRoles(long schoolId, User user) {
        Teacher teacher = this.teacherService.getTeacherInSchool(schoolId, user.getEmail())
                .orElseThrow(() -> new InsufficientPermissionsException("You cannot access this resource"));

        return teacher.getTeacherRoles();
    }

    public School updateSchool(long id, UpdateSchoolDTO dto, User user) {
        ensurePrincipal(id, user, "Only school directors can make such a change");

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
                        .setTeacherRoles(List.of(TeacherRole.PRINCIPAL, TeacherRole.TEACHER)));
            }
        }

        for (Teacher teacher : school.getTeachers()) {
            teacher.getTeacherRoles().remove(TeacherRole.PRINCIPAL);

            if (teacher.getTeacherRoles().isEmpty()) {
                teacher.getTeacherRoles().add(TeacherRole.TEACHER);
            }
        }

        this.schoolRepository.save(school);
        this.teacherService.saveAll(school.getTeachers());

        return school;
    }

    private int getHighestRolePower(List<TeacherRole> roles) {
        int power = 0;

        for (TeacherRole role : roles) {
            if (power < role.getPower()) {
                power = role.getPower();
            }
        }

        return power;
    }
}
