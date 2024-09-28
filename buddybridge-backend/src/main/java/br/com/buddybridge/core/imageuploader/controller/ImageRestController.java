package br.com.buddybridge.core.imageuploader.controller;

import br.com.buddybridge.core.imageuploader.entity.Image;
import br.com.buddybridge.core.imageuploader.entity.UploadResponse;
import br.com.buddybridge.core.imageuploader.exception.WrongFileException;
import br.com.buddybridge.core.imageuploader.service.implementation.ImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static br.com.buddybridge.core.imageuploader.entity.ImageContentTypes.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "https://image-uploader-elliot.vercel.app")
public class ImageRestController {
    private final ImageServiceImpl imageService;

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadImage(@RequestParam("imageFile") MultipartFile imageFile)
            throws ExecutionException, InterruptedException {
        CompletableFuture<Image> uploadedImage = imageService.uploadImage(imageFile);

        String baseURL = "https://images-image-uploader.up.railway.app";
        String imageUrl = uploadedImage.get().getImageName();

        UploadResponse response = new UploadResponse(HttpStatus.CREATED.value(),
                LocalDateTime.now(),
                "Image uploaded successfully!",
                imageFile.getOriginalFilename(),
                baseURL + "/image/" + imageUrl);


        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @GetMapping("/image/{imageName}")
    public ResponseEntity<Resource> getImageObject(@PathVariable("imageName") String imageName)
            throws ExecutionException, InterruptedException {
        CompletableFuture<Image> image = imageService.findImageByName(imageName);

        String fileExtension = imageName.split("\\.")[1];
        String renderType;

        // Determine the Content-Type for image rendering
        switch (fileExtension) {
            case "jpeg", "jpg" -> renderType = IMAGE_JPEG.value();
            case "png" -> renderType = IMAGE_PNG.value();
            case "webp" -> renderType = IMAGE_WEBP.value();
            case "svg" -> renderType = IMAGE_SVG.value();
            case "tiff" -> renderType = IMAGE_TIFF.value();
            default -> throw new WrongFileException("Unexpected file extension: ." + fileExtension);
        }

        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noCache())
                .header("Content-Type", renderType)
                .body(new InputStreamResource(image.get().getImageBytes()));
    }
}
