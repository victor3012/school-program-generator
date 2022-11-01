package me.victor.api.rest.authentication;

import java.util.ArrayList;

import me.victor.exceptions.BadCredentialsException;
import me.victor.services.UserService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    private static final PasswordEncoder encoder = new BCryptPasswordEncoder();
    private final UserService userService;

    public JwtUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        me.victor.data.entities.User user = userService.getByEmail(username)
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        return new User(user.getEmail(), encoder.encode(user.getPassword()), new ArrayList<>());
    }
}