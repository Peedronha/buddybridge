package br.com.buddybridge.core.financeiro.pagamento.entity;

import br.com.buddybridge.core.financeiro.contacaixa.entity.ContaCaixa;
import br.com.buddybridge.core.financeiro.movimentacao.entity.Movimentacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "pagamento")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pagamento")
    private Long idPagamento;

    @ManyToOne
    @JoinColumn(name = "id_movimentacao", nullable = false)
    private Movimentacao movimentacao;

    @ManyToOne
    @JoinColumn(name = "id_conta_caixa", nullable = false)
    private ContaCaixa contaCaixa;

    @Column(name = "data_recebimento", nullable = false)
    private LocalDate dataRecebimento;

    @Column(name = "valor_pagamento", nullable = false)
    private BigDecimal valorPagamento;


}
