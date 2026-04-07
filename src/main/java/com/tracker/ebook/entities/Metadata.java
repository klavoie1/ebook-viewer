package com.tracker.ebook.entities;

public class Metadata {

    private String fileFormat;

    private String fileSize;

    private String language;

    private String coverImagePath;

    public Metadata() {};

    public Metadata(String fileFormat, String fileSize, String language, String coverImagePath) {
        this.fileFormat = fileFormat;
        this.fileSize = fileSize;
        this.language = language;
        this.coverImagePath = coverImagePath;
    }

    public String getFileFormat() { return fileFormat; }

    public String getFileSize() { return fileSize; }

    public String getLanguage() { return language; }

    public String getCoverImagePath() { return coverImagePath; }

    public void setFileFormat(String fileFormat) { this.fileFormat = fileFormat; }

    public void setFileSize(String fileSize) { this.fileSize = fileSize; }

    public void setLanguage(String language) { this.language = language; }

    public void setCoverImagePath(String coverImagePath) { this.coverImagePath = coverImagePath; }

    @Override
    public String toString() {
        return String.format(
                "Metadata[fileFormat=%s, fileSize=%s, language=%s,  coverImagePath=%s]",
                fileFormat, fileSize, language,  coverImagePath
        );
    }
}
