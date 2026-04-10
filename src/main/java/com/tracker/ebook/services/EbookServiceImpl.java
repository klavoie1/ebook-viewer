package com.tracker.ebook.services;

import com.tracker.ebook.dto.EbookListResponse;
import com.tracker.ebook.dto.EbookResponse;
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
    public Ebook addEbook(EbookResponse ebookResponse) {
        Ebook newEbook = new Ebook.Builder()
                .title(ebookResponse.getTitle())
                .author(ebookResponse.getAuthor())
                .isbn(ebookResponse.getIsbn())
                .publishedDate(ebookResponse.getPublishedDate())
                .genre(ebookResponse.getGenre())
                .summary(ebookResponse.getSummary())
                .characters(ebookResponse.getCharacters())
                .metadata(ebookResponse.getMetadata())
                .build();

        return  ebookRepository.save(newEbook);
    }

    @Override
    public Boolean deleteEbookById(ObjectId id) {
        Ebook selectedEbook = ebookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ebook not found"));
        ebookRepository.delete(selectedEbook);
        return true;
    }

    /**
     * @param id
     * @param ebookResponse
     * @return Updates Ebook based off id supplied
     */
    @Override
    public Ebook updateEbook(ObjectId id, EbookResponse ebookResponse) {
        Ebook existingEbook = ebookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ebook not found with id " + id));

        existingEbook.setTitle(ebookResponse.getTitle());
        existingEbook.setAuthor(ebookResponse.getAuthor());
        existingEbook.setIsbn(ebookResponse.getIsbn());
        existingEbook.setPublishedDate(ebookResponse.getPublishedDate());
        existingEbook.setGenre(ebookResponse.getGenre());
        existingEbook.setSummary(ebookResponse.getSummary());
        existingEbook.setCharacters(ebookResponse.getCharacters());
        existingEbook.setMetadata(ebookResponse.getMetadata());

        return ebookRepository.save(existingEbook);
    }

    /**
     * @param genre
     * @return A list of books that contain the specified tag in the genre section of the ebook metadata.
     */
    @Override
    public List<Ebook> findByGenre(String genre) {
        List<Ebook> results = ebookRepository.findByGenreContaining(genre);
        return results.subList(0, Math.min(results.size(), 10)); // 10 is the limit here, probably fine to make larger: Need to check at later date with larger DB
    }

    public int findEbookListTotal() {
        return ebookRepository.findAll().size();
    }

}
