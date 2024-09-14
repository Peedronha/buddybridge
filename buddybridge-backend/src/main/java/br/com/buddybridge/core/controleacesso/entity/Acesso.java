package br.com.buddybridge.core.controleacesso.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "acesso")
@Getter
@Setter
@EqualsAndHashCode
public class Acesso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idacesso")
    private Long idAcesso;

    @Column(name = "modulo_acesso", nullable = false, length = 255)
    private String moduloAcesso;

    @Column(name = "tela_acesso", nullable = false, length = 255)
    private String telaAcesso;

    @Column(name = "tipo_acesso", nullable = false, length = 255)
    private String tipoAcesso;

    @Column(name = "descricao_acesso", nullable = false, length = 255)
    private String descricaoAcesso;

    @Column(name = "icone_acesso", nullable = true, length = 255)
    private String iconeAcesso;

    @Column(name = "url_acesso", nullable = true, length = 255)
    private String urlAcesso;
}
