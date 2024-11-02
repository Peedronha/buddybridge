package br.com.buddybridge.core.financeiro.movimentacao.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContaCaixaResumoDTO {
    private String conta;
    private BigDecimal totalReceitas;
    private BigDecimal totalDespesas;
}
