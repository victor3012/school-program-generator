package me.victor.models.entities.enums;

public enum TeacherRole {
    TEACHER(1),
    SYSTEM_ADMIN(2),
    ASST_PRINCIPAL(3),
    PRINCIPAL(4);

    private final int power;

    TeacherRole(int power) {
        this.power = power;
    }

    public int getPower() {
        return this.power;
    }
}
