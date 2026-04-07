package com.tracker.ebook.dto;

import com.tracker.ebook.entities.Ebook;

import java.util.List;

public class EbookListResponse {

    private boolean success;

    private List<Ebook> ebookList;

    public EbookListResponse(boolean success, List<Ebook> ebookList) {
        this.success = success;
        this.ebookList = ebookList;
    }

    public EbookListResponse() {}

    public boolean isSuccess() { return success; }

    public List<Ebook> getEbookList() { return ebookList; }

    public void setSuccess(boolean success) { this.success = success; }

    public void setEbookList(List<Ebook> ebookList) { this.ebookList = ebookList; }
}
