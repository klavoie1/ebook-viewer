package com.tracker.ebook.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "ebooks")
public class Ebook {

    @Id
    private String _id;

    private String title;

    private String author;

    private String isbn;

    private String publishedDate;

    private List<String> genre;

    private String summary;

    private List<Character> characters;

    public Ebook(String _id, String title, String author, String isbn, String publishedDate, List<String> genre, String summary, List<Character> characters) {
        super();
        this._id = _id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.genre = genre;
        this.summary = summary;
        this.characters = characters;
    }

    public Ebook() {}

    public String get_id() { return _id; }

    public String getTitle() { return title; }

    public String getAuthor() { return author; }

    public String getIsbn() { return isbn; }

    public String getPublishedDate() { return publishedDate; }

    public List<String> getGenre() { return genre; }

    public String getSummary() { return summary; }

    public List<Character> getCharacters() { return characters; }

    public void set_id(String _id) { this._id = _id; }
    public void setTitle(String title) { this.title = title; }
    public void setAuthor(String author) { this.author = author; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public void setPublishedDate(String publishedDate) { this.publishedDate = publishedDate; }
    public void setGenre(List<String> genre) { this.genre = genre; }
    public void setSummary(String summary) { this.summary = summary; }
    public void setCharacters(List<Character> characters) { this.characters = characters; }
}
