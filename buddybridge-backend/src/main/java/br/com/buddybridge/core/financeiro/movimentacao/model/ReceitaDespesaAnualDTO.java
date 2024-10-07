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
public class ReceitaDespesaAnualDTO {
    private int mes;
    private BigDecimal totalReceitas;
    private BigDecimal totalDespesas;
}
