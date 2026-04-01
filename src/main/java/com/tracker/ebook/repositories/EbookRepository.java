package com.tracker.ebook.repositories;

import com.tracker.ebook.entities.Ebook;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EbookRepository extends MongoRepository<Ebook, String> {

    Optional<Ebook> findAllEbooks();
}
