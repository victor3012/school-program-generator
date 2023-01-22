package me.victor.repositories;

import me.victor.models.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    Optional<Group> findByNameAndSchoolId(String name, long id);

    Optional<Group> findByIdAndSchoolId(long id, long schoolId);

    List<Group> findBySchoolId(long schoolId);

    void deleteByIdAndSchoolId(long groupId, long id);
}
