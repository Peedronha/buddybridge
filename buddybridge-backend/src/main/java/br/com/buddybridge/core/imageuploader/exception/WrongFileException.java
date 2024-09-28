package br.com.buddybridge.core.imageuploader.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class WrongFileException extends RuntimeException{
    public WrongFileException(String message) {
        super(message);
    }
}
