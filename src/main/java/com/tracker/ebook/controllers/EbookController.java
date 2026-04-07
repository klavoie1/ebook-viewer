package com.tracker.ebook.controllers;

import com.tracker.ebook.entities.Ebook;
import com.tracker.ebook.services.EbookServiceImpl;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ebookviewer")
public class EbookController {

    @Autowired
    EbookServiceImpl ebookServiceImpl;

    @PostMapping("/add")
    public void saveEbook(@RequestBody Ebook ebook) {
        ebookServiceImpl.addEbook(ebook);
    }

    @GetMapping("/allebooks")
    public ResponseEntity<List<Ebook>> getAllEbooks() {
        try {
            return ResponseEntity.ok(ebookServiceImpl.findAllEbooks());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/id/{id}")
    public Ebook getEbookById(@PathVariable ObjectId id) {
        return ebookServiceImpl.findEbookById(id);
    }

    @DeleteMapping("/deleteid/{id}")
    public ResponseEntity<?> deleteEbookById(@PathVariable ObjectId id) {
        try {
            boolean removed = ebookServiceImpl.deleteEbookById(id);
            if (removed) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
