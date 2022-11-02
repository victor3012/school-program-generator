package me.victor.data.dto.school;

public class AggregatedSchoolDTO {
    private long id;
    private String name;
    private int teachersCount;
    private int roomsCount;

    public long getId() {
        return id;
    }

    public AggregatedSchoolDTO setId(long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public AggregatedSchoolDTO setName(String name) {
        this.name = name;
        return this;
    }

    public int getTeachersCount() {
        return teachersCount;
    }

    public AggregatedSchoolDTO setTeachersCount(int teachersCount) {
        this.teachersCount = teachersCount;
        return this;
    }

    public int getRoomsCount() {
        return roomsCount;
    }

    public AggregatedSchoolDTO setRoomsCount(int roomsCount) {
        this.roomsCount = roomsCount;
        return this;
    }
}
