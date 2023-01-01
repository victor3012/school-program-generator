package me.victor.models.dto.user;

import javax.validation.constraints.*;

public class CreateUserDTO {
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

    @NotNull(message = "Password should be at least 6 symbols")
    @Size(min = 6, message = "Password should be at least 6 symbols")
    @Size(max = 50, message = "Password can be up to 50 symbols")
    @Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[._\\-!\"`'#%&,:;<>=@{}~$()*+/\\\\?\\[\\]^|])([\\s]{0})[\\w\\d._\\-!\"`'#%&,:;<>=@{}~$()*+/\\\\?\\[\\]^|]+",
            message = "Password must consist of at least 1 small letter, 1 capital letter, a digit, and a special character")
    private String password;

    public String getFirstName() {
        return firstName;
    }

    public CreateUserDTO setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public CreateUserDTO setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public CreateUserDTO setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public CreateUserDTO setPassword(String password) {
        this.password = password;
        return this;
    }
}
