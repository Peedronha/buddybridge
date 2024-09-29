package br.com.buddybridge.core.financeiro.contacaixa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "contaCaixa")
public class ContaCaixa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_conta_caixa")
    private Long idContaCaixa;

    @Column(name = "descricao_contaCaixa", nullable = false)
    private String descricaoContaCaixa;

    @Column(name = "tipo_contaCaixa", nullable = false)
    private String tipoContaCaixa;  // "Conta Corrente", "Cartão de Crédito", "Guichê de Atendimento" ou "Pix"

    @Column(name = "ativo_contaCaixa")
    private boolean ativoContaCaixa;

}
