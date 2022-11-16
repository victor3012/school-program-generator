package me.victor.data.entities;

public enum TeacherRole {
    TEACHER(1),
    SYSTEM_ADMINISTRATOR(2),
    ASSISTANT_DIRECTOR(3),
    DIRECTOR(4);

    private final int power;

    private TeacherRole(int power) {
        this.power = power;
    }

    public int getPower() {
        return this.power;
    }
}
