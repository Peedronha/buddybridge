package br.com.buddybridge.core.financeiro.movimentacao.entity;

import br.com.buddybridge.core.financeiro.classificacao.entity.Classificacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "movimentacao")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Movimentacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimentacao")
    private Long idMovimentacao;

    @Column(name = "historico", nullable = false)
    private String historico;

    @Column(name = "data_lancamento", nullable = false)
    private LocalDate dataLancamento;

    @ManyToOne
    @JoinColumn(name = "id_classificacao", nullable = false)
    private Classificacao classificacao;

    @Column(name = "valor", nullable = false)
    private BigDecimal valor;

    @Column(name = "observacoes")
    private String observacoes;

    @Column(name = "valor_pendente", nullable = false)
    private BigDecimal valorPendente;
}
