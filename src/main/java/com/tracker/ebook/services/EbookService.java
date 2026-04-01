package com.tracker.ebook.services;

import com.tracker.ebook.entities.Ebook;
import com.tracker.ebook.repositories.EbookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

public interface EbookService {

    ArrayList<Ebook> findAllEbooks();

    Ebook findEbookById(String id);

    void addEbook(Ebook ebook);

    void deleteAllEbooks();

}
