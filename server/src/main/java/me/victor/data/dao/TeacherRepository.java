package me.victor.data.dao;

import me.victor.data.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findByEmail(String email);
    List<Teacher> findBySchoolId(long id);
    int countBySchoolId(long id);
    boolean existsBySchoolIdAndEmail(long schoolId, String email);
    Optional<Teacher> findByEmailAndSchoolId(String email, long schoolId);
    Optional<Teacher> findByIdAndSchoolId(long teacherId, long schoolId);
}
