package br.com.buddybridge.core.financeiro.contacaixa.controller;

import br.com.buddybridge.core.financeiro.contacaixa.entity.ContaCaixa;
import br.com.buddybridge.core.financeiro.contacaixa.service.ContaCaixaService;
import br.com.buddybridge.core.util.ExampleExeption;
import jakarta.transaction.SystemException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@AllArgsConstructor
@RequestMapping("contacaixa")
public class ContaCaixaController {
    
    private ContaCaixaService contaCaixaService;

    @PostMapping
    public ResponseEntity<ContaCaixa> insertContaCaixa(@RequestBody ContaCaixa contaCaixa) {
        try {
            ContaCaixa savedContaCaixa = contaCaixaService.saveContaCaixa(contaCaixa);
            return new ResponseEntity<>(savedContaCaixa, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<ContaCaixa>> getAllContaCaixa() {
        List<ContaCaixa> contaCaixaList = contaCaixaService.findAll();
        return new ResponseEntity<>(contaCaixaList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContaCaixa> getContaCaixaById(@PathVariable Long id) {
        Optional<ContaCaixa> contaCaixa = contaCaixaService.findContaCaixaById(id);
        return contaCaixa.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/tipo/{tipoContaCaixa}")
    public ResponseEntity<List<ContaCaixa>> getContaCaixaByTipo(@PathVariable String tipoContaCaixa) {
        List<ContaCaixa> contaCaixaList = contaCaixaService.findByTipoContaCaixa(tipoContaCaixa);
        return new ResponseEntity<>(contaCaixaList, HttpStatus.OK);
    }

    @GetMapping("/ativo")
    public ResponseEntity<List<ContaCaixa>> getActiveContaCaixa() {
        List<ContaCaixa> contaCaixaList = contaCaixaService.findByAtivoContaCaixaTrue();
        return new ResponseEntity<>(contaCaixaList, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ContaCaixa> updateContaCaixa(@RequestBody ContaCaixa contaCaixa) {
        Optional<ContaCaixa> existingContaCaixa = contaCaixaService.findContaCaixaById(contaCaixa.getIdContaCaixa());
        if (existingContaCaixa.isPresent()) {
            ContaCaixa updatedContaCaixa = contaCaixaService.saveContaCaixa(contaCaixa);
            return new ResponseEntity<>(updatedContaCaixa, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteContaCaixa(@PathVariable Long id) {
        Optional<ContaCaixa> existingContaCaixa = contaCaixaService.findContaCaixaById(id);
        if (existingContaCaixa.isPresent()) {
            contaCaixaService.deleteContaCaixaById(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }


}
