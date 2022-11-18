package me.victor.data.entities;

public enum TeacherRole {
    TEACHER(1),
    SYSTEM_ADMIN(2),
    ASSISTANT_PRINCIPAL(3),
    PRINCIPAL(4);

    private final int power;

    private TeacherRole(int power) {
        this.power = power;
    }

    public int getPower() {
        return this.power;
    }
}
