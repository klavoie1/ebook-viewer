package com.tracker.ebook.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.lang.Nullable;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "ebooks")
public class Ebook {

    @Id
    @JsonProperty("_id")
    private ObjectId _id;

    private String title;

    private String author;

    @Nullable
    private String isbn;

    private String publishedDate;

    private List<String> genre;

    @Nullable
    private String summary;

    private List<String> characters;

    private Metadata metadata;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    public Ebook(ObjectId _id, String title, String author, String isbn, String publishedDate, List<String> genre,
                 String summary, List<String> characters, Metadata metadata) {
        super();
        this._id = _id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.genre = genre;
        this.summary = summary;
        this.characters = characters;
        this.metadata = metadata;
    }

    public Ebook() {}

    public ObjectId getid() { return _id; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getIsbn() { return isbn; }
    public String getPublishedDate() { return publishedDate; }
    public List<String> getGenre() { return genre; }
    public String getSummary() { return summary; }
    public List<String> getCharacters() { return characters; }
    public Metadata getMetadata() { return metadata; }

    public void set_id(ObjectId _id) { this._id = _id; }
    public void setTitle(String title) { this.title = title; }
    public void setAuthor(String author) { this.author = author; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public void setPublishedDate(String publishedDate) { this.publishedDate = publishedDate; }
    public void setGenre(List<String> genre) { this.genre = genre; }
    public void setSummary(String summary) { this.summary = summary; }
    public void setCharacters(List<String> characters) { this.characters = characters; }
    public void setMetadata(Metadata metadata) { this.metadata = metadata; }

    @Override
    public String toString() {
        return String.format(
                "Ebook[id=%s, title=%s, author=%s, isbn=%s, publishedDate=%s]",
                _id, title, author, isbn, publishedDate
        );
    }
}
