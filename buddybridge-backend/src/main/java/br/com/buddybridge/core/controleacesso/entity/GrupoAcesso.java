package br.com.buddybridge.core.controleacesso.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "grupoAcesso")
@Getter
@Setter
@EqualsAndHashCode
public class GrupoAcesso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idgrupoAcesso")
    private Long idGrupoAcesso;

    @Column(name = "descricao_grupoAcesso", nullable = false, length = 255)
    private String descricaoGrupoAcesso;

    @Column(name = "ativo_grupoAcesso")
    private boolean ativoGrupoAcesso;

}
