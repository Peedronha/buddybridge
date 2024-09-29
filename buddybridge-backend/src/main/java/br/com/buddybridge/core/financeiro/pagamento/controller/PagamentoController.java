package br.com.buddybridge.core.financeiro.pagamento.controller;

import br.com.buddybridge.core.financeiro.pagamento.entity.Pagamento;
import br.com.buddybridge.core.financeiro.pagamento.service.PagamentoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("pagamento")
public class PagamentoController {

    private final PagamentoService pagamentoService;

    @PostMapping
    public ResponseEntity<Pagamento> insertPagamento(@RequestBody Pagamento pagamento) {
        try {
            Pagamento savedPagamento = pagamentoService.savePagamento(pagamento);
            return new ResponseEntity<>(savedPagamento, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Pagamento>> getAllPagamentos() {
        List<Pagamento> pagamentoList = pagamentoService.findAll();
        return new ResponseEntity<>(pagamentoList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pagamento> getPagamentoById(@PathVariable Long id) {
        Optional<Pagamento> pagamento = pagamentoService.findPagamentoById(id);
        return pagamento.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PutMapping
    public ResponseEntity<Pagamento> updatePagamento(@RequestBody Pagamento pagamento) throws Exception {
        Optional<Pagamento> existingPagamento = pagamentoService.findPagamentoById(pagamento.getIdPagamento());
        if (existingPagamento.isPresent()) {
            Pagamento updatedPagamento = pagamentoService.savePagamento(pagamento);
            return new ResponseEntity<>(updatedPagamento, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deletePagamento(@PathVariable Long id) {
        Optional<Pagamento> existingPagamento = pagamentoService.findPagamentoById(id);
        if (existingPagamento.isPresent()) {
            pagamentoService.deletePagamentoById(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }
}
