package br.com.buddybridge.core.financeiro.movimentacao.controller;

import br.com.buddybridge.core.financeiro.movimentacao.entity.Movimentacao;
import br.com.buddybridge.core.financeiro.movimentacao.model.ContaCaixaResumoDTO;
import br.com.buddybridge.core.financeiro.movimentacao.model.ReceitaDespesaAnualDTO;
import br.com.buddybridge.core.financeiro.movimentacao.model.ResumoMovimentacaoDTO;
import br.com.buddybridge.core.financeiro.movimentacao.service.MovimentacaoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
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


    @GetMapping("/relatorio-mensal")
    public ResponseEntity<Map<String, BigDecimal>> obterRelatorioMensal() {
        try {
            // Obtendo o mês e o ano atuais
            LocalDate dataAtual = LocalDate.now();
            int mesAtual = dataAtual.getMonthValue();
            int anoAtual = dataAtual.getYear();

            // Chamando o serviço para obter o relatório financeiro
            Map<String, BigDecimal> relatorio = movimentacaoService.obterRelatorioFinanceiro(mesAtual, anoAtual);
            return new ResponseEntity<>(relatorio, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/resumo-pendentes")
    public ResponseEntity<List<ResumoMovimentacaoDTO>> obterResumoMovimentacoesPendentes() {
        List<ResumoMovimentacaoDTO> resumo = movimentacaoService.obterMovimentacoesPendentes();
        return new ResponseEntity<>(resumo, HttpStatus.OK);
    }

    @GetMapping("/receitas-despesas-anual")
    public ResponseEntity<List<ReceitaDespesaAnualDTO>> getReceitasDespesasAnual() {
        LocalDate dataAtual = LocalDate.now();
        int anoAtual = dataAtual.getYear();
        List<ReceitaDespesaAnualDTO> dados = movimentacaoService.obterReceitasDespesasAnual(anoAtual);
        return new ResponseEntity<>(dados, HttpStatus.OK);
    }

    @GetMapping("/receitas")
    public ResponseEntity<List<ContaCaixaResumoDTO>> getReceitasPorContaCaixa(
            @RequestParam int ano, @RequestParam int mes, @RequestParam String filtro) {

        List<ContaCaixaResumoDTO> receitas = movimentacaoService.obterReceitasPorContaCaixa(ano, mes, filtro);
        return new ResponseEntity<>(receitas, HttpStatus.OK);
    }

    @GetMapping("/despesas")
    public ResponseEntity<List<ContaCaixaResumoDTO>> getDespesasPorContaCaixa(
            @RequestParam int ano, @RequestParam int mes, @RequestParam String filtro) {

        List<ContaCaixaResumoDTO> despesas = movimentacaoService.obterDespesasPorContaCaixa(ano, mes, filtro);
        return new ResponseEntity<>(despesas, HttpStatus.OK);
    }

    @GetMapping("/pendentes")
    public ResponseEntity<List<Movimentacao>> getMovimentacoesPendentes() {
        List<Movimentacao> movimentacoesPendentes = movimentacaoService.obterMovimentacoesPendentesToRecieve();
        return new ResponseEntity<>(movimentacoesPendentes, HttpStatus.OK);
    }
}
