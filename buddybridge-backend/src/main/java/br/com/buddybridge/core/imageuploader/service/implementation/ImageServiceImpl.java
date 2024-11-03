package br.com.buddybridge.core.imageuploader.service.implementation;

import br.com.buddybridge.core.animais.animal.entity.AnimalModel;
import br.com.buddybridge.core.animais.animal.repository.AnimalRepository;
import br.com.buddybridge.core.imageuploader.entity.Image;
import br.com.buddybridge.core.imageuploader.entity.ImageContentTypes;
import br.com.buddybridge.core.imageuploader.exception.ImageNotFoundException;
import br.com.buddybridge.core.imageuploader.exception.WrongFileException;
import br.com.buddybridge.core.imageuploader.service.ImageService;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.sun.mail.iap.ResponseInputStream;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@RequiredArgsConstructor
@Service
@Slf4j
public class ImageServiceImpl implements ImageService
{
    @Autowired
    private AnimalRepository animalRepository;
    private final AmazonS3 s3Client;

    @Value("${aws.s3.bucket.name}")
    private String s3BucketName;

    @Override
    @Async
    public CompletableFuture<Image> uploadImage(MultipartFile file, Long animal_Id) throws RuntimeException {

        Optional<AnimalModel> model = this.animalRepository.findById(animal_Id);

        if (model.isPresent()) {
            AnimalModel animal = model.get();


            // Content-Type handling
            List<String> contentTypes = Arrays.stream(ImageContentTypes.values())
                    .map(ImageContentTypes::value)
                    .toList();

            if (!contentTypes.contains(file.getContentType())) {
                throw new WrongFileException("File uploaded should be an image...");
            }

            File fileToUpload = convertToFile(file);
            String fileName = "photo-" +  UUID.randomUUID() + "." + Objects.requireNonNull(file.getOriginalFilename()).split("\\.")[1];

            try {
                s3Client.putObject(s3BucketName, fileName, fileToUpload);

                animal.setImageName(fileName);

                animalRepository.save(animal);
            } catch (AmazonS3Exception e) {
                throw new RuntimeException("Failed to upload file to S3: " + e.getMessage());
            }


            Image image = new Image(fileName);
            log.info("File uploaded! Name: " + fileName);

            return CompletableFuture.completedFuture(image);
        }
        return null;
    }

    @Override
    @Async
    public CompletableFuture<Image> findImageByName(String imageName) {
        try {
            log.info("Fetching file: " + imageName);

            S3ObjectInputStream imageBytes = s3Client.getObject(s3BucketName, imageName).getObjectContent();
            Image image = new Image(imageName, imageBytes);

            return CompletableFuture.completedFuture(image);

        } catch (AmazonS3Exception e) {
            throw new ImageNotFoundException("Image with name " + imageName + " not found...");
        }
    }

    public byte[] getImage(String imageName) {

        try (S3ObjectInputStream inputStream = s3Client.getObject(s3BucketName, imageName).getObjectContent()) {
            return inputStream.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException("Error retrieving image from S3", e);
        }
    }

    protected File convertToFile(MultipartFile multipartFile) {
        try {
            File converted = File.createTempFile("file-", ".temp");
            OutputStream outputStream = new FileOutputStream(converted);

            outputStream.write(multipartFile.getBytes());
            outputStream.close();

            converted.deleteOnExit();

            return converted;

        } catch (IOException e) {
            throw new RuntimeException("MultipartFile with name " + multipartFile.getOriginalFilename() + " could not be converted to File...");
        }
    }
}
