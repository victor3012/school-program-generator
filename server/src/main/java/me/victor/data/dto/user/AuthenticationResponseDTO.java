package me.victor.data.dto.user;

import java.io.Serializable;

public class AuthenticationResponseDTO implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private String token;
    private String firstName;
    private String lastName;
    private String email;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getToken() {
        return token;
    }

    public AuthenticationResponseDTO setToken(String jwtToken) {
        this.token = jwtToken;
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
}
