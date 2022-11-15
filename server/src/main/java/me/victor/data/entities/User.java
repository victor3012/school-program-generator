package me.victor.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User extends ObjectWithId {
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "is_admin")
    private boolean isAdmin;

    @Column(name = "is_email_confirmed")
    private boolean isEmailConfirmed;

    public User() {
    }

    public User(String firstName, String lastName, String email, String password, boolean isAdmin, boolean isEmailConfirmed) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isEmailConfirmed = isEmailConfirmed;
    }

    public String getFirstName() {
        return firstName;
    }

    public User setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public User setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public User setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
        return this;
    }

    public boolean isEmailConfirmed() {
        return isEmailConfirmed;
    }

    public User setEmailConfirmed(boolean emailConfirmed) {
        isEmailConfirmed = emailConfirmed;
        return this;
    }
}
