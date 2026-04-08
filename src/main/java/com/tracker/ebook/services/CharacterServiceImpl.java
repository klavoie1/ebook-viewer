package com.tracker.ebook.services;

import com.tracker.ebook.dto.CharacterListResponse;
import com.tracker.ebook.dto.CharacterResponse;
import com.tracker.ebook.repositories.CharacterRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tracker.ebook.entities.Character;

import java.util.List;
import java.util.Optional;

@Service
public class CharacterServiceImpl implements CharacterService {

    @Autowired
    CharacterRepository characterRepository;

    /**
     * @return Return a full list of all characters in database
     */
    @Override
    public List<Character> findAllCharacters() { return new CharacterListResponse(true, characterRepository.findAll()).getCharactersList(); }

    /**
     * @param id
     * @return Returns a character based on id entered. If no character exists, return null
     */
    @Override
    public Character findCharacterById(ObjectId id) {
        Optional<Character> character = characterRepository.findById(id);
        return character.orElse(null);
    }

    /**
     * @param characterResponse
     * @return Add a character with the constraints that character entity describes.
     */
    @Override
    public Character addCharacter(CharacterResponse characterResponse) {
        Character newCharacter = new Character.Builder()
                .name(characterResponse.getName())
                .description(characterResponse.getDescription())
                .imagePath(characterResponse.getImagePath())
                .build();

        return characterRepository.save(newCharacter);
    }

    /**
     * @param id
     * @return Deletes character based on Id.
     */
    @Override
    public Boolean deleteCharacter(ObjectId id) {
        Character character = characterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Character not found"));
        characterRepository.delete(character);
        return true;
    }
}
