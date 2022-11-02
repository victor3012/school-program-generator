package me.victor.data.dao;

import me.victor.data.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findBySchoolId(long id);
    int countBySchoolId(long id);
}
