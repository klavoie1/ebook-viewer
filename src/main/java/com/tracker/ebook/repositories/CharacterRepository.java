package com.tracker.ebook.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.tracker.ebook.entities.Character;

@Repository
public interface CharacterRepository extends MongoRepository<Character, ObjectId> {
}
