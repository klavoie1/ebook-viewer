package com.tracker.ebook.controllers;

import com.tracker.ebook.dto.EbookListResponse;
import com.tracker.ebook.dto.EbookResponse;
import com.tracker.ebook.services.EbookServiceImpl;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ebookviewer")
public class EbookController {

    @Autowired
    EbookServiceImpl ebookServiceImpl;

    @PostMapping("/add")
    public ResponseEntity<?> saveEbook(@RequestBody EbookResponse ebookResponse) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(ebookServiceImpl.addEbook(ebookResponse));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/allebooks")
    public ResponseEntity<?> getAllEbooks() {
        try {
            return ResponseEntity.ok(ebookServiceImpl.findAllEbooks());
        } catch (Exception e) {
            return ResponseEntity.ok(new EbookListResponse(false, null));
        }
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getEbookById(@PathVariable ObjectId id) {
        try {
            return ResponseEntity.ok(ebookServiceImpl.findEbookById(id));
        }  catch (Exception e) {
            return ResponseEntity.ok(new EbookListResponse(false, null));
        }
    }

    @DeleteMapping("/id/{id}")
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
