package me.victor.models.dto.user;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class ChangePasswordUserDTO {
    private long id;
    private String currentPassword;

    @NotNull(message = "Password should be at least 6 symbols")
    @Size(min = 6, message = "Password should be at least 6 symbols")
    @Size(max = 50, message = "Password can be up to 50 symbols")
    @Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[._\\-!\"`'#%&,:;<>=@{}~$()*+/\\\\?\\[\\]^|])([\\s]{0})[\\w\\d._\\-!\"`'#%&,:;<>=@{}~$()*+/\\\\?\\[\\]^|]+",
            message = "Password must consist of at least 1 small letter, 1 capital letter, a digit, and a special character")
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
