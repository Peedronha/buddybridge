package br.com.buddybridge.core.financeiro.movimentacao.service;

import br.com.buddybridge.core.financeiro.movimentacao.entity.Movimentacao;
import br.com.buddybridge.core.financeiro.movimentacao.model.ContaCaixaResumoDTO;
import br.com.buddybridge.core.financeiro.movimentacao.model.ReceitaDespesaAnualDTO;
import br.com.buddybridge.core.financeiro.movimentacao.model.ResumoMovimentacaoDTO;
import br.com.buddybridge.core.financeiro.movimentacao.repository.MovimentacaoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;

    public Movimentacao saveMovimentacao(Movimentacao movimentacao) {
        return movimentacaoRepository.save(movimentacao);
    }

    public List<Movimentacao> findAll() {
        return movimentacaoRepository.findAll();
    }

    public Optional<Movimentacao> findMovimentacaoById(Long id) {
        return movimentacaoRepository.findById(id);
    }

    public void deleteMovimentacaoById(Long id) {
        movimentacaoRepository.deleteById(id);
    }

    public Map<String, BigDecimal> obterRelatorioFinanceiro(int mesAtual, int anoAtual) {
        Map<String, BigDecimal> relatorio = new HashMap<>();
        relatorio.put("totalDespesasProgramadas", movimentacaoRepository.totalDespesasProgramadas(mesAtual, anoAtual));
        relatorio.put("totalReceitasProgramadas", movimentacaoRepository.totalReceitasProgramadas(mesAtual, anoAtual));
        relatorio.put("totalDespesasPagas", movimentacaoRepository.totalDespesasPagas(mesAtual, anoAtual));
        relatorio.put("totalReceitasRecebidas", movimentacaoRepository.totalReceitasRecebidas(mesAtual, anoAtual));
        return relatorio;
    }

    public List<ResumoMovimentacaoDTO> obterMovimentacoesPendentes() {
        List<Object[]> resultados = movimentacaoRepository.findMovimentacoesPendentes();

        // Mapeando os resultados para ResumoMovimentacaoDTO
        List<ResumoMovimentacaoDTO> movimentacoesPendentes = new ArrayList<>();

        for (Object[] resultado : resultados) {
            String historico = (String) resultado[0];
            LocalDate dataLancamento = (LocalDate) resultado[1];
            BigDecimal valorPendente = (BigDecimal) resultado[2];
            String tipoClassificacao = (String) resultado[3];
            Long idMovimentacao = (Long) resultado[4];
            Boolean vencido = (Boolean) resultado[5];

            // Criação do DTO
            ResumoMovimentacaoDTO dto = new ResumoMovimentacaoDTO(historico, dataLancamento, valorPendente, tipoClassificacao, idMovimentacao, vencido);
            movimentacoesPendentes.add(dto);
        }

        return movimentacoesPendentes;
    }

    public List<ReceitaDespesaAnualDTO> obterReceitasDespesasAnual(int ano) {
        List<Object[]> resultados = movimentacaoRepository.findReceitaDespesaAnual(ano);

        // Populando os DTOs a partir do resultado da consulta
        List<ReceitaDespesaAnualDTO> receitasDespesas = new ArrayList<>();

        for (Object[] resultado : resultados) {
            int mes = (int) resultado[0]; // Mês
            BigDecimal totalReceitas = (BigDecimal) resultado[1]; // Receitas
            BigDecimal totalDespesas = (BigDecimal) resultado[2]; // Despesas

            // Cria o DTO e adiciona na lista
            ReceitaDespesaAnualDTO dto = new ReceitaDespesaAnualDTO(mes, totalReceitas, totalDespesas);
            receitasDespesas.add(dto);
        }

        return receitasDespesas;
    }

    public List<ContaCaixaResumoDTO> obterReceitasPorContaCaixa(int ano, int mes, String filtro) {
        List<Object[]> resultados = movimentacaoRepository.findReceitasPorContaCaixa(ano, mes, filtro);

        // Populando os DTOs a partir do resultado da consulta
        List<ContaCaixaResumoDTO> receitas = new ArrayList<>();

        for (Object[] resultado : resultados) {
            String conta = (String) resultado[0]; // Conta de Caixa
            BigDecimal totalReceitas = (BigDecimal) resultado[1]; // Total Receitas

            // Cria o DTO e adiciona na lista
            ContaCaixaResumoDTO dto = new ContaCaixaResumoDTO(conta, totalReceitas, null); // Null para despesas
            receitas.add(dto);
        }

        return receitas;
    }

    // Método para obter despesas por conta de caixa
    public List<ContaCaixaResumoDTO> obterDespesasPorContaCaixa(int ano, int mes, String filtro) {
        List<Object[]> resultados = movimentacaoRepository.findDespesasPorContaCaixa(ano, mes, filtro);

        // Populando os DTOs a partir do resultado da consulta
        List<ContaCaixaResumoDTO> despesas = new ArrayList<>();

        for (Object[] resultado : resultados) {
            String conta = (String) resultado[0]; // Conta de Caixa
            BigDecimal totalDespesas = (BigDecimal) resultado[1]; // Total Despesas

            // Cria o DTO e adiciona na lista
            ContaCaixaResumoDTO dto = new ContaCaixaResumoDTO(conta, null, totalDespesas); // Null para receitas
            despesas.add(dto);
        }

        return despesas;
    }

    public List<Movimentacao> obterMovimentacoesPendentesToRecieve() {
        return movimentacaoRepository.findMovimentacoesPendentesToRecieve();
    }
}
