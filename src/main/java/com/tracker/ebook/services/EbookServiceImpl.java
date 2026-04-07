package com.tracker.ebook.services;

import com.tracker.ebook.dto.EbookListResponse;
import com.tracker.ebook.entities.Ebook;
import com.tracker.ebook.repositories.EbookRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EbookServiceImpl implements EbookService {

    @Autowired
    EbookRepository ebookRepository;

    @Override
    public List<Ebook> findAllEbooks() {
        return new EbookListResponse(true, ebookRepository.findAll()).getEbookList();
    }

    @Override
    public Ebook findEbookById(ObjectId id) {
        Optional<Ebook> ebook = ebookRepository.findById(id);
        return ebook.orElse(null);
    }

    @Override
    public void addEbook(Ebook ebook) {
        ebookRepository.save(ebook);
    }

    @Override
    public Boolean deleteEbookById(ObjectId id) {
        Ebook selectedEbook = ebookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ebook not found"));
        ebookRepository.delete(selectedEbook);
        return true;
    }

}
