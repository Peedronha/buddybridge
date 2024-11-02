package br.com.buddybridge.core.financeiro.classificacao.controller;

import br.com.buddybridge.core.financeiro.classificacao.entity.Classificacao;
import br.com.buddybridge.core.financeiro.classificacao.service.ClassificacaoService;
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
@RequestMapping("classificacao")
public class ClassificacaoController {

    private ClassificacaoService classificacaoService;

    @PostMapping
    public ResponseEntity<Classificacao> insertClassificacao(@RequestBody Classificacao classificacao){
        try {
            Classificacao toReturn = this.classificacaoService.saveClassificacao(classificacao);
            return new ResponseEntity<>(toReturn, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @PutMapping
    public ResponseEntity<Classificacao> updateClassificacao(@RequestBody Classificacao classificacao) throws SystemException, ExampleExeption {
        if (this.classificacaoService.findClassificacaoById(classificacao.getIdClassificacao()) != null){
            this.classificacaoService.saveClassificacao(classificacao);
            return new ResponseEntity<>(classificacao, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteClassificacao(@PathVariable Long id){
        if (this.classificacaoService.findClassificacaoById(id) != null){
            this.classificacaoService.deleteClassificacaoById(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping
    public ResponseEntity<List<Classificacao>> getALlClassificacao(){
        List<Classificacao> toReturn = new ArrayList<>(this.classificacaoService.findAll());
        if (toReturn.isEmpty()) {
            return new ResponseEntity<>(toReturn, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (toReturn), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Classificacao> getClassificacaoById(@PathVariable Long id) throws Exception {
        try {
            Optional<Classificacao> toReturn = this.classificacaoService.findClassificacaoById(id);
            return new ResponseEntity<>(toReturn.get(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/ativo")
    public ResponseEntity<List<Classificacao>> getALlClassificacaoByIsAtivo(){
        List<Classificacao> toReturn = new ArrayList<>(this.classificacaoService.findByAtivoClassificacaoTrue());
        if (toReturn.isEmpty()) {
            return new ResponseEntity<>(toReturn, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (toReturn), HttpStatus.OK);
    }

}
