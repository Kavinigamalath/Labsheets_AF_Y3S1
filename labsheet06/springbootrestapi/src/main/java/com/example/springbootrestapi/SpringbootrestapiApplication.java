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

	@GetMapping("/")
	public String rootEndpoint(@RequestParam(value = "name", defaultValue = "world") String name){
		return "Hello, " + name +" !";
	}

}
