package me.victor.data.dto.user;

import me.victor.data.entities.User;

import java.io.Serializable;

public class AuthenticationResponseDTO implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private String accessToken;
    private String firstName;
    private String lastName;
    private String email;
    private boolean isAdmin;

    public AuthenticationResponseDTO() {

    }

    public AuthenticationResponseDTO(User user) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.isAdmin = user.isAdmin();
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public AuthenticationResponseDTO setAccessToken(String accessToken) {
        this.accessToken = accessToken;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public AuthenticationResponseDTO setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public AuthenticationResponseDTO setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public AuthenticationResponseDTO setEmail(String email) {
        this.email = email;
        return this;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public AuthenticationResponseDTO setAdmin(boolean admin) {
        isAdmin = admin;
        return this;
    }
}
