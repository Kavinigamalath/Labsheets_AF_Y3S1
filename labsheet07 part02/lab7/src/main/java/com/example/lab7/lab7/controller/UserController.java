package com.example.lab7.lab7.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lab7.lab7.model.User;
import com.example.lab7.lab7.service.UserService;
 
@RestController 
@RequestMapping("/users") 
public class UserController { 
    private final UserService userService; 
 
    @Autowired 
    public UserController(UserService userService) { 
        this.userService = userService; 
    } 
 
    @GetMapping 
    public List<User> getAllUsers() { 
        return userService.getAllUsers(); 
    } 
 
    @PostMapping 
    public User createUser(@RequestBody User user) { 
        return userService.createUser(user); 
    } 
 
    @GetMapping("/{id}") 
    public ResponseEntity<User> getUserById(@PathVariable String id) { 
        return userService.getUserById(id) 
                          .map(ResponseEntity::ok) 
                          .orElseGet(() -> ResponseEntity.notFound().build()); 
    } 
 
    @PutMapping("/{id}") 
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody 
User user) { 
return userService.getUserById(id) 
.map(existingUser -> 
ResponseEntity.ok(userService.updateUser(id, user))) 
.orElseGet(() -> ResponseEntity.notFound().build()); 
} 
@DeleteMapping("/{id}") 
public ResponseEntity<?> deleteUser(@PathVariable String id) { 
return userService.getUserById(id) 
.map(user -> { 
userService.deleteUser(id); 
return ResponseEntity.ok().build(); 
}) 
.orElseGet(() -> ResponseEntity.notFound().build()); 
} 
}