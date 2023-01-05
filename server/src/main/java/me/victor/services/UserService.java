package me.victor.services;

import me.victor.api.rest.authentication.JwtAuthenticationEntryPoint;
import me.victor.api.rest.authentication.JwtRequest;
import me.victor.api.rest.authentication.JwtTokenUtil;
import me.victor.api.rest.authentication.JwtUserDetailsService;
import me.victor.repositories.UserRepository;
import me.victor.models.dto.user.ChangePasswordUserDTO;
import me.victor.models.dto.user.CreateUserDTO;
import me.victor.models.entities.User;
import me.victor.exceptions.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.WebRequest;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public UserService(UserRepository userRepository, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    public void createUser(CreateUserDTO dto, UserDetails details) {
        Optional<User> requested = this.userRepository.findByEmail(dto.getEmail());

        if (requested.isPresent()) {
            throw new IllegalStateException("An account with this email already exists");
        }

        User user = new User()
                .setFirstName(dto.getFirstName())
                .setLastName(dto.getLastName())
                .setEmail(dto.getEmail())
                .setPassword(details.getPassword())
                .setEmailConfirmed(false);

        this.userRepository.save(user);

        // TODO: send a confirmation email :)
    }

    public void changePassword(ChangePasswordUserDTO dto) {
        User user = this.userRepository.findById(dto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid user"));

        if (!user.getPassword().equals(dto.getCurrentPassword())) {
            throw new IllegalStateException("Passwords don't match");
        }

        user.setPassword(dto.getNewPassword());
        this.userRepository.save(user);
    }

    public Optional<User> getByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public User getUserByRequest(WebRequest request) {
        String jwtToken = request.getHeader("x-authorization");
        String email = jwtTokenUtil.getEmailFromToken(jwtToken);

        return getByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Unknown user"));
    }
}
