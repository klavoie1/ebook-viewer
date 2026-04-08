package com.tracker.ebook.controllers;

import com.tracker.ebook.dto.CharacterListResponse;
import com.tracker.ebook.dto.CharacterResponse;
import com.tracker.ebook.services.CharacterServiceImpl;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ebookviewer/character")
public class CharacterController {

    @Autowired
    CharacterServiceImpl characterServiceImpl;

    @PostMapping("/add")
    public ResponseEntity<?> addCharacter(@RequestBody CharacterResponse characterResponse) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(characterServiceImpl.addCharacter(characterResponse));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/allcharacters")
    public ResponseEntity<?> getAllCharacters() {
        try {
            return ResponseEntity.ok(characterServiceImpl.findAllCharacters());
        } catch (Exception e) {
            return ResponseEntity.ok(new CharacterListResponse(false, null));
        }
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getCharacterById(@PathVariable ObjectId id) {
        try {
            return ResponseEntity.ok(characterServiceImpl.findCharacterById(id));
        } catch (Exception e) {
            return ResponseEntity.ok(new CharacterListResponse(false, null));
        }
    }
    
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteCharacter(@PathVariable ObjectId id) {
        try {
            boolean removed = characterServiceImpl.deleteCharacter(id);
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
