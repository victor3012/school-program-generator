package me.victor.services;

import me.victor.data.dao.SchoolRepository;
import me.victor.data.dto.school.AggregatedSchoolDTO;
import me.victor.data.dto.school.CreateSchoolDTO;
import me.victor.data.dto.school.ExtendedAggregatedSchoolDTO;
import me.victor.data.entities.School;
import me.victor.data.entities.Teacher;
import me.victor.data.entities.TeacherRole;
import me.victor.data.entities.User;
import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.InsufficientPermissionsException;
import me.victor.exceptions.ResourceNotFoundException;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SchoolService {
    private final SchoolRepository schoolRepository;
    private final TeacherService teacherService;
    private final RoomService roomService;
    private final SubjectService subjectService;

    public SchoolService(SchoolRepository schoolRepository, TeacherService teacherService, RoomService roomService,
                         SubjectService subjectService) {
        this.schoolRepository = schoolRepository;
        this.teacherService = teacherService;
        this.roomService = roomService;
        this.subjectService = subjectService;
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
        if (!this.teacherService.isTeacherInSchool(schoolId, user.getEmail())) {
            throw new ResourceNotFoundException("There is no such a school associated with your account");
        }

        School school = this.schoolRepository.findById(schoolId)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

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
}
