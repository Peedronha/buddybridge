package br.com.buddybridge.core.financeiro.movimentacao.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResumoMovimentacaoDTO {
    private String historico;
    private LocalDate dataLancamento;
    private BigDecimal valorPendente;
    private String tipoClassificacao;
    private Long idMovimentacao;
    private boolean vencido;


}