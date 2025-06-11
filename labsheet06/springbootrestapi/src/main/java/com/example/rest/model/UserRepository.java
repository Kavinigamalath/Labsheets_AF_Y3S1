package com.example.rest.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserRepository {
    private List<User> users = new ArrayList<>();
    private long nextId = 1;

    public List<User> findAll() { return users; }

    public Optional<User> findById(Long id) {
        return users.stream().filter(user -> user.getId().equals(id)).findFirst();
    }

    public User save(User user) {
        if (user.getId() == null) {
            user.setId(nextId++);
        } else {
            users.removeIf(u -> u.getId().equals(user.getId()));
        }
        users.add(user);
        return user;
    }

    public void deleteById(Long id) {
        users.removeIf(user -> user.getId().equals(id));
    }
}