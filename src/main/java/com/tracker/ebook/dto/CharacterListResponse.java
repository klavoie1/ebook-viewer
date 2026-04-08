package com.tracker.ebook.dto;

import com.tracker.ebook.entities.Character;

import java.util.List;

public class CharacterListResponse {

    private boolean success;

    private List<Character> charactersList;

    public CharacterListResponse(boolean success, List<Character> charactersList) {
        this.success = success;
        this.charactersList = charactersList;
    }

    public CharacterListResponse() {}

    public boolean isSuccess() { return success; }
    public List<Character> getCharactersList() { return charactersList; }

    public void setSuccess(boolean success) { this.success = success; }
    public void setCharactersList(List<Character> charactersList) { this.charactersList = charactersList; }
}
