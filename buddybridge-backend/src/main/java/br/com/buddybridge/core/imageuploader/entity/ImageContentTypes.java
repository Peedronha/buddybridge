package br.com.buddybridge.core.imageuploader.entity;

public enum ImageContentTypes {
    IMAGE_JPEG("image/jpeg"),
    IMAGE_PNG("image/png"),
    IMAGE_WEBP("image/webp"),
    IMAGE_SVG("image/svg+xml"),
    IMAGE_TIFF("image/tiff");

    private final String contentType;

    ImageContentTypes(String contentType) {
        this.contentType = contentType;
    }

    public String value() {
        return contentType;
    }
}
