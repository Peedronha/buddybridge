package br.com.buddybridge.core.imageuploader.service;

import br.com.buddybridge.core.imageuploader.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.CompletableFuture;

public interface ImageService {
    CompletableFuture<Image> uploadImage(MultipartFile imageFile, Long animal_Id);
    CompletableFuture<Image> findImageByName(String imageName);

    byte[] getImage(String imageName);
}
