package com.tracker.ebook.repositories;

import com.tracker.ebook.entities.Ebook;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EbookRepository extends MongoRepository<Ebook, ObjectId> {

    Ebook findByTitle(String title);

}
