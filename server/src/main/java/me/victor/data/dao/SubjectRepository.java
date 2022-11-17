package me.victor.data.dao;

import me.victor.data.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    int countBySchoolId(long id);
    Optional<Subject> findByNameAndSchoolId(String name, long schoolId);
    List<Subject> findBySchoolId(long schoolId);
}
