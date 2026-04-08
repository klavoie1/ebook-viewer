package com.tracker.ebook.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class RootController {

    @GetMapping
    public String healthCheck() { return "OK"; }
}
