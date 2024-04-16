package br.com.buddybridge.core.endereco.controller;

import br.com.buddybridge.core.endereco.entity.Endereco;
import br.com.buddybridge.core.endereco.service.EnderecoService;
import br.com.buddybridge.core.util.ExampleExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.transaction.SystemException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {

    @Autowired
    EnderecoService enderecoService;

    @PostMapping("/salvar")
    public ResponseEntity<?> salvar(@RequestBody Endereco endereco) throws ExampleExeption, SystemException {
        System.out.println("este metodo foi chamado");
        enderecoService.salvar(endereco);
        return new ResponseEntity<>(endereco, HttpStatus.CREATED);
    }

    @GetMapping("/listarAll")
    public List<Endereco> listar() {
        return enderecoService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Endereco> buscarPorId(@PathVariable("id") Long id) {
        try {
            Endereco endereco = enderecoService.buscarPorId(id);
            return new ResponseEntity<>(endereco, HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable("id") Long id) {
        enderecoService.excluir(id);
    }
    
}
