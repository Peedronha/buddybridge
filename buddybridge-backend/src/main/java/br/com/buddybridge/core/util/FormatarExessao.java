package br.com.buddybridge.core.util;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class FormatarExessao {

    @ExceptionHandler({ExampleExeption.class})
    @ResponseBody
    public ResponseEntity FormatarExessao(ExampleExeption  ex) {
        String retorno = "{"+
            "\"codigo\":\""+ex.getCodigo()+"\","+
            "\"mensagem\":\""+ex.getMensagem()+"\","+
            "}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<Object>(retorno, headers, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
