package me.victor.api.rest.controllers;

import me.victor.api.rest.authentication.JwtRequest;
import me.victor.api.rest.authentication.JwtTokenUtil;
import me.victor.api.rest.authentication.JwtUserDetailsService;
import me.victor.exceptions.BadCredentialsException;
import me.victor.models.dto.user.AuthenticationResponseDTO;
import me.victor.models.dto.user.CreateUserDTO;
import me.victor.services.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.Valid;

@RestController
@CrossOrigin
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;
    private final UserService userService;

    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil,
                                    JwtUserDetailsService userDetailsService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
    }

    @PostMapping(value = "/api/register")
    public AuthenticationResponseDTO register(@Valid @RequestBody CreateUserDTO dto) {
        UserDetails details = this.userDetailsService.newUser(dto);
        this.userService.createUser(dto, details);

        String token = jwtTokenUtil.generateToken(details);

        return this.userDetailsService
                .getUserDetailsByEmail(dto.getEmail())
                .setAccessToken(token);
    }

    @PostMapping(value = "/api/login")
    public AuthenticationResponseDTO createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
        authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

        final UserDetails userDetails = this.userDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return this.userDetailsService
                .getUserDetailsByEmail(authenticationRequest.getEmail())
                .setAccessToken(token);
    }

    @GetMapping(value = "/api/login/persistent")
    public AuthenticationResponseDTO persistentLogin(WebRequest request) {
        String token = request.getHeader("X-Authorization");
        String email = this.jwtTokenUtil.getEmailFromToken(token);
        UserDetails details = this.userDetailsService.loadUserByUsername(email);
        token = this.jwtTokenUtil.generateToken(details);

        return this.userDetailsService.getUserDetailsByEmail(email)
                .setAccessToken(token);
    }

    private void authenticate(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new BadCredentialsException("User disabled");
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Bad credentials");
        }
    }
}