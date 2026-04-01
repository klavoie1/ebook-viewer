package com.tracker.ebook.services;

import com.tracker.ebook.entities.Ebook;
import com.tracker.ebook.repositories.EbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class EbookServiceImpl implements EbookService {

    @Autowired
    EbookRepository ebookRepository;

    @Override
    public ArrayList<Ebook> findAllEbooks() {
        return (ArrayList<Ebook>) ebookRepository.findAll();
    }

    @Override
    public Ebook findEbookById(String id) {
        Optional<Ebook> ebook = ebookRepository.findById(id);
        return ebook.orElse(null);
    }

    @Override
    public void addEbook(Ebook ebook) {
        ebookRepository.save(ebook);
    }

    @Override
    public void deleteAllEbooks() {
        ebookRepository.deleteAll();
    }
}
