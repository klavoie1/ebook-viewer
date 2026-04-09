package com.tracker.ebook.services;

import com.tracker.ebook.dto.EbookResponse;
import com.tracker.ebook.entities.Ebook;
import org.bson.types.ObjectId;

import java.util.List;

public interface EbookService {

    List<Ebook> findAllEbooks();

    Ebook findEbookById(ObjectId id);

    Ebook addEbook(EbookResponse ebookResponse);

    Boolean deleteEbookById(ObjectId id);

    Ebook updateEbook(ObjectId id, EbookResponse ebookResponse);

    List<Ebook> findByGenre(String genre);
}
