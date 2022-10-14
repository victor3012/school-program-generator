package me.victor.services;

import me.victor.data.dao.UserRepository;
import me.victor.data.dto.user.ChangePasswordUserDTO;
import me.victor.data.dto.user.CreateUserDTO;
import me.victor.data.entities.User;
import me.victor.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(CreateUserDTO dto) {
        this.userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalStateException("An account with this email already exists"));

        User user = new User()
                .setFirstName(dto.getFirstName())
                .setLastName(dto.getLastName())
                .setEmail(dto.getEmail())
                .setPassword(dto.getPassword())
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


}
