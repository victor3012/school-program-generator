package me.victor.data.dto.teacher;

import me.victor.data.entities.enums.TeacherRole;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CreateTeacherDTO {
    @NotNull(message = "First name must not be empty")
    @NotEmpty(message = "First name must not be empty")
    @Size(max = 255, message = "First name should be less than 255 symbols")
    private String firstName;

    @NotNull(message = "Last name must not be empty")
    @NotEmpty(message = "Last name must not be empty")
    @Size(max = 255, message = "Last name should be less than 255 symbols")
    private String lastName;

    @NotNull(message = "Email format is invalid")
    @NotEmpty(message = "Email format is invalid")
    @Email(message = "Email format is invalid")
    private String email;

    @NotNull(message = "Invalid teacher role")
    private TeacherRole role;

    public String getFirstName() {
        return firstName;
    }

    public CreateTeacherDTO setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public CreateTeacherDTO setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public CreateTeacherDTO setEmail(String email) {
        this.email = email;
        return this;
    }

    public TeacherRole getRole() {
        return role;
    }

    public CreateTeacherDTO setRole(TeacherRole role) {
        this.role = role;
        return this;
    }
}
