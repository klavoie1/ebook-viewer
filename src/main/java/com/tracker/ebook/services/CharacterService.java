package com.tracker.ebook.services;

import com.tracker.ebook.dto.CharacterResponse;
import org.bson.types.ObjectId;
import com.tracker.ebook.entities.Character;

import java.util.List;

public interface CharacterService {

    List<Character> findAllCharacters();

    Character findCharacterById(ObjectId id);

    Character addCharacter(CharacterResponse characterResponse);

    Boolean deleteCharacter(ObjectId id);

    Character updateCharacter(ObjectId id, CharacterResponse characterResponse);
}
