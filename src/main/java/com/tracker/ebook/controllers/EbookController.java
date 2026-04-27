package com.tracker.ebook.controllers;

import com.tracker.ebook.dto.EbookListResponse;
import com.tracker.ebook.dto.EbookResponse;
import com.tracker.ebook.entities.Ebook;
import com.tracker.ebook.services.EbookServiceImpl;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/ebookviewer/ebook")
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

    @GetMapping("/all")
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

    @PutMapping("/id/{id}")
    public ResponseEntity<?> updateEbook(@PathVariable ObjectId id, @RequestBody EbookResponse ebookResponse) {
        try {
            return ResponseEntity.ok(ebookServiceImpl.updateEbook(id, ebookResponse));
        }  catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getCoverImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get("/home/klavoie/Documents/JavaCoding/EbookViewerCoverImages").resolve(filename);

            Resource resource = new FileSystemResource(imagePath);

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Ebook>> getEbooksByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(ebookServiceImpl.findByGenre(genre));
    }

    @GetMapping
    public ResponseEntity<?> findEbookListTotal() {
        try {
            return ResponseEntity.ok(ebookServiceImpl.findEbookListTotal());
        }  catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
