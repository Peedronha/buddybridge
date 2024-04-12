package br.com.buddybridge.core.voluntario.controller;

import br.com.buddybridge.core.util.ExampleExeption;
import br.com.buddybridge.core.voluntario.entity.Voluntario;
import br.com.buddybridge.core.voluntario.service.VoluntarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.transaction.SystemException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/voluntario")
public class VoluntarioController {

    @Autowired
    VoluntarioService voluntarioService;

    @PostMapping("/salvar")
    public ResponseEntity<?> salvar(@RequestBody Voluntario voluntario) throws ExampleExeption, SystemException {
        System.out.println("este metodo foi chamado");
        voluntarioService.salvar(voluntario);
        return new ResponseEntity<>(voluntario, HttpStatus.CREATED);
    }

    @GetMapping("/listarAll")
    public List<Voluntario> listar() {
        return voluntarioService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Voluntario> buscarPorId(@PathVariable("id") Long id) {
        try {
            Voluntario voluntario = voluntarioService.buscarPorId(id);
            return new ResponseEntity<>(voluntario, HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable("id") Long id) {
        voluntarioService.excluir(id);
    }
    
}
