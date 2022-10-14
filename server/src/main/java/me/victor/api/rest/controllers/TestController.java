package me.victor.api.rest.controllers;

import me.victor.exceptions.DataFormatException;
import me.victor.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@RestController
@RequestMapping("/api")
public class TestController {
    @GetMapping("/home")
    public String handleHome() {
        throw new ResourceNotFoundException("Not found");
    }
}
