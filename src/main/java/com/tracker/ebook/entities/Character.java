package com.tracker.ebook.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "characters")
public class Character {

    @Id
    @JsonProperty("_id")
    private ObjectId _id;

    private String name;

    private String description;

    public Character() {}

    public Character(ObjectId _id, String name, String description) {
        this._id = _id;
        this.name = name;
        this.description = description;
    }

    public ObjectId getid() { return _id; }
    public String getName() { return name; }
    public String getDescription() { return description; }

    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }

    @Override
    public String toString() {
        return String.format(
                "Character [_id=%s, name=%s, description=%s]",
                _id, name, description
        );
    }

}
