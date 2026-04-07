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

    public EbookResponse(boolean b, Object o) {
    }
}
