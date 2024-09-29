package br.com.buddybridge.core.imageuploader.controller;

import br.com.buddybridge.core.adocao.entity.AdoptionModel;
import br.com.buddybridge.core.adocao.entity.AdoptionProfileModel;
import br.com.buddybridge.core.adocao.repository.AdoptionProfileRepository;
import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import br.com.buddybridge.core.animais.animal.service.AnimalService;
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
@CrossOrigin(origins = "http://localhost:4200/perfil-adocao/editperfil/")
public class ImageRestController {
    private final ImageServiceImpl imageService;
    private final AdoptionProfileRepository profileRepository;


    @PostMapping("/upload/{id_animal}")
    public ResponseEntity<UploadResponse> uploadImage(@RequestParam("imageFile") MultipartFile imageFile,
                                                      @PathVariable("id_animal") String animalId)
            throws ExecutionException, InterruptedException {
        AdoptionProfileModel profileModel = profileRepository.getReferenceById(Long.valueOf(animalId));

        // Check if the animal already has 3 images
        if (profileModel.getImageUrls().size() >= 3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new UploadResponse(HttpStatus.BAD_REQUEST.value(), LocalDateTime.now(),
                            "This animal already has the maximum number of images (3)", null, null));
        }

        CompletableFuture<Image> uploadedImage = imageService.uploadImage(imageFile);

        String baseURL = "http://localhost:4200";
        String imageUrl = uploadedImage.get().getImageName();

        // Add the image URL to the animal's image list
        profileModel.getImageUrls().add(imageUrl);
        profileRepository.save(profileModel);

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
