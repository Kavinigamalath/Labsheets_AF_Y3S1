package com.example.springbootrestapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class SpringbootrestapiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootrestapiApplication.class, args);
    }

    // Default endpoint
    @GetMapping("/")
    public String rootEndpoint() {
        return "Hello, world!";
    }

    // Parameterized endpoint
    @GetMapping("/hello/{name}")
    public String helloName(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
}
