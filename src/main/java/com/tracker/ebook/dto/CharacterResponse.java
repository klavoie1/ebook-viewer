package com.tracker.ebook.dto;

import org.bson.types.ObjectId;

public class CharacterResponse {

    private ObjectId id;

    private String name;

    private String description;

    private String imagePath;

    public CharacterResponse() {}

    public CharacterResponse(ObjectId id, String name, String description, String imagePath) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
    }

    public ObjectId getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getImagePath() { return imagePath; }

    public void setId(ObjectId id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
}
