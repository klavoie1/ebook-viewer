package com.tracker.ebook.dto;

import com.tracker.ebook.entities.Metadata;

import java.util.List;

public class EbookResponse {

    private String id;

    private String title;

    private String author;

    private String isbn;

    private String publishedDate;

    private List<String> genre;

    private String summary;

    private List<String> characters;

    private Metadata metadata;

    public EbookResponse(String id, String title, String author, String isbn, String publishedDate, List<String> genre, String summary, List<String> characters, Metadata metadata) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.genre = genre;
        this.summary = summary;
        this.characters = characters;
        this.metadata = metadata;
    }

    public EbookResponse() {}

    public String getId() { return id; }

    public String getTitle() { return title; }

    public String getAuthor() { return author; }

    public String getIsbn() { return isbn; }

    public String getPublishedDate() { return publishedDate; }

    public List<String> getGenre() { return genre; }

    public String getSummary() { return summary; }

    public List<String> getCharacters() { return characters; }

    public Metadata getMetadata() { return metadata; }

    public void setTitle(String title) { this.title = title; }

    public void setAuthor(String author) { this.author = author; }

    public void setIsbn(String isbn) { this.isbn = isbn; }

    public void setPublishedDate(String publishedDate) { this.publishedDate = publishedDate; }

    public void setGenre(List<String> genre) { this.genre = genre; }

    public void setSummary(String summary) { this.summary = summary; }

    public void setCharacters(List<String> characters) { this.characters = characters; }

    public void setMetadata(Metadata metadata) { this.metadata = metadata; }
}
