package com.tracker.ebook.services;

import com.tracker.ebook.entities.Ebook;
import org.bson.types.ObjectId;

import java.util.List;

public interface EbookService {

    List<Ebook> findAllEbooks();

    Ebook findEbookById(ObjectId id);

    void addEbook(Ebook ebook);

    Boolean deleteEbookById(ObjectId id);
}
