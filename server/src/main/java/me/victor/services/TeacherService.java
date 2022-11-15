package me.victor.services;

import me.victor.data.dao.TeacherRepository;
import me.victor.data.entities.Teacher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}
