package me.victor.repositories;

import me.victor.models.entities.SubjectType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubjectTypeRepository extends JpaRepository<SubjectType, Long> {
    Optional<SubjectType> findByNameAndSchoolId(String name, long id);

    List<SubjectType> findBySchoolId(long id);
}
