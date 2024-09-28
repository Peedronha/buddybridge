package br.com.buddybridge.core.imageuploader.entity;

import com.amazonaws.services.s3.model.S3ObjectInputStream;
import lombok.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Image {
    @NonNull private String imageName;
    private S3ObjectInputStream imageBytes;
}
