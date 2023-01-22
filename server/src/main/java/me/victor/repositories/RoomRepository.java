package me.victor.repositories;

import me.victor.models.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findBySchoolId(long id);

    int countBySchoolId(long id);

    Optional<Room> getByNameAndSchoolId(String name, long schoolId);

    Optional<Room> findByIdAndSchoolId(long roomId, long schoolId);

    void deleteByIdAndSchoolId(long roomId, long schoolId);
}
