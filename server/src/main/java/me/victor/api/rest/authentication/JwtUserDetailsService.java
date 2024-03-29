package me.victor.api.rest.authentication;

import me.victor.models.dto.user.AuthenticationResponseDTO;
import me.victor.models.dto.user.CreateUserDTO;
import me.victor.services.UserService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();
    private final UserService userService;

    public JwtUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        me.victor.models.entities.User user = userService.getByEmail(username)
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        return new User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

    public UserDetails newUser(CreateUserDTO dto) {
        return new User(dto.getEmail(), encoder.encode(dto.getPassword()), new ArrayList<>());
    }

    public AuthenticationResponseDTO getUserDetailsByEmail(String email) {
        me.victor.models.entities.User account = userService.getByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid account"));

        return new AuthenticationResponseDTO(account);
    }
}