package br.com.buddybridge.core.financeiro.movimentacao.controller;

import br.com.buddybridge.core.financeiro.movimentacao.entity.Movimentacao;
import br.com.buddybridge.core.financeiro.movimentacao.service.MovimentacaoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("movimentacao")
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;

    @PostMapping
    public ResponseEntity<Movimentacao> insertMovimentacao(@RequestBody Movimentacao movimentacao) {
        try {
            Movimentacao savedMovimentacao = movimentacaoService.saveMovimentacao(movimentacao);
            return new ResponseEntity<>(savedMovimentacao, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Movimentacao>> getAllMovimentacao() {
        List<Movimentacao> movimentacaoList = movimentacaoService.findAll();
        return new ResponseEntity<>(movimentacaoList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movimentacao> getMovimentacaoById(@PathVariable Long id) {
        Optional<Movimentacao> movimentacao = movimentacaoService.findMovimentacaoById(id);
        return movimentacao.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PutMapping
    public ResponseEntity<Movimentacao> updateMovimentacao(@RequestBody Movimentacao movimentacao) {
        Optional<Movimentacao> existingMovimentacao = movimentacaoService.findMovimentacaoById(movimentacao.getIdMovimentacao());
        if (existingMovimentacao.isPresent()) {
            Movimentacao updatedMovimentacao = movimentacaoService.saveMovimentacao(movimentacao);
            return new ResponseEntity<>(updatedMovimentacao, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteMovimentacao(@PathVariable Long id) {
        Optional<Movimentacao> existingMovimentacao = movimentacaoService.findMovimentacaoById(id);
        if (existingMovimentacao.isPresent()) {
            movimentacaoService.deleteMovimentacaoById(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }
}
