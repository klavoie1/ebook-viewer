package com.tracker.ebook.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "characters")
public class Character {

    @Id
    @JsonProperty("_id")
    private ObjectId _id;

    private String name;

    private String description;

    private String imagePath;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    public Character() {}

    public Character(ObjectId _id, String name, String description, String imagePath) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
    }

    public Character(Builder builder) {
        this.name = builder.name;
        this.description = builder.description;
        this.imagePath = builder.imagePath;
    }

    public ObjectId getid() { return _id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getImagePath() { return imagePath; }

    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }

    @Override
    public String toString() {
        return String.format(
                "Character [_id=%s, name=%s, description=%s]",
                _id, name, description
        );
    }

    public static class Builder {
        private String name;
        private String description;
        private String imagePath;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder imagePath(String imagePath) {
            this.imagePath = imagePath;
            return this;
        }

        public Character build() { return new Character(this); }
    }

}
