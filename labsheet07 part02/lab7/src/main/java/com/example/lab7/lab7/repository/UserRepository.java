package com.example.lab7.lab7.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.lab7.lab7.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    // Custom queries (if needed) here
}