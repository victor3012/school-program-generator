package me.victor.data.dto.user;

public class ChangePasswordUserDTO {
    private int id;
    private String currentPassword;
    private String newPassword;

    public int getId() {
        return id;
    }

    public ChangePasswordUserDTO setId(int id) {
        this.id = id;
        return this;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public ChangePasswordUserDTO setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
        return this;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public ChangePasswordUserDTO setNewPassword(String newPassword) {
        this.newPassword = newPassword;
        return this;
    }
}
