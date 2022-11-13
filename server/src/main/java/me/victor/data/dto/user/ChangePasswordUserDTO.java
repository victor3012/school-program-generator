package me.victor.data.dto.user;

public class ChangePasswordUserDTO {
    private long id;
    private String currentPassword;
    private String newPassword;

    public long getId() {
        return id;
    }

    public ChangePasswordUserDTO setId(long id) {
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
