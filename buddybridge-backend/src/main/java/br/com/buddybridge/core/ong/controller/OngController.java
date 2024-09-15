package br.com.buddybridge.core.ong.controller;

import br.com.buddybridge.core.ong.entity.Ong;
import br.com.buddybridge.core.ong.service.OngService;
import br.com.buddybridge.core.usuario.entity.Usuario;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/ongcontrol")
public class OngController {

    @Autowired
    OngService ongService;

    @PostMapping("/salvar")
    public ResponseEntity<?> salvar(@RequestBody Ong ong) throws ExampleExeption, SystemException {
        ongService.salvar(ong);
        return new ResponseEntity<>(ong, HttpStatus.CREATED);
    }

    @GetMapping("/listarAll")
    public List<Ong> listar() {
        return ongService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ong> buscarPorId(@PathVariable("id") Long id) {
        try {
            Ong ong = ongService.buscarPorId(id);
            return new ResponseEntity<>(ong, HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable("id") Long id) {
        ongService.excluir(id);
    }

    @PutMapping
    public ResponseEntity<Ong> updateOng(@RequestBody Ong ong) throws SystemException, ExampleExeption {
        if(this.ongService.buscarPorId(ong.getIdOng()) != null) {
            this.ongService.salvar(ong);
            return new ResponseEntity<>(ong, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}
