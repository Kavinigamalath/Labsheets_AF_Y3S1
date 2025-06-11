package com.example.springbootrestapi.controller;


import org.springframework.web.bind.annotation.*;

import com.example.springbootrestapi.model.User;
import com.example.springbootrestapi.model.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository = new UserRepository();

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.saveUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findUserById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userRepository.findUserById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        return userRepository.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteUserById(id);
    }
}