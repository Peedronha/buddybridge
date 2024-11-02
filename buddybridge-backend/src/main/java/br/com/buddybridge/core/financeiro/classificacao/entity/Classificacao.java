package br.com.buddybridge.core.financeiro.classificacao.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "classificacao")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Classificacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idclassificacao")
    private Long idClassificacao;

    @Column(name = "descricao_classificacao", nullable = false, length = 255)
    private String descricaoClassificacao;

    @Column(name = "tipo", nullable = false, length = 10)
    private String tipo;  // "Entrada" ou "Saída"

    @Column(name = "ativo_classificacao")
    private boolean ativoClassificacao;
}
