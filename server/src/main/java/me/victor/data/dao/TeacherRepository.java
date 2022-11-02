package me.victor.data.dao;

import me.victor.data.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findByEmail(String email);
    List<Teacher> findBySchoolId(long id);
    int countBySchoolId(long id);
    boolean existsBySchoolIdAndEmail(long schoolId, String email);
}
